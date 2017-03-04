//
function RenderHandler(canvasOptions) {
    this.canvasOptions = canvasOptions;
}

/* 
* TODO: update
* Diese Funktion zeichnet nicht direkt sondern ruft die drawTile funktion auf
* 
*/
RenderHandler.prototype.drawBg = function(canvasLayerID, map) {
    var canvasLayerContext = this.canvasOptions.canvas1.getContext("2d");
    
    canvasLayerContext.clearRect(0, 0, this.canvasOptions.width, this.canvasOptions.height);
    
    var mapArray = map.getMap();
    
    for(var y = 0; y < mapArray.length; y++) {
        for(var x = 0; x < mapArray[y].length; x++) {
            var tile = mapArray[y][x];
            this.drawTile(tile, x, y);
        }
    }
}

RenderHandler.prototype.drawTile = function(tileId, x, y) {
    if(tileId === 7 || tileId === 8) {
        this.canvasOptions.canvas3.getContext("2d").drawImage(tilesArray[tileId], x * canvasOptions.tileSize, y * canvasOptions.tileSize);
        
        this.canvasOptions.canvas1.getContext("2d").drawImage(tilesArray[0], x * canvasOptions.tileSize, y * canvasOptions.tileSize);
    } else {
        this.canvasOptions.canvas1.getContext("2d").drawImage(tilesArray[tileId], x * canvasOptions.tileSize, y * canvasOptions.tileSize);
    }
}

/*
* TODO: Funktion erweitern
* Diese Funktion soll alle Charactere auf die Map zeichnen
* Muss noch mit dem neuen canvasOptions erweitert werden. 
*/
RenderHandler.prototype.drawCharacters = function(characters) {
    var canvasLayerContext = this.canvasOptions.canvas2.getContext("2d");
    
    canvasLayerContext.clearRect(0, 0, this.canvasOptions.width, this.canvasOptions.height);
    
    for(var i = 0; i < characters.length; i++) {   
        canvasLayerContext.drawImage(characters[i].getSprite(), characters[i].getXPos(), characters[i].getYPos() - 5);
    }
    
}