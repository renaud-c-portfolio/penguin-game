// The engine class will only be instantiated once. It contains all the logic
// of the game relating to the interactions between the player and the
// enemy and also relating to how our enemies are created and evolve over time
const FPS = 60;
const frameMS = 1000/FPS; 

class Engine {
   constructor(theRoot) { 
     this.lastFrame = 0;
     this.frameMSCounter = 0;
     this.countFrames = 0;
     this.totalFramesPlayed = 0;
     this.fpsChecker = 0;
     this.root = theRoot;
     this.player = new Player(this.root);
     this.enemies = [];
     this.shots = [];
     this.explods = [];
     addBackground(this.root);
     this.messageBox = document.createElement("div");
     this.freeDivs = [];
     this.freeBoxes = [];
     for (let _i =0; _i < 100; _i++)
     {
       const _newDiv = document.createElement("div");
       _newDiv.style.position = "absolute";
       _newDiv.style.visibility = "hidden";
       this.freeDivs.push(_newDiv);

     }
  }

  requestDiv () {
    if (this.freeDivs.length> 0)
    {
      return this.freeDivs.pop();
    }
    else
    {
      const _newDiv = document.createElement("div");
      _newDiv.style.position = "absolute";
      _newDiv.style.visibility = "hidden";
      return _newDiv;
    }

  }


  cleanDiv (_div) {
    _div.remove();
    _div.setAttribute("class",""); 
    _div.style.width = "";
    _div.style.height = ""; 
    this.freeDivs.push(_div); 
  }

  preLoadImages = (urlArray) => {
    urlArray.forEach((element)=>{
      const _img = document.createElement("img");
      _img.src = element;
    });
  }

  gameLoop = (timeStamp=0) => { 
      this.frameMSCounter += timeStamp-this.lastFrame; 
      this.fpsChecker += timeStamp-this.lastFrame; 
      this.lastFrame = timeStamp;

      if (this.frameMSCounter >= frameMS)
      { ////things to do every frame
          if (this.frameMSCounter > frameMS*10)
          {
            this.frameMSCounter = frameMS*10;
          }
          this.frameMSCounter -= frameMS;
          this.countFrames += 1;
          this.totalFramesPlayed += 1;
          this.enemies.forEach((enemy) => {
            enemy.update();
          });
          
          for (let _i = 0; _i < this.shots.length; _i++)
          { 
            const _shot = this.shots[_i];
            if (_shot.active)
            { 
              _shot.shotUpdate(); 
            }
            else
            {
              this.shots.splice(_i,1);
              _i -= 1;
            }
          };

          for (let _i = 0; _i < this.explods.length; _i++)
          { 
            const _explod = this.explods[_i];
            if (_explod.active)
            { 
              _explod.explodUpdate(); 
            }
            else
            {
              this.explods.splice(_i,1);
              _i -= 1;
            }
          };
    
          this.player.playerUpdate();
          this.enemies = this.enemies.filter((enemy) => {
            return !enemy.destroyed;
          }); 
          
          while (this.enemies.length < MAX_ENEMIES+this.totalFramesPlayed/1200) { 
            const spot = nextEnemySpot(this.enemies);
            this.enemies.push(new Enemy(this.root, spot));
          }
    
          
      ctrl.controlUpdate(); 
      } ////end things to do every frame
      
      if (this.fpsChecker >= 1000)
      {
        console.log("fps:",this.countFrames);
        this.countFrames = 0;
        this.fpsChecker -= 1000;
      }

      requestAnimationFrame(this.gameLoop);  
    }; 
    isPlayerDead = () => {
    return false;
  };

}
