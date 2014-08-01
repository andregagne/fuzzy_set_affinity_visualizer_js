/**

  SetViz
  
  This is the visualization for a single set.  
  It should contain all of the member visualization objects (if it needs them) or visualize a heatmap.
  
 */
 
 function MemberViz(memberObject){
  var memberViz = VizObject();
  memberViz.memberObject = memberObject;
  memberViz.radius = 3;
  
  return memberViz;
 }