/* ==========================================================================
   Star Trek Adventures 2nd Edition - Official Momentum Spends Reference
   Sources: Core Rulebook 2E (2024), Game Toolkit GM Screen & Reference Sheets
   ========================================================================== */

window.STA_SPENDS = [
  /* ------------------------------------------------------------------------
     1. CORE / GENERAL TASKS
     ------------------------------------------------------------------------ */
  {
    category: "Core / General Tasks",
    name: "Alter Trait",
    cost: "2 Momentum",
    type: "Standard",
    source: "Core 2E, p. 251",
    text: "Create a new trait in the scene, remove an existing trait, or alter the Potency (+1 or -1) of an active trait related to the task completed."
  },
  {
    category: "Core / General Tasks",
    name: "Create Opportunity (Bonus d20s)",
    cost: "1–3 Momentum or Threat",
    type: "Immediate, Repeatable",
    source: "Core 2E, p. 248",
    text: "Purchase additional d20s before rolling a task. The 1st die costs 1 Momentum, the 2nd costs 2, and the 3rd costs 3 (total 6 Momentum for +3d20). Maximum dice pool is 5d20."
  },
  {
    category: "Core / General Tasks",
    name: "Extra Assistance",
    cost: "1 Momentum per Assistant",
    type: "Immediate, Repeatable",
    source: "Core 2E, p. 250",
    text: "Allow additional characters to assist your task beyond the first free assistant. Each extra assistant contributes 1d20."
  },
  {
    category: "Core / General Tasks",
    name: "Obtain Information",
    cost: "1 Momentum",
    type: "Repeatable",
    source: "Core 2E, p. 251",
    text: "Ask the Gamemaster one question about the scene, environment, or situation. The GM must answer truthfully based on deduction (Momentum is refunded if unanswerable)."
  },
  {
    category: "Core / General Tasks",
    name: "Reduce Time (Swift Task)",
    cost: "2 Momentum",
    type: "Standard",
    source: "Core 2E, p. 251",
    text: "Halve the amount of time required to complete an activity or extended task. Applicable outside action scenes only."
  },

  /* ------------------------------------------------------------------------
     2. EXTENDED TASKS
     ------------------------------------------------------------------------ */
  {
    category: "Extended Tasks",
    name: "Additional Impact",
    cost: "2, 4, or 6 Momentum",
    type: "Standard, Repeatable",
    source: "Core 2E, p. 254",
    text: "Add +1, +2, or +3 to the task's Impact rating on the Progress Track for every 2 Momentum spent."
  },
  {
    category: "Extended Tasks",
    name: "Scrutinize",
    cost: "1 Momentum",
    type: "Repeatable",
    source: "Core 2E, p. 255",
    text: "Ask the GM one specific question regarding Breakthrough thresholds, Resistance ratings, or hidden complications on the extended task."
  },

  /* ------------------------------------------------------------------------
     3. PERSONAL COMBAT
     ------------------------------------------------------------------------ */
  {
    category: "Personal Combat",
    name: "Added Severity",
    cost: "2 Momentum",
    type: "Repeatable",
    source: "Core 2E, p. 293",
    text: "Increase the Severity of a successful attack by +1 for every 2 Momentum spent (maximum +2 Severity / 4 Momentum total)."
  },
  {
    category: "Personal Combat",
    name: "Avoid Injury",
    cost: "2 Momentum or Threat",
    type: "Immediate",
    source: "Core 2E, p. 294",
    text: "Suffer Stress equal to incoming attack Severity to avoid suffering an Injury. Usable once per scene without medical recovery."
  },
  {
    category: "Personal Combat",
    name: "Counterattack",
    cost: "2 Momentum",
    type: "Immediate",
    source: "Core 2E, p. 292",
    text: "If you win an opposed defense roll against a melee attack, immediately inflict an Injury on the attacker (Stun or Deadly depending on weapon)."
  },
  {
    category: "Personal Combat",
    name: "Direct Ally",
    cost: "1 Momentum",
    type: "Repeatable",
    source: "Game Toolkit / Core 2E, p. 290",
    text: "Issue an order allowing an ally to take an immediate action or assist outside normal sequence."
  },
  {
    category: "Personal Combat",
    name: "Disarm",
    cost: "1 or 2 Momentum",
    type: "Standard",
    source: "Core 2E, p. 293",
    text: "Target drops one weapon they are holding to the ground within Reach. Costs 1 Momentum for a one-handed weapon, or 2 Momentum for a two-handed weapon."
  },
  {
    category: "Personal Combat",
    name: "Extra Major Action",
    cost: "2 Momentum",
    type: "Standard",
    source: "Core 2E, p. 291",
    text: "Take one additional major action during your turn. Any task roll attempted as part of this extra action increases in Difficulty by +1."
  },
  {
    category: "Personal Combat",
    name: "Extra Minor Action",
    cost: "1 Momentum",
    type: "Standard",
    source: "Core 2E, p. 291",
    text: "Take one additional minor action on your turn. Each specific minor action (e.g. Aim, Move, Draw) may only be taken once per turn."
  },
  {
    category: "Personal Combat",
    name: "First Aid (Stress Recovery)",
    cost: "1+ Momentum",
    type: "Repeatable",
    source: "Core 2E, p. 295",
    text: "During a First Aid or Medicine task, clear 1 additional point of Stress from the patient per Momentum spent."
  },
  {
    category: "Personal Combat",
    name: "Keep the Initiative",
    cost: "2 Momentum",
    type: "Immediate",
    source: "Core 2E, p. 290",
    text: "At the end of your turn, pass the next turn directly to an ally instead of an enemy. Your side cannot chain this spend consecutively."
  },
  {
    category: "Personal Combat",
    name: "Traverse Terrain",
    cost: "1+ Momentum or Threat",
    type: "Immediate",
    source: "Core 2E, p. 289",
    text: "Move through difficult terrain, hazardous zones, or physical obstacles without requiring a separate movement roll."
  },

  /* ------------------------------------------------------------------------
     4. SOCIAL CONFLICT
     ------------------------------------------------------------------------ */
  {
    category: "Social Conflict",
    name: "Alter Trait (Social)",
    cost: "2 Momentum",
    type: "Standard",
    source: "Core 2E, p. 278",
    text: "Impose a new social trait, alter an existing attitude/mood trait, or remove a social complication (e.g., Intimidated, Receptive, Hesitant)."
  },
  {
    category: "Social Conflict",
    name: "Counter-Argument",
    cost: "2 Momentum",
    type: "Immediate",
    source: "Core 2E, p. 279",
    text: "When you win an opposed social task against an opponent's argument, impose an immediate social complication or counter-leverage trait on them."
  },
  {
    category: "Social Conflict",
    name: "Read Motive / Leverage",
    cost: "1 Momentum",
    type: "Repeatable",
    source: "Core 2E, p. 279",
    text: "Reveal one of an opponent's Values, Directives, or hidden agendas through a successful Insight roll."
  },

  /* ------------------------------------------------------------------------
     5. STARSHIP CONFLICT
     ------------------------------------------------------------------------ */
  {
    category: "Starship Conflict",
    name: "Devastating Attack (Added Severity)",
    cost: "2 Momentum",
    type: "Repeatable",
    source: "Core 2E, p. 320",
    text: "Increase the Severity of a successful starship attack by +1 for every 2 Momentum spent (maximum +2 Severity)."
  },
  {
    category: "Starship Conflict",
    name: "Keep the Initiative (Starship)",
    cost: "2 Momentum",
    type: "Immediate",
    source: "Core 2E, p. 318",
    text: "Pass tactical activation directly to another bridge station or allied vessel instead of handing the turn to hostile forces."
  },
  {
    category: "Starship Conflict",
    name: "Reroute Power",
    cost: "1 Momentum per Power",
    type: "Repeatable",
    source: "Core 2E, p. 319",
    text: "Channel auxiliary reserves to gain +1 temporary Power beyond standard reactor limits for the current round."
  },
  {
    category: "Starship Conflict",
    name: "Salvo",
    cost: "1+ Momentum",
    type: "Standard",
    source: "Core 2E, p. 321",
    text: "Re-fire auxiliary energy arrays or launch an additional torpedo payload from loaded tubes at secondary targets in the same zone."
  },
  {
    category: "Starship Conflict",
    name: "Subsystem Targeting",
    cost: "2 Momentum",
    type: "Standard",
    source: "Core 2E, p. 320",
    text: "Bypass random hit location rolls to direct damage straight to a chosen ship System (Engines, Weapons, Structure, Sensors, Comms, or Computers)."
  }
];