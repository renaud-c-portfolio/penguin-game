const HEARTWIDTH = 64;

class Player {
  // The constructor takes one parameter. This parameter refers to the parent DOM node.
  // We will be adding a DOM element to this parent DOM node.
  constructor(root) {
    // The x position starts off in the middle of the screen. Since this data is needed every time we move the player, we
    // store the data in a property of the instance. It represents the distance from the left margin of the browsing area to
    // the leftmost x position of the image.
    this.xSpeed =0;
    this.ySpeed =0;
    this.x = 0 * PLAYER_WIDTH;
    this.y = 0 * PLAYER_WIDTH;
    this.width = 54;
    this.height = 30;
    this.hitboxW = 14;
    this.hitboxH = 8;
    this.player = 1;
    this.boostPower = 2;
    this.control = true;
    this.reload = 0;
    this.team = 0;
    
    this.exploded = false;

    this.life = 3;
    this.invicible = 0;
 

    this.boosting = 0;
    this.boostCooldown = 0;

    this.hurtbox = new Hitbox(27,21,36,21,this,0,HURTBOX);

    // The y position never changes, so we don't need to store it in a property. It represents the y position of the top of the
    // hamburger. The y position is the distance from the top margin of the browsing area.
 
    // We create a DOM node. We will be updating the DOM node every time we move the player, so we store a reference to the
    // DOM node in a property.
    this.domElement = document.createElement('div');
    this.domElement.setAttribute("id","penguin-normal"); 
    //this.domElement.style.background = 'url(images/penguin.png) no-repeat';
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = ` ${this.y}px`;
    this.domElement.style.zIndex = '10'; 
    root.appendChild(this.domElement);

    this.hudElement = document.createElement('div');
    this.hudElement.style.position = 'absolute';
    this.hudElement.style.top = `${GAME_HEIGHT -60}px`; 
    this.hudElement.setAttribute("id","penguin-hearts"); 
    root.appendChild(this.hudElement);
    
  }

   playerUpdate() { 
    if (this.control)
    {
      if (ctrl.hol[this.player][LEFT] && !this.boosting)
      {
        this.xSpeed = -6;
      }
      else if (ctrl.hol[this.player][RIGHT] && !this.boosting)
      {
        this.xSpeed =6;
      }
      else if (!this.boosting)
      {
        this.xSpeed = 0;
      }

      if (ctrl.hol[this.player][UP] && !this.boosting)
      {
        this.ySpeed = -6;
      }
      else if (ctrl.hol[this.player][DOWN] && !this.boosting)
      {
        this.ySpeed = 6;
      }
      else if (!this.boosting)
      {
        this.ySpeed = 0;
      }

      if (this.boosting > 0)
      {
        this.boosting -= 1;
        if (this.boosting <= 0)
        {
          this.boosting = 0;
          this.domElement.setAttribute("id","penguin-normal");  
        }
      }
      else if (this.boostCooldown > 0)
      {
        this.boostCooldown -= 1;
      }
      
      if (ctrl.pre[this.player][BOOST] && this.boostCooldown <= 0)
      { 
        this.domElement.setAttribute("id","penguin-boost");
        this.boosting = 24;
        this.boostCooldown = 40;
        this.xSpeed = Math.round(this.xSpeed*this.boostPower);
        this.ySpeed = Math.round(this.ySpeed*this.boostPower);
      } 
      
      if (this.reload === 0 && ctrl.pre[this.player][FIRE])
      {
        const _apple = new AppleShot(this.x+20,this.y+10,this.team); 
        this.reload = 6;
      }
      else if (this.reload > 0)
      {
        this.reload -= 1;
      }



    } //// control section end
      
      this.x += this.xSpeed;
      this.y += this.ySpeed;

      if (this.x < 0) {this.x = 0+1;}
      else if (this.x > GAME_WIDTH-this.width) {this.x = GAME_WIDTH-this.width;} 
      if (this.y < 0 && this.life > 0) {this.y = 0+1;}
      else if (this.y > GAME_HEIGHT-this.height) {this.y = GAME_HEIGHT-this.height;}
      this.domElement.style.left = `${Math.round(this.x)}px`;
      this.domElement.style.top = ` ${Math.round(this.y)}px`; 
      this.hurtbox.x = this.x + this.hurtbox.xOff;
      this.hurtbox.y = this.y + this.hurtbox.yOff;

      if (this.invicible === 0 && this.life > 0)
      {
        if (this.hurtbox.checkSingleCollision())
        {
          this.life -= 1;
          this.invicible = 50;
          this.hudElement.style.width=`${HEARTWIDTH*this.life}px`;
          if (this.life <= 0)
          {
            this.control = false;
            this.ySpeed = -16;
            this.xSpeed = -1 + Math.random()*2;
          }
        }
      }
      else if (this.invicible > 0 && this.life > 0)
      {
        this.domElement.setAttribute("id","penguin-hurt");
        if (this.invicible % 4 > 2)
        {
          this.domElement.style.visibility = "hidden"
        }
        else
        {
          this.domElement.style.visibility = "visible"
        }
        this.invicible -= 1;
        if (this.invicible === 0 && this.life > 0)
        {
          this.domElement.setAttribute("id","penguin-normal");
          this.domElement.style.visibility = "visible"
        }
      }
      else if (this.life <= 0)
      {
        this.domElement.setAttribute("id","penguin-hurt");
        this.ySpeed += 0.7;
        if (this.y < 500)
        {
          this.domElement.style.zIndex = -5;
        }
        if (this.exploded === false && this.y > 580 && this.ySpeed > 5) 
        {
          
          console.log("henlo");
          this.exploded = true;
          const _explod = new Explod(this.x-240,this.y-360,"player-death-explod");
          _explod.currentDiv.style.zIndex = -5;
          _explod.xSpeed = -1.5;

          const _deathDiv = document.createElement("div");
          _deathDiv.setAttribute("class","deathdiv");
          gameEngine.root.appendChild(_deathDiv);

          const _deathP = document.createElement("p");
          _deathP.setAttribute("class","deathp");
          _deathDiv.appendChild(_deathP)
          _deathP.innerText = "!! PENGUIN DOWN !!"
          
        }
      }
      if (DISPLAY_BOXES)
      {
        this.hurtbox.displayUpdate();
      }
      
   }
} 