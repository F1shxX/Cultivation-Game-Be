export type DemoLocation = "home" | "event" | "battle";

export type DemoCultivationState = {
  level: "炼气";
  realmProgress: number;
  root: "万化道躯";
  learnedArts: string[];
};

export type DemoResources = {
  spiritStones: number;
  spiritMarrow: number;
  herbs: number;
  ore: number;
  pills: number;
};

export type DemoRelationship = {
  characterId: "lu-zhenren" | "xiaoxian" | "xiao-zhang";
  name: string;
  bond: number;
};

export type DemoEventLogEntry = {
  year: number;
  month: number;
  title: string;
  text: string;
};

export type DemoSaveState = {
  year: number;
  month: number;
  location: DemoLocation;
  cultivation: DemoCultivationState;
  resources: DemoResources;
  relationships: DemoRelationship[];
  flags: Record<string, boolean>;
  eventLog: DemoEventLogEntry[];
};

export type DemoSaveRecord = {
  player_id: string;
  state: DemoSaveState;
  created_at?: string;
  updated_at?: string;
};

export const defaultDemoState: DemoSaveState = {
  year: 1,
  month: 1,
  location: "home",
  cultivation: {
    level: "炼气",
    realmProgress: 12,
    root: "万化道躯",
    learnedArts: ["鹿石吐纳诀"],
  },
  resources: {
    spiritStones: 120,
    spiritMarrow: 1,
    herbs: 8,
    ore: 3,
    pills: 2,
  },
  relationships: [
    { characterId: "lu-zhenren", name: "鹿真人", bond: 10 },
    { characterId: "xiaoxian", name: "小娴", bond: 28 },
    { characterId: "xiao-zhang", name: "小张", bond: 22 },
  ],
  flags: {
    openingSeen: false,
    firstMudEye: false,
    mouseCaveUnlocked: false,
  },
  eventLog: [
    {
      year: 1,
      month: 1,
      title: "魂落此间",
      text: "你在鹿石宗醒来。鹿真人说你身无灵根，却能化去灵气。",
    },
  ],
};

const MAX_LOG_ENTRIES = 12;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function appendLog(state: DemoSaveState, title: string, text: string): DemoSaveState {
  return {
    ...state,
    eventLog: [
      { year: state.year, month: state.month, title, text },
      ...state.eventLog,
    ].slice(0, MAX_LOG_ENTRIES),
  };
}

function advanceMonth(state: DemoSaveState): DemoSaveState {
  const nextMonth = state.month >= 12 ? 1 : state.month + 1;
  const nextYear = state.month >= 12 ? state.year + 1 : state.year;
  return {
    ...state,
    year: nextYear,
    month: nextMonth,
  };
}

function addBond(state: DemoSaveState, characterId: DemoRelationship["characterId"], amount: number) {
  return {
    ...state,
    relationships: state.relationships.map((relationship) =>
      relationship.characterId === characterId
        ? { ...relationship, bond: clamp(relationship.bond + amount, 0, 100) }
        : relationship,
    ),
  };
}

export type DemoAction =
  | "cultivate"
  | "alchemy"
  | "plant"
  | "forge"
  | "start_mouse_cave"
  | "battle_victory";

export function applyDemoAction(state: DemoSaveState, action: DemoAction): DemoSaveState {
  switch (action) {
    case "cultivate": {
      const next = advanceMonth({
        ...state,
        location: "home",
        cultivation: {
          ...state.cultivation,
          realmProgress: clamp(state.cultivation.realmProgress + 8, 0, 100),
        },
        resources: {
          ...state.resources,
          spiritStones: Math.max(0, state.resources.spiritStones - 15),
        },
      });
      return appendLog(next, "闭关修炼", "你运转鹿石吐纳诀，万化道躯微微发热。");
    }
    case "alchemy": {
      const next = advanceMonth(
        addBond(
          {
            ...state,
            location: "home",
            resources: {
              ...state.resources,
              herbs: Math.max(0, state.resources.herbs - 2),
              pills: state.resources.pills + 1,
            },
          },
          "xiaoxian",
          3,
        ),
      );
      return appendLog(next, "小娴开炉", "小娴一边哼歌一边看火，你得到一枚回气丹。");
    }
    case "plant": {
      const next = advanceMonth(
        addBond(
          {
            ...state,
            location: "home",
            resources: {
              ...state.resources,
              herbs: state.resources.herbs + 4,
            },
          },
          "xiaoxian",
          2,
        ),
      );
      return appendLog(next, "灵田新芽", "鹿石宗后山冒出一片嫩绿，小娴说这批灵草长势不错。");
    }
    case "forge": {
      const next = advanceMonth(
        addBond(
          {
            ...state,
            location: "home",
            resources: {
              ...state.resources,
              ore: Math.max(0, state.resources.ore - 1),
              spiritStones: state.resources.spiritStones + 20,
            },
          },
          "xiao-zhang",
          3,
        ),
      );
      return appendLog(next, "小张锻器", "小张自称张真人亲传炼器术大成，结果只锻出一把还算能卖的短剑。");
    }
    case "start_mouse_cave": {
      return appendLog(
        {
          ...state,
          location: "battle",
          flags: {
            ...state.flags,
            mouseCaveUnlocked: true,
          },
        },
        "山鼠洞觅宝",
        "小张在后山发现一处洞穴，里面似乎有灵石气息。",
      );
    }
    case "battle_victory": {
      const next = advanceMonth({
        ...state,
        location: "home",
        resources: {
          ...state.resources,
          spiritStones: state.resources.spiritStones + 90,
          herbs: state.resources.herbs + 2,
          ore: state.resources.ore + 1,
        },
        cultivation: {
          ...state.cultivation,
          learnedArts: Array.from(new Set([...state.cultivation.learnedArts, "碎石剑气"])),
        },
      });
      return appendLog(next, "山鼠退散", "你以碎石剑气击退山鼠，带回一袋灵石和一卷残破功法。");
    }
    default:
      return state;
  }
}
