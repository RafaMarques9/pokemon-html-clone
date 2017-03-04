class MapHandler {
    constructor(map, notWalkableTileIDs, canvasOptions) {
        this.map = map;
        this.notWalkableTileIDs = notWalkableTileIDs;
        this.canvasOptions = canvasOptions;
    }
    
    getMap() {
        return this.map;
    }
    
    getTileSize() {
        return this.canvasOptions.tileSize;
    }
    
    getNotWalkableTileIDs() {
        return this.notWalkableTileIDs;
    }
    
    /* TODO: 
    *  Is this function really needed here in the MapHandler?
    */
    getCanvasWidth() {
        return this.canvasOptions.width;
    }
    
    /* TODO: 
    *  Is this function really needed here in the MapHandler?
    */
    getCanvasHeight() {
        return this.canvasOptions.height;
    }
}