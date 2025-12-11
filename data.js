let resources = {
  // Shared resources
  mana: { value: 0, max: 100, unlocked: true },
  knowledge: { value: 0, max: 50, unlocked: false },
  evil: { value: 0, max: 100, unlocked: true },
  control: { value: 0, max: 10, unlocked: false },     // Limits minion count
  
  // Scholar path (10+ resources)
  evidence: { value: 0, max: 40, unlocked: false },    // Scholar path proof
  insight: { value: 0, max: 25, unlocked: false },     // Scholar depth
  scrolls: { value: 0, max: 20, unlocked: false },     // Scholar passive proof
  grimoires: { value: 0, max: 10, unlocked: false },   // Scholar rare tomes
  theorems: { value: 0, max: 15, unlocked: false },    // Scholar mathematical proofs
  archives: { value: 0, max: 12, unlocked: false },     // Scholar library access
  citations: { value: 0, max: 30, unlocked: false },    // Scholar references
  annotations: { value: 0, max: 25, unlocked: false }, // Scholar notes
  fragments: { value: 0, max: 20, unlocked: false },   // Scholar document pieces
  codices: { value: 0, max: 8, unlocked: false },       // Scholar bound volumes
  axioms: { value: 0, max: 5, unlocked: false },       // Scholar fundamental truths
  
  // Blade path (10+ resources)
  fury: { value: 0, max: 60, unlocked: false },        // Blade path rage/forces
  armaments: { value: 0, max: 25, unlocked: false },   // Blade equipment/discipline
  morale: { value: 0, max: 30, unlocked: false },      // Blade cohesion
  supplies: { value: 0, max: 30, unlocked: false },    // Blade logistics
  discipline: { value: 0, max: 25, unlocked: false },  // Blade training
  recruits: { value: 0, max: 40, unlocked: false },     // Blade soldiers
  banners: { value: 0, max: 15, unlocked: false },      // Blade symbols
  tactics: { value: 0, max: 20, unlocked: false },      // Blade strategies
  wounds: { value: 0, max: 30, unlocked: false },      // Blade battle scars
  honor: { value: 0, max: 20, unlocked: false },        // Blade reputation
  steel: { value: 0, max: 35, unlocked: false },        // Blade weapons
  
  // Mask path (10+ resources)
  influence: { value: 0, max: 40, unlocked: false },   // Mask path cover/favor
  secrets: { value: 0, max: 25, unlocked: false },     // Mask gathered intel
  rumors: { value: 0, max: 25, unlocked: false },      // Mask soft power
  covers: { value: 0, max: 15, unlocked: false },      // Mask layered identities
  favors: { value: 0, max: 30, unlocked: false },      // Mask owed debts
  networks: { value: 0, max: 20, unlocked: false },    // Mask connections
  masks: { value: 0, max: 12, unlocked: false },       // Mask physical disguises
  whispers: { value: 0, max: 35, unlocked: false },    // Mask information
  blackmail: { value: 0, max: 18, unlocked: false },   // Mask leverage
  strings: { value: 0, max: 25, unlocked: false },     // Mask puppet control
  shadows: { value: 0, max: 20, unlocked: false },      // Mask hidden presence
  
  // Seal path (10+ resources)
  voidFavor: { value: 0, max: 25, unlocked: false },   // Seal path eldritch backing
  entropy: { value: 0, max: 20, unlocked: false },     // Seal path void charge
  sigils: { value: 0, max: 20, unlocked: false },      // Seal glyph charges
  voidShards: { value: 0, max: 12, unlocked: false },   // Seal condensed void
  silence: { value: 0, max: 25, unlocked: false },      // Seal quiet power
  bindings: { value: 0, max: 15, unlocked: false },     // Seal oaths
  rifts: { value: 0, max: 10, unlocked: false },        // Seal portals
  voidWhispers: { value: 0, max: 18, unlocked: false }, // Seal void messages
  brands: { value: 0, max: 12, unlocked: false },       // Seal marks
  emptiness: { value: 0, max: 30, unlocked: false },    // Seal void essence
  closedEye: { value: 0, max: 8, unlocked: false }       // Seal master favor
};

