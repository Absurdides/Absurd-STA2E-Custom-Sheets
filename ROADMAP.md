# STA 2E Console - Roadmap

Planning file. Attach only when planning. How shipped features work is documented in `PROJECT_NOTES.md`.
Format: Planned / In Progress / Done, one line each. Done entries carry a date.

## In Progress
- (none)

## Planned (Ranked by Priority and Complexity 1-10)

### High Priority
- (High 2) 1-Click Discord Stat-Card: A button in Tools to copy a clean, condensed Discord markdown bio (Rank, Name, Species, Stats, Focuses, Directives).

### Mid Priority
- (Mid 3) Division Accent Theme: A toggle to tint primary LCARS header bars to match character department: Command Red, Operations Gold, or Sciences Blue (screen only, neutral on print).
- (Mid 3) Starship Power Allocation Bar (Page 5): A Power pip track (tied to Engines rating) to track available vs. routed Power / Reserve Power round-by-round.
- (Mid 4) Fatigue Auto-Alert (Pages 1 & 2): When Stress track reaches max, automatically trigger the 2E "Fatigued" state and prompt to pick the impaired Attribute (marks it red; flags +1 Difficulty for other tasks).
- (Mid 5) Momentum Spends Modal / Quick Reference (Tools Row, browsing `spends.js`; loaded but not yet used by console.js): search box, category chips, tag badges from `type` (split on commas), Esc to close; reuse `.row-modal-*` and the `showDiscord` modal pattern. Open question: Play Mode only or always available. Update README.md + readme.js when built.
- (Mid 6) Discuss possible unnecessary redundancy of having page 6 AND the toolkit. Could toolkit be expanded upon instead? Modals would make more sense for page 6 information to be situated where its needed most.
- (Mid 3) Roster & Bridge print views: print-friendly blank and filled layouts for `roster.html` (roster cards across 2 Letter pages; bridge map plus station list).
- (Mid 2) Roster Focus trimming option: toggle to show full Focus text (currently cut at first `:`, ` - ` or `(`).

### Low Priority
- (Low 2) Canonical Focuses Suggestion Picker: helper dropdown above Page 1 Focuses box.
- (Low 2) Challenged Value Milestone Logger: When tapping a Value to Challenge it in Play Mode, optionally append a stardate log to Page 4 recording the milestone and granting the Determination point.
- (Low 2) Running totals for Attributes/Departments in Edit Mode (target values user-defined; needs clarification).
- (Low 3) Bridge Station Crew Assigner (Page 5): Quick dropdowns at each station (Helm, Tactical, Ops, Comms) pulling from your Page 2 Roster to show who is manning which station during starship combat.
- (Low 3) Click-to-View Weapon Qualities (Page 2): In Play Mode, clicking any quality in an Attack row (e.g. Intense, Piercing) pops up only that specific quality’s rule rather than the entire 10-item glossary.
- (Low 3) Privacy Mode: A toggle to mask character backstory, secret traits, and notes when sharing your tablet screen with other players at the table.
- (Low 3) Round & Initiative Tracker (Tools Row Play Mode): A minimal round counter (Round 1, 2, 3...) with a 1-tap Keep the Initiative (-2 Mom) button.
- (Low 4) LCARS Synthesized Audio (Tools Row): Optional authentic LCARS terminal chirps synthesized via native Web Audio API (0 external sound files, 0 KB asset footprint, toggleable).
  - Optional: Soundbar page/menu - possibly a role-playing page which has a sound bar of common sounds (communicator, tricorder, transporter, phaser, wilhelm scream, ship phaser strip, ship photon/quantum torpedo, borg 'threat', warp sound). Would have to keep sound files located in the front-end, sounds folder perhaps?
- (Low 5) Scene Notes overlay (Traits, Advantages, Complications).
- (Low 5) Table Tracker overlay (Play Mode): group Momentum, Threat, round counter; floats over any page.

