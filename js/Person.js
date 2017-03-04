class Person {
    constructor(name, posX, posY, sprite, showSpriteId, collision) {
        this.name = name;
        this.x = posX;
        this.y = posY;
        this.sprite = sprite;
        this.showSpriteId = showSpriteId;
        this.collision = collision;
    }
    
    getName() {
        return this.name;
    }
    
    getXPos() {
        return this.x;
    }
    
    getYPos() {
        return this.y;
    }
    
    getSprite() {
        return this.sprite[this.showSpriteId];
    }
    
    move(x, y) {
        if(y == 0) {
            this.x = this.collision.getPosition(0, this.x, this.y, x);
        } else {
            this.y = this.collision.getPosition(1, this.x, this.y, y);
        }
    }
    
    setShowSpriteId(spriteId) {
        this.showSpriteId = spriteId;
    }
    
    getShowSpriteId() {
        return this.showSpriteId;
    }
    
    checkNextField() {
        var target;
        switch(this.getShowSpriteId()) {
            case 0: // Down
                target = this.collision.characterOnNextTile(this.x, this.y + 16, true);
                break;
            case 1: // Up
                target = this.collision.characterOnNextTile(this.x, this.y - 16, true);
                break;
            case 2: // Left
                target = this.collision.characterOnNextTile(this.x - 16, this.y, true);
                break;
            case 3: // Right
                target = this.collision.characterOnNextTile(this.x + 16, this.y, true);
                break;
        }
        
        if(target) {
            target.talkWith(this);
        }
    }
}