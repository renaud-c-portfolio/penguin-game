

class Shot {
    constructor(x,y,team) {
        this.active = true;
        this.power = 1; 
        this.x = x;
        this.y = y;
        this.xSpeed = 7;
        this.ySpeed = 0;
        this.animTime = 0;
        this.animFrame = 0;
        this.team = team;
        this.hitbox = newHitbox(3,3,29,29,this,team,HITBOX);
        this.currentDiv = gameEngine.requestDiv();
        this.currentDiv.style.left = `${Math.round(this.x)}px`;
        this.currentDiv.style.top = ` ${Math.round(this.y)}px`; 
        this.currentDiv.setAttribute("class","apple-shot");
        gameEngine.root.appendChild(this.currentDiv);
        gameEngine.shots.push(this); 
        this.currentDiv.style.visibility = "visible";
        
    }
    shotAnim() {

    }

    shotCode() {

    }

    shotUpdate() {
        if (this.active)
        {
            if (DISPLAY_BOXES)
            {
              this.hitbox.displayUpdate();
            }
            this.shotAnim();
            this.shotCode();
            if (this.active)
            {
                this.x += this.xSpeed;
                this.y += this.ySpeed;
                this.currentDiv.style.left = `${Math.round(this.x)}px`;
                this.currentDiv.style.top = ` ${Math.round(this.y)}px`; 
                this.hitbox.x = this.x+this.hitbox.xOff;
                this.hitbox.y = this.y+this.hitbox.yOff; 
           
                if (this.x > GAME_WIDTH+50)
                {
                    gameEngine.cleanDiv(this.currentDiv);
                    this.active = false;
                    this.currentDiv.style.visibility = "hidden";  
                }
            }
            
        }
    }
}


class AppleShot extends Shot {
    constructor(x,y,team) {
        super(x,y,team);
        this.angle = 0; 
        this.animMaxFrames = 2;
        this.animSize = 36;
    }
    shotCode() {
        const _target = this.hitbox.checkSingleCollision();
        if (_target!= null)
        {
            _target.attach.damage += this.power;  

            
            this.hitbox.delete();

            //delete shot on hit ig
            if (this.animEvent)
            { 
                this.currentDiv.removeEventListener("animationend",this.animListener);
                this.animEvent = false;
            }
            gameEngine.cleanDiv(this.currentDiv);
            this.currentDiv = null;
            this.active = false; 
        }
    }
    shotAnim() {
            //css anim with event listeners has caused me too much angst so i'm just doing it classic-manually
            this.animTime += 1;
            if (this.animTime > 4)
            {
                this.animTime = 0;
                this.animFrame += 1;
                if (this.animFrame >= this.animMaxFrames)
                {
                    this.animFrame = 0;
                    this.angle += 90;
                    if (this.angle >= 360)
                    {
                        this.angle -= 360;
                    }
                    this.currentDiv.style.transform = `rotate(${this.angle}deg)`
                } 
                this.currentDiv.style.backgroundPositionY = `${-this.animFrame*this.animSize}px`;
            }
        
    }
}