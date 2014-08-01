/**

  VizObject
  
  The main class for any objects that are visualized.

*/

function VizObject () {

  var vizObject = {
    xLocation: 0, yLocation: 0, 
    
    __constructor: function(){
      this.xLocation = 0;
      this.yLocation = 0;
    },
    
    /**
      move
      for moving the object
    */
    move: function(newX, newY) {
      this.xLocation = newX;
      this.yLocation = newY;
    },
    
    distanceToVizObject: function(otherObject) {
      var xDiff = this.xLocation - otherObject.xLocation;
      var yDiff = this.yLocation - otherObject.yLocation;
  
      return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    },

    visualize: function(context){
      throw new Error("Trying to call visualize on an abstract object");
    }
  };
  
  vizObject.__constructor();
  return vizObject;
}