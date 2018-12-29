## Refactoring needed
[ ] Component refactoring, App and MainMenu are doing too many things..

##Known Issues
[ ] IOS Address bar swiping can cause the display to look improper
[ ] The Enemy Planet in the most bottom right is a bit hidden behind the Menu/Help UI
[ ] In Mobile, the "Loading level assets" splash screen does not appear

---------------
##ChangeLog
[V] - Done
[VT] - Done and has automated tests

###
29/12/2018
[V] GamePlay - Create 10 levels for the game - https://iamhttp.myjetbrains.com/youtrack/issue/PE-98
[V] Bug - Cannot click to reply maps in the middle of the campaign (say I'm in level 3, I can't play level 2)
[V] UI - Changed the order of the buttons in the end game modal, "New Game" is now the first item
[V] Feature - https://iamhttp.myjetbrains.com/youtrack/issue/PE-99 - Added "level hints" to be shown when the level starts
[ ] Tests - Increased test coverage to 90% across everything

### 28/12/2018
[V] CSS Refactoring, it's a messy mess out here!

### 27/12/2018
#### Added player progress stored locally on the device
[V] Add player progress - https://iamhttp.myjetbrains.com/youtrack/issue/PE-91
[VT] New user in the game -> Show add user -> submit -> move to main menu
[V] Selected user -> go to change user from the main menu -> delete selected user -> user goes back to menu, he should see the create user dialog
[V] Selected user -> go to change user from the main menu -> delete other user -> list should refresh
[VT] Selected user -> go to player list -> sees the right user selected
[VT] Create user dialog -> User enters less than 3 characters, he should see a prompt to put in more chars
[VT] Any user -> Go to create new user -> tries to create a user that already exists -> sees that he needs to put in more characters
[V] Selected user goes to the campaign, he should see the levels with indication if he finished them or not
[V] Selected user goes to the campaign, He should be able to pick the next level in line
[V] Selected user goes to the campaign, he cannot pick a campaign level that he's not eligible for
[V] Upgraded game-platform package, which is now not bundled with react, saving KB size

### 21/12/2018
[V] Fix - Restart in the game-end screen restarts level 1 was always restarting the first level.
[V] Fix - User was allowed to go to "Next Level" at the end screen even if he lost the map

### 20/12/2018
[V] Investigate manifest.json - needs to actually be installed on the home page to make a difference
[V] prevent swipe-up from occurring, the Menu/Back from the top needs to be moved down
[V] Fix the Icon of the minimize/maximize, it looks bad - Changed to + and -
[V] Added a 'Show Hints' button on the game page and removed the 'tutorials' link in the menu
[V] Added direct tests to GenerateMap
[V] Improved UI for 'game-ending' notification, to look like the theme

##Meta
[ ] Delegate "Selection box selection" to game-platform (this is historically still calculated in game code
