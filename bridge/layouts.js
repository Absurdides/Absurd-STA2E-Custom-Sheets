/* ==========================================================================
   BRIDGE LAYOUTS  (bridge/layouts.js)
   Default bridge tabs for roster.html. Everyone who opens the site gets these.

   HOW TO ADD A DEFAULT BRIDGE (works on a local folder and on GitHub Pages)
   1. Put the bridge picture in this bridge/ folder (PNG, WebP or SVG). Pins are
      placed as a percentage of the picture, so any shape works (top-down,
      isometric, wide or tall). About 600-1000 px wide is plenty.
   2. Open roster.html > Bridge tab. Edit Layout lets you drag
      the pins, add stations and rename them.
   3. In Edit Layout press "Copy Default Entry". Paste the result into the list
      below, after the last entry (keep the comma between entries).
   4. Make sure img (and line, if you have a black and white version) point to
      your picture file. Reload roster.html.

   FIELDS
   id    short unique name, letters and numbers only. Never change it later: saved
         seating is stored under it.
   name  text shown on the tab.
   img   picture shown on screen (colour or plain).
   line  optional black and white line-art version. It is always used for
         printing (saves ink); if omitted, img is printed.
   w     optional maximum map width in pixels (default 360; use more for wide pictures).
   st    stations: [number, 'Name', colour, x%, y%]
         colour: 'C' Command (red), 'O' Operations (gold), 'S' Sciences (blue)
         x and y are percentages of the picture from its top left corner.

   Players can still move pins on their own copy. Their changes are saved in their
   browser and "Reset Layout" returns to what is written here.
   ========================================================================== */
window.STA_BRIDGES = [
  {
    id: 'main',
    name: 'Luna-Class Main Bridge',
    img: 'bridge/main-bridge-colour.png',
    line: 'bridge/main-bridge.svg',
    st: [
      [1, 'Captain', 'C', 50.6, 45.9],
      [2, 'First Officer', 'C', 35, 47.1],
      [3, 'Counselor', 'S', 65.3, 46.9],
      [4, 'Operations', 'O', 56.9, 54.1],
      [5, 'Conn', 'C', 44.4, 54.1],
      [6, 'Tactical', 'O', 50.6, 31.1],
      [7, 'Tactical II', 'O', 22.5, 49.2],
      [8, 'Science', 'S', 12.1, 54.2],
      [9, 'Environment', 'O', 11.3, 48.6],
      [10, 'Science II', 'S', 12.9, 42.9],
      [11, 'Engineering', 'O', 76.7, 49.2],
      [12, 'Engineering 2', 'O', 87.2, 53.9],
      [13, 'Mission Ops', 'O', 87.5, 48.1],
      [14, 'Science III', 'S', 85.8, 42.7]
    ]
  }
];
