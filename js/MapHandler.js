// 
function MapHandler(map, notWalkableTileIDs, canvasOptions) {
    this.map = map;
    this.notWalkableTileIDs = notWalkableTileIDs;
    this.canvasOptions = canvasOptions;
}

MapHandler.prototype.getMap = function() {
    return this.map;
}

MapHandler.prototype.getTileSize = function() {
    return this.canvasOptions.tileSize;
}

MapHandler.prototype.getNotWalkableTileIDs = function() {
    return this.notWalkableTileIDs;
}

MapHandler.prototype.getCanvasWidth = function() {
    return this.canvasOptions.width;
}

MapHandler.prototype.getCanvasHeight = function() {
    return this.canvasOptions.height;
}