# STA 2E Console - Roadmap

Planning file. Attach only when planning. How shipped features work is documented in `PROJECT_NOTES.md`.
Format: Planned / In Progress / Done, one line each. Done entries carry a date.

## In Progress
- (none)

## Task Roller / Dice Panel (agreed plan)
One shared LCARS popup panel, screen-only, no-print, Play Mode only, not saved. Three modes. Rolls use `crypto.getRandomValues`. Shuffle animation (`?? ?? ??`) about 0.8 s, skipped if reduced motion is set. Keyboard/touch: tap-again deselects, Esc and tap on empty sheet close. Narrow screens dock the panel to the bottom like `#log-panel`. Position measured with `getBoundingClientRect` (Fit zoom safe).

**Rules policy:** every rule shown must match the Core Rulebook (primary source, highest priority), then the Quickstart v1.1 / Page 6 text (TN = Attribute + Department; 2d20 base, max 5d20; success <= TN; critical = 2 successes; roll of 20 = complication; extra dice cost 1/2/3 Momentum; each success over Difficulty = 1 Momentum; Difficulty 0-5). Check Difficulty level names in the Quickstart before showing any; otherwise show the number only.

**Phase 1 - Page 1 panel (Attribute + Department) - BUILT**
- Tap an Attribute and a Department (label/score; the +/- box stays editable). Tap a selected one again to deselect. One picked: panel says "Select a Department" / "Select an Attribute". None picked: panel closes. Clear button kept (resets selection, Focus, dice, result, closes).
- Panel floats over the right column (Species Ability + Values), top-aligned; Attributes, Departments and Focuses stay visible. TN includes the +/- modifiers, with a breakdown line ("Control 10 + Command 2 + mods 0"). Blank scores count as 0.
- Display: "SUCCESS RANGE / 12 OR LESS / Critical: 1-<Dept> (Focus on) or 1 only (Focus off)".
- +Focus toggle: red off / green on, with ON/OFF text. When on, a small picker lists the non-empty Page 1 Focuses (auto-picks if only one).
- Dice stepper: red -, green +, shows #D20, range 1-5, default 2.
- Difficulty stepper: red -, green +, range 0-5, default 1, shows "Difficulty N".
- Momentum dice buying: reads checked `combat_momentum_1..6`. Buttons +1 die (1), +2 dice (3 total), +3 dice (6 total); total dice capped at 5; disabled if the pool is too small. Deducted (pips unchecked) when Roll is pressed. Refund = re-check the pips. Does not use Undo.
- Result chips per die: success, critical (counts 2), miss, complication (20). Summary line "PASS: 3 successes vs Difficulty 2, 1 Momentum" or "FAIL: ...". Optional manual "Add N to pool" button (cap 6), never automatic.
- Est. 300 lines JS + 70 CSS. Update README.md + readme.js, PROJECT_NOTES.md, bump `?v=`.

**Phase 2 - Ship mode (Page 5) - BUILT**
- Tap a System and a Department to get the ship TN. Default 1d20, no Focus toggle. Momentum buying and Difficulty as Phase 1. Ship assist is rolled separately at the table (group rolls the ship die as its own roll). Combined Character + Ship roll and any Gamemaster interface: parked.

**Phase 3 - Free dice tray + Technical Log - BUILT**
- `Dice` button in the Tools row (Play Mode only, green): same panel without stats; TN (default 10), 1-5d20, Difficulty (default 1, can be none).
- Technical Log (current behaviour): after a roll, an optional `Log` button opens a required Task line plus a Focus dropdown (default None, not logged) and a No stardate box. The Tan detail row has two lines: `Task (Focus: X)` then `[TN 14, Diff 3] 4D20, 3 Successes (Pass)`. Label is `Stardate N` from the Stardate bar, or `Stardate ?` when ticked or while the bar is still Jan 1, 2376. Rows go into the permanent Tech section at the right-hand end of Page 4's Log Sections (more Tech sections follow when full). Never logs automatically. Quick Note stays separate.

**Not doing:** d20 table rolls on the sheet (Random System Hit, Shaken, Breaches; toolkit cards stay reference only). Challenge dice (not in 2E, confirmed).

## Planned (Ranked by Priority and Complexity 1-10)