// Passive and cross-resource interactions (consumed by engine for per-tick effects or caps)
let resourceInteractions = [
  // Scholar interactions
  { source: "scrolls", type: "passiveGain", target: "knowledge", amountPerUnit: 0.01 },
  { source: "grimoires", type: "maxIncrease", target: "knowledge", amountPerUnit: 10 },
  { source: "theorems", type: "passiveGain", target: "evidence", amountPerUnit: 0.02 },
  { source: "archives", type: "maxIncrease", target: "scrolls", amountPerUnit: 2 },
  { source: "citations", type: "passiveGain", target: "theorems", amountPerUnit: 0.01 },
  { source: "annotations", type: "maxIncrease", target: "insight", amountPerUnit: 1 },
  { source: "fragments", type: "passiveGain", target: "evidence", amountPerUnit: 0.015 },
  { source: "codices", type: "maxIncrease", target: "grimoires", amountPerUnit: 1 },
  { source: "axioms", type: "maxIncrease", target: "knowledge", amountPerUnit: 15 },
  
  // Blade interactions
  { source: "rumors", type: "passiveGain", target: "influence", amountPerUnit: 0.05 },
  { source: "morale", type: "passiveGain", target: "fury", amountPerUnit: 0.02 },
  { source: "supplies", type: "maxIncrease", target: "armaments", amountPerUnit: 1 },
  { source: "discipline", type: "maxIncrease", target: "morale", amountPerUnit: 2 },
  { source: "recruits", type: "passiveGain", target: "fury", amountPerUnit: 0.01 },
  { source: "banners", type: "maxIncrease", target: "morale", amountPerUnit: 3 },
  { source: "tactics", type: "passiveGain", target: "discipline", amountPerUnit: 0.01 },
  { source: "wounds", type: "passiveGain", target: "fury", amountPerUnit: 0.015 },
  { source: "honor", type: "maxIncrease", target: "recruits", amountPerUnit: 2 },
  { source: "steel", type: "maxIncrease", target: "armaments", amountPerUnit: 1.5 },
  
  // Mask interactions
  { source: "covers", type: "maxIncrease", target: "influence", amountPerUnit: 5 },
  { source: "favors", type: "passiveGain", target: "influence", amountPerUnit: 0.02 },
  { source: "networks", type: "maxIncrease", target: "secrets", amountPerUnit: 2 },
  { source: "masks", type: "maxIncrease", target: "covers", amountPerUnit: 1 },
  { source: "whispers", type: "passiveGain", target: "secrets", amountPerUnit: 0.02 },
  { source: "blackmail", type: "passiveGain", target: "favors", amountPerUnit: 0.015 },
  { source: "strings", type: "maxIncrease", target: "influence", amountPerUnit: 3 },
  { source: "shadows", type: "passiveGain", target: "secrets", amountPerUnit: 0.01 },
  
  // Seal interactions
  { source: "sigils", type: "passiveGain", target: "voidFavor", amountPerUnit: 0.05 },
  { source: "voidShards", type: "maxIncrease", target: "entropy", amountPerUnit: 2 },
  { source: "silence", type: "passiveGain", target: "entropy", amountPerUnit: 0.02 },
  { source: "bindings", type: "maxIncrease", target: "voidFavor", amountPerUnit: 2 },
  { source: "rifts", type: "passiveGain", target: "voidShards", amountPerUnit: 0.01 },
  { source: "voidWhispers", type: "passiveGain", target: "voidFavor", amountPerUnit: 0.015 },
  { source: "brands", type: "maxIncrease", target: "sigils", amountPerUnit: 1 },
  { source: "emptiness", type: "maxIncrease", target: "entropy", amountPerUnit: 1.5 },
  { source: "closedEye", type: "maxIncrease", target: "voidFavor", amountPerUnit: 5 }
];

