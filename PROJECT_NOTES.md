# STA 2E Unified Character Console - Project Notes

## Mission
A Star Trek Adventures 2nd Edition character sheet web page with three uses:
1. Print as a blank character sheet.
2. Print as a customizable, fillable character form.
3. Use interactively as live character tracking during play.
Changes must not break any of the three (screen layout, print layout, save/load).

Paste or attach this at the start of a new chat, together with the current `index.html`, `style.css` and `console.js`.

## Who / how to work with me
- User is on long-term disability with limited usage. Keep replies SHORT, no pleasantries, minimal explanation.
- Edit the existing files (`index.html`, `style.css`, `console.js`) with targeted edits (str_replace / small scripts). Do NOT rewrite whole files or re-read the whole file; search for the section you need.
- After each change: check JS syntax (node), then present the file (present_files).
- Claude cannot render the page. User tests in a browser and sends screenshots. Never claim layout was visually verified.
- Batch changes. Ask at most one question when truly ambiguous.
- Copyright: copy rulebook / fan-site rules text into files or replies where possible. Otherwise, names and structure only.
- Runs locally from a folder on Windows (file://) or online via GitHub Pages. Browsers block fetch of .json, so data lists are `.js` files loaded with <script src>.

- Docs rule: when a feature's behaviour changes, update `README.md` AND `readme.js` (identical text) in the same change.

## Files (all in one folder)
- `index.html` - markup only (6 pages, split top/bottom menus). Structured strictly into Blocks 1–8 (`<!-- Block 1 START -->` through `<!-- Block 8 END -->`). Loads scripts at bottom: `species_abilities.js`, `talents.js`, `equipment.js`, `spends.js`, `readme.js`, `console.js`.
- `style.css` - all CSS structured into 11 marked logical sections (Page 1 master, Page 2 scoped `#page-2`, shell, Pages 3/4, Page 5 `#page-5`, Page 6 `#page-6`, popovers, screen-only utilities/dark Play Mode (10b), consolidated print isolation last).
- `console.js` - all app JS, wrapped in `initConsole()` with readyState fallback.
- `species_abilities.js` - `window.STA_SPECIES_ABILITIES = [{species, source, name, text}]` (109 entries; fully sourced rules text, alphabetized).
- `talents.js` - `window.STA_TALENTS = [{talent, source, category, text}]` (245 entries; 170 personal talents + 75 starship talents, alphabetized by section).
- `equipment.js` - `window.STA_EQUIPMENT = [{name, source, type, severity, standard_issue, opportunity_cost, qualities}]` (156 entries; 131 personal gear/weapons + 25 starship weapons, alphabetized by section).
- `spends.js` - `window.STA_SPENDS = [{category, name, cost, type, source, text}]` (22 official 2E Momentum spends across 5 categories, alphabetized).
- `README.md` - user manual (GitHub display). `readme.js` - identical text as `window.STA_README = "..."` (JSON string) for the in-app User Manual overlay (fetch of .md is blocked on file://).
- `add_ability_text.py` - user-run PDF text extractor utility.
- `trekstar.png` - Starfleet insignia used by the headers.
- `icon-ent.png` - Browser tab favicon and Ship View button icon.

## HTML & Off-Page Menu Structure
- One form: `#unified-master-console-form`. Pages are `.sheet-page`; Pages 3 and 4 also `.doc-page` with `data-doc="p3"|"p4"`.
- Top Utility Bar (`.external-top-bar.no-print`): Sits above the sheet. Five rows (Session, Tools, Crew, Ship, Pages), labels right-aligned in a 56px column + grey divider.
  - Session (+ autosave dot): `Mode: Edit 🔓 / Play 🔒`, `Reset Mission`, `Reset Ship`; right-aligned `Clear Form` (red), `Print (PDF)` (navy).
  - Tools: `PADD ⛶`, `Fit ↔`, `Theme: Dark/Light` (only affects Play Mode), `Quick Note` (Play Mode only); right-aligned fixed group `Undo` (slate), `Backup All` (orange), `Restore All` (slate), divider, `User Manual` (bright yellow `.btn-help`, black text; opens the manual overlay). Right group never shifts when Quick Note appears.
  - Crew / Ship (identical structure): `.lcars-select` dropdown + `+ New`, `Copy`, `Rename`, `Delete` (`.slot-btn`, 66px). Right-aligned `Export Crew` / `Import Crew` (Crew row; bundles active ship) and `Export Ship` / `Import Ship` (Ship row).
  - Pages: Page 1-6 tabs (`data-page`; Page 5 = `Page 5: Ship`, id `btn-ship-view`; Page 6 = `Page 6: Reference`, id `btn-ref-view`).
  - Colour rule: orange = save/export, slate = load/import/secondary, red = destructive, navy = neutral/tabs, tan = active tab / Quick Note, bright yellow = User Manual only.
- Page 5 - Starship Registry: Utopia Planitia technical readout in 8.0 x 10.5 in portrait.
  - Header: Click-to-upload ship orthographic graphic void (`#ship-ortho-img`, 96px). Generic LCARS flavor banner (`Starship Specification // Active Service Record`). Editable ship File ID (`#ship-metadata-file-id`, default `NCC-80106-[PHOBOS_DEFAULT]`), which sets the export filename.
  - Vitals: 3 rows (Name 2/5, Registry 2/5, Service Date 1/5; Mission Profile 1/2, Service Record 1/2; Traits 1/2, Refits 1/2).
  - Systems & Departments: Connected sweeping split-header (dark blue from pillar across Systems; light blue across Departments).
    - Systems (2/3 width, 3×2 grid): 3 division-coded columns (Blue: Comms/Sensors; Gold: Engines/Computers; Red: Structure/Weapons). 22×22px white score boxes, centered `BREACH` label, 15×15px breach checkboxes.
    - Departments (1/3 width, 2×3 grid): Command, Conn, Engineering, Security, Medicine, Science. Cell borders align with Systems top and bottom.
  - Middle Tactical Band (2fr/1fr matching Systems/Departments above):
    - Left (2fr): Shields Track with 40 checkboxes grouped in 5s (4 groups of 5 × 2 rows) spanning the column; Power [Engines] and Max Shields in a 50/50 subgrid with right-aligned labels and vertically aligned score lines.
    - Right (1fr): 2×2 Vitals panel containing Resistance, Scale, Crew Support, Small Craft.
  - Lower Grid:
    - Left (1fr): Starship Attacks (5 rows, Type, Qual, Sev with Page 2 boxed score styling).
    - Right (1fr): Shuttlebay // Support Craft Complement (top) and Special Rules // System Capabilities (bottom) stacked vertically.
    - Full-width below: Starship Talents (full-width lined `.fit-box` writein lines filling remaining vertical space down to the footer).
  - Logistics & Export: Supports standalone `.json` ship export/import (`sta2e-starship-v1`) as well as full bundling and autosave in master character files (`cached_ship_ortho_data`). Included in multi-page "Print (PDF)".
- Page 6 - Reference Manual: Field Operations Quick Reference Sheet in 8.0 x 10.5 in portrait.
  - Sweeping LCARS Headers: Left pillar-connected sweeping headers and split headers organize core rules.
  - Core Task Resolution & Action Economy: Target Number calculation, Critical Successes, Complications, Assistance, Minor Actions, Major Actions, and Initiative.
  - Momentum Spends Catalog: General Task spends, Combat & Attack spends, and Tactical/Reaction spends.
  - Determination & Extended Tasks: Canonical Determination spends, Extended Task formulas, Resistance, Breakthroughs, and Medical/Stress recovery.
  - Included in multi-page "Print (PDF)".

## Feature Roadmap Queue
- Interactive Task Roller / TN Calculator (Play Mode): tap Attribute + Department to show TN and Focus critical range, optional d20 roll.
- Canonical Focuses Suggestion Picker: helper dropdown above Page 1 Focuses box.
- Momentum Spends Modal / Quick Reference (Tools Row, browsing `spends.js`).

## Layout, Print & Mobile
- Bottom Utility Bar (`#p3-tools.no-print`): Sits below the sheet; automatically visible only on Pages 3 & 4. Contains Stardate generator, 4 Header bars, 4 Detail rows, Text, Format, and Sections tools.
- Print: `.printable-page-area` is 8.0 x 10.5 in, centered horizontally on 8.5 x 11 in Letter via `margin: 0 auto !important;` with 0.25 in top padding. Standard `Ctrl+P` prints only the active page. "Print (PDF)" compiles Page 1, Page 2, all tabs of Pages 3 & 4, Page 5, and Page 6 with repeated LCARS headers/footers into a single multi-page print stream with automatic `afterprint` cleanup.
- Mobile / Tablet: Google Fonts (`Antonio`, `Oswald`, `Roboto`) and viewport meta in `<head>` guarantee correct condensed typography on mobile. Natural document scrolling prevents Android Firefox scroll cutoff.

## Page 1 (visual master)
- Top bio fields (`bio_name`, `bio_species`, `bio_rank`, `bio_assignment`, `bio_career_path`, `bio_traits`, etc.).
- Left column:
  - Attributes sweeping header: Hover/tap LCARS popover with 2E Attribute Guide (Play Mode only, hidden in print).
  - Attributes and Departments: Companion `±` modifier inputs (`.mod-input`, e.g. `attr_control_mod`), auto-colored red for `-` and dark green for `+`. Visible only in Play Mode; hidden in Edit Mode; hidden in print.
  - Determination: 3 boxes in horizontal flex (`display: flex; gap: 6px; flex-shrink: 0;`), with hover/tap LCARS popover detailing the 5 canonical 2E Determination spends (Play Mode only, hidden in print).
- Right column:
  - Species Ability (`ledger_species_ability`, 3 lines, select picker replaces text).
  - Values (`ledger_value_1..4`, numbered, per-line shrink; in Play Mode, clicking the number toggles a red strikethrough "Challenged" state stored in `data.challenged_values`).
  - Focuses (`ledger_focus_1..6`, per-line shrink; hover/tap LCARS popover detailing 2E Critical Success and assist rules; Play Mode only, hidden in print).
- Full width below: Talents (`ledger_talents`, search + category filter appends), Mission Profile & Active Directives (`ledger_mission_directives`), Pastimes (`ledger_background_notes`, 2 lines) split horizontally with LCARS Orange Momentum Pool (`combat_momentum_1..6`, Max 6, inset numbers) in the bottom-right corner.
- LAYOUT RULES: Determination bottom border must align with Focuses bottom. Species Ability stays 3 lines, Focuses 6 lines, Values 4. Talents and Mission Profile share leftover height via JS `balance()` (Talents = ceil(lines/2)+2, Mission = floor(lines/2)-2).
- Shrink-to-fit: `.fit-box` shrinks entire block; `.fit-text` shrinks per line. Default text 11.5px.

## Page 2 - Tactical Annex
- Layout: 3 vertical bands on `.blank-workspace-canvas` with unified 6px gap.
  - Top row (`.tactical-stats-container-3col`):
    - Left col: Stress Track (16 checkboxes, `combat_max_stress` auto-follows `attr_fitness` via `data-follow`, disengaging if manually edited; hover/tap LCARS popover for 2E Breather, Break, and Triage rules) + Injuries (128px ruled lines, Protection input, hover/tap LCARS popover detailing 2E Avoid Injury, Stun vs. Deadly, First Aid, Treatment, and Revival rules).
    - Right col: Away Team Roster (1–6, Name/Role, Stat, Gear/Note with hover ▲, ▼, × controls).
  - Middle row (`.tactical-middle-container-2col`):
    - Left col: 7 Attack rows (`attack_1..7_type/_qual/_score`, decoupled weapon picker with instant search bar, hover ▲, ▼, × controls, hover/tap LCARS popover with 2E Weapon Qualities glossary) + Requisitions & Logistics box (Allowance, Base Cost, Mission Req, Total Cost auto-tally; hover/tap LCARS popover with 2E Opportunity Cost rules).
    - Right col: Equipment (`ledger_equipment`, 336px height, `.fit-box`, decoupled non-weapon picker with instant search bar).
  - Bottom row: Sweeping LCARS header bar (`TACTICAL OPERATIONS // STATUS & OBJECTIVES` with 2E Combat Momentum Spends rules popover) + Tactical Operations Console (`.tactical-ops-box-layout`, 2fr/1fr split):
    - Left (2/3 width): 4 full-width Scene Traits & Advantages (Advantage, Hazard/Zone, Complication, Cover/Terrain) stacked above full-width ruled Tactical Notes.
    - Right (1/3 width): Extended Task // Objective Console (Objective description, 15 Work Track pips in 3×5 grid with large 19px touch targets, Magnitude/Resistance/Difficulty ratings row, and 5 Breakthrough pips).
  - Footer capsule text matches Page 1 master: `United Federation Of Planets // Personnel Record Master`.
- Logistics & Opportunity Cost:
  - Base Cost: Automatically increments when adding non-standard gear in Edit Mode.
  - Mission Req: Automatically increments when adding gear in Play Mode; cleared on "Reset Mission".
  - Total: Live tally of Base + Mission costs.

## Pages 3 and 4 - Narrative Log / Logs (blank templates)
- Page 3 vitals (`p3_vital_*`) and values (`p3_value_*`): `data-follow` copies from Page 1 until typed in.
- Modular items (up/down/x controls, hidden in print):
  - 4 Header bars: Blue, Tan, Orange, and Light Blue (`.slate-bar`).
  - 4 Detail rows: Tan, Orange, Light Blue, Navy (`cap-*`).
  - Paragraphs (`contenteditable` rich text: Bold, Italic, Font LCARS/Arial, Clear Format). Sanitized plain-text paste; `Ctrl+B` / `Ctrl+I` intercepted.
  - Ruled lines (5 lines or 1 line).
- Stardate generator: Year, Month, Day inputs in `#p3-tools` compute 24th-century integer stardate in real time. "+ Header" spawns a titled blue header bar; "Insert" inserts into cursor/selection.
- Sections: Max 8 tabs per doc page; pagination links; "Page full" warning.

## Unified 2E Rules Popovers (Play Mode Only)
All LCARS reference popovers are hidden in print and hidden in Edit Mode to avoid blocking form inputs. In Play Mode (`body.play-mode-active`), clicking/tapping the `ⓘ` icon opens the guide:
- Attributes (Page 1): Definitions of all 6 attributes.
- Determination (Page 1): 5 canonical 2E Determination spends (including unified 2E trait rules for Make It So).
- Focuses (Page 1): Critical success ($\le$ Department) and assist rules.
- Stress Track (Page 2): Avoid Injury defensive function, Breather (4 Stress), and Break (8 Stress) rules.
- Injuries (Page 2): Avoid Injury, Stun vs. Deadly, First Aid, Treatment, and Revival rules.
- Attacks (Page 2): 2E Weapon Qualities glossary (Accurate with Aim 2d20, Area, Charge, Cumbersome, Debilitating, Intense, Knockdown, Piercing, Stun, Vicious X adding +X Severity).
- Requisitions (Page 2): Standard Issue, Opportunity Cost limits, and field requisition rules.
- Tactical Operations (Page 2): Canonical 2E Combat Momentum Spends (Added Severity, Disarm, Counterattack, Extra Minor Action, Extra Major Action, Keep the Initiative, Alter Trait, Avoid Injury, First Aid).

## Session Management & Mobile / Tablet Play
- "Mode: Edit 🔓 / Play 🔒": Toggles tablet-friendly read-only lock on static bio, core stats, and talents to prevent accidental touches. Unlocks live tracking, `±` modifiers, Value challenge toggles, and 2E rules popovers.
- "Reset Mission": Archives `ledger_mission_directives` to Page 4 under an Orange header ("Mission Debrief: Stardate XXXXX") + paragraph; clears Stress track; clears Tactical Momentum pips; clears Extended Task work/breakthrough pips and Magnitude; resets `±` stat modifiers; clears mission requisitions; restores baseline equipment.
- "PADD ⛶": Toggles native browser fullscreen mode to hide tablet/phone browser chrome during live table play; also requests a screen wake lock (https only).
- "Reset Ship": clears all Shield and Breach boxes on the active ship (stats kept). "Reset Mission" never touches the ship.
- "Quick Note" (Play Mode): prompts for text, appends a Tan detail row "Stardate N" to Page 4 Logs.
- Dark Play Mode: screen-only CSS filter inversion of `.printable-page-area` when Play Mode + `Theme: Dark` (preference in localStorage `sta2e_dark_play`); images/popovers counter-inverted; never affects print.
- "Fit ↔": Scales sheet to match tablet screen width for seamless edge-to-edge reading; unzooms cleanly for print.
- Larger Touch Targets (Play Mode): Scoped to `@media (pointer: coarse)` on touchscreens to expand invisible hit areas on dense checkbox tracks (Stress, Ship Shields, Breaches, Breakthroughs) for effortless tapping without shifting layout or affecting mouse precision on PC/laptop.
- Live Autosave Indicator: Pulsing dot beside the Session label and File ID reflects storage sync status (Green = Saved, Amber = Pending). Clicking dot forces instant save.

## User Manual Overlay
- `User Manual` button (Tools row) opens `#manual-overlay` (screen-only, `.no-print`, z-index 10001) over the current page; closes via Close ×, backdrop click, or Esc. Built lazily by `openManual()`; `mdToHtml()` is a tiny renderer (headings `#`-`###`, `-` and `1.` lists, `**bold**`, `*italic*`, `` `code` ``, `---`; no tables or links). Styled in style.css Section 10b (`.manual-*`).

## Save / load
- Export Crew (`#utility-btn-save`) -> one JSON named from FILE ID (`_bundle: sta2e-unified-v3`): all named fields + `docs: {p3:{sections,blocks[]}, p4:{...}}` + `base_equipment` + `challenged_values` + portrait.
- Slots (localStorage, up to 5 characters + up to 5 ships, independent): index `sta2e_storage_slots_index` / data `sta2e_slot_data_<id>` / active `sta2e_active_slot`; ships `sta2e_ship_slots_index` / `sta2e_ship_data_<id>` / `sta2e_active_ship`. Character slots exclude `ship_*` fields; they store `_play_mode` (Edit/Play restored per slot). Managed by `makeSlots()` in console.js; `applyData(d, 'char'|'ship')`.
- Autosave: debounced 500 ms into the active character slot and active ship slot; dot green = saved to browser memory. Names follow `bio_name` / `ship_name` unless renamed. Quota fallback drops images and warns once. Legacy `sta2e-autosave` migrated once.
- Load File / Import Ship ask: New Slot / Replace Current / Cancel. Character file with a ship offers a new ship slot. Clear Form clears the active character only (downloads backup first). Save As File bundles the active ship.
- Keep field `name` attributes stable; renaming breaks old saves.
- Undo: one step, in memory only (lost on reload). Snapshots taken before Reset Mission, Reset Ship, Clear Form, Load/Import Replace, and slot Delete (restores deleted slot).
- Backup All / Restore All: one JSON (`_bundle: sta2e-backup-v1`) with all character + ship slots. Restore replaces everything after auto-downloading a backup of the current state.