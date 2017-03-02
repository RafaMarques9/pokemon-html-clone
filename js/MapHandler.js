function MapHandler(map, tileSize, notWalkableTileIDs, canvasWidth, canvasHeight) {
    this.map = map;
    this.tileSize = tileSize;
    this.notWalkableTileIDs = notWalkableTileIDs;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
}

MapHandler.prototype.getMap = function() {
    return this.map;
}

MapHandler.prototype.getTileSize = function() {
    return this.tileSize;
}

MapHandler.prototype.getNotWalkableTileIDs = function() {
    return this.tileSize;
}

MapHandler.prototype.getCanvasWidth = function() {
    return this.canvasWidth;
}

MapHandler.prototype.getCanvasHeight = function() {
    return this.canvasHeight;
}