let upgrades = {
  // Shared
  manaEfficiency: { level: 0, maxLevel: 3, cost: { mana: 20, knowledge: 10 }, description: "Reduce mana costs by 10% per level.", unlocked: false, unlockTask: "Access Black Archives" },
  knowledgeBoost: { level: 0, maxLevel: 3, cost: { knowledge: 15 }, description: "Increase Knowledge yield by 1 per level.", unlocked: false, unlockTask: "Access Black Archives" },
  swiftRituals: { level: 0, maxLevel: 3, cost: { mana: 25, knowledge: 15 }, description: "Reduce task times by 10% per level.", unlocked: false, unlockTask: "Decipher Soul Anchors" },
  crowFamiliar: { level: 0, maxLevel: 3, cost: { mana: 15 }, description: "Reduce task times by 5% per level.", unlocked: false, unlockTask: "Reanimate Crow" },
  nihilisticResolve: { level: 0, maxLevel: 3, cost: { mana: 10, knowledge: 10 }, description: "Reduce all resource costs by 5% per level.", unlocked: false, unlockTask: "Reject Divinity" },
  // Scholar path
  scholarProofBinder: { level: 0, maxLevel: 3, cost: { knowledge: 10, evidence: 5 }, description: "Increase evidence max by 5 per level.", unlocked: false, unlockTask: "Historian's Case" },
  scholarDeepNotation: { level: 0, maxLevel: 3, cost: { knowledge: 12, insight: 4 }, description: "Increase insight max by 5 per level.", unlocked: false, unlockTask: "Map Necrotic Equations" },
  scholarScrollScribes: { level: 0, maxLevel: 3, cost: { scrolls: 4, knowledge: 6 }, description: "Each level adds +0.01 knowledge passive per scroll.", unlocked: false, unlockTask: "Annotate Canticle Margins" },
  scholarGrimoireShelves: { level: 0, maxLevel: 3, cost: { grimoires: 2, knowledge: 8 }, description: "Increase knowledge max by 10 per grimoire and +5 per level.", unlocked: false, unlockTask: "Restore Grimoire Bindings" },
  scholarAxiomFocus: { level: 0, maxLevel: 2, cost: { evidence: 8, insight: 8 }, description: "Increase evidence and insight max by 5 per level and boost Axiom crafting speed.", unlocked: false, unlockTask: "Model Death Equation" },
  // Blade path
  bladeWarDiscipline: { level: 0, maxLevel: 3, cost: { fury: 8, armaments: 4 }, description: "Increase fury max by 5 per level.", unlocked: false, unlockTask: "Rally Plague Survivors" },
  bladeForgeMasters: { level: 0, maxLevel: 3, cost: { mana: 10, armaments: 6 }, description: "Increase armaments max by 5 per level.", unlocked: false, unlockTask: "Forge Boneblade" },
  bladeLogistics: { level: 0, maxLevel: 3, cost: { supplies: 6, knowledge: 4 }, description: "Increase supplies max by 5 per level and reduce fury decay.", unlocked: false, unlockTask: "Raid Supply Caravan" },
  bladeWarSongs: { level: 0, maxLevel: 2, cost: { morale: 6, fury: 6 }, description: "Each level adds +0.01 fury passive per morale.", unlocked: false, unlockTask: "Inspire War Songs" },
  bladeCommand: { level: 0, maxLevel: 2, cost: { fury: 10, armaments: 8 }, description: "Multiply fury yields by 1.1 per level when morale is above 50%.", unlocked: false, unlockTask: "Raise Plague Legion" },
  // Mask path
  maskShadowNetwork: { level: 0, maxLevel: 3, cost: { influence: 8, secrets: 4 }, description: "Increase influence max by 5 per level.", unlocked: false, unlockTask: "Enter City Temple" },
  maskDeepCover: { level: 0, maxLevel: 3, cost: { influence: 6, secrets: 6 }, description: "Increase secrets max by 5 per level.", unlocked: false, unlockTask: "Fracture Congregation" },
  maskRumorMill: { level: 0, maxLevel: 3, cost: { rumors: 6, influence: 4 }, description: "Each level adds +0.05 influence passive per rumor.", unlocked: false, unlockTask: "Trade Choir Secrets" },
  maskCoverFabricators: { level: 0, maxLevel: 2, cost: { covers: 4, influence: 6 }, description: "Increase cover max by 3 per level and reduce notoriety gains by 5%.", unlocked: false, unlockTask: "Forge False Papers" },
  maskBlackmailLedger: { level: 0, maxLevel: 2, cost: { secrets: 8, influence: 8 }, description: "Gain +1 secrets yield on all Mask repeatables per level.", unlocked: false, unlockTask: "Bribe City Clerk" },
  // Seal path
  sealVoidGraft: { level: 0, maxLevel: 3, cost: { voidFavor: 6, entropy: 4 }, description: "Increase voidFavor max by 4 per level.", unlocked: false, unlockTask: "Walk the Closed Road" },
  sealEntropyWell: { level: 0, maxLevel: 3, cost: { entropy: 6, knowledge: 6 }, description: "Increase entropy max by 4 per level.", unlocked: false, unlockTask: "Oath to the Closed Eye" },
  sealSigilTattoo: { level: 0, maxLevel: 3, cost: { sigils: 4, voidFavor: 4 }, description: "Each level adds +0.05 voidFavor passive per sigil.", unlocked: false, unlockTask: "Brand with Wax" },
  sealShardConduit: { level: 0, maxLevel: 2, cost: { voidShards: 3, entropy: 6 }, description: "Increase entropy and voidShards max by 3 per level.", unlocked: false, unlockTask: "Harvest Void Shards" },
  sealClosedEquation: { level: 0, maxLevel: 2, cost: { entropy: 8, insight: 6 }, description: "Boost all seal task yields by 10% per level when entropy > 50%.", unlocked: false, unlockTask: "Trace Silent Leylines" }
};

