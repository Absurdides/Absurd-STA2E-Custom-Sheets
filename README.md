# STA 2E Unified Character Console

A Star Trek Adventures 2E character sheet that prints blank, prints filled, and works as a live tracker during play. It runs from a folder on your computer (open `index.html`) or online from GitHub Pages. Everything is saved in your browser; nothing is sent anywhere.

## Quick Start
- Fill in the sheet in **Edit Mode** (the default).
- Press **Mode** to switch to **Play Mode**. Play Mode locks the Bio, Attributes, Departments, Talents, Attacks and the ship's Systems and Departments so a stray tap can't change them. It also turns on the `±` modifier boxes, Challenged Values, the ⓘ rules popovers, Quick Note, and the dark theme the first time (change it with **Theme**).
- The LCARS fonts are bundled in the `fonts` folder, so the sheet looks the same with no internet.
- The dot beside **Session** is the autosave light: green = saved to browser memory, amber = saving.

## The Six Pages
- **Page 1 Dossier:** Bio, Attributes, Departments, Determination, Species Ability, Values, Focuses, Talents, Mission Profile & Active Directives, Pastimes, and Momentum Pool (bottom-right corner).
- **Page 2 Tactical:** Stress Track, Injuries, Away Team Roster, Attacks, Requisitions & Logistics, Equipment, and Tactical Operations (left 2/3: Scene Traits & Advantages, Tactical Notes; right 1/3: Extended Task Objective, 15 Work Track pips, Ratings, Breakthroughs, and 2E Momentum Spends rules popover).
- **Page 3 Biography and Page 4 Logs:** free-form logs. The bar under the sheet adds Header Bars, Detail Rows, Paragraphs, Ruled Lines and Stardates. Each page holds up to 8 Sections. Page 4 also always ends with a **TECH** section (the right-hand end of the Log Sections menu, even when empty): new sections are added before it, Remove Last Section never removes it, more Tech sections follow if it fills, and Print (PDF) skips it while it holds only its header bar.
- **Page 5 Ship:** Systems, Breaches, Departments, Shields, Attacks, Talents and a schematic image. In Play Mode, Systems and Departments get `±` modifier boxes like the character stats.
- **Page 6 Reference:** Printable 2E quick-reference sheet covering Task Resolution, Action Economy, Momentum Spends, Determination, and Stress, Injury and Recovery. Rules text here and in the ⓘ popovers is limited to the Quickstart Guide v1.1 and the official Momentum spends list.
- Pickers (Species Ability, Talents, Weapons, Equipment, Ship Weapons and Ship Talents) have a search box and add the entry for you.
- Ruled lines hide under typed text so they don't cut through your words, while remaining visible on empty lines below and on blank sheets.

## Log Selection (Pages 3 and 4)
- Tap, click or type in any block to make it the active block. A panel of large buttons appears over the left border beside it, with an arrow pointing at the block: ▲ ▼ move it, ✓ ticks it for selection and × deletes it (Undo restores it). On Header Bars and Detail Rows a colour swatch button also appears; each tap switches to the colour the swatch shows. On a narrow screen the panel docks along the bottom and names the block. Ticked blocks get an orange outline. Ticks are never saved and never print.
- To pick a block without opening the keyboard, tap a Header Bar's coloured end caps or the dotted strip between a Detail Row's label and text. Both sides of a Detail Row can still be typed in. To hide the panel again, tap the same end cap or divider strip once more, press Esc, or press **Select None**.
- **Select Section** ticks every block in the open section. **Select None** clears the ticks. The count shows beside the buttons.
- **Export Selected:** saves the ticked blocks as a `.json` file. With nothing ticked, nothing happens.
- **Import Sections:** reads that file (or a whole Crew export, then you pick Page 3 or Page 4). With blocks ticked you can **Replace Selected**: the imported blocks take the place of the ticked ones. Otherwise they go to the end of the open section or to a new section (8 sections maximum). Anything that does not fit on a page flows into the next section. Undo reverses it. This also moves blocks between Page 3 and Page 4.
- **Import Markdown:** paste markdown (for example a backstory written by an AI chat) or choose a `.md` or `.txt` file. `#` headings become header bars, paragraphs become Paragraph blocks with bold and italic kept, and a one-line `**Label:** text` becomes a Detail Row. Lists stay as text lines with their markers. Tables, code, links and images become plain text, and `---` lines are dropped. It uses the same Replace Selected / End of section / New section choice as Import Sections, and Undo reverses it.
- **Copy for Discord:** opens a window with the ticked blocks as text to paste. Choose **Code block** (keeps the sheet layout, no bold or italic) or **Markdown** (headings, bold and italic show in Discord). Text over 2000 characters splits into numbered parts, each with its own Copy button. **Download .md** saves the ticked blocks as a markdown file: drag it into Discord and it appears as one compact card with a collapsed preview you can expand.
- **Delete Selected:** removes the ticked blocks after a confirmation. Undo restores them.

