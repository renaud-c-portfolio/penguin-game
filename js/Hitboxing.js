//// my ad blocker had an auto filter for hitbox.js it seems

const HITBOX = 0;
const HURTBOX = 1;
const DOUBLEBOX = 2;
const TEAMS = 3;

const hitboxes = [];
const teamBoxes = [];
teamBoxes[0] = [];
teamBoxes[1] = [];
teamBoxes[2] = [];



class Hitbox {
        constructor(xOff,yOff,width,height,attach,team,type) {
        this.xOff = xOff;
        this.yOff = yOff;
        this.y = attach.y+yOff;
        this.height = height;
        this.width = width;
        this.attach = attach;
        this.x = attach.x+xOff;
        this.y = attach.y+yOff;
        this.team = team;
        this.type = type;
        this.active = true;
        this.divElement = null;

        hitboxes.push(this);
        teamBoxes[team].push(this);
    }


    displayUpdate() {
        if (this.divElement === null)
        {  
            this.divElement = gameEngine.requestDiv(); 
            this.divElement.style.visibility = 'visible';
            this.divElement.style.position = 'absolute';
            document.getElementById("app").appendChild(this.divElement);
            if (this.type === HURTBOX){this.divElement.setAttribute("class","hurtbox");}
            if (this.type === HITBOX){this.divElement.setAttribute("class","hitbox");}
            if (this.type === DOUBLEBOX){this.divElement.setAttribute("class","doublebox");}
        }
        this.divElement.style.left = `${this.x}px`;
        this.divElement.style.top = `${this.y}px`;
        this.divElement.style.width = `${this.width}px`;
        this.divElement.style.height = `${this.height}px`;
    }

    delete() {
        this.active = false;
        this.x = -500;
        this.y = -500; 

        hitboxes.splice(hitboxes.indexOf(this),1);
        teamBoxes[this.team].splice(teamBoxes[this.team].indexOf(this),1);
        if (this.divElement != null)
        {   
            gameEngine.cleanDiv(this.divElement);  
            this.divElement = null;
        }


    }

    checkSingleCollision() {
        if (this.active)
        {
            for (let _i = 0; _i < TEAMS; _i++)
            {
                if (this.team === _i)
                {
                    
                }
                else
                {
                    for (let _j =0; _j < teamBoxes[_i].length;_j++)
                    {
                        const _otherBox = teamBoxes[_i][_j];
                        if (_otherBox.active)
                        {
                            if (((this.x >= _otherBox.x && this.x <= _otherBox.x + _otherBox.width) || (this.x <= _otherBox.x && this.x + this.width >= _otherBox.x)) && ((this.y >= _otherBox.y && this.y <= _otherBox.y + _otherBox.height) || (this.y <= _otherBox.y && this.y + this.height >= _otherBox.y)) )
                            {
                                return _otherBox;
                            }
                        }
                    }
                }
            }
        }
        return null;
    }
    
}



const newHitbox = (xOff,yOff,width,height,attach,team,type) => {
    let _box = null;
    if (gameEngine.freeBoxes.length > 0)
    {
        _box = gameEngine.freeBoxes.pop();
        _box.xOff = xOff;
        _box.yOff = yOff;
        _box.y = attach.y+yOff;
        _box.height = height;
        _box.width = width;
        _box.attach = attach;
        _box.x = attach.x+xOff;
        _box.y = attach.y+yOff;
        _box.team = team;
        _box.type = type;
        hitboxes.push(_box);
        teamBoxes[team].push(_box);
    }
    else
    {
        _box = new Hitbox(xOff,yOff,width,height,attach,team,type);
    }
    return _box;
}