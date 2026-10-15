# STA 2E Unified Character Console

A Star Trek Adventures 2E character sheet that prints blank, prints filled, and works as a live tracker during play. It runs from a folder on your computer (open `index.html`) or online from GitHub Pages. Everything is saved in your browser; nothing is sent anywhere.

## Quick Start
- Fill in the sheet in **Edit Mode** (the default).
- Press **Mode** to switch to **Play Mode**. Play Mode locks the Bio, Attributes, Departments, Talents and Attacks so a stray tap can't change them. It also turns on the `±` modifier boxes, Challenged Values, the ⓘ rules popovers, Quick Note and the dark theme.
- The dot beside **Session** is the autosave light: green = saved to browser memory, amber = saving.

## The Six Pages
- **Page 1 Dossier:** Bio, Attributes, Departments, Determination, Species Ability, Values, Focuses, Talents, Mission Profile & Active Directives, Pastimes, and Momentum Pool (bottom-right corner).
- **Page 2 Tactical:** Stress Track, Injuries, Away Team Roster, Attacks, Requisitions & Logistics, Equipment, and Tactical Operations (left 2/3: Scene Traits & Advantages, Tactical Notes; right 1/3: Extended Task Objective, 15 Work Track pips, Ratings, Breakthroughs, and 2E Momentum Spends rules popover).
- **Pages 3 and 4 Narrative and Logs:** free-form logs. The bar under the sheet adds Header Bars, Detail Rows, Paragraphs, Ruled Lines and Stardates. Each page holds up to 8 Sections.
- **Page 5 Ship:** Systems, Breaches, Departments, Shields, Attacks, Talents and a schematic image.
- **Page 6 Reference:** Printable 2E quick-reference sheet covering Task Resolution, Action Economy, Momentum Spends, Determination, Extended Tasks, and Medical Recovery.
- Pickers (Species Ability, Talents, Weapons, Equipment, Ship Weapons and Ship Talents) have a search box and add the entry for you.

## Crew and Ship Slots
- You get **5 Crew Slots and 5 Ship Slots**, kept separate so one ship can serve several characters, or a shuttle can replace the main ship for a mission.
- **+ New** adds a blank slot, **Copy** duplicates the current one, **Rename** sets a name (leave it blank to go back to automatic naming), **Delete** removes it.
- Names follow the character name or ship name unless you rename them.
- The last slot you used reopens automatically. Each Crew Slot remembers whether it was in Edit or Play Mode.
- Browser memory is limited. If it fills up you'll get a warning and images are left out of autosave. Use Export to keep them.

## Saving and Moving Data
- **Export Crew / Import Crew:** one file for the active character, including the active ship. Importing asks whether to use a **New Slot** or **Replace Current**. If the file also holds a ship, you can add it as a new ship slot.
- **Export Ship / Import Ship:** the ship alone, with the same choices.
- **Backup All:** every crew and ship slot in one file. Do this regularly, because clearing browser data erases slots.
- **Restore All:** replaces every slot from a Backup All file. It downloads a backup of your current slots first.
- **Clear Form:** clears only the active character, after downloading a backup. Ships are untouched.
- Browser memory stays on that device and browser. Use Export or Backup All to move to another one.

## Undo
- **Undo** reverses the last destructive action: Reset Mission, Reset Ship, Clear Form, Import with Replace Current, or deleting a slot (the slot is recreated).
- It is one step only and is lost when you reload the page. Edits made after the action are lost when you undo.
- The button is grey when there is nothing to undo; hover it to see what it would reverse.

## Play Tools
- **Reset Mission:** moves Mission Profile & Active Directives to Page 4 as a "Mission Debrief" header, clears the Stress Track, Tactical Momentum pips, Extended Task pips, and the `±` modifiers, clears Mission Req and restores your starting Equipment. It never changes the ship.
- **Reset Ship:** clears all Shield and Breach boxes on the active ship. Stats, Attacks and Talents stay.
- **Quick Note:** adds a stardate-stamped line to Page 4 Logs.
- **Values:** in Play Mode, tap a Value's number to mark it Challenged (struck through); tap again to restore it.
- **Equipment Costs:** adding non-standard gear raises Base Cost in Edit Mode and Mission Req in Play Mode. Total adds them up.
- Max Stress follows Fitness until you type your own value.

## Tablets and Phones
- **PADD** goes fullscreen and asks the screen to stay awake (needs https, so GitHub Pages works but a local file may not).
- **Fit** scales the sheet to your screen width.
- **Theme** switches Play Mode between dark and light. It never affects printing.
- In Play Mode, checkboxes (Stress, Shields, Breaches, Breakthroughs) expand their invisible touch area on touchscreens for easier tapping.

## Printing
- `Ctrl+P` prints the page you are looking at.
- **Print (PDF)** prints Page 1, Page 2, every section of Pages 3 and 4, Page 5, and Page 6 as one document.
- Use Letter paper at 100% scale, and turn on **Background graphics** if the colours are missing.
- Menus, popovers and editing controls never print, so a blank sheet prints clean.