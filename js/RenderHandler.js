//
function RenderHandler(canvases) {
    this.canvases = canvases;
}

RenderHandler.prototype.drawBg = function(canvasLayerID, map) {
    var canvasLayer = this.canvases[canvasLayerID];
    var layerContext = canvasLayer.getContext("2d");
    layerContext.clearRect(0, 0, map.getCanvasWidth(), map.getCanvasHeight());
    
    var mapArray = map.getMap();
    
    for(var y = 0; y < mapArray.length; y++) {
        for(var x = 0; x < mapArray[y].length; x++) {
            var tile = mapArray[y][x];
            this.drawTile(layerContext, tile, x, y);
        }
    }
}

RenderHandler.prototype.drawTile = function(layerContext, tileId, x, y) {
    if(tileId === 7 || tileId === 8) {
        this.canvases[2].getContext("2d").drawImage(tilesArray[tileId], x * TILE_SIZE, y * TILE_SIZE);
        layerContext.drawImage(tilesArray[0], x * TILE_SIZE, y * TILE_SIZE);
    } else {
        layerContext.drawImage(tilesArray[tileId], x * TILE_SIZE, y * TILE_SIZE);
    }
}

RenderHandler.prototype.renderCharacters = function(canvasLayerID) {
    var layerContext = this.canvases[canvasLayerID].getContext("2d");
    
    layerContext.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    layerContext.drawImage(personHero.getSprite(), personHero.getXPos(), personHero.getYPos() - 5);
    
    layerContext.drawImage(profSprite, 13 * TILE_SIZE, (15 * TILE_SIZE) - 5);
}