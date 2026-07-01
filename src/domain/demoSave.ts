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

export type DemoEventId = "mouse_cave_treasure" | "wish_eater_bridge";

export type DemoEventChoiceAction =
  | "event_choice:mouse_joke"
  | "event_choice:mouse_careful"
  | "event_choice:qingmu_trust"
  | "event_choice:qingmu_guard"
  | "event_choice:protect_beggar"
  | "event_choice:trust_jinling";

export type DemoActiveEvent = {
  id: DemoEventId;
  nodeIndex: number;
  selectedChoices: Record<string, string>;
  replay: boolean;
  startedAt: {
    year: number;
    month: number;
  };
};

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

export type DemoInventory = {
  mouseDemonCore: number;
  worryForgetRoot: number;
  qingmuHealingPills: number;
  jinlingToken: number;
};

export type DemoCharacterId =
  | "lu-zhenren"
  | "xiaoxian"
  | "xiao-zhang"
  | "yangqi"
  | "douran"
  | "chuchu"
  | "xiaolu";

export type DemoRelationship = {
  characterId: DemoCharacterId;
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
  activeEvent: DemoActiveEvent | null;
  completedEvents: DemoEventId[];
  cultivation: DemoCultivationState;
  resources: DemoResources;
  inventory: DemoInventory;
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

type DemoEventNodeMode = "dialogue" | "choice" | "battle" | "reward";

type DemoEventChoice = {
  action: DemoEventChoiceAction;
  key: string;
  label: string;
  logTitle: string;
  logText: string;
};

type DemoEventNode = {
  id: string;
  title: string;
  speaker: string;
  text: string;
  mode: DemoEventNodeMode;
  choices?: DemoEventChoice[];
};

type DemoEventDefinition = {
  id: DemoEventId;
  title: string;
  triggerYear: number;
  category: string;
  location: string;
  participants: string[];
  summary: string;
  rewardText: string;
  nodes: DemoEventNode[];
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

export const demoEventDefinitions: Record<DemoEventId, DemoEventDefinition> = {
  mouse_cave_treasure: {
    id: "mouse_cave_treasure",
    title: "山鼠洞觅宝",
    triggerYear: 10,
    category: "探险",
    location: "鹿石宗附近山地 · 山鼠洞",
    participants: ["主角", "小张", "羊七道人", "豆髯道人"],
    summary: "小张邀约探宝，误入山鼠洞后遭遇山鼠王，青木门羊七道人与豆髯道人出手相助。",
    rewardText: "灵石50、山鼠妖丹1枚、青木门初识。",
    nodes: [
      {
        id: "invite",
        title: "小张邀约探宝",
        speaker: "小张",
        text: "我听山下猎户说，后山那个山鼠洞里头，藏着上古秘宝！师弟，今日便是本真人扬名之时。",
        mode: "dialogue",
      },
      {
        id: "cave-mouth",
        title: "山鼠洞洞口",
        speaker: "主角",
        text: "洞口阴冷潮湿，里面传来窸窸窣窣的啃咬声。小张说那是秘宝的灵压。",
        mode: "choice",
        choices: [
          {
            action: "event_choice:mouse_joke",
            key: "joke",
            label: "那是老鼠味儿吧",
            logTitle: "洞口吐槽",
            logText: "你指出这股气味和上古秘宝没什么关系，小张选择性没有听见。",
          },
          {
            action: "event_choice:mouse_careful",
            key: "careful",
            label: "谨慎入洞",
            logTitle: "谨慎入洞",
            logText: "你让小张走慢些。小张点头，然后非常不谨慎地走在最前面。",
          },
        ],
      },
      {
        id: "small-rats",
        title: "山鼠仔来袭",
        speaker: "小张",
        text: "一群山鼠仔从石缝里扑出。小张拔剑大喊：区区鼠辈，也敢挡本真人的路！",
        mode: "battle",
      },
      {
        id: "rat-king",
        title: "山鼠王现身",
        speaker: "张真人",
        text: "地面震动，山鼠王撞碎石壁。小张脸色一变：师姐救……师姐不在。行吧，那只能靠我自己了。",
        mode: "battle",
      },
      {
        id: "qingmu-arrives",
        title: "青木门出手",
        speaker: "羊七道人",
        text: "一根青藤破岩而出，缠住山鼠王咽喉。羊七道人沉声喝道：孽畜，找死！",
        mode: "dialogue",
      },
      {
        id: "misunderstanding",
        title: "误会凶相",
        speaker: "豆髯道人",
        text: "两位道人胡须浓密、面相凶悍，怎么看都像刚打完劫。豆髯道人却笑得很灿烂。",
        mode: "choice",
        choices: [
          {
            action: "event_choice:qingmu_trust",
            key: "trust",
            label: "收起戒备",
            logTitle: "青木门善意",
            logText: "你收起戒备。豆髯道人哈哈大笑，说青木门只是长得像反派。",
          },
          {
            action: "event_choice:qingmu_guard",
            key: "guard",
            label: "继续观察",
            logTitle: "保持观察",
            logText: "你仍然盯着他们的胡子。豆髯道人笑得更灿烂，小张悄悄后退半步。",
          },
        ],
      },
      {
        id: "reward",
        title: "忘忧根交易",
        speaker: "豆髯道人",
        text: "哈哈哈哈，小兄弟，误会误会！我们是青木门的。所谓秘宝其实是忘忧根，换你们几枚疗伤丹如何？",
        mode: "reward",
      },
    ],
  },
  wish_eater_bridge: {
    id: "wish_eater_bridge",
    title: "断桥乞儿",
    triggerYear: 12,
    category: "探险",
    location: "长安城郊 · 断桥村",
    participants: ["主角", "小张", "雏雏", "小鹿"],
    summary: "断桥村异常委托引出啖愿妖，玩家与金灵宗师兄妹因处置乞儿产生分歧，最终解除误会。",
    rewardText: "灵石100、金灵宗初识。",
    nodes: [
      {
        id: "commission",
        title: "断桥村委托",
        speaker: "小张",
        text: "断桥村半月来愿望成祟，村民接连失踪。小张拍胸口：这种事，当然要由本真人主持公道。",
        mode: "dialogue",
      },
      {
        id: "village",
        title: "断桥村口",
        speaker: "村民",
        text: "村民说，桥边有个乞儿日日替人许愿，许过愿的人却一个个被邪祟缠身。",
        mode: "dialogue",
      },
      {
        id: "minions",
        title: "邪祟爪牙",
        speaker: "小张",
        text: "黑影从残屋里钻出，爪牙带着怨气扑来。小张拔剑时还不忘摆出大师兄的姿势。",
        mode: "battle",
      },
      {
        id: "bridge-dispute",
        title: "断桥争执",
        speaker: "小鹿",
        text: "断桥边，雏雏与小鹿正要处置一个乞儿。小鹿低声问：师兄，这半个月的事十有八九是他干的，要不要我现在就送他一程？",
        mode: "choice",
        choices: [
          {
            action: "event_choice:protect_beggar",
            key: "protect",
            label: "拦下他们",
            logTitle: "心软拦人",
            logText: "小张挡在乞儿面前：这不过是个要饭的老实人，你们这是何苦！雏雏皱眉让你们先听内情。",
          },
          {
            action: "event_choice:trust_jinling",
            key: "listen",
            label: "先听内情",
            logTitle: "听取内情",
            logText: "你示意小张先别急。雏雏点头，说这乞儿并非凡人，断桥村的事也并非表面那么简单。",
          },
        ],
      },
      {
        id: "reveal",
        title: "啖愿妖露相",
        speaker: "啖愿妖",
        text: "乞儿低笑，皮囊像纸一样裂开：既然都到齐了，那就一起留下吧！",
        mode: "dialogue",
      },
      {
        id: "boss",
        title: "合力伏妖",
        speaker: "雏雏",
        text: "金灵剑光斩开妖雾，小鹿封住退路。你和小张被卷入战阵，必须合力击败啖愿妖。",
        mode: "battle",
      },
      {
        id: "reward",
        title: "解除误会",
        speaker: "雏雏",
        text: "我二人是金灵宗弟子，雏雏、小鹿。方才事急，言语冒犯。小鹿补了一句：下次遇到可怜人，先看清楚再心软。",
        mode: "reward",
      },
    ],
  },
};

const sceneActions = [
  "change_scene:hall",
  "change_scene:plaza",
  "change_scene:dormitory",
  "change_scene:sister_room",
  "change_scene:meditation_room",
  "change_scene:forge",
  "change_scene:alchemy_room",
  "change_scene:spirit_garden",
  "change_scene:teleport_array",
] as const;

const eventStartActions = [
  "start_event:mouse_cave_treasure",
  "start_event:wish_eater_bridge",
] as const;

const eventChoiceActions = [
  "event_choice:mouse_joke",
  "event_choice:mouse_careful",
  "event_choice:qingmu_trust",
  "event_choice:qingmu_guard",
  "event_choice:protect_beggar",
  "event_choice:trust_jinling",
] as const;

export const demoActions = [
  ...sceneActions,
  "cultivate",
  "alchemy",
  "plant",
  "forge",
  "rest",
  "talk_xiaoxian",
  "sweep_plaza",
  "inspect_teleport",
  "start_mouse_cave",
  "battle_victory",
  ...eventStartActions,
  "advance_event",
  ...eventChoiceActions,
] as const;

export type DemoAction = (typeof demoActions)[number];

export const defaultDemoState: DemoSaveState = {
  year: 1,
  month: 1,
  location: "home",
  scene: "hall",
  activeEvent: null,
  completedEvents: [],
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
  inventory: {
    mouseDemonCore: 0,
    worryForgetRoot: 0,
    qingmuHealingPills: 0,
    jinlingToken: 0,
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
    mouseCaveCompleted: false,
    qingmuIntroduced: false,
    wishEaterCompleted: false,
    jinlingIntroduced: false,
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

const MAX_LOG_ENTRIES = 16;

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

function addBond(
  state: DemoSaveState,
  characterId: DemoRelationship["characterId"],
  amount: number,
) {
  return {
    ...state,
    relationships: state.relationships.map((relationship) =>
      relationship.characterId === characterId
        ? { ...relationship, bond: clamp(relationship.bond + amount, 0, 100) }
        : relationship,
    ),
  };
}

function upsertRelationship(
  state: DemoSaveState,
  relationship: DemoRelationship,
): DemoSaveState {
  const exists = state.relationships.some((item) => item.characterId === relationship.characterId);
  if (!exists) {
    return {
      ...state,
      relationships: [...state.relationships, relationship],
    };
  }

  return addBond(state, relationship.characterId, relationship.bond);
}

function eventNodeLocation(node: DemoEventNode): DemoLocation {
  if (node.mode === "battle") return "battle";
  return "event";
}

function eventScene(eventId: DemoEventId): DemoScene {
  return eventId === "mouse_cave_treasure" ? "teleport_array" : "plaza";
}

function setEventNode(state: DemoSaveState, nodeIndex: number): DemoSaveState {
  if (!state.activeEvent) return state;

  const definition = demoEventDefinitions[state.activeEvent.id];
  const node = definition.nodes[nodeIndex];
  if (!node) return completeEvent(state);

  return appendLog(
    {
      ...state,
      location: eventNodeLocation(node),
      scene: eventScene(state.activeEvent.id),
      activeEvent: {
        ...state.activeEvent,
        nodeIndex,
      },
    },
    node.title,
    node.text,
  );
}

function startEvent(state: DemoSaveState, eventId: DemoEventId): DemoSaveState {
  if (state.activeEvent) {
    const activeDefinition = demoEventDefinitions[state.activeEvent.id];
    return appendLog(
      state,
      "事件进行中",
      `当前正在推进「${activeDefinition.title}」，先完成后再开启新的事件。`,
    );
  }

  const definition = demoEventDefinitions[eventId];
  const replay = state.completedEvents.includes(eventId);
  const firstNode = definition.nodes[0];

  return appendLog(
    {
      ...state,
      location: eventNodeLocation(firstNode),
      scene: eventScene(eventId),
      activeEvent: {
        id: eventId,
        nodeIndex: 0,
        selectedChoices: {},
        replay,
        startedAt: {
          year: state.year,
          month: state.month,
        },
      },
      flags: {
        ...state.flags,
        mouseCaveUnlocked:
          state.flags.mouseCaveUnlocked || eventId === "mouse_cave_treasure",
      },
    },
    replay ? `复盘：${definition.title}` : definition.title,
    `${definition.location}：${definition.summary}`,
  );
}

function completeEvent(rawState: DemoSaveState): DemoSaveState {
  if (!rawState.activeEvent) return rawState;

  const activeEvent = rawState.activeEvent;
  const definition = demoEventDefinitions[activeEvent.id];
  const wasCompleted = rawState.completedEvents.includes(activeEvent.id);
  const grantReward = !wasCompleted && !activeEvent.replay;
  const completedEvents = Array.from(new Set([...rawState.completedEvents, activeEvent.id]));

  let next: DemoSaveState = {
    ...rawState,
    activeEvent: null,
    completedEvents,
    location: "home",
    scene: activeEvent.id === "mouse_cave_treasure" ? "teleport_array" : "plaza",
  };

  if (grantReward && activeEvent.id === "mouse_cave_treasure") {
    next = upsertRelationship(
      upsertRelationship(
        {
          ...next,
          resources: {
            ...next.resources,
            spiritStones: next.resources.spiritStones + 50,
            pills: next.resources.pills + 2,
          },
          inventory: {
            ...next.inventory,
            mouseDemonCore: next.inventory.mouseDemonCore + 1,
            worryForgetRoot: next.inventory.worryForgetRoot + 1,
            qingmuHealingPills: next.inventory.qingmuHealingPills + 2,
          },
          flags: {
            ...next.flags,
            mouseCaveCompleted: true,
            qingmuIntroduced: true,
          },
        },
        { characterId: "yangqi", name: "羊七道人", bond: 18 },
      ),
      { characterId: "douran", name: "豆髯道人", bond: 18 },
    );
  }

  if (grantReward && activeEvent.id === "wish_eater_bridge") {
    next = upsertRelationship(
      upsertRelationship(
        {
          ...next,
          resources: {
            ...next.resources,
            spiritStones: next.resources.spiritStones + 100,
          },
          inventory: {
            ...next.inventory,
            jinlingToken: next.inventory.jinlingToken + 1,
          },
          flags: {
            ...next.flags,
            wishEaterCompleted: true,
            jinlingIntroduced: true,
          },
        },
        { characterId: "chuchu", name: "雏雏", bond: 16 },
      ),
      { characterId: "xiaolu", name: "小鹿", bond: 16 },
    );
  }

  return appendLog(
    next,
    grantReward ? `完成：${definition.title}` : `复盘完成：${definition.title}`,
    grantReward
      ? `事件结算：${definition.rewardText}`
      : "本事件已完成过，本次复盘不重复发放奖励。",
  );
}

function advanceEvent(rawState: DemoSaveState): DemoSaveState {
  if (!rawState.activeEvent) {
    return appendLog(rawState, "暂无事件", "当前没有正在进行的事件。可从事件测试按钮启动一组事件。");
  }

  const definition = demoEventDefinitions[rawState.activeEvent.id];
  const currentNode = definition.nodes[rawState.activeEvent.nodeIndex];

  if (currentNode?.mode === "choice") {
    return appendLog(rawState, "需要抉择", "当前事件节点需要先选择一个回应。");
  }

  const nextIndex = rawState.activeEvent.nodeIndex + 1;
  if (nextIndex >= definition.nodes.length) {
    return completeEvent(rawState);
  }

  return setEventNode(rawState, nextIndex);
}

function chooseEventOption(rawState: DemoSaveState, action: DemoEventChoiceAction): DemoSaveState {
  if (!rawState.activeEvent) {
    return appendLog(rawState, "暂无事件", "当前没有正在进行的事件，选择没有生效。");
  }

  const definition = demoEventDefinitions[rawState.activeEvent.id];
  const currentNode = definition.nodes[rawState.activeEvent.nodeIndex];
  const choice = currentNode?.choices?.find((item) => item.action === action);

  if (!currentNode || currentNode.mode !== "choice" || !choice) {
    return appendLog(rawState, "选择未生效", "当前节点不需要这个选择。");
  }

  const withChoice = appendLog(
    {
      ...rawState,
      activeEvent: {
        ...rawState.activeEvent,
        selectedChoices: {
          ...rawState.activeEvent.selectedChoices,
          [currentNode.id]: choice.key,
        },
      },
    },
    choice.logTitle,
    choice.logText,
  );

  const nextIndex = rawState.activeEvent.nodeIndex + 1;
  if (nextIndex >= definition.nodes.length) {
    return completeEvent(withChoice);
  }

  return setEventNode(withChoice, nextIndex);
}

export function normalizeDemoState(state: Partial<DemoSaveState> | DemoSaveState): DemoSaveState {
  return {
    ...defaultDemoState,
    ...state,
    scene: state.scene ?? "hall",
    activeEvent: state.activeEvent ?? null,
    completedEvents: state.completedEvents ?? [],
    cultivation: {
      ...defaultDemoState.cultivation,
      ...state.cultivation,
    },
    resources: {
      ...defaultDemoState.resources,
      ...state.resources,
    },
    inventory: {
      ...defaultDemoState.inventory,
      ...state.inventory,
    },
    flags: {
      ...defaultDemoState.flags,
      ...state.flags,
    },
    relationships: state.relationships ?? defaultDemoState.relationships,
    eventLog: state.eventLog ?? defaultDemoState.eventLog,
  };
}

function changeScene(state: DemoSaveState, scene: DemoScene): DemoSaveState {
  if (state.activeEvent) {
    const definition = demoEventDefinitions[state.activeEvent.id];
    return appendLog(
      state,
      "事件进行中",
      `先完成「${definition.title}」，再返回鹿石宗其他区域。`,
    );
  }

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

  const eventAction =
    action === "advance_event" ||
    action === "battle_victory" ||
    action.startsWith("event_choice:") ||
    action.startsWith("start_event:");

  if (state.activeEvent && !eventAction) {
    const definition = demoEventDefinitions[state.activeEvent.id];
    return appendLog(
      state,
      "事件进行中",
      `先完成「${definition.title}」，再安排鹿石宗日常。`,
    );
  }

  if (action.startsWith("change_scene:")) {
    return changeScene(state, action.replace("change_scene:", "") as DemoScene);
  }

  if (action.startsWith("start_event:")) {
    return startEvent(state, action.replace("start_event:", "") as DemoEventId);
  }

  if (action.startsWith("event_choice:")) {
    return chooseEventOption(state, action as DemoEventChoiceAction);
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
      return appendLog(
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
    }
    case "start_mouse_cave": {
      return startEvent(state, "mouse_cave_treasure");
    }
    case "advance_event": {
      return advanceEvent(state);
    }
    case "battle_victory": {
      if (state.activeEvent) {
        return advanceEvent(state);
      }

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
