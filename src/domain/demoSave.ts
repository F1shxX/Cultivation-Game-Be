export type DemoLocation = "home" | "event" | "battle";

export type DemoScene =
  | "hall"
  | "plaza"
  | "dormitory"
  | "sister_room"
  | "meditation_room"
  | "forge"
  | "alchemy_room"
  | "spirit_garden"
  | "teleport_array";

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
  scene: DemoScene;
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

export const sceneNames: Record<DemoScene, string> = {
  hall: "大厅",
  plaza: "广场",
  dormitory: "宿舍",
  sister_room: "师姐居室",
  meditation_room: "闭关室",
  forge: "炼器坊",
  alchemy_room: "炼丹房",
  spirit_garden: "灵植园",
  teleport_array: "传送阵",
};

export const defaultDemoState: DemoSaveState = {
  year: 1,
  month: 1,
  location: "home",
  scene: "hall",
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
    plazaSwept: false,
    dormRested: false,
    sisterTea: false,
    teleportChecked: false,
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

export function normalizeDemoState(state: Partial<DemoSaveState> | DemoSaveState): DemoSaveState {
  return {
    ...defaultDemoState,
    ...state,
    scene: state.scene ?? "hall",
    cultivation: {
      ...defaultDemoState.cultivation,
      ...state.cultivation,
    },
    resources: {
      ...defaultDemoState.resources,
      ...state.resources,
    },
    flags: {
      ...defaultDemoState.flags,
      ...state.flags,
    },
    relationships: state.relationships ?? defaultDemoState.relationships,
    eventLog: state.eventLog ?? defaultDemoState.eventLog,
  };
}

export type DemoAction =
  | "change_scene:hall"
  | "change_scene:plaza"
  | "change_scene:dormitory"
  | "change_scene:sister_room"
  | "change_scene:meditation_room"
  | "change_scene:forge"
  | "change_scene:alchemy_room"
  | "change_scene:spirit_garden"
  | "change_scene:teleport_array"
  | "cultivate"
  | "alchemy"
  | "plant"
  | "forge"
  | "rest"
  | "talk_xiaoxian"
  | "sweep_plaza"
  | "inspect_teleport"
  | "start_mouse_cave"
  | "battle_victory";

function changeScene(state: DemoSaveState, scene: DemoScene): DemoSaveState {
  return appendLog(
    {
      ...state,
      scene,
      location: state.location === "battle" ? "battle" : "home",
    },
    `前往${sceneNames[scene]}`,
    `你来到鹿石宗${sceneNames[scene]}。这里布置简约随性，却处处像有人刚刚用过。`,
  );
}

export function applyDemoAction(rawState: DemoSaveState, action: DemoAction): DemoSaveState {
  const state = normalizeDemoState(rawState);

  if (action.startsWith("change_scene:")) {
    return changeScene(state, action.replace("change_scene:", "") as DemoScene);
  }

  switch (action) {
    case "cultivate": {
      const next = advanceMonth({
        ...state,
        scene: "meditation_room",
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
            scene: "alchemy_room",
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
            scene: "spirit_garden",
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
            scene: "forge",
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
    case "rest": {
      const next = advanceMonth({
        ...state,
        scene: "dormitory",
        location: "home",
        flags: {
          ...state.flags,
          dormRested: true,
        },
        resources: {
          ...state.resources,
          pills: state.resources.pills + 1,
        },
      });
      return appendLog(next, "宿舍小憩", "你在简陋但干净的宿舍里睡了一觉，醒来时桌上多了一枚小娴留下的丹药。");
    }
    case "talk_xiaoxian": {
      const next = addBond(
        {
          ...state,
          scene: "sister_room",
          location: "home",
          flags: {
            ...state.flags,
            sisterTea: true,
          },
        },
        "xiaoxian",
        4,
      );
      return appendLog(next, "师姐煮茶", "小娴说小张又把自己叫成大师兄了，她笑着让你别太认真。");
    }
    case "sweep_plaza": {
      const next = advanceMonth(
        addBond(
          {
            ...state,
            scene: "plaza",
            location: "home",
            flags: {
              ...state.flags,
              plazaSwept: true,
            },
            resources: {
              ...state.resources,
              spiritStones: state.resources.spiritStones + 10,
            },
          },
          "xiao-zhang",
          1,
        ),
      );
      return appendLog(next, "广场洒扫", "你在广场石缝里捡到几枚灵石。小张说这是鹿真人布下的机缘，听起来很像他临时编的。");
    }
    case "inspect_teleport": {
      const next = appendLog(
        {
          ...state,
          scene: "teleport_array",
          location: "home",
          flags: {
            ...state.flags,
            teleportChecked: true,
            mouseCaveUnlocked: true,
          },
        },
        "传送阵微光",
        "阵纹亮起一角，似乎能通往后山山鼠洞。鹿真人确实没给鹿石宗修山门。",
      );
      return next;
    }
    case "start_mouse_cave": {
      return appendLog(
        {
          ...state,
          scene: "teleport_array",
          location: "battle",
          flags: {
            ...state.flags,
            mouseCaveUnlocked: true,
          },
        },
        "山鼠洞觅宝",
        "传送阵一闪，你和小张落在后山洞口，里面传来窸窸窣窣的啃咬声。",
      );
    }
    case "battle_victory": {
      const next = advanceMonth({
        ...state,
        scene: "plaza",
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
