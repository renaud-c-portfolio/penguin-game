// In this file we have functions that will be used in the Engine.js file.
// nextEnemySpot is a variable that refers to a function. The function has one parameter,
// which we called enemies. enemies will refer to an array that will contain instances of the
// Enemy class. To get more information about the argument that will get passed to this function,
// please see the Engine.js file.

// The purpose of this function is to determine in which slot to place our next enemy.
// The possibilities are 0, 1, 2, 3 or 4.
const nextEnemySpot = (enemies) => {
  // enemySpots will refer to the number of spots available (can you calculate it?)
  const enemySpots = GAME_WIDTH / ENEMY_WIDTH;

  // To find out where to place an enemy, we first need to find out which are the spots available.
  // We don't want to place two enemies in the same lane. To accomplish this, we first create an
  // array with 5 elements (why 5?) and each element is false.
  // We then use forEach to iterate through all the enemies.
  // If you look at the constructor of the Enemy class, you can see that every instance will have a spot property.
  // We can use this property to modify the spotsTaken array.
  const spotsTaken = [false, false, false, false, false];
  enemies.forEach((enemy) => {
    spotsTaken[enemy.spot] = true;
  });

  // We are now in a position to find out position. We declare a variable candidate that is initially undefined.
  // candidate represents a potential spot. The variable will be repeatedly assigned different numbers.
  // We will randomly try different spots until we find out that is available
  let candidate = undefined;
  while (candidate === undefined || spotsTaken[candidate]) {
    // candidate is assigned a random number between 0 and enemySpots (not including enemySpots). (what number is enemySpots?)
    candidate = Math.floor(Math.random() * enemySpots);
  }

   return candidate;
};


const addBackground = (root) => { 

  const bg = document.createElement('div');
  bg.setAttribute("id","background1");
  bg.style.background = 'url("images/back.png") repeat-x';
  bg.style.height = `${GAME_HEIGHT}px`;
  bg.style.width = `${GAME_WIDTH}px`; 
  bg.style.zIndex = "-10";
  bg.style.position = "absolute";
  root.append(bg);

  const bgx = document.createElement('div');
  bgx.setAttribute("id","backgroundx");
  bgx.style.background = 'url("images/backcloud.png") repeat-x';
  bgx.style.height = `${GAME_HEIGHT}px`;
  bgx.style.width = `${GAME_WIDTH}px`; 
  bgx.style.zIndex = "-9";
  bgx.style.position = "absolute"; 
  root.append(bgx);


  const bg2 = document.createElement('div');
  bg2.setAttribute("id","background2");
  bg2.style.background = 'url("images/middle.png") repeat-x';
  bg2.style.height = `${GAME_HEIGHT}px`;
  bg2.style.width = `${GAME_WIDTH}px`; 
  bg2.style.zIndex = "-8";
  bg2.style.position = "absolute";
  root.append(bg2);

  const bg3 = document.createElement('div');
  bg3.setAttribute("id","background3");
  bg3.style.background = 'url("images/tileground.png") repeat-x';
  bg3.style.height = "288px";
  bg3.style.width = `${GAME_WIDTH}px`; 
  bg3.style.zIndex = "-4";
  bg3.style.position = "absolute";
  bg3.style.top = "478px";
  root.append(bg3);
 
 
   const whiteBox = document.createElement('div');
   const whiteBox2 = document.createElement('div');

  whiteBox.style.zIndex = 100;
  whiteBox.style.position = 'absolute';
  whiteBox.style.top = `${GAME_HEIGHT}px`;
  whiteBox.style.height = `${ENEMY_HEIGHT}px`;
  whiteBox.style.width = `${GAME_WIDTH}px`;
  whiteBox.style.background = '#fff';
  root.append(whiteBox);

  whiteBox2.style.zIndex = 100;
  whiteBox2.style.position = 'absolute';
  whiteBox2.style.left = `${GAME_WIDTH}px`;
  whiteBox2.style.left = `${GAME_WIDTH}px`;
  whiteBox2.style.height = `${GAME_HEIGHT+100}px`;
  whiteBox2.style.width = `200px`;
  whiteBox2.style.background = '#FFF';
  root.append(whiteBox2);
};
