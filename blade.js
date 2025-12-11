// Blade Path Tasks
// All tasks unlocked by "Choose the Blade" or requiring Blade path tasks

const bladeTasks = [
  { 
    name: "Scavenge Broken Arms", 
    baseTime: 6, 
    proficiency: 0, 
    isActive: false, 
    completed: false, 
    repeatable: true, 
    yields: { armaments: 3, supplies: 2 }, 
    description: "Pick through battle trash for blades and buckles to arm your rebels.", 
    unlocked: false, 
    unlockTask: "Choose the Blade", 
    resourceMaxIncrease: { armaments: 4, supplies: 4 }, 
    notorietyCost: 6, 
    autoRepeat: false 
  }
  // Note: "Rally Plague Survivors" and other Blade path tasks may need to be added
  // when they are implemented in the game
];
