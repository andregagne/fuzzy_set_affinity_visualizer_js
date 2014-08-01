describe("Tests setVizObj", function() {
  var setVizObj;
  var dataSet;
  var memberObj;
  
  beforeEach(function() {
    dataSet = new DataSource(["Set1", "Set2", "Set3"]);
    memberObj = {};
    memberObj[DataSource.nameKey] = "member1";
    memberObj[DataSource.membershipKey] = [50, 3, 60];
    dataSet.addMember(memberObj);
    setVizObj = new SetViz(dataSet, "Set3");
  });
  
  describe("constructor tests", function() {
    it("should have the x, y locations set to 0", function() {
      expect(setVizObj.xLocation).toEqual(0);
      expect(setVizObj.yLocation).toEqual(0);
    }); 
    it("should have the dataSource", function(){
      expect(setVizObj.dataSource).toEqual(dataSet);
    });
    it("should have the correct number of member viz objects", function() {
      expect(setVizObj.getVizMembers().length).toEqual(1);
    });
    it("should have a member if the member has the highest affinity to it", function() {
      expect(setVizObj.getVizMembers()[0].memberObject).toEqual(memberObj);
    });
    
    it("should have all of the members that have the highest affinity to it", function() {
      var memberObj2 = {};
      memberObj2[DataSource.nameKey] = "member2";
      memberObj2[DataSource.membershipKey] = [50, 3, 63];
      dataSet.addMember(memberObj2);
      var memberObj3 = {};
      memberObj3[DataSource.nameKey] = "member3";
      memberObj3[DataSource.membershipKey] = [70, 3, 60];
      dataSet.addMember(memberObj3);
      
      setVizObj = new SetViz(dataSet, "Set3");
    
      expect(setVizObj.getVizMembers().length).toEqual(2);
      expect(setVizObj.getVizMembers()[0].memberObject).toEqual(memberObj);
      expect(setVizObj.getVizMembers()[1].memberObject).toEqual(memberObj2);
    });
  });
  
  describe("move tests", function() {
    it("should update the x direction", function() {
      setVizObj.move(2, 0);
      expect(setVizObj.xLocation).toEqual(2);
      expect(setVizObj.yLocation).toEqual(0);
    });   
  });
});