- (Mid 4) Bridge modules stage 2: Import Bridge / Export Bridge as a self-contained pack (name, embedded shrunk image, stations) with images in IndexedDB, new tabs start with no stations, Delete Bridge for user-made tabs (button already present), replace-or-add on name match. Stage 3: print handling for imported images (greyscale).
- (Low 5) Fluid Play Page (phone): a `play.html` live view of the active character (stats, Stress, Determination, Momentum, Task Roller) reading the same slots, no print layout. Candidate only; see Architecture Fork below.

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
- (Ultra-Low 2) NOT DOING: "Send to Roster" button on the sheet: `roster.html` already has From This Browser and Import Character, and a portrait-bearing character is too large for a URL hash.
- (Ultra-Low 3) NOT DOING: Single-Die Re-Roll in Task Roller (Non-Determination): Free single-die re-rolls for Aim minor action or Accurate weapon quality.
- (Ultra-Low 1) NOT DOING: Shield Restore Button (Page 5, Play Mode): Single click to recharge Shields to MAX SHIELDS after combat or when regenerating shields.
- (Ultra-Low 2) NOT DOING: Rest Buttons for Stress Track (Play Mode): Breather (-4) and Break (-8) buttons beside the Stress Track that automatically uncheck 4 or 8 boxes according to 2E rest rules.
- (Ultra-Low) NOT DOING: d20 table rolls on the sheet (Random System Hit, Shaken, Breaches; toolkit cards stay reference only). Challenge dice (not in 2E, confirmed).

## Done
- 2026-10: Bridge modules stage 1: bridge tabs from `bridge/layouts.js` (how-to comment inside), line art moved to `bridge/main-bridge.svg`, per-bridge seating, active bridge shown on roster cards, Copy Default Entry.
- 2026-10: Roster & Bridge polish: full-width roster cards (station pill + bubble, coloured stat labels, single pre-filled Edit form), colour / line-art bridge map toggle with images in `bridge/`.
- 2026-10: Edit Layout station handling: per-station delete (red × on each row) and Reset Layout choice to keep or remove added stations.
- 2026-10: Campaign Roster & Bridge Duty page (`roster.html`): roster cards with Player filter chips and NPC entries, Edit Layout (drag pins, add / rename / delete stations), import from Export Crew / Backup All / this browser, 14 numbered bridge stations over an inline SVG with assign / custom name / clear, roster export-import, Roster button in the Crew row.
- 2026-10: Header Metadata & Crew Quick-Filter: Moved autosave telemetry indicator to the Tan banner; replaced SVG barcode with a slate metadata block housing auto-formatted FILE ID (`YYYY-[NAME]`) and PLAYER field (`bio_player`, no-print); added 65px instant filter input in Crew menu row filtering by character or player name.
- 2026-10: Determination spends in Task Roller: Perfect Opportunity locks 1 die to a critical (★) pre-roll; Moment of Inspiration allows selecting specific dice chips (blue highlight) to re-roll post-roll; unchecks Determination pips; logs Determination spent and optional Directive to Page 4 TECH section.
- 2026-10: Storage Details dialog: clicking storage meter opens memory breakdown modal with safety-backed Remove Unlinked Data button and automatic legacy autosave purge.
- 2026-10: Image scaling: box fit (portrait 320x220, ship 1434x192), WebP with JPEG fallback, small-file bypass removed, old images shrunk when their slot is opened or imported (token-guarded), storage warning text fixed.
- 2026-10: Permanent Tech section on Page 4; Technical Log entries are two lines (task + Focus, then TN/Diff/result); Dice tray defaults to TN 10.
- 2026-10: Task Roller Phase 3 (free Dice tray, optional Technical Log button with `Stardate ?` option and continuation sections).
- 2026-10: Task Roller Phase 2 (Page 5 ship System + Department mode).
- 2026-10: Task Roller Phase 1 (Page 1 Attribute + Department panel, Focus, dice, Difficulty, Momentum buying, result chips).
- 2026-10: Storage meter, 90% new-slot refusal, slot caps (50 crew / 8 ships), Export Crew ship choice, Restore All Add to My Slots, portrait limit 400 px.
- 2026-10: Pages 3/4 bottom bar: single Header Bar and Detail Row buttons with mini previews (formatting options left as they are by decision).
