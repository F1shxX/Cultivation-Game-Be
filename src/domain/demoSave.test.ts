import assert from "node:assert/strict";
import test from "node:test";

import { applyDemoAction, defaultDemoState, type DemoSaveState } from "./demoSave.js";

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
  assert.equal(next.eventLog.at(-1)?.title, "需先返回广场");
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