## Crew and Ship Slots
- You get up to **50 Crew Slots and 8 Ship Slots**, kept separate so one ship can serve several characters, or a shuttle can replace the main ship for a mission.
- **+ New** adds a blank slot, **Copy** duplicates the current one, **Rename** sets a name (leave it blank to go back to automatic naming), **Delete** removes it.
- Names follow the character name or ship name unless you rename them.
- The last slot you used reopens automatically. Each Crew Slot remembers whether it was in Edit or Play Mode.
- Portraits and ship images are shrunk automatically when you upload them, to save browser memory: they are fitted inside 320 x 220 px (portrait) and 1434 x 192 px (ship), roughly twice their size on the sheet, and saved as WebP where the browser supports it. Older, larger images are shrunk automatically the first time their slot is opened or imported. Wide ship schematics (about 5:1 to 7:1) fill the ship image box best.
- **Storage:** the `Storage: NN%` readout in the Session row estimates how much browser memory the app uses (browsers do not report the real limit; hover for KB, click to open the **Storage Details** breakdown). It turns amber at 80% (with a one-time reminder to use **Backup All**) and red at 95%. At 90% or more, new slots are refused (**+ New**, **Copy**, **New Slot** on import, adding a ship from a crew file, and **Add to My Slots**): use **Backup All**, then **Delete** slots you no longer need. Clicking the meter lets you review storage per slot and safely download and remove any unlinked or legacy data.
- If memory does fill up you'll get a warning and images are left out of autosave. Use Export to keep them.

## Saving and Moving Data
- **Export Crew / Import Crew:** one file for the active character. Export Crew asks whether to include the active ship (**Include Ship** or **Character Only**). Importing asks whether to use a **New Slot** or **Replace Current**. If the file also holds a ship, you can add it as a new ship slot.
- **Export Ship / Import Ship:** the ship alone, with the same choices.
- **Backup All:** the Roster & Fleet master file: every crew and ship slot in one file. Do this regularly, because clearing browser data erases slots.
- **Restore All:** reads a Backup All file and asks: **Replace Everything** (replaces every slot; downloads a backup of your current slots first) or **Add to My Slots** (fills free slots only and lists any entries that did not fit; your current slots are kept).
- **Clear Form:** clears only the active character, after downloading a backup. Ships are untouched.
- Browser memory stays on that device and browser. Use Export or Backup All to move to another one.

## Undo
- **Undo** reverses the last destructive action: Reset Mission, Reset Ship, Clear Form, Import with Replace Current, Import Sections, Delete Selected, deleting a log block, or deleting a slot (the slot is recreated).
- It is one step only and is lost when you reload the page. Edits made after the action are lost when you undo.
- The button is grey when there is nothing to undo; hover it to see what it would reverse.

