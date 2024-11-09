// We create an instance of the Engine class. Looking at our index.html,
// we see that it has a div with an id of `"app"`

const imageArray = [];
imageArray.push("images/penguinfly.png");
imageArray.push("images/penguinboost.png");

const gameEngine = new Engine(document.getElementById('app')); 
gameEngine.preLoadImages(imageArray);
const ctrl = new control();
ctrl.initControl(); 

// We call the gameLoop method to start the game
gameEngine.gameLoop();