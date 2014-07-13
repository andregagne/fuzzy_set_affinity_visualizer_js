<!-- Handles the actual visualization -->
<!-- Written by Andre Gagne 2014 -->

var startup = function(fileData) {
  var canvas = document.createElement("canvas");
  canvas.id     = "mainCanvas";
  canvas.width  = 800;
  canvas.height = 600;
  canvas.style.border   = "1px solid";

  $("#visualizationCanvasSpace").empty();
  $("#visualizationCanvasSpace").append(canvas);
  $('#visualizationCanvasSpace').css('background-color', 'white');
}
