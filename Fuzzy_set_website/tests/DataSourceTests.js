
describe("Tests DataSource", function() {
  var testDataSource;
  var sets;
  var member1;
  
  beforeEach(function() {
    sets = ["set1", "set2", "set3"];  //basic set of sets we'll add
    testDataSource = new DataSource(sets);
    member1 = {};
    member1["name"] = "member1";
    member1["memberships"] = [4, 3, 2];
  });
  
  describe("constructor tests", function() {
    it("should return the sets we add", function() {
      expect(testDataSource.getSets()).toEqual(sets);
    });  
  });
  
  describe("addMember tests", function() {
    it("should keep the member added to it", function() {
      testDataSource.addMember(member1);
      expect(testDataSource.getAllMembers()[0]).toEqual(member1);    
    });  
  });
  
  describe("test helper functions", function() {
    describe("getHighestAffinitySet tests", function() {
      it("should return correctly", function() {
        expect(testDataSource.getHighestAffinitySet(member1)).toEqual(0);
      });
      
      it("should return the first set if there are multiple", function() {
        member1["memberships"] = [2, 3, 3];
        expect(testDataSource.getHighestAffinitySet(member1)).toEqual(1);
      });
    });
    
    describe("getAffinity set tests", function() {
      it("should return a -1 if the set is invalid", function() {
        expect(testDataSource.getAffinityForMember(member1, "set4")).toEqual(-1);
      });
      
      it("should return the correct affinity", function() {
        expect(testDataSource.getAffinityForMember(member1, "set1")).toEqual(4);
      });      
    });
    
    describe("getAllMembers tests", function() {
      it("should return all of the members", function() {
        var member2 = {};
        member2["name"] = "member2";
        member2["memberships"] = [7, 8, 9];
        testDataSource.addMember(member1);
        testDataSource.addMember(member2);
        expect(testDataSource.getAllMembers()).toEqual([member1, member2]);
      });
    });
  });
});
