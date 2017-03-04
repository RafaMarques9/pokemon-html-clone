class CollisionMap {
    constructor(mapHandler) {
        this.mapHandler = mapHandler;
    }
    
    getPosition(isY, x, y, move) {
        var newPosition = isY ? y : x;
        var tryPosition = isY ? y + move : x + move;
        
        var destinyTileId;
        var map = this.mapHandler.getMap();
        var tileSize = this.mapHandler.getTileSize();
        var notWalkableId = this.mapHandler.getNotWalkableTileIDs();
        
        if(isY) {
            destinyTileId = map[(y + move) / tileSize][x / tileSize];
        } else {
            destinyTileId = map[y / tileSize][(x + move) / tileSize];
        }
        
        if(isY && jQuery.inArray(destinyTileId, notWalkableId) == -1) {
            newPosition = y + move;
        } else if(!isY && jQuery.inArray(destinyTileId, notWalkableId) == -1) {
            newPosition = x + move;
        }
        
        return newPosition;
    }
}