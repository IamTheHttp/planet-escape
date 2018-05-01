# Change log
## 1.0.4
- Add ImageBuffer
- Change renderSystem to render from the imageBuffer, Sprite now only needs a name
- Added a different image per player_ID
- Added planet ownership swap animation
- Added shield icon to planets to show amount of planets
- Added memoization to calcDistance
- Added menus and mid game pause menus.
## 1.0.3
- Fixed assets path to ./
- Cached defender count for improved Perf, defender pilots should not affect performance
- Updated jarb to 1.0.3
- Fixed fleet performance, ships won't be rendered when they're in fleet!
- Added Pause/Play and back to main menu page
- Removed FPS count
## 1.0.2
- Added canvasAPI
- Added selectedBox object
- Introduced (on purpose) a bug in the angle of the fighters
- Moved FPS to absolute position top right
- Updated Jarb 1.0.2
- Added styling
- Added minimap
- Prevent text from accidently being selected.
- Added support for mobileView
## 1.0.1
- Fixed performance issues to support 1000s of fighters
## 1.0.0
- First release
## Improved performance to support 1000s of fighters