### High Priority
- (High 2) 1-Click Discord Stat-Card: A button in Tools to copy a clean, condensed Discord markdown bio (Rank, Name, Species, Stats, Focuses, Directives).
- (High 3) Single-Die Re-Roll in Task Roller (Non-Determination): Free single-die re-rolls for Aim minor action or Accurate weapon quality.

### Mid Priority
- (Mid 1) Shield Restore Button (Page 5, Play Mode): Single click to recharge Shields to MAX SHIELDS after combat or when regenerating shields.
- (Mid 2) Rest Buttons for Stress Track (Play Mode): Breather (-4) and Break (-8) buttons beside the Stress Track that automatically uncheck 4 or 8 boxes according to 2E rest rules.
- (Mid 3) Division Accent Theme: A toggle to tint primary LCARS header bars to match character department: Command Red, Operations Gold, or Sciences Blue (screen only, neutral on print).
- (Mid 3) Slot Quick-Filter / Search: For large rosters (up to 50 slots), a small filter box next to the Crew dropdown to instantly jump to any character by name.
- (Mid 3) Starship Power Allocation Bar (Page 5): A Power pip track (tied to Engines rating) to track available vs. routed Power / Reserve Power round-by-round.
- (Mid 4) Fatigue Auto-Alert (Pages 1 & 2): When Stress track reaches max, automatically trigger the 2E "Fatigued" state and prompt to pick the impaired Attribute (marks it red; flags +1 Difficulty for other tasks).
- (Mid 4) Verify accuracy of spends.js against official sources. Integrate with Modal/Quick Reference.
- (Mid 5) Momentum Spends Modal / Quick Reference (Tools Row, browsing `spends.js`; loaded but not yet used by console.js): search box, category chips, tag badges from `type` (split on commas), Esc to close; reuse `.row-modal-*` and the `showDiscord` modal pattern. Open question: Play Mode only or always available. Update README.md + readme.js when built.
- (Mid 6) Discuss possible unnecessary redundancy of having page 6 AND the toolkit. Could toolkit be expanded upon instead? Modals would make more sense for page 6 information to be situated where its needed most.
- (Mid 6) Standalone Campaign Roster & Bridge Duty Visualizer (`roster.html`):
  - Concept: A dedicated, standalone LCARS page (like `toolkit.html`) providing a two-page printable party dossier and an interactive bridge station manager, decoupled from the main character sheet.
  - Tab 1 - Campaign Roster (Print-Optimized 2-Page Dossier):
    - Capacity: Displays 12–16 characters cleanly across exactly 2 Letter pages (~6–8 characters per page, ~1.1 inches per card).
    - Compact 3-line card format:
      - Line 1: `[Rank] [Character Name]` // `[Position/Role]` // `[Species]` // `Player: [Player Name]` // `Rep: [X]`
      - Line 2: All 12 Stats (`CTL·FIT·DAR·INS·PRE·REA` | color-coded `CMD·CON·ENG·SEC·MED·SCI`).
      - Line 3: Public Focuses (auto-truncated at first `:` or `-` for clean display; hover/tap reveals full custom description).
      - Drops long Values and combat health tracks to ensure zero page overflow.
    - Data Ingestion via URL Hash (`#`):
      - `[Send to Roster]` button on `index.html` prompts for Player Name and opens `roster.html#add=<base64_data>`.
      - `roster.html` reads the hash on load, prompts to overwrite or add if character exists, saves to `localStorage` (`sta2e_campaign_roster`), and clears the hash.
    - Export / Import JSON buttons to share or back up the campaign roster file.
  - Tab 2 - Interactive Bridge Station Visualizer:
    - Overhead blueprint view of Deck 1 / Main Bridge (e.g., Luna-class *USS Titan* layout).
    - Responsive station pins positioned via percentage coordinates (`left: X%`, `top: Y%`) over stations (Command, Helm, Ops, Tactical, Science, Engineering, etc.).
    - Touch-friendly tap-to-assign / drag-and-drop: Tap a station to seat a crew member from the roster list.
    - Configurable bridge layouts: Dropdown to swap coordinate/image presets for different ship classes.
    - Duty assignments persisted in browser `localStorage`.

