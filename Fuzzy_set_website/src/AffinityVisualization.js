<!-- Handles the actual visualization -->
<!-- Written by Andre Gagne 2014 -->

var startup = function(dataSource) {
  var canvas = document.createElement("canvas");
  canvas.id     = "mainCanvas";
  canvas.width  = 800;
  canvas.height = 600;
  canvas.style.border   = "1px solid";

  $("#visualizationCanvasSpace").empty();
  $("#visualizationCanvasSpace").append(canvas);
  $('#visualizationCanvasSpace').css('background-color', 'white');
  
  var visualizationObjects = buildVizObjects(dataSource);
}

var buildVizObjects = function(dataSource) {
  var dataVizObjects = [];
  
  for(var i = 0; i < dataSource.getSets().length; i++){
    dataVizObjects.push(new SetViz(dataSource, dataSource.getSets()[i]));
  }
  
  return dataVizObjects;
}


var visualize = function(dataSource) {
  

}
