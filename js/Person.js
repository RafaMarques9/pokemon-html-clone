function Person(name, posX, posY, sprite, showSpriteId, collision) {
    this.name = name;
    this.x = posX;
    this.y = posY;
    this.sprite = sprite;
    this.showSpriteId = showSpriteId;
    this.collision = collision;
    console.log("Person init: " + this.showSpriteId);
}

Person.prototype.getName = function() {
    return this.name;
};

Person.prototype.getXPos = function() {
    return this.x;
};

Person.prototype.getYPos = function() {
    return this.y;
};

Person.prototype.getSprite = function() {
    return this.sprite[this.showSpriteId];
};

Person.prototype.move = function(x, y) {
    this.x = this.collision.getPosition(0, this.x, this.y, moveX);
    this.y = this.collision.getPosition(1, this.x, this.y, moveY);
}

Person.prototype.setShowSpriteId = function(spriteId) {
    this.showSpriteId = spriteId;
}

Person.prototype.getShowSpriteId = function() {
    return this.showSpriteId;
}