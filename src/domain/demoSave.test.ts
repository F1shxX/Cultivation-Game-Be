import assert from "node:assert/strict";
import test from "node:test";

import {
  applyDemoAction,
  applyExpansionUpdate,
  defaultDemoState,
  normalizeDemoState,
  type DemoSaveState,
} from "./demoSave.js";

function stateAt(scene: DemoSaveState["scene"]): DemoSaveState {
  return {
    ...defaultDemoState,
    scene,
    eventLog: [],
  };
}

test("the plaza can reach every destination directly", () => {
  const next = applyDemoAction(stateAt("plaza"), "change_scene:dormitory");

  assert.equal(next.scene, "dormitory");
  assert.equal(next.eventLog.at(-1)?.title, "前往宿舍");
});

test("a destination cannot travel directly to another destination", () => {
  const next = applyDemoAction(stateAt("dormitory"), "change_scene:forge");

  assert.equal(next.scene, "dormitory");
  assert.equal(next.eventLog.at(-1)?.title, "需要先返回广场");
  assert.match(next.eventLog.at(-1)?.text ?? "", /必须先返回广场/);
});

test("a destination can return to the plaza and depart again", () => {
  const plaza = applyDemoAction(stateAt("dormitory"), "change_scene:plaza");
  const forge = applyDemoAction(plaza, "change_scene:forge");

  assert.equal(plaza.scene, "plaza");
  assert.equal(forge.scene, "forge");
});

test("selecting the current scene does not add a duplicate travel log", () => {
  const current = stateAt("plaza");
  const next = applyDemoAction(current, "change_scene:plaza");

  assert.deepEqual(next, current);
  assert.equal(next.eventLog.length, 0);
});

test("intro_lushi advances through the opening scene chain", () => {
  let state = applyDemoAction(defaultDemoState, "start_event:intro_lushi");

  assert.equal(state.activeEvent?.id, "intro_lushi");
  assert.equal(state.scene, "dormitory");
  assert.equal(state.activeEvent?.awaitingScene, null);

  state = applyDemoAction(state, "advance_event");
  assert.equal(state.activeEvent?.nodeIndex, 0);
  assert.equal(state.scene, "dormitory");

  state = applyDemoAction(state, "event_choice:intro_where");
  assert.equal(state.activeEvent?.nodeIndex, 1);
  assert.equal(state.scene, "dormitory");
  assert.equal(state.activeEvent?.awaitingScene, "plaza");

  state = applyDemoAction(state, "change_scene:plaza");
  assert.equal(state.activeEvent?.nodeIndex, 2);
  assert.equal(state.scene, "plaza");
  assert.equal(state.activeEvent?.awaitingScene, "hall");

  state = applyDemoAction(state, "change_scene:hall");
  assert.equal(state.activeEvent?.nodeIndex, 3);
  assert.equal(state.scene, "hall");
  assert.equal(state.activeEvent?.awaitingScene, null);

  state = applyDemoAction(state, "advance_event");
  assert.equal(state.activeEvent?.nodeIndex, 4);
  assert.equal(state.scene, "hall");

  state = applyDemoAction(state, "advance_event");
  assert.equal(state.activeEvent?.nodeIndex, 5);
  assert.equal(state.scene, "hall");

  state = applyDemoAction(state, "advance_event");
  assert.equal(state.activeEvent, null);
  assert.equal(state.scene, "plaza");
  assert.equal(state.completedEvents.includes("intro_lushi"), true);
  assert.equal(state.expansion.story.completed.includes(1), true);
  assert.equal(state.flags.introLushiCompleted, true);
});

test("starter handnotes are placed in their intended scenes", () => {
  const notesByNpc = new Map(
    defaultDemoState.expansion.handnotes.entries.map((entry) => [entry.npcId, entry.scene]),
  );

  assert.equal(notesByNpc.get("lu-zhenren"), "hall");
  assert.equal(notesByNpc.get("xiao-zhang"), "dormitory");
  assert.equal(notesByNpc.get("xiaoxian"), "sister_room");
});

test("claimed handnotes survive a normalized expansion update", () => {
  const claimedState = normalizeDemoState({
    ...defaultDemoState,
    expansion: {
      ...defaultDemoState.expansion,
      handnotes: {
        ...defaultDemoState.expansion.handnotes,
        entries: defaultDemoState.expansion.handnotes.entries.map((entry, index) =>
          index === 0 ? { ...entry, claimed: true } : entry,
        ),
      },
    },
  });

  const next = applyExpansionUpdate(claimedState, claimedState.expansion);

  assert.equal(next.expansion.handnotes.entries[0].claimed, true);
  assert.equal(next.expansion.handnotes.entries[0].title.length > 0, true);
});

test("handnotes expire six months after creation", () => {
  const next = applyExpansionUpdate(defaultDemoState, defaultDemoState.expansion, 12);
  const refreshedEntry = next.expansion.handnotes.entries.find(
    (entry) => entry.createdAt.year === 2 && entry.createdAt.month === 1,
  );

  assert.ok(refreshedEntry);
  assert.deepEqual(refreshedEntry?.expiresAt, { year: 2, month: 7 });
  assert.deepEqual(next.expansion.handnotes.entries[0].expiresAt, { year: 1, month: 7 });
});
