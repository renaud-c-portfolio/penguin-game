


class Explod {
    constructor(x,y,animcss) {
        this.x = x;
        this.y = y; 
        this.xSpeed = 0;
        this.ySpeed = 0;
        this.animTime = 0;
        this.animFrame = 0;        
        this.animMaxFrames = 24;
        this.animSize = 380;
        this.framesPerImage = 3;
        
        this.active = true;

        this.currentDiv = gameEngine.requestDiv(); 
        this.currentDiv.style.left = `${Math.round(this.x)}px`;
        this.currentDiv.style.top = ` ${Math.round(this.y)}px`; 
        this.currentDiv.setAttribute("class","player-death-explod");
        gameEngine.root.appendChild(this.currentDiv);
        gameEngine.explods.push(this); 
        this.currentDiv.style.visibility = "visible"; 
    }



    explodUpdate() {
        if (this.active)
        {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.currentDiv.style.left = `${Math.round(this.x)}px`;
            this.currentDiv.style.top = ` ${Math.round(this.y)}px`; 
            
            this.explodAnim();
        }
    }

    explodAnim() {
        this.animTime += 1;
        if (this.animTime > this.framesPerImage)
        {
            this.animFrame += 1; 
                this.animTime = 0; 
                if (this.animFrame >= this.animMaxFrames)
                {
                    this.animFrame = this.animFrame;
                    this.active = false;
                    if (this.currentDiv != null)
                    {
                        gameEngine.cleanDiv(this.currentDiv);
                        this.currentDiv = null;
                    }
                    
                    
                }
                if (this.currentDiv != null)
                {
                this.currentDiv.style.backgroundPositionY = `${-this.animFrame*this.animSize}px`;
                }
            }
        }
    } 