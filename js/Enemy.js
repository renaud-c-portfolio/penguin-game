// The Enemy class will contain information about the enemy such as
// its position on screen. It will also provide methods for updating
// and destroying the enemy.
class Enemy { 
  constructor(theRoot, enemySpot) {
     this.root = theRoot;
     this.life = 3;
     this.damage = 0;
     this.flashing = 0;
     this.spot = enemySpot; 
     this.hitbox = new Hitbox(10,10,60,50,this,1,DOUBLEBOX);
     this.x = 1300;
     this.y = enemySpot*40;
     this.randomy = Math.round(Math.random());
   
    this.destroyed = false;
    this.domElement = document.createElement('div');

    this.domElement.setAttribute("class","chicken-fly");
    this.domElement.classList.add("no-flash");
    this.domElement.style.position = 'absolute';
    this.domElement.style.left = `${this.x}px`;
    this.domElement.style.top = `${this.y+20}px`;
    this.domElement.style.zIndex = 5;

    theRoot.appendChild(this.domElement);
    this.speed = Math.random()*10 + 1;
  }

  delete()  {  
        this.hitbox.delete();
        this.root.removeChild(this.domElement); 
        this.destroyed = true;
  }

  update(timeDiff) {
    //removing timediff as fps should be controlled by the engine for now

    
    if (this.randomy || this.x > 600)
    {
      this.x -= this.speed; 
    }
    this.domElement.style.left = `${Math.round(this.x)}px`;
    this.domElement.style.top = `${Math.round(this.y)}px`;

    this.hitbox.x = this.x+this.hitbox.xOff;
    this.hitbox.y = this.y+this.hitbox.yOff;
    if (this.x < -120) {
      this.delete();
    }

    if(this.damage > 0)
    { 
      this.flashing = 22;
      this.domElement.style.filter = "";
      this.domElement.classList.remove("flash-white");
      this.domElement.classList.add("flash-white");
      this.domElement.classList.remove("chicken-fly");
      this.domElement.classList.add("chicken-hurt");
      const _time = setTimeout(()=>{
        this.domElement.classList.remove("flash-white");
      },30)
      this.life -= this.damage;
      this.damage = 0;
      if (this.life <= 0 && !this.destroyed)
      { 
        this.delete(); 
      }
      else
      {
      }
    }

    if (DISPLAY_BOXES)
    {
      this.hitbox.displayUpdate();
    }

    if (this.flashing > 0)
    {
      this.flashing -= 1;
      if (this.flashing === 0)
      { 
        this.domElement.classList.remove("chicken-hurt");
        this.domElement.classList.add("chicken-fly");
      }
    }
  }
}
