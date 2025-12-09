let resources = {
  mana: { value: 0, max: 100, unlocked: true },
  knowledge: { value: 0, max: 50, unlocked: false },
  notoriety: { value: 0, max: 100, unlocked: true }
};
let upgrades = {
  manaEfficiency: { 
    level: 0, maxLevel: 3, cost: { mana: 20, knowledge: 10 }, 
    description: "Reduce Mana costs by 10% per level.", 
    unlocked: false, unlockTask: "Access Black Archives" 
  },
  knowledgeBoost: { 
    level: 0, maxLevel: 3, cost: { knowledge: 15 }, 
    description: "Increase Knowledge yield by 1 per level.", 
    unlocked: false, unlockTask: "Access Black Archives" 
  },
  swiftRituals: { 
    level: 0, maxLevel: 3, cost: { mana: 25, knowledge: 15 }, 
    description: "Reduce task times by 10% per level.", 
    unlocked: false, unlockTask: "Decipher Soul Anchors" 
  },
  crowFamiliar: { 
    level: 0, maxLevel: 3, cost: { mana: 15 }, 
    description: "Reduce task times by 5% per level.", 
    unlocked: false, unlockTask: "Reanimate Crow" 
  },
  nihilisticResolve: { 
    level: 0, maxLevel: 3, cost: { mana: 10, knowledge: 10 }, 
    description: "Reduce all resource costs by 5% per level.", 
    unlocked: false, unlockTask: "Reject Divinity" 
  }
};
let tasks = [
  // Repeatable Tasks
  { 
    name: "Siphon Mana", 
    baseTime: 4, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    repeatable: true, 
    yields: { mana: 5 }, 
    description: "Draw mana from the ethereal void.", 
    unlocked: true, 
    safe: true,
    autoRepeat: false
  },
  { 
    name: "Seek Knowledge", 
    baseTime: 4, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    repeatable: true, 
    yields: { knowledge: 3 }, 
    description: "Study occult lore.", 
    unlocked: false, 
    unlockTask: "Reject Divinity", 
    safe: true,
    autoRepeat: false
  },
  { 
    name: "Meditate in Solitude", 
    baseTime: 5, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    repeatable: true, 
    yields: { mana: 3 }, 
    notorietyCost: -10, 
    maxCompletions: 3, 
    completionsThisLoop: 0, 
    description: "Meditate to clear your infamy.", 
    unlocked: true, 
    safe: true,
    autoRepeat: false
  },
  { 
    name: "Study Ancient Texts", 
    baseTime: 5, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    repeatable: true, 
    yields: { knowledge: 2 }, 
    notorietyCost: -10, 
    maxCompletions: 3, 
    completionsThisLoop: 0, 
    description: "Study texts to reduce suspicion.", 
    unlocked: false, 
    unlockTask: "Reject Divinity", 
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
    unlocks: ["Reject Divinity"], 
    cost: { mana: 5 }, 
    description: "Endure the plague that claims your family.", 
    resourceMaxIncrease: { mana: 25 }, 
    notorietyCost: 5 
  },
  { 
    name: "Reject Divinity", 
    baseTime: 5, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Steal Grimoire"], 
    requires: ["Survive Plague"], 
    cost: { knowledge: 3 }, 
    description: "Denounce gods, embracing death's power.", 
    resourceMaxIncrease: { knowledge: 10 }, 
    notorietyCost: 10 
  },
  { 
    name: "Steal Grimoire", 
    baseTime: 8, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Reanimate Crow"], 
    requires: ["Reject Divinity"], 
    cost: { mana: 5, knowledge: 5 }, 
    description: "Steal a grimoire to learn necromancy.", 
    notorietyCost: 10 
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
    description: "Reanimate a crow, your first triumph.", 
    notorietyCost: 15 
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
    description: "Escape as elders burn your home.", 
    notorietyCost: 10 
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
    description: "Swear to master death for revenge.", 
    notorietyCost: 10 
  },
  // Stage 2: Gathering Knowledge (Scholarly Path)
  { 
    name: "Track Malakar", 
    baseTime: 6, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Face Undead Trials"], 
    requires: ["Vow Vengeance"], 
    cost: { mana: 5, knowledge: 3 }, 
    description: "Locate Malakar in the Ashen Catacombs.", 
    safe: true 
  },
  { 
    name: "Face Undead Trials", 
    baseTime: 8, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Study Soul-Binding", "Learn Corpse Preservation"], 
    requires: ["Track Malakar"], 
    cost: { mana: 10 }, 
    description: "Survive undead trials to earn Malakar's trust.", 
    notorietyCost: 10 
  },
  { 
    name: "Study Soul-Binding", 
    baseTime: 7, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Poison Malakar"], 
    requires: ["Face Undead Trials"], 
    cost: { knowledge: 5 }, 
    description: "Learn advanced soul-binding techniques.", 
    notorietyCost: 15 
  },
  { 
    name: "Learn Corpse Preservation", 
    baseTime: 7, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Poison Malakar"], 
    requires: ["Face Undead Trials"], 
    cost: { knowledge: 5 }, 
    description: "Master preserving corpses for rituals.", 
    notorietyCost: 15 
  },
  { 
    name: "Poison Malakar", 
    baseTime: 10, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Steal Codex of the Veil"], 
    requires: ["Study Soul-Binding", "Learn Corpse Preservation"], 
    cost: { mana: 15, knowledge: 5 }, 
    description: "Betray and poison Malakar for his secrets.", 
    notorietyCost: 15 
  },
  { 
    name: "Steal Codex of the Veil", 
    baseTime: 8, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Decipher Soul Anchors", "Learn Mana Leeching"], 
    requires: ["Poison Malakar"], 
    cost: { mana: 10, knowledge: 5 }, 
    description: "Seize Malakar's Codex of lichdom rituals.", 
    notorietyCost: 10 
  },
  { 
    name: "Decipher Soul Anchors", 
    baseTime: 9, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Infiltrate Libraries"], 
    requires: ["Steal Codex of the Veil"], 
    cost: { knowledge: 7 }, 
    description: "Decode soul anchor rituals in the Codex.", 
    notorietyCost: 10 
  },
  { 
    name: "Learn Mana Leeching", 
    baseTime: 9, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Infiltrate Libraries"], 
    requires: ["Steal Codex of the Veil"], 
    cost: { mana: 15, knowledge: 5 }, 
    description: "Master mana leeching from the Codex.", 
    notorietyCost: 10 
  },
  { 
    name: "Infiltrate Libraries", 
    baseTime: 10, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Corrupt Historian"], 
    requires: ["Decipher Soul Anchors", "Learn Mana Leeching"], 
    cost: { mana: 10, knowledge: 5 }, 
    description: "Copy ley line texts as a disguised scholar.", 
    safe: true 
  },
  { 
    name: "Corrupt Historian", 
    baseTime: 12, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    unlocks: ["Access Black Archives"], 
    requires: ["Infiltrate Libraries"], 
    cost: { mana: 15 }, 
    description: "Bribe a historian for Black Archives access.", 
    safe: true 
  },
  { 
    name: "Access Black Archives", 
    baseTime: 12, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    requires: ["Corrupt Historian"], 
    cost: { knowledge: 10 }, 
    description: "Study heretical texts in the Black Archives.", 
    resourceMaxIncrease: { knowledge: 25 }, 
    safe: true 
  }
];