let tasks = [
  // Prologue: Before the Blight
  { 
    name: "Tend Orchard with Father", 
    baseTime: 4, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Festival Night"], 
    description: "Walk between sunlit rows, learning patience as your father coaxes life from soil while the gods watch idly from their distant seats.", 
    safe: true,

  },
  { 
    name: "Festival Night", 
    baseTime: 5, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Survive Plague","Study Funeral Rites","Salvage Altar Shards","Quiet Grief Vigils"], 
    requires: ["Tend Orchard with Father"], 
    description: "Lanterns bloom over the square, your mother's laugh mingles with flutes, and you offer a prayer at the godstone that will go tragically unanswered.", 
    safe: true,

  },
  { 
    name: "Salvage Altar Shards", 
    baseTime: 5, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    repeatable: true, 
    yields: { mana: 4, evidence: 1,},
    description: "Collect broken godstone chips after the festival to feed your first rites.", 
    unlocked: false, 
    safe: true,
    autoRepeat: false
  },
  { 
    name: "Quiet Grief Vigils", 
    baseTime: 6, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    repeatable: true, 
    yields: { mana: 3, knowledge: 1 },  // ADDED: knowledge yield
    notorietyCost: -6,
    flavorMessage: "The quiet vigils have cooled rumors, but your patience grows thin.", 
    maxCompletions: 3, 
    completionsThisLoop: 0, 
    description: "Keep silent watch over the pyres, letting rumor cool while you gather strength.", 
    unlocked: false, 
    safe: true,
    autoRepeat: false
  },
  { 
    name: "Study Funeral Rites", 
    baseTime: 6, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    repeatable: true, 
    yields: { knowledge: 2, mana: 1 }, 
    description: "Observe and record the funeral rites of your village, gaining insight into death customs.", 
    unlocked: false, 
    safe: true,
    autoRepeat: false
  },
  // Stage 1: Tragic Origins
  { 
    name: "Survive Plague", 
    baseTime: 6, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    requires: ["Festival Night"], 
    unlocks: ["Reject Divinity"], 
    cost: { mana: 5 }, 
    description: "Cling to life as purple blight boils lungs and blackens eyes; the godstone stays mute while your parents choke beside you and the orchard withers into ash.", 
    resourceMaxIncrease: { mana: 25 }, 
    notorietyCost: 5,
    yields: { knowledge: 3 },
    flavorMessage: "You survived where others perished. The gods' silence echoes louder than any prayer."
  },
  { 
    name: "Reject Divinity", 
    baseTime: 5, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Steal Grimoire"], 
    requires: ["Survive Plague"], 
    cost: { knowledge: 3 },  // Reduced from 5 to 3
    description: "Standing over fresh graves, you spit at the heavens and choose forbidden rites over the gods who ignored your prayers.", 
    resourceMaxIncrease: { knowledge: 10 }, 
    notorietyCost: 10,
    flavorMessage: "The rejection is complete. You have chosen a path the gods fear to acknowledge."
  },
  { 
    name: "Steal Grimoire", 
    baseTime: 8, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Reanimate Crow"], 
    requires: ["Reject Divinity"], 
    cost: { mana: 5, knowledge: 5 },  // Reduced from 5 knowledge to 5
    description: "Creep through the abandoned death church chapel, pry a bone-bound grimoire from a priest's stiff fingers, and feel its pages hum with secrets the gods hid from you.", 
    notorietyCost: 10,
    flavorMessage: "The grimoire's secrets burn in your mind. Knowledge forbidden by the gods now flows through your fingers."
  },
  { 
    name: "Reanimate Crow", 
    baseTime: 10, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Flee Village"], 
    requires: ["Steal Grimoire"], 
    cost: { mana: 10 }, 
    description: "Trace glyphs in ash and raise a crow from the pyre—proof that death now bends closer to your whispers than any god.", 
    notorietyCost: 15,
    flavorMessage: "The crow rises, its empty eyes seeing what the gods refuse to acknowledge. Death answers your call."
  },
  { 
    name: "Flee Village", 
    baseTime: 12, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Vow Vengeance"], 
    requires: ["Reanimate Crow"], 
    cost: { mana: 15 }, 
    description: "Slip past torch-bearing elders as they burn plague-ridden streets to cleanse the blight the gods allowed; you flee with ash in your lungs and a stolen bird on your shoulder.", 
    notorietyCost: 10,
    flavorMessage: "You escape into the night, leaving behind a village that chose fire over understanding. The road ahead is dark."
  },
  { 
    name: "Vow Vengeance", 
    baseTime: 15, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Track Malakar"], 
    requires: ["Flee Village"], 
    cost: { mana: 20 }, 
    description: "Under a dead moon you carve an oath into your palm: master death, unseat the negligent gods, and make them feel every unanswered prayer etched into your scars.", 
    notorietyCost: 10,
    flavorMessage: "The oath is carved, the path is set. Vengeance will be yours, and the gods will know fear."
  },
  // The Seed of Ash: Great Choice - EXCLUSIVE CHOICES
  { 
    name: "Meet Ashen Traveler", 
    baseTime: 6, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Choose the Book", "Choose the Blade", "Choose the Mask", "Choose the Seal"], 
    requires: ["Vow Vengeance"], 
    description: "At the communal pyre a gaunt traveler confronts your grief, asking what you will grow from the ash of Oakhaven.", 
    notorietyCost: 5,
    flavorMessage: "The traveler's question hangs in the air. Your choice will shape everything that follows."
  },
  { 
    name: "Choose the Book", 
    baseTime: 5, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Scholar of Silence"], 
    requires: ["Meet Ashen Traveler"], 
    description: "Accept the cold Canticle of Dust and Bone, vowing to understand why gods fear death more than mortals do.", 
    yields: { evidence: 3, knowledge: 2 },
    resourceMaxIncrease: { evidence: 20 }, 
    choiceGroup: "SeedChoice", 
    choiceKey: "Book", 
    safe: true,
    exclusive: true,
    flavorMessage: "The Canticle's cold logic fills your mind. Knowledge will be your weapon, truth your shield."
  },
  { 
    name: "Choose the Blade", 
    baseTime: 5, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Rally Plague Survivors"], 
    requires: ["Meet Ashen Traveler"], 
    description: "Grip the saint-cutting blade that drinks light, swearing to gather the angry and forgotten into a fist.", 
    yields: { fury: 5, knowledge: 1 },
    resourceMaxIncrease: { fury: 25 }, 
    notorietyCost: 8, 
    choiceGroup: "SeedChoice", 
    choiceKey: "Blade",
    exclusive: true,
    flavorMessage: "The blade hums with righteous anger. You will gather the broken and forge them into an army."
  },
 
  { 
    name: "Choose the Mask", 
    baseTime: 5, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Assume White Mask"], 
    requires: ["Meet Ashen Traveler"], 
    description: "Take the smooth white mask and promise to infiltrate temples and cities, rotting faith from within.", 
    yields: { influence: 4, knowledge: 1 },
    resourceMaxIncrease: { influence: 20 }, 
    notorietyCost: 2, 
    choiceGroup: "SeedChoice", 
    choiceKey: "Mask", 
    safe: true,
    exclusive: true,
    flavorMessage: "The mask fits perfectly. Behind it, you will become whoever you need to be. Faith will crumble from within."
  },
  { 
    name: "Choose the Seal", 
    baseTime: 5, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Seek Sealed Master"], 
    requires: ["Meet Ashen Traveler"], 
    description: "Accept the wax seal of the closed eye, swearing a vow to knowledge alone as you follow a hidden master of hatred.", 
    yields: { voidFavor: 3, knowledge: 1 },
    resourceMaxIncrease: { voidFavor: 15 }, 
    notorietyCost: 6, 
    choiceGroup: "SeedChoice", 
    choiceKey: "Seal",
    exclusive: true,
    flavorMessage: "The seal burns into your palm. The void answers, and a hidden master awaits your apprenticeship."
  },
  { 
    name: "Axiom of Unmaking", 
    baseTime: 12, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Claim Divine Relic", "Offer Willing Sacrifice"], 
    requires: ["Meet Ashen Traveler"], 
    cost: { mana: 12, knowledge: 12, evidence: 10 }, 
    description: "Synthesize fragments, equations, or dark mentors into a principle that could sever gods from worship forever.", 
    notorietyCost: 18 
  },
  { 
    name: "Claim Divine Relic", 
    baseTime: 9, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Audience with Hidden Master"], 
    requires: ["Seek Sealed Master"], 
    cost: { voidFavor: 3, knowledge: 3 }, 
    yields: { voidFavor: 4 }, 
    description: "Travel liminal paths where prayers fall silent, proving your resolve in solitude.", 
    notorietyCost: 8 
  },
  { 
    name: "Trace Silent Leylines", 
    baseTime: 8, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    repeatable: true, 
    yields: { voidFavor: 2, entropy: 2, evidence: 1, knowledge: 1 },  // ADDED: knowledge yield
    description: "Chart hidden leylines that the gods refuse to sanctify, widening your unseen routes.", 
    unlocked: false, 
    unlockTask: "Walk the Closed Road", 
    notorietyCost: 7, 
    autoRepeat: false 
  },
  { 
    name: "Brand with Wax", 
    baseTime: 8, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Audience with Hidden Master"], 
    requires: ["Walk the Closed Road"], 
    cost: { voidFavor: 4, entropy: 3 }, 
    yields: { voidFavor: 3 }, 
    description: "Press the closed eye into your skin, widening your capacity to host void favor.", 
    resourceMaxIncrease: { voidFavor: 8, entropy: 6 }, 
    notorietyCost: 9 
  },
  { 
    name: "Harvest Void Shards", 
    baseTime: 9, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Audience with Hidden Master"], 
    requires: ["Brand with Wax"], 
    cost: { entropy: 6, voidFavor: 4 }, 
    yields: { voidShards: 2, sigils: 2 }, 
    description: "Reach into rifts to pull condensed void, risking burns for greater capacity.", 
    resourceMaxIncrease: { voidShards: 4, sigils: 4 }, 
    notorietyCost: 11 
  },
  { 
    name: "Audience with Hidden Master", 
    baseTime: 10, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Oath to the Closed Eye"], 
    requires: ["Walk the Closed Road"], 
    cost: { voidFavor: 5, knowledge: 5 }, 
    yields: { voidFavor: 5 }, 
    description: "Stand before the closed-eye master and offer your hatred as tuition for forbidden instruction.", 
    notorietyCost: 10 
  },
  { 
    name: "Oath to the Closed Eye", 
    baseTime: 10, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Axiom of Unmaking"], 
    requires: ["Audience with Hidden Master"], 
    cost: { voidFavor: 8, knowledge: 6 }, 
    yields: { evidence: 2 }, 
    description: "Bind yourself to knowledge alone, forsaking all other paths as the master brands your vow.", 
    notorietyCost: 12 
  },

  
  
  { 
    name: "Debate Archivist", 
    baseTime: 7, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    repeatable: true, 
    yields: { evidence: 3, influence: 1, knowledge: 1 },  // ADDED: knowledge yield
    description: "Corner tired archivists into late-night debates, extracting admissions of unanswered prayers.", 
    unlocked: false, 
    unlockTask: "Calavan Library", 
    safe: true, 
    autoRepeat: false 
  },
  
  { 
    name: "Claim Battlefield Fragment", 
    baseTime: 8, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Axiom of Unmaking"], 
    requires: ["Mercenary Company", "Whisper with Ghosts"], 
    cost: { mana: 10, knowledge: 6 }, 
    yields: { evidence: 5 }, 
    description: "Prise the God-Butchering fragment from rust and bone, feeling it hum with arguments that could sever faith.", 
    notorietyCost: 12 
  },


  { 
    name: "Build Void Compass", 
    baseTime: 11, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Axiom of Unmaking"], 
    requires: ["Seek Dead World"], 
    cost: { mana: 14, knowledge: 10 }, 
    yields: { evidence: 2 }, 
    description: "Forge a metaphysical compass to tear a passage toward the Dead World, risking attention from stranger voids.", 
    notorietyCost: 13, 
    choiceGroup: "DeadWorldRoute", 
    choiceKey: "Compass", 
    choiceParentGroup: "EquationSplit", 
    choiceParentKey: "SeekDeadWorld" 
  },

  // Minion creation tasks - Available to all paths
  {
    name: "Unlock Control",
    baseTime: 8,
    proficiency: 0,
    isActive: false,
    completed: false,
    requires: ["Reanimate Crow"],
    unlocks: ["Raise Skeleton Warrior", "Raise Zombie Horde", "Create Wraith"],
    cost: { mana: 15, knowledge: 5 },
    description: "Learn to command the undead, unlocking your capacity to control minions.",
    resourceMaxIncrease: { control: 10 },
    notorietyCost: 8,
    flavorMessage: "The first threads of control weave through your mind. You can command more than just a crow."
  },
  {
    name: "Raise Skeleton Warrior",
    baseTime: 10,
    proficiency: 0,
    isActive: false,
    completed: false,
    repeatable: true,
    requires: ["Unlock Control"],
    unlockTask: "Unlock Control",
    cost: { mana: 20, control: 2 },
    description: "Raise a basic skeleton warrior to serve you. Power scales with your mastery.",
    yields: { },
    notorietyCost: 5,
    maxCompletions: 5,
    completionsThisLoop: 0,
    autoRepeat: false,
    createsMinion: { name: "Skeleton Warrior", power: 5, controlCost: 2, automates: [] }
  },
  {
    name: "Raise Zombie Horde",
    baseTime: 12,
    proficiency: 0,
    isActive: false,
    completed: false,
    repeatable: true,
    requires: ["Unlock Control"],
    unlockTask: "Unlock Control",
    cost: { mana: 15, control: 1 },
    description: "Raise multiple weak zombies. Quantity over quality. Power scales with your mastery.",
    yields: { },
    notorietyCost: 4,
    maxCompletions: 10,
    completionsThisLoop: 0,
    autoRepeat: false,
    createsMinion: { name: "Zombie", power: 2, controlCost: 1, automates: [] }
  },
  {
    name: "Create Wraith",
    baseTime: 15,
    proficiency: 0,
    isActive: false,
    completed: false,
    repeatable: true,
    requires: ["Unlock Control"],
    unlockTask: "Unlock Control",
    cost: { mana: 30, knowledge: 10, control: 5 },
    description: "Bind a powerful wraith to your service. Power scales with your mastery.",
    yields: { },
    notorietyCost: 8,
    maxCompletions: 3,
    completionsThisLoop: 0,
    autoRepeat: false,
    createsMinion: { name: "Wraith", power: 15, controlCost: 5, automates: ["Salvage Altar Shards"] }
  }
];