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
        this.x = this.collision.getPosition(0, this.x, this.y, x);
        this.y = this.collision.getPosition(1, this.x, this.y, y);
    }
    
    setShowSpriteId(spriteId) {
        this.showSpriteId = spriteId;
    }
    
    getShowSpriteId() {
        return this.showSpriteId;
    }
}