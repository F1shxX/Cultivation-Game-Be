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

export type DemoEventId = "intro_lushi" | "mouse_cave_treasure" | "wish_eater_bridge";

export type DemoEventChoiceAction =
  | "event_choice:intro_ok"
  | "event_choice:intro_where"
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
  awaitingScene?: DemoScene | null;
  startedAt: {
    year: number;
    month: number;
  };
};

export type DemoCultivationState = {
  level: "炼气" | "筑基";
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

export type DemoHandnoteNpcId = "lu-zhenren" | "xiao-zhang" | "xiaoxian";

export type DemoHandnoteReward =
  | { type: "herb"; herbId: DemoGardenHerbId; amount: number }
  | { type: "pill"; pillId: string; amount: number }
  | { type: "material"; materialId: string; amount: number };

export type DemoHandnoteEntry = {
  id: string;
  npcId: DemoHandnoteNpcId;
  scene: DemoScene;
  title: string;
  text: string;
  flavorOnly: boolean;
  reward: DemoHandnoteReward | null;
  claimed: boolean;
  createdAt: {
    year: number;
    month: number;
  };
  expiresAt: {
    year: number;
    month: number;
  };
};

export type DemoHandnoteState = {
  lastRefreshYear: number;
  entries: DemoHandnoteEntry[];
};

export type DemoEventLogEntry = {
  year: number;
  month: number;
  title: string;
  text: string;
};

export type DemoBattleResult = {
  stageId: string;
  victory: boolean;
  kills: number;
  seconds: number;
  hpPercent: number;
  spiritStones: number;
  damageTaken: number;
  bossDefeated: boolean;
};

export type DemoBattleStats = {
  runs: number;
  victories: number;
  defeats: number;
  kills: number;
  bestSeconds: number | null;
  lastResult: DemoBattleResult | null;
};

export type DemoMethodId = "luhua_jue" | "jinmang_jue" | "yanxin_jue";
export type DemoSpellId = "jinmang" | "shuiren" | "huodan";
export type DemoTechniqueId = "straight" | "ring" | "drop";
export type DemoSecretId = "cuti" | "mingmu" | "pojia" | "yufeng";

export type DemoLoadout = {
  methodId: DemoMethodId;
  spellSlot: {
    spellId: DemoSpellId;
    techniqueId: DemoTechniqueId;
    secretIds: [DemoSecretId, DemoSecretId];
  };
};

export type DemoEquipment = {
  weapon: string;
  armor: string;
  accessory: string;
};

export type DemoPlayerProfile = {
  created: boolean;
  name: string;
  gender: "male" | "female";
  outfit: "qingshan" | "daopao" | "jinzhuang" | "xianpao";
  difficulty: "easy" | "normal" | "hard" | "extreme";
  fate: "genius" | "talented" | "average" | "mortal";
  perks: string[];
  attributes: {
    aptitude: number;
    comprehension: number;
    spirit: number;
    speed: number;
    fortune: number;
  };
};

export type DemoGardenHerbId =
  | "juqi"
  | "ningxue"
  | "huoli"
  | "shizhi"
  | "wugen"
  | "taojiao"
  | "chiyan"
  | "chensha";

export type DemoGardenPlot = {
  herbId: DemoGardenHerbId | null;
  years: number;
  plantedAtMonth?: number;
};

export type DemoCraftedEquipment = {
  id: string;
  name: string;
  category: "weapon" | "armor";
  form: string;
  rank: "黄" | "玄" | "地" | "天" | "仙";
  stage: 0 | 1 | 2 | 3 | 4;
  lingyun: number;
  effect: string;
};

export type DemoExpansionState = {
  profile: DemoPlayerProfile;
  story: {
    completed: number[];
    tracked: number | null;
  };
  handnotes: DemoHandnoteState;
  garden: {
    fieldLevel: 1 | 2;
    formationLevel: 0 | 1;
    xiaoxianCare: boolean;
    plots: DemoGardenPlot[];
  };
  herbStock: Record<DemoGardenHerbId, number>;
  pillStock: Record<string, number>;
  materialStock: Record<string, number>;
  craftedEquipment: DemoCraftedEquipment[];
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
  equipment: DemoEquipment;
  loadout: DemoLoadout;
  relationships: DemoRelationship[];
  flags: Record<string, boolean>;
  battleStats: DemoBattleStats;
  eventLog: DemoEventLogEntry[];
  expansion: DemoExpansionState;
};

export type DemoSaveRecord = {
  player_id: string;
  state: DemoSaveState;
  created_at?: string;
  updated_at?: string;
};

type DemoEventNodeMode = "dialogue" | "choice" | "battle" | "reward";

type DemoEventVisualStage =
  | "intro_dormitory"
  | "intro_plaza"
  | "intro_hall"
  | "intro_reward"
  | "teleport_departure"
  | "mouse_cave"
  | "mouse_skirmish"
  | "mouse_boss_crisis"
  | "qingmu_rescue"
  | "mouse_boss_final"
  | "mouse_reward"
  | "bridge_village"
  | "bridge_skirmish"
  | "bridge_confrontation"
  | "wish_eater_reveal"
  | "wish_eater_boss"
  | "bridge_reward";

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
  visualStage: DemoEventVisualStage;
  scene?: DemoScene;
  continueLabel?: string;
  continueScene?: DemoScene | null;
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
  intro_lushi: {
    id: "intro_lushi",
    title: "初入鹿石宗",
    triggerYear: 1,
    category: "开局主线",
    location: "宿舍 → 广场 → 大厅",
    participants: ["主角", "小娴", "小张", "鹿真人"],
    summary: "开场 CG 结束后，你在宿舍醒来，由小张小娴引导前往大厅见鹿真人。",
    rewardText: "鹿花诀·炼气篇、金芒诀·炼气篇、焰心诀·炼气篇",
    nodes: [
      {
        id: "wake-up",
        title: "宿舍醒来",
        speaker: "小张",
        text: "醒了醒了！师弟——你可算醒了。我就说嘛，看着壮实，死不了。",
        mode: "choice",
        visualStage: "intro_dormitory",
        scene: "dormitory",
        choices: [
          {
            action: "event_choice:intro_ok",
            key: "ok",
            label: "我没事。多谢....",
            logTitle: "醒来回应",
            logText: "小娴微笑着点头：那就好。走吧。",
          },
          {
            action: "event_choice:intro_where",
            key: "where",
            label: "这里是……",
            logTitle: "询问来处",
            logText:
              "小娴温和地解释：鹿石宗。你昏倒在山脚下，我和小张把你背回来的。不急——等见过真人，慢慢就熟了。",
          },
        ],
      },
      {
        id: "dormitory-departure",
        title: "宿舍门前",
        speaker: "小娴",
        text: "感觉怎么样？不急，慢慢来。真人吩咐了，等你醒了带去大厅见他。走吧，别让真人等久了。",
        mode: "dialogue",
        visualStage: "intro_dormitory",
        scene: "dormitory",
        continueLabel: "前往广场",
        continueScene: "plaza",
      },
      {
        id: "plaza-walk",
        title: "广场认路",
        speaker: "小张",
        text: "对了，正式介绍一下——在下张真人，鹿石宗大师兄。这是小娴，你大师姐。以后修炼上不懂的——问我。",
        mode: "dialogue",
        visualStage: "intro_plaza",
        scene: "plaza",
        continueLabel: "前往大厅",
        continueScene: "hall",
      },
      {
        id: "hall-meeting",
        title: "大殿初见",
        speaker: "鹿真人",
        text: "来了。坐。你的灵根我探过了。五种俱全——金木水火土。灵根愈杂，修行愈缓。此乃常理。不过杂有杂的好处，这三本功法予你。",
        mode: "reward",
        visualStage: "intro_hall",
        scene: "hall",
        continueLabel: "收下三本功法",
      },
      {
        id: "manual-reward",
        title: "入门功法",
        speaker: "主角",
        text: "多谢真人。",
        mode: "dialogue",
        visualStage: "intro_reward",
        scene: "hall",
        continueLabel: "送别鹿真人",
      },
      {
        id: "lushi-departure",
        title: "真人离去",
        speaker: "鹿真人",
        text: "好好修。鹿花诀是根基，无属性的——不挑人，先修它。这两本也可修。金芒诀锋锐，焰心诀爆烈，皆学了去，日后如何搭配——自行琢磨。明日我便出门了，修行之事——你师兄师姐俱在。",
        mode: "dialogue",
        visualStage: "intro_hall",
        scene: "hall",
        continueLabel: "返回广场继续修行",
      },
    ],
  },
  mouse_cave_treasure: {
    id: "mouse_cave_treasure",
    title: "山鼠洞寻宝",
    triggerYear: 10,
    category: "外出奇遇",
    location: "鹿石宗附近山地 · 山鼠洞",
    participants: ["主角", "小张", "羊七道人", "豆髯道人"],
    summary: "小张吹牛邀约探宝，二人误入山鼠洞后遭遇山鼠王，濒危时由青木门羊七道人与豆髯道人出手相救。",
    rewardText: "灵石50、山鼠妖丹1枚、忘忧根1株、青木疗伤丹2枚、青木门羁绊。",
    nodes: [
      {
        id: "invite",
        title: "小张邀约探宝",
        speaker: "小张",
        text: "哎哎哎，师弟，跟你说个事儿，你可千万别声张。我听山下猎户说，后山那个山鼠洞里头，藏着上古秘宝！找着了平分，找不着也当练手，反正我大师兄罩着你。",
        mode: "dialogue",
        visualStage: "teleport_departure",
      },
      {
        id: "cave-mouth",
        title: "山鼠洞洞口",
        speaker: "小张",
        text: "到了到了，就是这儿。你闻闻，是不是有股子宝气？洞口藤蔓乱爬，里面还传来窸窸窣窣的响动。",
        mode: "choice",
        visualStage: "mouse_cave",
        choices: [
          {
            action: "event_choice:mouse_joke",
            key: "joke",
            label: "那是老鼠味儿吧",
            logTitle: "洞口吐槽",
            logText: "你指出这股气味和上古秘宝没什么关系。小张咳了一声，说细节不重要。",
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
        title: "洞穴前段 · 山鼠仔",
        speaker: "小张",
        text: "一群山鼠仔从石缝里扑出。小张拔剑大喊：区区鼠辈，也敢挡本真人的路！",
        mode: "battle",
        visualStage: "mouse_skirmish",
      },
      {
        id: "rat-king",
        title: "洞穴深处 · 山鼠王",
        speaker: "张真人",
        text: "这……这老鼠也太大了吧？！师姐救……师姐不在。行吧，那只能靠我自己了。你先撤，我拖着它！",
        mode: "battle",
        visualStage: "mouse_boss_crisis",
      },
      {
        id: "qingmu-arrives",
        title: "羊七豆髯登场",
        speaker: "羊七道人",
        text: "孽畜，找死！一根青藤破岩而出，缠住山鼠王咽喉。两位胡须浓密、相貌凶悍的道人踏入洞中。",
        mode: "dialogue",
        visualStage: "qingmu_rescue",
      },
      {
        id: "misunderstanding",
        title: "误会凶相",
        speaker: "豆髯道人",
        text: "哈哈哈哈，小兄弟，误会误会！我们是青木门的，我叫豆髯，这位是我师弟羊七。山里毒虫最近闹得凶，我们是来查探的，正好撞见你们跟这畜生缠斗。",
        mode: "choice",
        visualStage: "qingmu_rescue",
        choices: [
          {
            action: "event_choice:qingmu_trust",
            key: "trust",
            label: "收起戒备",
            logTitle: "青木门善意",
            logText: "你收起戒备。豆髯道人笑得灿烂，说他们只是长得凶了点。",
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
        id: "final-rat-king",
        title: "合力再战山鼠王",
        speaker: "羊七道人",
        text: "山鼠王挣断半截青藤，妖气重新聚拢。羊七道人压住阵脚，豆髯道人大笑：小兄弟，小张兄弟，这回一起上！",
        mode: "battle",
        visualStage: "mouse_boss_final",
      },
      {
        id: "reward",
        title: "忘忧根交易",
        speaker: "豆髯道人",
        text: "哎哟，这不是忘忧根吗！这东西解毒疗伤都是一把好手。既然是你们先找到的，我们拿几株炼好的疗伤丹换，你看如何？",
        mode: "reward",
        visualStage: "mouse_reward",
      },
    ],
  },
  wish_eater_bridge: {
    id: "wish_eater_bridge",
    title: "啖愿妖事件",
    triggerYear: 12,
    category: "外出奇遇",
    location: "长安城郊 · 断桥村",
    participants: ["主角", "小张", "雏雏（楚凌）", "小鹿（鹿宁）"],
    summary: "断桥村异常委托引出啖愿妖，玩家与金灵宗师兄妹因处置乞儿产生分歧，最终见证正道杀伐背后的理由。",
    rewardText: "灵石100、金灵宗信物1枚、金灵宗羁绊。",
    nodes: [
      {
        id: "commission",
        title: "委托的由来",
        speaker: "小张",
        text: "诶，师弟你看，断桥村最近闹得挺邪乎，说是夜里总有人听见哭声，天亮之后就有人失踪。正好悬赏灵石，走走走，大师兄带你去会会这个邪祟。",
        mode: "dialogue",
        visualStage: "bridge_village",
      },
      {
        id: "village",
        title: "断桥村口",
        speaker: "村民",
        text: "已经是这半个月第三个了……都是心软的人先没的。村民三三两两聚在一起，谁也不敢靠近断桥。",
        mode: "dialogue",
        visualStage: "bridge_village",
      },
      {
        id: "minions",
        title: "村外 · 邪祟爪牙",
        speaker: "小张",
        text: "好家伙，还真有货！黑影从残屋里钻出，爪牙带着怨气扑来。大师兄我今天就替天行道了！",
        mode: "battle",
        visualStage: "bridge_skirmish",
      },
      {
        id: "bridge-dispute",
        title: "断桥边 · 撞见处决",
        speaker: "小鹿",
        text: "师兄，这半个月的事十有八九是他干的，要不要我现在就送他一程？雏雏剑锋不移，只说：再等等，还差一步。",
        mode: "choice",
        visualStage: "bridge_confrontation",
        choices: [
          {
            action: "event_choice:protect_beggar",
            key: "protect",
            label: "先住手，问清楚",
            logTitle: "心软拦人",
            logText: "小张挡在乞儿面前：光天化日之下，欺负一个乞丐算什么本事！雏雏收剑半分，说那便再等一等，让你们也看清楚。",
          },
          {
            action: "event_choice:trust_jinling",
            key: "listen",
            label: "先听内情",
            logTitle: "听取内情",
            logText: "你示意小张先别急。雏雏点头，说这件事你们不清楚内情，让开些便能看清楚。",
          },
        ],
      },
      {
        id: "reveal",
        title: "真身现形",
        speaker: "啖愿妖",
        text: "乞儿褴褛的伪装如皮般剥落，黑气从空洞眼窝里涌出。它狞笑道：既然都到齐了，那就一起留下吧！",
        mode: "dialogue",
        visualStage: "wish_eater_reveal",
      },
      {
        id: "boss",
        title: "断桥 · 啖愿妖",
        speaker: "雏雏",
        text: "啖愿妖专挑心怀怜悯之人下手，越是善良，越合它的胃口。小鹿，正面接它。你和小张也被卷入战阵，必须合力伏妖。",
        mode: "battle",
        visualStage: "wish_eater_boss",
      },
      {
        id: "reward",
        title: "解除误会",
        speaker: "雏雏",
        text: "我二人是金灵宗弟子，雏雏、小鹿。金灵宗的规矩是，恶不辨清楚绝不轻饶，但也绝不冤枉一个好人。小鹿补了一句：下次遇到可怜人，先看清楚再心软。",
        mode: "reward",
        visualStage: "bridge_reward",
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
  "start_event:intro_lushi",
  "start_event:mouse_cave_treasure",
  "start_event:wish_eater_bridge",
] as const;

const eventChoiceActions = [
  "event_choice:intro_ok",
  "event_choice:intro_where",
  "event_choice:mouse_joke",
  "event_choice:mouse_careful",
  "event_choice:qingmu_trust",
  "event_choice:qingmu_guard",
  "event_choice:protect_beggar",
  "event_choice:trust_jinling",
] as const;

const methodIds = ["luhua_jue", "jinmang_jue", "yanxin_jue"] as const;
const spellIds = ["jinmang", "shuiren", "huodan"] as const;
const techniqueIds = ["straight", "ring", "drop"] as const;
const secretIds = ["cuti", "mingmu", "pojia", "yufeng"] as const;

const equipMethodActions = methodIds.map((id) => `equip_method:${id}`) as [
  "equip_method:luhua_jue",
  "equip_method:jinmang_jue",
  "equip_method:yanxin_jue",
];
const equipSpellActions = spellIds.map((id) => `equip_spell:${id}`) as [
  "equip_spell:jinmang",
  "equip_spell:shuiren",
  "equip_spell:huodan",
];
const equipTechniqueActions = techniqueIds.map((id) => `equip_technique:${id}`) as [
  "equip_technique:straight",
  "equip_technique:ring",
  "equip_technique:drop",
];
const equipSecretOneActions = secretIds.map((id) => `equip_secret_1:${id}`) as [
  "equip_secret_1:cuti",
  "equip_secret_1:mingmu",
  "equip_secret_1:pojia",
  "equip_secret_1:yufeng",
];
const equipSecretTwoActions = secretIds.map((id) => `equip_secret_2:${id}`) as [
  "equip_secret_2:cuti",
  "equip_secret_2:mingmu",
  "equip_secret_2:pojia",
  "equip_secret_2:yufeng",
];

const methodNames: Record<DemoMethodId, string> = {
  luhua_jue: "鹿花诀",
  jinmang_jue: "金芒诀",
  yanxin_jue: "焰心诀",
};

const spellNames: Record<DemoSpellId, string> = {
  jinmang: "金芒",
  shuiren: "水刃",
  huodan: "火弹",
};

const techniqueNames: Record<DemoTechniqueId, string> = {
  straight: "直线飞行",
  ring: "环形扩散",
  drop: "天降坠击",
};

const secretNames: Record<DemoSecretId, string> = {
  cuti: "淬体",
  mingmu: "明目",
  pojia: "破甲",
  yufeng: "御风",
};

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
  ...equipMethodActions,
  ...equipSpellActions,
  ...equipTechniqueActions,
  ...equipSecretOneActions,
  ...equipSecretTwoActions,
] as const;

export type DemoAction = (typeof demoActions)[number];

export type DemoActionContext = {
  battleResult?: DemoBattleResult;
};

function addMonthsToDate(date: { year: number; month: number }, months: number) {
  let year = date.year;
  let month = date.month + months;
  while (month > 12) {
    month -= 12;
    year += 1;
  }
  while (month < 1) {
    month += 12;
    year -= 1;
  }
  return { year, month };
}

const handnoteNpcNames: Record<DemoHandnoteNpcId, string> = {
  "lu-zhenren": "鹿真人",
  "xiao-zhang": "小张",
  xiaoxian: "小娴",
};

const handnoteSceneByNpc: Record<DemoHandnoteNpcId, DemoScene> = {
  "lu-zhenren": "hall",
  "xiao-zhang": "dormitory",
  xiaoxian: "sister_room",
};

const handnoteTemplates: Record<
  DemoHandnoteNpcId,
  Array<{
    title: string;
    text: string;
    flavorOnly: boolean;
    reward: DemoHandnoteReward | null;
  }>
> = {
  "lu-zhenren": [
    {
      title: "云游札记",
      text: "门里的人常问我为什么总不在宗门。其实答案很简单，路要自己走，门只负责把路摆出来。",
      flavorOnly: true,
      reward: null,
    },
    {
      title: "灵髓换算",
      text: "灵髓这东西，在这边叫珍宝，在那边就只是另一种记法。你若真想回头看，先把本事练够。",
      flavorOnly: false,
      reward: { type: "pill", pillId: "huayu", amount: 1 },
    },
  ],
  "xiao-zhang": [
    {
      title: "装腔日记",
      text: "本大师兄今天又被师妹拆穿了一回。无妨，先把话说满，万一真成了呢。",
      flavorOnly: true,
      reward: null,
    },
    {
      title: "炼器记录",
      text: "捡来的铁料别急着扔，炉火一过，很多破烂都能变成能卖钱的东西。",
      flavorOnly: false,
      reward: { type: "material", materialId: "crudeIron", amount: 2 },
    },
  ],
  xiaoxian: [
    {
      title: "茶盏旁",
      text: "你刚来时什么都不记得，所以我先给你倒了杯茶。宗门里不缺规矩，缺的是愿意把人留下来的人。",
      flavorOnly: true,
      reward: null,
    },
    {
      title: "药炉边角",
      text: "若是这几天累了，就去灵植园走走。草木长得慢，心也会慢下来。",
      flavorOnly: false,
      reward: { type: "herb", herbId: "juqi", amount: 3 },
    },
  ],
};

const handnoteNpcIds = ["lu-zhenren", "xiao-zhang", "xiaoxian"] as const;
const demoScenes = Object.keys(sceneNames) as DemoScene[];

function normalizeHandnoteDate(
  value: Partial<{ year: number; month: number }> | undefined,
  fallback: { year: number; month: number },
) {
  return {
    year:
      typeof value?.year === "number" && Number.isFinite(value.year)
        ? clamp(Math.round(value.year), 1, 9999)
        : clamp(Math.round(fallback.year), 1, 9999),
    month:
      typeof value?.month === "number" && Number.isFinite(value.month)
        ? clamp(Math.round(value.month), 1, 12)
        : clamp(Math.round(fallback.month), 1, 12),
  };
}

function normalizeHandnoteReward(reward: DemoHandnoteReward | null | undefined): DemoHandnoteReward | null {
  if (!reward) return null;
  const amount = clamp(Math.round(Number(reward.amount ?? 0)), 1, 999);

  if (reward.type === "herb") {
    return isOneOf(reward.herbId, gardenHerbIds) ? { type: "herb", herbId: reward.herbId, amount } : null;
  }

  if (reward.type === "pill") {
    const pillId = typeof reward.pillId === "string" ? reward.pillId.trim() : "";
    return pillId ? { type: "pill", pillId: pillId.slice(0, 32), amount } : null;
  }

  if (reward.type === "material") {
    const materialId = typeof reward.materialId === "string" ? reward.materialId.trim() : "";
    return materialId ? { type: "material", materialId: materialId.slice(0, 32), amount } : null;
  }

  return null;
}

function normalizeHandnoteEntry(entry: Partial<DemoHandnoteEntry> | undefined): DemoHandnoteEntry | null {
  if (!entry || typeof entry !== "object") return null;
  if (!isOneOf(entry.npcId, handnoteNpcIds)) return null;

  const createdAt = normalizeHandnoteDate(entry.createdAt, { year: 1, month: 1 });
  const expiresAt = normalizeHandnoteDate(entry.expiresAt, addMonthsToDate(createdAt, 6));

  return {
    id: typeof entry.id === "string" && entry.id.trim() ? entry.id.trim().slice(0, 64) : `handnote-${entry.npcId}`,
    npcId: entry.npcId,
    scene: isOneOf(entry.scene, demoScenes) ? entry.scene : handnoteSceneByNpc[entry.npcId],
    title:
      typeof entry.title === "string" && entry.title.trim()
        ? entry.title.trim().slice(0, 40)
        : handnoteNpcNames[entry.npcId],
    text:
      typeof entry.text === "string" && entry.text.trim()
        ? entry.text.trim().slice(0, 280)
        : "这一页手记暂时空着。",
    flavorOnly: entry.flavorOnly === true,
    reward: normalizeHandnoteReward(entry.reward as DemoHandnoteReward | null | undefined),
    claimed: entry.claimed === true,
    createdAt,
    expiresAt,
  };
}

function normalizeHandnoteState(
  raw: Partial<DemoHandnoteState> | undefined,
  fallback: DemoHandnoteState,
): DemoHandnoteState {
  const entries = Array.isArray(raw?.entries)
    ? raw.entries
        .map((entry) => normalizeHandnoteEntry(entry))
        .filter((entry): entry is DemoHandnoteEntry => Boolean(entry))
    : fallback.entries;

  const dedupedEntries = Array.from(new Map(entries.map((entry) => [entry.id, entry])).values());

  return {
    lastRefreshYear:
      typeof raw?.lastRefreshYear === "number" && Number.isFinite(raw.lastRefreshYear)
        ? clamp(Math.round(raw.lastRefreshYear), 1, 9999)
        : fallback.lastRefreshYear,
    entries: dedupedEntries.length > 0 ? dedupedEntries : fallback.entries,
  };
}

function createHandnoteEntry(
  npcId: DemoHandnoteNpcId,
  templateIndex: number,
  template: (typeof handnoteTemplates)[DemoHandnoteNpcId][number],
  year: number,
  month: number,
) {
  return {
    id: `${year}-${month}-${npcId}-${templateIndex}`,
    npcId,
    scene: handnoteSceneByNpc[npcId],
    title: template.title,
    text: template.text,
    flavorOnly: template.flavorOnly,
    reward: template.reward,
    claimed: false,
    createdAt: { year, month },
    expiresAt: addMonthsToDate({ year, month }, 6),
  } satisfies DemoHandnoteEntry;
}

function createStarterHandnotes(): DemoHandnoteEntry[] {
  return (
    [
      ["lu-zhenren", 0],
      ["xiao-zhang", 0],
      ["xiaoxian", 0],
    ] as const
  ).map(([npcId, templateIndex]) =>
    createHandnoteEntry(npcId, templateIndex, handnoteTemplates[npcId][templateIndex], 1, 1),
  );
}

function createAnnualHandnotes(year: number, month: number): DemoHandnoteEntry[] {
  const npcOrder: DemoHandnoteNpcId[] = ["lu-zhenren", "xiao-zhang", "xiaoxian"];
  const count = 1 + ((year + month) % 2);
  const offset = (year + month) % npcOrder.length;
  return Array.from({ length: count }, (_, index) => {
    const npcId = npcOrder[(offset + index) % npcOrder.length];
    const templates = handnoteTemplates[npcId];
    const templateIndex = (year + month + index) % templates.length;
    return createHandnoteEntry(npcId, templateIndex, templates[templateIndex], year, month);
  });
}

function syncHandnoteState(state: DemoSaveState): DemoSaveState {
  const current = state.expansion.handnotes;
  if (!current) return state;
  if (current.lastRefreshYear >= state.year) return state;

  const nextEntries = [...current.entries];
  for (let year = current.lastRefreshYear + 1; year <= state.year; year += 1) {
    nextEntries.push(...createAnnualHandnotes(year, state.month));
  }

  return {
    ...state,
    expansion: {
      ...state.expansion,
      handnotes: {
        lastRefreshYear: state.year,
        entries: nextEntries,
      },
    },
  };
}

export const defaultDemoState: DemoSaveState = {
  year: 1,
  month: 1,
  location: "home",
  scene: "plaza",
  activeEvent: null,
  completedEvents: [],
  cultivation: {
    level: "炼气",
    realmProgress: 12,
    root: "万化道躯",
    learnedArts: ["鹿花诀", "金芒诀", "焰心诀"],
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
  equipment: {
    weapon: "青锋剑",
    armor: "旧布法袍",
    accessory: "鹿石令",
  },
  loadout: {
    methodId: "luhua_jue",
    spellSlot: {
      spellId: "jinmang",
      techniqueId: "straight",
      secretIds: ["cuti", "mingmu"],
    },
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
  battleStats: {
    runs: 0,
    victories: 0,
    defeats: 0,
    kills: 0,
    bestSeconds: null,
    lastResult: null,
  },
  eventLog: [
    {
      year: 1,
      month: 1,
      title: "魂落此间",
      text: "你在鹿石宗醒来。鹿真人说你身无灵根，却能化去灵气，并留下了一门看似寻常的鹿花诀。",
    },
  ],
  expansion: {
    profile: {
      created: false,
      name: "异世来客",
      gender: "male",
      outfit: "jinzhuang",
      difficulty: "normal",
      fate: "genius",
      perks: [],
      attributes: {
        aptitude: 17,
        comprehension: 17,
        spirit: 17,
        speed: 17,
        fortune: 17,
      },
    },
    story: {
      completed: [],
      tracked: 1,
    },
    handnotes: {
      lastRefreshYear: 1,
      entries: createStarterHandnotes(),
    },
    garden: {
      fieldLevel: 1,
      formationLevel: 0,
      xiaoxianCare: false,
      plots: Array.from({ length: 20 }, () => ({ herbId: null, years: 0, plantedAtMonth: 0 })),
    },
    herbStock: {
      juqi: 6,
      ningxue: 5,
      huoli: 5,
      shizhi: 4,
      wugen: 5,
      taojiao: 3,
      chiyan: 3,
      chensha: 5,
    },
    pillStock: {
      huayu: 2,
    },
    materialStock: {
      crudeIron: 8,
      mouseBone: 6,
      coldIron: 4,
      silver: 3,
      flameIron: 3,
      spiritCrystal: 2,
      resonanceCrystal: 1,
      ember: 3,
    },
    craftedEquipment: [
      {
        id: "starter-sword",
        name: "青锋剑",
        category: "weapon",
        form: "飞剑",
        rank: "黄",
        stage: 0,
        lingyun: 15,
        effect: "锋锐：穿透 +5%",
      },
    ],
  },
};

const MAX_LOG_ENTRIES = 16;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function normalizeBattleResult(result?: DemoBattleResult): DemoBattleResult {
  return {
    stageId: result?.stageId ?? "unknown",
    victory: result?.victory ?? true,
    kills: clamp(Math.round(result?.kills ?? 0), 0, 999),
    seconds: clamp(Math.round(result?.seconds ?? 0), 0, 999),
    hpPercent: clamp(Math.round(result?.hpPercent ?? 0), 0, 100),
    spiritStones: clamp(Math.round(result?.spiritStones ?? 0), 0, 300),
    damageTaken: clamp(Math.round(result?.damageTaken ?? 0), 0, 9999),
    bossDefeated: result?.bossDefeated ?? false,
  };
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
  return syncHandnoteState({
    ...state,
    year: nextYear,
    month: nextMonth,
  });
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

function recordBattleResult(
  rawState: DemoSaveState,
  rawResult?: DemoBattleResult,
): DemoSaveState {
  const result = normalizeBattleResult(rawResult);
  const currentNode = rawState.activeEvent
    ? demoEventDefinitions[rawState.activeEvent.id].nodes[rawState.activeEvent.nodeIndex]
    : null;
  const currentStats = rawState.battleStats ?? defaultDemoState.battleStats;
  const bestSeconds =
    result.victory && (currentStats.bestSeconds === null || result.seconds < currentStats.bestSeconds)
      ? result.seconds
      : currentStats.bestSeconds;

  const withStats: DemoSaveState = {
    ...rawState,
    resources: {
      ...rawState.resources,
      spiritStones: rawState.resources.spiritStones + result.spiritStones,
    },
    battleStats: {
      runs: currentStats.runs + 1,
      victories: currentStats.victories + (result.victory ? 1 : 0),
      defeats: currentStats.defeats + (result.victory ? 0 : 1),
      kills: currentStats.kills + result.kills,
      bestSeconds,
      lastResult: result,
    },
  };

  const title = result.victory ? "战斗胜利" : "战斗失利";
  const nodeTitle = currentNode ? `「${currentNode.title}」` : "外出战斗";
  const rewardText = result.spiritStones > 0 ? `，掉落灵石${result.spiritStones}` : "";
  return appendLog(
    withStats,
    title,
    `${nodeTitle}结算：击杀${result.kills}，用时${result.seconds}秒，剩余气血${result.hpPercent}%${rewardText}。`,
  );
}

function normalizeLearnedArts(learnedArts: string[]) {
  return Array.from(
    new Set(learnedArts.map((art) => (art === "鹿石吐纳诀" ? "鹿花诀" : art))),
  );
}

function isOneOf<const T extends readonly string[]>(value: unknown, allowed: T): value is T[number] {
  return typeof value === "string" && allowed.includes(value);
}

const genderIds = ["male", "female"] as const;
const outfitIds = ["qingshan", "daopao", "jinzhuang", "xianpao"] as const;
const difficultyIds = ["easy", "normal", "hard", "extreme"] as const;
const fateIds = ["genius", "talented", "average", "mortal"] as const;
const gardenHerbIds = [
  "juqi",
  "ningxue",
  "huoli",
  "shizhi",
  "wugen",
  "taojiao",
  "chiyan",
  "chensha",
] as const;
const equipmentRanks = ["黄", "玄", "地", "天", "仙"] as const;

function normalizeCountRecord(
  value: Record<string, unknown> | undefined,
  defaults: Record<string, number>,
) {
  const next = { ...defaults };
  for (const [key, rawCount] of Object.entries(value ?? {})) {
    if (typeof rawCount === "number" && Number.isFinite(rawCount)) {
      next[key] = clamp(Math.round(rawCount), 0, 9999);
    }
  }
  return next;
}

export function normalizeExpansionState(
  expansion: Partial<DemoExpansionState> | undefined,
): DemoExpansionState {
  const defaults = defaultDemoState.expansion;
  const rawProfile = expansion?.profile as Partial<DemoPlayerProfile> | undefined;
  const rawAttributes = rawProfile?.attributes as Partial<DemoPlayerProfile["attributes"]> | undefined;
  const rawHandnotes = expansion?.handnotes as Partial<DemoHandnoteState> | undefined;
  const rawPlots = Array.isArray(expansion?.garden?.plots) ? expansion.garden.plots : [];
  const rawEquipment = Array.isArray(expansion?.craftedEquipment)
    ? expansion.craftedEquipment
    : defaults.craftedEquipment;

  const completed = Array.from(
    new Set(
      (expansion?.story?.completed ?? [])
        .filter((eventId): eventId is number => Number.isInteger(eventId))
        .map((eventId) => clamp(eventId, 1, 29)),
    ),
  ).sort((left, right) => left - right);
  const trackedValue = expansion?.story?.tracked;
  const tracked =
    trackedValue === null ||
    (typeof trackedValue === "number" && Number.isInteger(trackedValue) && trackedValue >= 1 && trackedValue <= 29)
      ? trackedValue
      : defaults.story.tracked;

  return {
    profile: {
      created: rawProfile?.created === true,
      name:
        typeof rawProfile?.name === "string" && rawProfile.name.trim()
          ? rawProfile.name.trim().slice(0, 6)
          : defaults.profile.name,
      gender: isOneOf(rawProfile?.gender, genderIds) ? rawProfile.gender : defaults.profile.gender,
      outfit: isOneOf(rawProfile?.outfit, outfitIds) ? rawProfile.outfit : defaults.profile.outfit,
      difficulty: isOneOf(rawProfile?.difficulty, difficultyIds)
        ? rawProfile.difficulty
        : defaults.profile.difficulty,
      fate: isOneOf(rawProfile?.fate, fateIds) ? rawProfile.fate : defaults.profile.fate,
      perks: Array.isArray(rawProfile?.perks)
        ? rawProfile.perks.filter((perk): perk is string => typeof perk === "string").slice(0, 30)
        : defaults.profile.perks,
      attributes: {
        aptitude: clamp(Math.round(rawAttributes?.aptitude ?? defaults.profile.attributes.aptitude), 5, 80),
        comprehension: clamp(
          Math.round(rawAttributes?.comprehension ?? defaults.profile.attributes.comprehension),
          5,
          80,
        ),
        spirit: clamp(Math.round(rawAttributes?.spirit ?? defaults.profile.attributes.spirit), 5, 80),
        speed: clamp(Math.round(rawAttributes?.speed ?? defaults.profile.attributes.speed), 5, 80),
        fortune: clamp(Math.round(rawAttributes?.fortune ?? defaults.profile.attributes.fortune), 5, 80),
      },
    },
    story: {
      completed,
      tracked,
    },
    handnotes: normalizeHandnoteState(rawHandnotes, defaults.handnotes),
    garden: {
      fieldLevel: expansion?.garden?.fieldLevel === 2 ? 2 : 1,
      formationLevel: expansion?.garden?.formationLevel === 1 ? 1 : 0,
      xiaoxianCare: expansion?.garden?.xiaoxianCare === true,
      plots: Array.from({ length: 20 }, (_, index) => {
        const plot = rawPlots[index] as Partial<DemoGardenPlot> | undefined;
        return {
          herbId: isOneOf(plot?.herbId, gardenHerbIds) ? plot.herbId : null,
          years: clamp(Number.isFinite(plot?.years) ? Number(plot?.years) : 0, 0, 100000),
          plantedAtMonth: clamp(
            Number.isFinite(plot?.plantedAtMonth) ? Number(plot?.plantedAtMonth) : 0,
            0,
            100000,
          ),
        };
      }),
    },
    herbStock: normalizeCountRecord(
      expansion?.herbStock as Record<string, unknown> | undefined,
      defaults.herbStock,
    ) as Record<DemoGardenHerbId, number>,
    pillStock: normalizeCountRecord(
      expansion?.pillStock as Record<string, unknown> | undefined,
      defaults.pillStock,
    ),
    materialStock: normalizeCountRecord(
      expansion?.materialStock as Record<string, unknown> | undefined,
      defaults.materialStock,
    ),
    craftedEquipment: rawEquipment
      .filter((item): item is DemoCraftedEquipment => Boolean(item && typeof item === "object"))
      .slice(0, 40)
      .map((item, index) => ({
        id: typeof item.id === "string" ? item.id.slice(0, 80) : `equipment-${index + 1}`,
        name: typeof item.name === "string" ? item.name.slice(0, 20) : "无名法器",
        category: item.category === "armor" ? "armor" : "weapon",
        form: typeof item.form === "string" ? item.form.slice(0, 20) : "法器",
        rank: isOneOf(item.rank, equipmentRanks) ? item.rank : "黄",
        stage: clamp(Math.round(item.stage ?? 0), 0, 4) as 0 | 1 | 2 | 3 | 4,
        lingyun: clamp(Math.round(item.lingyun ?? 10), 0, 9999),
        effect: typeof item.effect === "string" ? item.effect.slice(0, 120) : "灵韵未显",
      })),
  };
}

function normalizeLoadout(loadout: Partial<DemoLoadout> | undefined): DemoLoadout {
  const spellSlot = loadout?.spellSlot;
  const firstSecret = Array.isArray(spellSlot?.secretIds) ? spellSlot.secretIds[0] : undefined;
  const secondSecret = Array.isArray(spellSlot?.secretIds) ? spellSlot.secretIds[1] : undefined;

  return {
    methodId: isOneOf(loadout?.methodId, methodIds)
      ? loadout.methodId
      : defaultDemoState.loadout.methodId,
    spellSlot: {
      spellId: isOneOf(spellSlot?.spellId, spellIds)
        ? spellSlot.spellId
        : defaultDemoState.loadout.spellSlot.spellId,
      techniqueId: isOneOf(spellSlot?.techniqueId, techniqueIds)
        ? spellSlot.techniqueId
        : defaultDemoState.loadout.spellSlot.techniqueId,
      secretIds: [
        isOneOf(firstSecret, secretIds) ? firstSecret : defaultDemoState.loadout.spellSlot.secretIds[0],
        isOneOf(secondSecret, secretIds) ? secondSecret : defaultDemoState.loadout.spellSlot.secretIds[1],
      ],
    },
  };
}

function eventNodeLocation(node: DemoEventNode): DemoLocation {
  if (node.mode === "battle") return "battle";
  return "event";
}

function eventScene(eventId: DemoEventId): DemoScene {
  if (eventId === "intro_lushi") return "dormitory";
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
      scene: node.scene ?? eventScene(state.activeEvent.id),
      activeEvent: {
        ...state.activeEvent,
        nodeIndex,
        awaitingScene: node.continueScene ?? null,
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
      scene: firstNode.scene ?? eventScene(eventId),
      activeEvent: {
        id: eventId,
        nodeIndex: 0,
        selectedChoices: {},
        replay,
        awaitingScene: firstNode.continueScene ?? null,
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
    scene:
      activeEvent.id === "intro_lushi"
        ? "plaza"
        : activeEvent.id === "mouse_cave_treasure"
          ? "teleport_array"
          : "plaza",
  };

  if (grantReward && activeEvent.id === "intro_lushi") {
    next = {
      ...next,
      cultivation: {
        ...next.cultivation,
        learnedArts: normalizeLearnedArts([
          ...next.cultivation.learnedArts,
          "楣胯姳璇€",
          "閲戣姃璇€",
          "鐒板績璇€",
        ]),
      },
      flags: {
        ...next.flags,
        openingSeen: true,
        introLushiCompleted: true,
      },
      expansion: {
        ...next.expansion,
        story: {
          ...next.expansion.story,
          completed: Array.from(new Set([...next.expansion.story.completed, 1])).sort(
            (left, right) => left - right,
          ),
          tracked: next.expansion.story.tracked === 1 ? 2 : next.expansion.story.tracked,
        },
      },
    };
  }

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
    next = {
      ...next,
      expansion: {
        ...next.expansion,
        story: {
          ...next.expansion.story,
          completed: Array.from(new Set([...next.expansion.story.completed, 10])).sort(
            (left, right) => left - right,
          ),
          tracked: next.expansion.story.tracked === 10 ? 11 : next.expansion.story.tracked,
        },
      },
    };
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
    next = {
      ...next,
      expansion: {
        ...next.expansion,
        story: {
          ...next.expansion.story,
          completed: Array.from(new Set([...next.expansion.story.completed, 11])).sort(
            (left, right) => left - right,
          ),
          tracked: next.expansion.story.tracked === 11 ? 12 : next.expansion.story.tracked,
        },
      },
    };
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
    return appendLog(rawState, "暂无事件", "当前没有正在进行的事件。可以从事件测试按钮启动一组事件。");
  }

  const definition = demoEventDefinitions[rawState.activeEvent.id];
  const currentNode = definition.nodes[rawState.activeEvent.nodeIndex];

  if (currentNode?.mode === "choice") {
    return appendLog(rawState, "需要选择", "当前事件节点需要先选择一个回应。");
  }

  if (currentNode?.continueScene && rawState.scene !== currentNode.continueScene) {
    return appendLog(
      rawState,
      "需要先前往场景",
      `请先前往${sceneNames[currentNode.continueScene]}，再继续剧情。`,
    );
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
  const expansion = normalizeExpansionState(state.expansion);
  if (state.completedEvents?.includes("intro_lushi") && !expansion.story.completed.includes(1)) {
    expansion.story.completed.push(1);
  }
  if (state.completedEvents?.includes("mouse_cave_treasure") && !expansion.story.completed.includes(10)) {
    expansion.story.completed.push(10);
  }
  if (state.completedEvents?.includes("wish_eater_bridge") && !expansion.story.completed.includes(11)) {
    expansion.story.completed.push(11);
  }
  expansion.story.completed.sort((left, right) => left - right);

  return syncHandnoteState({
    ...defaultDemoState,
    ...state,
    scene: state.scene ?? "plaza",
    activeEvent: state.activeEvent ?? null,
    completedEvents: state.completedEvents ?? [],
    cultivation: {
      ...defaultDemoState.cultivation,
      ...state.cultivation,
      learnedArts: normalizeLearnedArts(
        [
          ...(state.cultivation?.learnedArts ?? defaultDemoState.cultivation.learnedArts),
          "鹿花诀",
          "金芒诀",
          "焰心诀",
        ],
      ),
    },
    resources: {
      ...defaultDemoState.resources,
      ...state.resources,
    },
    inventory: {
      ...defaultDemoState.inventory,
      ...state.inventory,
    },
    equipment: {
      ...defaultDemoState.equipment,
      ...state.equipment,
    },
    loadout: normalizeLoadout(state.loadout),
    battleStats: {
      ...defaultDemoState.battleStats,
      ...state.battleStats,
    },
    flags: {
      ...defaultDemoState.flags,
      ...state.flags,
    },
    relationships: state.relationships ?? defaultDemoState.relationships,
    eventLog: state.eventLog ?? defaultDemoState.eventLog,
    expansion,
  });
}

export function applyExpansionUpdate(
  rawState: DemoSaveState,
  expansion: Partial<DemoExpansionState>,
  elapsedMonths = 0,
  activity?: { title: string; text: string },
): DemoSaveState {
  let next: DemoSaveState = {
    ...normalizeDemoState(rawState),
    expansion: normalizeExpansionState(expansion),
  };

  for (let month = 0; month < clamp(Math.round(elapsedMonths), 0, 1200); month += 1) {
    next = advanceMonth(next);
  }

  if (next.expansion.story.completed.includes(28) && next.cultivation.level !== "筑基") {
    next = {
      ...next,
      cultivation: {
        ...next.cultivation,
        level: "筑基",
        realmProgress: 0,
      },
    };
  }

  return activity ? appendLog(next, activity.title.slice(0, 40), activity.text.slice(0, 280)) : next;
}

function changeScene(state: DemoSaveState, scene: DemoScene): DemoSaveState {
  if (state.activeEvent) {
    const definition = demoEventDefinitions[state.activeEvent.id];
    const currentNode = definition.nodes[state.activeEvent.nodeIndex];
    const expectedScene = state.activeEvent.awaitingScene ?? currentNode?.continueScene ?? null;

    if (expectedScene === scene) {
      const traveledState =
        scene === state.scene
          ? state
          : appendLog(
              {
                ...state,
                scene,
                location: state.location === "battle" ? "battle" : "home",
              },
              `前往${sceneNames[scene]}`,
              `你来到鹿石宗${sceneNames[scene]}。这里布置简约随性，却处处像有人刚刚用过。`,
            );

      const nextIndex = state.activeEvent.nodeIndex + 1;
      if (nextIndex >= definition.nodes.length) {
        return completeEvent(traveledState);
      }

      return setEventNode(
        {
          ...traveledState,
          activeEvent: {
            ...(traveledState.activeEvent ?? state.activeEvent),
            awaitingScene: null,
          } as DemoActiveEvent,
        },
        nextIndex,
      );
    }

    if (expectedScene) {
      return appendLog(
        state,
        "剧情进行中",
        `当前剧情需要先前往${sceneNames[expectedScene]}，再继续推进。`,
      );
    }

    return appendLog(state, "剧情进行中", "请先完成当前剧情节点，再继续推进。");
  }

  if (scene === state.scene) {
    return state;
  }

  if (state.scene !== "plaza" && scene !== "plaza") {
    return appendLog(
      state,
      "需要先返回广场",
      `你现在位于${sceneNames[state.scene]}。前往${sceneNames[scene]}前，必须先返回广场。`,
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

function equipLoadout(state: DemoSaveState, action: DemoAction): DemoSaveState {
  if (state.location === "battle") {
    return appendLog(state, "战斗中不可切换", "当前已经进入战斗，功法和术法配置被锁定。");
  }

  if (action.startsWith("equip_method:")) {
    const methodId = action.replace("equip_method:", "");
    if (!isOneOf(methodId, methodIds)) return state;
    return appendLog(
      {
        ...state,
        loadout: {
          ...state.loadout,
          methodId,
        },
      },
      "装配功法",
      `你将主修功法切换为「${methodNames[methodId]}」。`,
    );
  }

  if (action.startsWith("equip_spell:")) {
    const spellId = action.replace("equip_spell:", "");
    if (!isOneOf(spellId, spellIds)) return state;
    return appendLog(
      {
        ...state,
        loadout: {
          ...state.loadout,
          spellSlot: {
            ...state.loadout.spellSlot,
            spellId,
          },
        },
      },
      "装配术法",
      `你将法术位术法切换为「${spellNames[spellId]}」。`,
    );
  }

  if (action.startsWith("equip_technique:")) {
    const techniqueId = action.replace("equip_technique:", "");
    if (!isOneOf(techniqueId, techniqueIds)) return state;
    return appendLog(
      {
        ...state,
        loadout: {
          ...state.loadout,
          spellSlot: {
            ...state.loadout.spellSlot,
            techniqueId,
          },
        },
      },
      "装配技法",
      `你将法术位技法切换为「${techniqueNames[techniqueId]}」。`,
    );
  }

  if (action.startsWith("equip_secret_1:") || action.startsWith("equip_secret_2:")) {
    const slotIndex = action.startsWith("equip_secret_1:") ? 0 : 1;
    const secretId = action.replace(slotIndex === 0 ? "equip_secret_1:" : "equip_secret_2:", "");
    if (!isOneOf(secretId, secretIds)) return state;
    const nextSecrets: [DemoSecretId, DemoSecretId] = [
      state.loadout.spellSlot.secretIds[0],
      state.loadout.spellSlot.secretIds[1],
    ];
    nextSecrets[slotIndex] = secretId;
    return appendLog(
      {
        ...state,
        loadout: {
          ...state.loadout,
          spellSlot: {
            ...state.loadout.spellSlot,
            secretIds: nextSecrets,
          },
        },
      },
      "装配秘法",
      `你将秘法${slotIndex + 1}切换为「${secretNames[secretId]}」。`,
    );
  }

  return state;
}

export function applyDemoAction(
  rawState: DemoSaveState,
  action: DemoAction,
  context: DemoActionContext = {},
): DemoSaveState {
  const state = normalizeDemoState(rawState);

  const eventAction =
    action === "advance_event" ||
    action === "battle_victory" ||
    action.startsWith("event_choice:") ||
    action.startsWith("start_event:") ||
    action.startsWith("change_scene:");

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

  if (
    action.startsWith("equip_method:") ||
    action.startsWith("equip_spell:") ||
    action.startsWith("equip_technique:") ||
    action.startsWith("equip_secret_1:") ||
    action.startsWith("equip_secret_2:")
  ) {
    return equipLoadout(state, action);
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
      return appendLog(next, "闭关修炼", "你运转鹿花诀，万化道躯微微发热。");
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
        return advanceEvent(recordBattleResult(state, context.battleResult));
      }

      const withBattleResult = recordBattleResult(state, context.battleResult);
      const next = advanceMonth({
        ...withBattleResult,
        scene: "plaza",
        location: "home",
        resources: {
          ...withBattleResult.resources,
          spiritStones: withBattleResult.resources.spiritStones + 90,
          herbs: withBattleResult.resources.herbs + 2,
          ore: withBattleResult.resources.ore + 1,
        },
        cultivation: {
          ...withBattleResult.cultivation,
          learnedArts: Array.from(new Set([...withBattleResult.cultivation.learnedArts, "碎石剑气"])),
        },
      });
      return appendLog(next, "山鼠退散", "你以碎石剑气击退山鼠，带回一袋灵石和一卷残破功法。");
    }
    default:
      return state;
  }
}
