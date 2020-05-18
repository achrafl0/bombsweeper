# bombsweeper
A simple React Native retake on the classic Minesweeper board game
- Android : fully tested on simulator and device 
- IOS : Should be compatible , not tested yet
## Requirements
- Install  ```npm```
- Install the requirement : ```npm install```
- Launch a dev version with expo by ```npm run start```
- Build a package to deploy on android by ```expo build:android``` or ios by ```expo build:ios```

## How to play
- It's a retake on the Minesweeper game, where the goal is to guess the location of randomly placed mines by using clues about the number of neighboring mines in each cell
- To reveal a cell, you should just press on it
- To flag a cell as a potential mine, you should long press on it

## Code Structure

- Entry point : ```App.js``` contains the main settings for a game, and handles the GameOver PopUp
- Board Component: ```./src/components/Board.js``` contains the main logic for handling presses/long presses, it's initial state is generated from ```./src/utils/utilsBoard.js``` and check at every move winning and losing conditions
- Cell Component: ```./src/components/Cell.js``` contains the main display logic for each cell, it's fragmented in order to be able to change what to display easily
