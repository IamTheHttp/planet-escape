##Current
[ ] Add player progress - https://iamhttp.myjetbrains.com/youtrack/issue/PE-91

### Added user journeys
[VT] New user in the game -> Show add user -> submit -> move to main menu
[V] Selected user -> go to change user from the main menu -> delete selected user -> user goes back to menu, he should see the create user dialog
[V] Selected user -> go to change user from the main menu -> delete other user -> list should refresh
[VT] Selected user -> go to player list -> sees the right user selected
[VT] Create user dialog -> User enters less than 3 characters, he should see a prompt to put in more chars
[VT] Any user -> Go to create new user -> tries to create a user that already exists -> sees that he needs to put in more characters
[ ] Selected user goes to the campaign, he should see the levels with indication if he finished them or not
[ ] Selected user goes to the campaign, He should be able to pick the next level in line
[ ] Selected user goes to the campaign, he cannot pick a campaign level that he's not eligible for


### what was done so far
[V] Created a localStorage service to persist stuff
[V] Created a a playerService to handle player interactions
[V] Created UI to create new players
[V] Extend "Create Player" UI to include players in localStorage
[V] Prompt the "player management" screen from the main menu (showPlayerManagement state)
[V] Add a button to delete a user + Actually delete it, including selected player
[V] Allow changing the selected user


##Known Issues
[ ] IOS Address bar swiping can cause the display to look improper
[ ] The Enemy Planet in the most bottom right is a bit hidden behind the Menu/Help UI


##ChangeLog
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
