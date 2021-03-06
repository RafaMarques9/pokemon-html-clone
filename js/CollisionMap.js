class CollisionMap {
    constructor(mapHandler, characters) {
        this.mapHandler = mapHandler;
        this.characters = characters;
    }
    
    getPosition(isY, x, y, move) {
        var newPosition = isY ? y : x;
        var tryPosition = isY ? y + move : x + move;
        
        var destinyTileId;
        var map = this.mapHandler.getMap();
        var tileSize = this.mapHandler.getTileSize();
        var notWalkableId = this.mapHandler.getNotWalkableTileIDs();
        
        var newX;
        var newY;
        
        if(isY) {
            destinyTileId = map[(y + move) / tileSize][x / tileSize];
            newX = x;
            newY = y + move;
        } else {
            destinyTileId = map[y / tileSize][(x + move) / tileSize];
            newX = x + move;
            newY = y;
        }
        
        var isCharacterOnNextTile = this.characterOnNextTile(newX, newY, false);
        
        console.log("destinyTileId: " + destinyTileId);
        
        if(!isCharacterOnNextTile && isY && jQuery.inArray(destinyTileId, notWalkableId) == -1) {
            newPosition = y + move;
        } else if(!isCharacterOnNextTile && !isY && jQuery.inArray(destinyTileId, notWalkableId) == -1) {
            newPosition = x + move;
        }
        
        return newPosition;
    }
    
    characterOnNextTile(x, y, isDialog) {
        for(var i = 0; i < this.characters.length; i++) {
            if((x == this.characters[i].getXPos()) && (y == this.characters[i].getYPos()) && !("Brendan" == this.characters[i].getName())) {
                if(isDialog) {
                    return this.characters[i];
                } else {
                    return true;
                }
            }
        }
        
        return false;
    }
}