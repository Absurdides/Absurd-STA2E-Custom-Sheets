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
- Runs locally from a folder on Windows (file://). Browsers block fetch of .json, so data lists are `.js` files loaded with <script src>.

## Files (all in one folder)
- `index.html` - markup only (4 pages, menu). Links `style.css`; loads scripts at the bottom in this order: `species_abilities.js`, `talents.js`, `equipment.js`, `console.js`.
- `style.css` - all CSS (formerly Blocks 1-3).
- `console.js` - all app JS (formerly Block 9), wrapped in `initConsole()` with readyState fallback (`document.readyState === 'loading'` check).
- `species_abilities.js` - `window.STA_SPECIES_ABILITIES = [{species, source, name, text}]` (75 entries; text filled by user script).
- `talents.js` - `window.STA_TALENTS = [{talent, source, category, text}]` (114).
- `equipment.js` - `window.STA_EQUIPMENT = [{name, source, type, severity, standard_issue, opportunity_cost, qualities}]` (86).
- `add_ability_text.py` - user-run (needs `pip install pdfplumber`); fills `text` in species_abilities.js from their PDFs; backs up first. Known: leaves a space before some periods.
- `trekstar.png` - Starfleet insignia used by the header.

## HTML structure
- Project was split from one HTML file into three. Block markers survive as comments but are no longer reliable: `index.html` markers are mislabeled/out of order, and `style.css` repeats Block 1-3 labels. Locate sections by id/selector instead.
  `style.css` order: Page 1 CSS (visual master) | Page 2 CSS, every selector scoped under `#page-2` | shell, Page 3/4, print CSS (last, wins cascade).
  `index.html`: `#page-1..4` pages, then off-page menu (`.external-utility-bar`).
  `console.js`: all JS.
- One form: `#unified-master-console-form`. Pages are `.sheet-page`; Pages 3 and 4 also `.doc-page` with `data-doc="p3"|"p4"`.
- Print: `.printable-page-area` is 8.0 x 10.5 in. Only the active page prints; menu hidden; `.no-print` hides picker arrows; print top padding 0.25in. Page 2 prints as the back of Page 1.
- Class names collide between pages (`.score-input`, `.form-matrix-checkbox`, banner classes) - Page 2 versions live under `#page-2`.
- Colors: navy #2c3a4d, light blue #708699, tan #eed292, orange #d96b27. Antonio/Oswald headings, Arial body.
- Shared header (Pages 1,3,4): FILE ID input `#metadata-file-id`, portrait upload `#portrait-uploader`; the portrait and file ID are mirrored to the other pages. Page 2 header has NO barcode/portrait. Tan banner reads "Personnel File // [name]" (mirrors `bio_name`).
- Print: `.printable-page-area` is 8.0 x 10.5 in, centered horizontally on 8.5 x 11 in Letter via `margin: 0 auto !important;` with 0.25 in top padding. Standard `Ctrl+P` prints only the active page. "Print Dossier (PDF)" generates a full multi-page print stream compiling Page 1, Page 2 (scoped `#page-2`), and every tab of Pages 3 & 4 (scoped `.doc-page`) with LCARS headers/footers repeated on every sheet, followed by automatic `afterprint` cleanup.

## Page 1 (visual master)
- Top bio fields (`bio_name`, `bio_species`, `bio_rank`, `bio_assignment`, `bio_career_path`, `bio_traits`, etc.).
- Left column: Attributes, Departments (Command and Conn red, Engineering and Security yellow, Medicine and Science blue), Determination (3 boxes).
- Right column: Species Ability (`ledger_species_ability`, 3 lines), Values (`ledger_value_1..4`, numbered, per-line shrink), Focuses (`ledger_focus_1..6`, per-line shrink, grid rows fill the box).
- Full width below: Talents (`ledger_talents`), Mission Profile & Active Directives (`ledger_mission_directives`), Pastimes (`ledger_background_notes`, 2 lines).
- LAYOUT RULES (user was unhappy when broken): Determination bottom border must align with Focuses bottom. Species Ability stays 3 lines, Focuses 6 lines, Values 4. Talents and Mission Profile share leftover height via JS `balance()` (Talents = ceil(lines/2)+2, Mission = floor(lines/2)-2).
- Shrink-to-fit: boxes with `.fit-box` shrink the whole block (tighten spacing, then largest font that fits); inputs with `.fit-text` shrink per line. Default text 11.5px. Page 2 attack inputs also use `.fit-text`.

## Page 2 - Tactical Annex
- Layout: 3 vertical bands on `.blank-workspace-canvas` with unified 6px gap.
  - Top row: 2-column grid (`.tactical-stats-container-3col`). Left col contains Stress Track and expanded Injuries (8 ruled lines / 128px); right col is blank placeholder.
  - Middle row: 2-column grid (`.tactical-middle-container-2col`). Left col contains 8 Attack rows (`attack_1..8_type/_qual/_score`); right col contains Equipment (`ledger_equipment`, `.fit-box` enabled).
  - Bottom row: Momentum Spends (`.momentum-master-box-layout`, 245px, 10.5px font size, 3 columns).
- Removed: `CHRONICLE RECOVERY` banner, `ledger_mission_log`, and `ledger_service_record` (migrating to Page 4).
- Fields: `combat_*`, `stress_*`, `ledger_injuries`, `roster_1..6_name/_stat/_note`, `attack_1..8_type/_qual/_score`, `ledger_equipment`.
- "SEV." heading sits over the attack score boxes.
- Hover controls on Attack (1–8) and Away Team Roster (1–6) rows: Up (▲), Down (▼), and Delete & shift up (×). Hidden in print.

## Pages 3 and 4 - Narrative Log / Session Log (blank templates)
- Page 3 only: vitals `p3_vital_name/species/age/rank/assignment/posting/education/career` and `p3_value_1..4`. Fields with `data-follow` copy from Page 1 until the user types in them.
- Added items (all have up/down/x controls, hidden in print): header bars (blue, tan, orange; bar only), paragraphs (`contenteditable` rich text: Bold, Italic, Font LCARS/Arial, Clear Format), detail rows (`cap-tan/orange/slate/navy`: editable label + text). Sections = tabs (max 8); tab row hidden while there is 1 section; red "page full" warning on screen.
- Paragraph editing: sanitized plain-text paste prevents external styling; `Ctrl+B` and `Ctrl+I` intercepted to override browser bookmark/page info shortcuts; JSON save/load preserves HTML tags while backward-compatible with legacy plain text strings.
- Stardate generator: Year, Month, Day inputs in `#p3-tools` compute 24th-century integer stardate in real time. "+ Header" spawns a titled blue header bar; "Insert" inserts into cursor/selection.
- Off-page menu rows: Pages | Stardate | Header bars | Detail rows | Text | Format | Sections | File.

## Pickers (arrow hidden in print)
- Species Ability (`#species-ability-picker`): REPLACES box text with "Name: text" (asks first if not empty).
- Talents (`#talent-picker`, Page 1): APPENDS one line per pick with search & category filtering.
- Equipment (`#equipment-picker`, Page 2): Filters out weapons and APPENDS non-weapon gear to `ledger_equipment`. UI shows logistics tags [Standard Issue | Cost: X]; canvas text strips them to save space (`Name: qualities`).
- Weapons (`#weapon-picker`, Page 2): Filters `equipment.js` for weapons and populates the first empty slot among Attacks 1–8 (`type` = name, `qual` = qualities, `score` = severity). Fully decoupled from the equipment box.
- Opportunity cost displays accurately in dropdowns even when 0 (not coerced to `?`).
- Lists missing or broken (e.g. a missing comma) = dropdown shows "No list loaded" / "No weapons loaded".

## Save / load
- Save As File -> one JSON named from FILE ID (`_bundle: sta2e-unified-v3`): all named fields + `docs: {p3:{sections,blocks[]}, p4:{...}}` (preserving paragraph HTML formatting) + portrait.
- Load migrates older saves (`ledger_values`, `ledger_focuses`, `ledger_mission_profile` + `ledger_active_directives`, old `p3_blocks`).
- Filename: `<fileid>_YYYY-MM-DD.json`. Clear Form first downloads `backup_<fileid>_<date>.json`.
- Autosave: localStorage `sta2e-autosave` (same bundle, debounced 500 ms after edits), restored at startup; `sta2e-unsaved` flag drives the close-tab warning (cleared by Save As File / Load / Clear). Clear removes autosave. Load and autosave restore both go through `applyData()`.
- Keep field `name` attributes stable; renaming breaks old saves.
- Print: `.printable-page-area` is 8.0 x 10.5 in. Standard browser print (`Ctrl+P`) prints only active page. "Print Dossier (PDF)" compiles Page 1, Page 2, and all tabs of Pages 3 and 4 with full headers/footers into a single multi-page print stream via native browser `window.print()` and `afterprint` cleanup.
- Off-page menu rows: Pages | Header bars | Detail rows | Text | Format | Sections | File (Save, Load, Clear, Print Dossier).