## Play Tools
- **Reset Mission:** moves Mission Profile & Active Directives to Page 4 as a "Mission Debrief" header, clears the Stress Track, Tactical Momentum pips, Extended Task pips, and the `±` modifiers, clears Mission Req and restores your starting Equipment. It never changes the ship.
- **Reset Ship:** clears all Shield and Breach boxes on the active ship. It also clears the ship's `±` modifiers. Stats, Attacks and Talents stay.
- **Momentum Pool:** works as a scale. Tap a pip to fill every pip up to it; tap the top filled pip to remove one; tap a lower filled pip to drop the pool down to it.
- **Task Roller:** in Play Mode, tap an Attribute and a Department (tap again to deselect) to open the roller over the Species Ability and Values area. It shows the Success Range (Attribute + Department, plus the `±` boxes) and the Critical range: with **+Focus** on, a roll of 1 up to the Department rating; off, a roll of 1 only. A dice stepper (1 to 5, default 2) and a Difficulty stepper (0 to 5, default 1) sit beside it. **+1 / +2 / +3 Dice** buy extra dice with Momentum from the Page 1 pool (1, 3 or 6 Momentum in total, 5 dice maximum); the pips are unchecked when you press **Roll** and you can tick them again to refund. Each die shows as a success, a critical (★, counts 2), a miss, or a complication (! on a 20), with PASS or FAIL against the Difficulty, any leftover Momentum and an optional **Add to pool** button. On Page 5 the same roller works for the ship: tap a System and a Department for the ship's Success Range (System + Department plus the `±` boxes). It starts at 1d20, has no Focus, and buys extra dice from the same Page 1 Momentum pool. The **Dice** button (Tools row, Play Mode, green) opens a free dice tray for rolls the gamemaster calls: 1 to 5d20 against a target number (default 10) with a Difficulty (default 1, or none), scored like any other roll. You can also spend Determination in the roller: **★ Perfect Opp** before rolling sets one d20 to a 1 (Critical Success) and deducts 1 Determination upon Roll; after rolling, tap any rolled dice chips to select them (blue outline) and press **Moment of Insp** to re-roll them for 1 Determination. After any roll, an optional **Log** button asks for the task (required), a Focus (default None, not logged), and an optional Directive / Value justification, and adds the roll to the **TECH** section of Page 4 as a Tan detail row: line one is the task, with `(Focus: ..., Directive: ...)` when entered; line two is, for example, `[TN 14, Diff 3] 4D20, 3 Successes (Pass) · Spent 1 Determination`. It is never logged automatically. The row is labelled with the Stardate bar's value, or `Stardate ?` if you tick **No stardate** or the bar is still at its default of Jan 1, 2376; you can retype the label later. The roller itself is never saved or printed. **Clear**, ×, or Esc closes it.
- **Quick Note:** adds a stardate-stamped line to Page 4 Logs.
- **Values:** in Play Mode, tap a Value's number to mark it Challenged (struck through); tap again to restore it.
- **Equipment Costs:** adding non-standard gear raises Base Cost in Edit Mode and Mission Req in Play Mode. Total adds them up.
- Max Stress follows Fitness until you type your own value.

## Tablets and Phones
- **PADD** goes fullscreen and asks the screen to stay awake (needs https, so GitHub Pages works but a local file may not).
- **Fit** scales the sheet to your screen width.
- **Theme** switches the screen between dark and light, in Edit or Play Mode. It never affects printing.
- **Toolkit** opens the Game Toolkit rules reference cards in a new tab. It has its own Theme, Fit, PADD and Print buttons, works offline after one online visit, and is not part of Print (PDF).
- **Install:** online (for example GitHub Pages) your browser can install the sheet as an app: Chrome or Edge via the install option in the menu, Safari via Share, then Add to Home Screen. After one online visit it also opens offline, fonts included. A local file can't be installed.
- In Play Mode, checkboxes (Stress, Shields, Breaches, Breakthroughs) expand their invisible touch area on touchscreens for easier tapping.

## Printing
- `Ctrl+P` prints the page you are looking at.
- **Print Blank** prints every page empty without changing your saved data. Pages 3 and 4 print as one ruled page each.
- **Print (PDF)** prints Page 1, Page 2, every section of Pages 3 and 4, Page 5, and Page 6 as one document.
- Use Letter paper at 100% scale, and turn on **Background graphics** if the colours are missing.
- Menus, popovers and editing controls never print, so a blank sheet prints clean.