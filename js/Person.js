function Person(name, posX, posY, sprite, collision) {
    this.name = name;
    this.x = posX;
    this.y = posY;
    this.sprite = sprite;
    this.collision = collision;
    console.log("Person init");
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
    return this.sprite;
};

Person.prototype.move = function(x, y) {
    this.x = this.collision.getPosition(0, this.x, this.y, moveX);
    this.y = this.collision.getPosition(1, this.x, this.y, moveY);
}