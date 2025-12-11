// Seal Path Tasks
// All tasks unlocked by "Choose the Seal" or requiring Seal path tasks

const sealTasks = [
  { 
    name: "Seek Sealed Master", 
    baseTime: 8, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Walk the Closed Road"], 
    requires: ["Choose the Seal"], 
    cost: { knowledge: 4 }, 
    yields: { voidFavor: 4 }, 
    description: "Follow the wax sigil through backroads and shuttered chapels toward an unseen master.", 
    notorietyCost: 7 
  },
  { 
    name: "Meditate on Closed Eye", 
    baseTime: 7, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    repeatable: true, 
    yields: { voidFavor: 3, entropy: 2, knowledge: 1 },
    description: "Sit before the sealed sigil, letting silence steep until void answers.", 
    unlocked: false, 
    unlockTask: "Seek Sealed Master", 
    notorietyCost: 6, 
    safe: true, 
    autoRepeat: false 
  },
  { 
    name: "Walk the Closed Road", 
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
    yields: { voidFavor: 2, entropy: 2, evidence: 1, knowledge: 1 },
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
  }
];
