<!-- Handles the actual visualization -->
<!-- Written by Andre Gagne 2014 -->

/**

  DataSource
  
  this class is the data source for the visualization.

*/

var membershipKey = "memberships", setKey = "set", nameKey = "name";

function DataSource (sets){
  this.sets = sets;
  this.setMembers = {};
  for( i = 0; i < sets.length; i++){
    this.setMembers[sets[i]] = [];
  }
}

DataSource.prototype.getMembersForSet = function(setName){
  if(sets.indexOf(setName) < 0 ){
    throw new Error("the set " + setName + " does not exist");
  }
  
  return this.setMembers[setName];  
}

DataSource.prototype.getSets = function(){
  return this.sets;
}

DataSource.prototype.addMember = function(member) {

  //the following piece is to check for negative membership values.  I don't expect any but they're critical enough.
  var negatives = [];
  for( i = 0; i < member[membershipKey].length; i++){
      if(member[membershipKey][i] < 0) {
        negatives.push(i + 1);
      }
  }  
  
  if(negatives.length > 0) {
    var errorString = "Negative membership(s) in set(s) ";
    for( i = 0; i < negatives.length - 1; i++) {
      errorString = errorString + negatives[i] + ", ";
    }
    errorString = errorString + negatives[i];
    throw new Error(errorString);
  }
  
  var setIndex = this.getHighestAffinitySet(member);
  
  this.setMembers[this.sets[setIndex]].push(member);  
}

DataSource.prototype.getAffinityForMember = function(member, setName){
  var setIndex = this.sets.indexOf(setName);
  if(setIndex < 0 ){
    return -1;
  }
  
  return member[membershipKey][setIndex];
}

DataSource.prototype.getHighestAffinitySet = function(member){
  var maxAffinity = -1;
  var maxSetIndex = -1;
  
  for(i = 0; i <this.sets.length; i++){
    var affinity = member[membershipKey][i];
    if(affinity > maxAffinity){
      maxAffinity = affinity;
      maxSetIndex = i;
    }
  }
  return maxSetIndex;  
}

DataSource.prototype.getAllMembers = function(){
  var allMembers = [];
  
  for( i = 0; i < this.sets.length; i++){
    allMembers = allMembers.concat(this.setMembers[this.sets[i]]);
  }
  
  return allMembers;
}
