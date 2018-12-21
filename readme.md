##Current
[ ] Add player progress - https://iamhttp.myjetbrains.com/youtrack/issue/PE-91

[ ] On first load to the website, Prompt the user to enter his username.
[ ] In the main menu, allow users to add more users(Change player), change active player, and delete players
[ ] Limit to 5 users per device

Next steps, once we have an 'active user':

[ ] When a level is complete, add that information to the user object we have saved.
[ ] Support incognito mode, which should just save to memory instead of localStorage
[ ] Modify the UI of the levels to indicate if the level was already done by this user
[ ] Block users from selecting levels they're not eligible for
[ ] Provide back door(magic user) with access to everything

what was done so far
[V] Created a localStorage service to persist stuff
[V] Created a a playerService to handle player interactions
[V] Created UI to create new players
[ ] Extend "Create Player" UI to include players in localStorage
[ ] Prompt the "player management" screen from the main menu (showPlayerManagement state)
[ ] Assumption - The only time we'll have a state withou a selected player is on first load



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
