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

## Files (all in one folder)
- `index.html` - markup only (5 pages, split top/bottom menus). Structured strictly into Blocks 1–8 (`<!-- Block 1 START -->` through `<!-- Block 8 END -->`). Loads scripts at bottom: `species_abilities.js`, `talents.js`, `equipment.js`, `console.js`.
- `style.css` - all CSS (Page 1 master, Page 2 scoped `#page-2`, shell, Pages 3/4, popovers, mobile zoom, print isolation last).
- `console.js` - all app JS, wrapped in `initConsole()` with readyState fallback.
- `species_abilities.js` - `window.STA_SPECIES_ABILITIES = [{species, source, name, text}]` (109 entries; fully sourced rules text, alphabetized).
- `talents.js` - `window.STA_TALENTS = [{talent, source, category, text}]` (170 entries; Core 2E, Division books, Setting guides, Continuing Mission staples, alphabetized).
- `equipment.js` - `window.STA_EQUIPMENT = [{name, source, type, severity, standard_issue, opportunity_cost, qualities}]` (131 entries; personal weapons, armor, and gear across all eras, alphabetized).
- `add_ability_text.py` - user-run PDF text extractor utility.
- `trekstar.png` - Starfleet insignia used by the headers.

## HTML & Off-Page Menu Structure
- One form: `#unified-master-console-form`. Pages are `.sheet-page`; Pages 3 and 4 also `.doc-page` with `data-doc="p3"|"p4"`.
- Top Utility Bar (`.external-top-bar.no-print`): Sits above the sheet.
  - Line 1: File (`Save As File`, `Load File`, `Clear Form`, `Print (PDF)`) + LCARS Divider + Session (`Mode: Edit 🔓 / Play 🔒`, `Reset Mission`, `PADD ⛶`, `Fit ↔`).
  - Line 2: Ship (`Ship View 🛸`, `Export Ship`, `Import Ship`).
  - Line 3: Pages (Pages 1–5 tabs).
- Page 5 - Starship Registry: Utopia Planitia technical readout in 8.0 x 10.5 in portrait. Click-to-upload ship orthographic graphic; Name/Registry/Date, Mission Profile/Service Record, Traits/Refits, Resistance/Scale/Crew Support/Small Craft; 6 Systems with 5 breach pips; 6 Departments; 30-checkbox Shields Track + Power; 4 Starship Attacks; Talents; Special Rules; Shuttlebay. Supports standalone `.json` ship export/import and unifies with master character saves.
- Bottom Utility Bar (`#p3-tools.no-print`): Sits below the sheet; automatically visible only on Pages 3 & 4. Contains Stardate generator, 4 Header bars, 4 Detail rows, Text, Format, and Sections tools.
- Print: `.printable-page-area` is 8.0 x 10.5 in, centered horizontally on 8.5 x 11 in Letter via `margin: 0 auto !important;` with 0.25 in top padding. Standard `Ctrl+P` prints only the active page. "Print (PDF)" compiles Page 1, Page 2, and all tabs of Pages 3 & 4 with repeated LCARS headers/footers into a single multi-page print stream with automatic `afterprint` cleanup.
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
- Full width below: Talents (`ledger_talents`, search + category filter appends), Mission Profile & Active Directives (`ledger_mission_directives`), Pastimes (`ledger_background_notes`, 2 lines).
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
  - Bottom row: Momentum Spends (`.momentum-master-box-layout`, 225px min-height, 10.5px font size, 3 columns).
- Logistics & Opportunity Cost:
  - Base Cost: Automatically increments when adding non-standard gear in Edit Mode.
  - Mission Req: Automatically increments when adding gear in Play Mode; cleared on "Reset Mission".
  - Total: Live tally of Base + Mission costs.

## Pages 3 and 4 - Narrative Log / Session Log (blank templates)
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
- Determination (Page 1): 5 canonical 2E Determination spends.
- Focuses (Page 1): Critical success ($\le$ Department) and assist rules.
- Stress Track (Page 2): Breather, Break, and Triage rules.
- Injuries (Page 2): Avoid Injury, Stun vs. Deadly, First Aid, Treatment, and Revival rules.
- Attacks (Page 2): 2E Weapon Qualities glossary (Accurate, Area, Charge, Cumbersome, Debilitating, Intense, Knockdown, Piercing, Stun, Vicious).
- Requisitions (Page 2): Standard Issue, Opportunity Cost limits, and field requisition rules.

## Session Management & Mobile / Tablet Play
- "Mode: Edit 🔓 / Play 🔒": Toggles tablet-friendly read-only lock on static bio, core stats, and talents to prevent accidental touches. Unlocks live tracking, `±` modifiers, Value challenge toggles, and 2E rules popovers.
- "Reset Mission": Archives `ledger_mission_directives` to Page 4 under an Orange header ("Mission Debrief: Stardate XXXXX") + paragraph; clears Stress track; resets `±` stat modifiers; clears mission requisitions; restores baseline equipment.
- "PADD ⛶": Toggles native browser fullscreen mode to hide tablet/phone browser chrome during live table play.
- "Fit ↔": Scales sheet to match tablet screen width for seamless edge-to-edge reading; unzooms cleanly for print.
- Live Autosave Indicator: Pulsing dot beside File and File ID reflects storage sync status (Green = Saved, Amber = Pending). Clicking dot forces instant save.

## Save / load
- Save As File -> one JSON named from FILE ID (`_bundle: sta2e-unified-v3`): all named fields + `docs: {p3:{sections,blocks[]}, p4:{...}}` + `base_equipment` + `challenged_values` + portrait.
- Autosave: `localStorage` `sta2e-autosave`, debounced 500 ms; close-tab warning if unsaved. Clear Form downloads backup first.
- Keep field `name` attributes stable; renaming breaks old saves.