### Low Priority
- (Low 2) Canonical Focuses Suggestion Picker: helper dropdown above Page 1 Focuses box.
- (Low 2) Challenged Value Milestone Logger: When tapping a Value to Challenge it in Play Mode, optionally append a stardate log to Page 4 recording the milestone and granting the Determination point.
- (Low 2) Print page chooser for Print (PDF) (already exists in most print dialogues).
- (Low 2) Running totals for Attributes/Departments in Edit Mode (target values user-defined; needs clarification).
- (Low 3) Bridge Station Crew Assigner (Page 5): Quick dropdowns at each station (Helm, Tactical, Ops, Comms) pulling from your Page 2 Roster to show who is manning which station during starship combat.
- (Low 3) Click-to-View Weapon Qualities (Page 2): In Play Mode, clicking any quality in an Attack row (e.g. Intense, Piercing) pops up only that specific quality’s rule rather than the entire 10-item glossary.
- (Low 3) Privacy Mode: A toggle to mask character backstory, secret traits, and notes when sharing your tablet screen with other players at the table.
- (Low 3) Round & Initiative Tracker (Tools Row Play Mode): A minimal round counter (Round 1, 2, 3...) with a 1-tap Keep the Initiative (-2 Mom) button.
- (Low 4) LCARS Synthesized Audio (Tools Row): Optional authentic LCARS terminal chirps synthesized via native Web Audio API (0 external sound files, 0 KB asset footprint, toggleable).
  - Optional: Soundbar page/menu - possibly a role-playing page which has a sound bar of common sounds (communicator, tricorder, transporter, phaser, wilhelm scream, ship phaser strip, ship photon/quantum torpedo, borg 'threat', warp sound). Would have to keep sound files located in the front-end, sounds folder perhaps?
- (Low 5) Scene Notes overlay (Traits, Advantages, Complications).
- (Low 5) Table Tracker overlay (Play Mode): group Momentum, Threat, round counter; floats over any page.

### Ultra-Low Priority
- (Ultra-Low 5) Project Architecture Fork (Dedicated Print Viewer vs. Fluid Play PADD Console):
  - Concept: Permanently decouple the print engine from the interactive play engine to eliminate ongoing layout conflicts and delicate font/pagination workarounds.
  - Implementation strategy (Fork & Prune, minimal token burn):
    1. Dedicated Print Dossier (Fork A):
       - Strip out all pickers, JS catalogs (`talents.js`, etc.), localStorage slots/autosave, rules popovers, and the Task Roller.
       - Retain only the strict 8.0 × 10.5 in Letter layout with a single "Import JSON" button to preview and print blank or filled sheets cleanly.
    2. Fluid PADD Tactical Console (Fork B):
       - Retain all current features: 50 crew / 8 ship slots, catalogs, pickers, live tracking, and Task Roller.
       - Strip `@media print`, `printFullDossier()`, `scopedWrap()`, and fixed-inch Letter boundaries.
       - Convert canvas to fluid, device-responsive layouts (`width: 100%`) for seamless phone, tablet, and PC browser scaling without scroll clipping or zoom hacks.
    3. Interoperability: Both forks share the identical `sta2e-unified-v3` JSON schema for cross-compatibility.

## Done
- 2026-10: Determination spends in Task Roller: Perfect Opportunity locks 1 die to a critical (★) pre-roll; Moment of Inspiration allows selecting specific dice chips (blue highlight) to re-roll post-roll; unchecks Determination pips; logs Determination spent and optional Directive to Page 4 TECH section.
- 2026-10: Storage Details dialog: clicking storage meter opens memory breakdown modal with safety-backed Remove Unlinked Data button and automatic legacy autosave purge.
- 2026-10: Image scaling: box fit (portrait 320x220, ship 1434x192), WebP with JPEG fallback, small-file bypass removed, old images shrunk when their slot is opened or imported (token-guarded), storage warning text fixed.
- 2026-10: Permanent Tech section on Page 4; Technical Log entries are two lines (task + Focus, then TN/Diff/result); Dice tray defaults to TN 10.
- 2026-10: Task Roller Phase 3 (free Dice tray, optional Technical Log button with `Stardate ?` option and continuation sections).
- 2026-10: Task Roller Phase 2 (Page 5 ship System + Department mode).
- 2026-10: Task Roller Phase 1 (Page 1 Attribute + Department panel, Focus, dice, Difficulty, Momentum buying, result chips).
- 2026-10: Storage meter, 90% new-slot refusal, slot caps (50 crew / 8 ships), Export Crew ship choice, Restore All Add to My Slots, portrait limit 400 px.
- 2026-10: Pages 3/4 bottom bar: single Header Bar and Detail Row buttons with mini previews (formatting options left as they are by decision).
