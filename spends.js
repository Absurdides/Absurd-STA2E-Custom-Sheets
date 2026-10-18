/* ==========================================================================
   Star Trek Adventures 2nd Edition - Official Momentum Spends Reference
   Sources: Quickstart Guide v1.1 (2024), Core Rulebook 2E
   ========================================================================== */

window.STA_SPENDS = [
  /* ------------------------------------------------------------------------
     1. COMMON MOMENTUM SPENDS
     ------------------------------------------------------------------------ */
  {
    category: "Common Spends",
    name: "Create Opportunity (buy d20s)",
    cost: "1–3 Momentum",
    type: "Immediate, Repeatable",
    source: "Quickstart v1.1, p. 15",
    text: "Before you roll a task (but after the gamemaster sets its Difficulty), you may buy up to three more d20s for your dice pool. The cost increases for each die purchased: the first d20 costs 1 Momentum, the second costs 2 Momentum, and the third costs 3 Momentum. You can’t roll more than 5d20 on a task attempt."
  },
  {
    category: "Common Spends",
    name: "Create a Trait",
    cost: "2 Momentum",
    type: "Standard",
    source: "Quickstart v1.1, p. 15",
    text: "You can spend 2 Momentum to establish a new trait in the scene or to change, increase or decrease the potency of, or remove a trait currently in play. A trait you create must relate to the task you just passed, and it must be something that would result from your actions."
  },
  {
    category: "Common Spends",
    name: "Keep the Initiative",
    cost: "2 Momentum",
    type: "Immediate",
    source: "Quickstart v1.1, p. 15",
    text: "After taking a turn in an action scene, instead of handing the action to the opposing side, a character may choose to Keep the Initiative. To Keep the Initiative, the character who has just completed their turn may spend 2 Momentum and then hand the action to another character on their own side. Once one side has opted to Keep the Initiative, nobody on that side may do so again until the opposition has taken at least one turn of their own. Both player characters and NPCs may use Keep the Initiative."
  },
  {
    category: "Common Spends",
    name: "Obtain Information",
    cost: "1 Momentum",
    type: "Repeatable",
    source: "Quickstart v1.1, p. 15",
    text: "You can ask the gamemaster a single question about the scene by spending 1 Momentum. The question must be related to the task attempted, and the gamemaster must answer truthfully but doesn’t have to give complete information. If there’s no information your character could determine, the gamemaster may answer “you don’t know,” but they must refund the Momentum spent for that question."
  },
  {
    category: "Common Spends",
    name: "Reduce Time",
    cost: "2 Momentum",
    type: "Standard",
    source: "Quickstart v1.1, p. 15",
    text: "You can spend 2 Momentum to reduce the time it takes to complete the activity represented by the task, typically taking half the normal amount of time. You can’t use this option during an action scene."
  },
  {
    category: "Common Spends",
    name: "Swift Action",
    cost: "2 Momentum",
    type: "Standard",
    source: "Quickstart v1.1, p. 15",
    text: "During your turn in an action scene, you may spend 2 Momentum to take an additional major action. However, any task roll attempted as part of this action increases in Difficulty by 1."
  },
  {
    category: "Common Spends",
    name: "Extra Minor Action",
    cost: "1 Momentum",
    type: "Standard",
    source: "Quickstart v1.1, p. 15",
    text: "During your turn in an action scene, you may spend 1 Momentum to take an additional minor action. Each minor action may only be performed once per turn."
  },

  /* ------------------------------------------------------------------------
     2. COMBAT MOMENTUM SPENDS
     ------------------------------------------------------------------------ */
  {
    category: "Personal Combat",
    name: "Added Severity",
    cost: "2 Momentum",
    type: "Repeatable",
    source: "Quickstart v1.1, p. 25, 27",
    text: "Increase the severity of a successful attack by 1 for every 2 Momentum spent. This is repeatable, but you cannot increase the severity by more than 2."
  },
  {
    category: "Personal Combat",
    name: "Counterattack",
    cost: "2 Momentum",
    type: "Immediate",
    source: "Quickstart v1.1, p. 25",
    text: "If the Attack was an opposed task, and the target won, then they may either move out of Reach (if in melee) or spend 2 Momentum to Counterattack, inflicting an Injury upon you in return."
  },
  {
    category: "Personal Combat",
    name: "Disarm",
    cost: "1–2 Momentum",
    type: "Standard",
    source: "Quickstart v1.1, p. 27",
    text: "Target drops one weapon they are holding to within their Reach. This costs 1 Momentum if the weapon is held in one hand. If the weapon is two-handed, the cost increases to 2 Momentum."
  },
  {
    category: "Personal Combat",
    name: "Recover Stress",
    cost: "2 Momentum",
    type: "Repeatable",
    source: "Quickstart v1.1, p. 20",
    text: "After a successful task, you may spend 2 Momentum to remove 1 Stress (Repeatable) from yourself or one ally who can hear you. A character cannot remove more than 3 Stress in this way on any single task."
  },
  {
    category: "Personal Combat",
    name: "Difficult Terrain / Obstacles",
    cost: "1–3 Momentum",
    type: "Immediate",
    source: "Quickstart v1.1, p. 22",
    text: "When you attempt to move from an area of difficult terrain, or cross an obstacle, you must spend one or more Momentum to do so, depending on how difficult the terrain or obstacle is."
  },

/* ------------------------------------------------------------------------
     3. EXTENDED TASKS
     ------------------------------------------------------------------------ */
  {
    category: "Extended Tasks",
    name: "Additional Progress",
    cost: "2 Momentum",
    type: "Repeatable",
    source: "Core 2E, p. 271",
    text: "During an extended task, add 1 to your Impact for 2 Momentum."
  },
  
/* ------------------------------------------------------------------------
     4. STARSHIP COMBAT
     ------------------------------------------------------------------------ */
  {
    category: "Starship Combat",
    name: "Added Damage",
    cost: "2 Momentum",
    type: "Repeatable",
    source: "Core 2E, p. 307",
    text: "Increase the damage of a successful attack by 1 for every 2 Momentum spent."
  },
  {
    category: "Starship Combat",
    name: "Devastating Attack",
    cost: "2 Momentum",
    type: "Standard",
    source: "Core 2E, p. 307",
    text: "Roll an additional system; that system suffers a hit dealing half the attack's damage, rounding up."
  }
];