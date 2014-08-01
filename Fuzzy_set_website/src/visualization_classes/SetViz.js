/**

  SetViz
  
  This is the visualization for a single set.  
  It should contain all of the member visualization objects (if it needs them) or visualize a heatmap.
  
 */
 
 function SetViz(dataSource, setName){
  if(typeof setName != "string"){
    throw new Error("the set name wasn't a string, was a " + setName);
  }
  var setVizObject = VizObject();
  setVizObject.dataSource = dataSource;
  setVizObject.vizMemberObjs = [];
  setVizObject.setName = setName;
  
  SetViz.radius = 50;
  SetViz.coreRadius = 5;
  SetViz.coreColor = [0,0,255];  //colors will always be in RGB
  SetViz.color = [0,255,0];
  SetViz.memberColor = [255,255,255];
  SetViz.memberAlpha = 100;
  SetViz.memberRadius = 3;
  SetViz.useHeatmaps = false;
  
  setVizObject.getVizMembers = function(){
    return this.vizMemberObjs;
  };
  
  setVizObject.visualizeCore = function(context){
    context.save();
    
    context.arc(this.xLocation, this.yLocation, SetViz.radius, 0, 2 * Math.PI, false);
    context.fillStyle = "argb(" + SetViz.coreColor[0] + ", " + SetViz.coreColor[1] + ", " + SetViz.coreColor[2] + ", " + "255)";
    context.fill();    
    context.restore();  
  }
 
  setVizObject.visualize = function(context){
    visualizeCore(context);
    
    context.save();
    context.translate(this.xLocation, this.yLocation);
    
    //All of the dots that are the members have the same shape, only their x,y locations are different.  
    //As a result we need only set the fillstyle once
    context.fillStyle = "argb(" + SetViz.memberColor[0] + ", " + SetViz.memberColor[1] + ", " + SetViz.memberColor[2] + ", " + SetViz.memberAlpha + ")";
   
    for(i = 0; i < members.length; i++){
      context.beginPath();
      context.arc(members[i].xLocation, members[i].yLocation, this.memberRadius, 0, 2 * Math.PI, false);
      context.fill(); 
    }
    context.restore();
  };
  
  setVizObject.__constructor = function(dataSource, setName){
    var members = dataSource.getMembersForSet(setName);
    for(i = 0; i < members.length; i++){
      this.vizMemberObjs.push(MemberViz(members[i]));    
    }  
    
    setVizObject.arrangeMembers();
  };
  
  setVizObject.arrangeMembers = function(){
    var blar = 0;
    
    
  }
  
  setVizObject.__constructor(dataSource, setName);
  
  return setVizObject;  
}