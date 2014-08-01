describe("Tests MemberVizObj", function() {
  var memberVizObj;
  var memberObj;
  
  beforeEach(function() {
    memberObj = {};
    memberObj[DataSource.nameKey] = "member1";
    memberObj[DataSource.membershipKey] = [50, 3, 60];
    memberVizObj = new MemberViz(memberObj);
  });
  
  describe("constructor tests", function() {
    it("should have the x, y locations set to 0", function() {
      expect(memberVizObj.xLocation).toEqual(0);
      expect(memberVizObj.yLocation).toEqual(0);
    }); 
    it("should return the member object it was instantiated with", function() {
      expect(memberVizObj.memberObject).toEqual(memberObj);
    });
    
  });
  
  describe("move tests", function() {
    it("should update the x direction", function() {
      memberVizObj.move(2, 0);
      expect(memberVizObj.xLocation).toEqual(2);
      expect(memberVizObj.yLocation).toEqual(0);
    });  
  });
});
