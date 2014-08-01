
describe("Tests DataSource", function() {
  var testDataSource;
  var sets;
  var member1;
  var member2;
  
  beforeEach(function() {
    sets = ["set1", "set2", "set3"];  //basic set of sets we'll add
    testDataSource = new DataSource(sets);
    member1 = {};
    member1[DataSource.nameKey] = "member1";
    member1[DataSource.membershipKey] = [4, 3, 2];
  });
  
  describe("constructor tests", function() {
    it("the number of sets should be the right length", function() {
      expect(testDataSource.getSets().length).toEqual(3);
    });
    it("should return the sets we add", function() {
      expect(testDataSource.getSets()).toEqual(sets);
    });  
  });
  
  describe("addMember tests", function() {
    it("should keep the member added to it", function() {
      testDataSource.addMember(member1);
      expect(testDataSource.getAllMembers()[0]).toEqual(member1);    
    });  
    
    it("should return an error if any of the affinities are negative", function() {
      member1[DataSource.membershipKey] = [4, 3, -1];
      expect(function() {testDataSource.addMember(member1)}).toThrow(new Error("Negative membership(s) in set(s) 3"));    
    });
      
    it("should return an error if any of the affinities are negative", function() {
      member1[DataSource.membershipKey] = [4, -1, 2];
      expect(function() {testDataSource.addMember(member1)}).toThrow(new Error("Negative membership(s) in set(s) 2"));    
    });
    
    it("should return an error if any of the affinities are negative", function() {
      member1[DataSource.membershipKey] = [4, -1, -2];
      expect(function() {testDataSource.addMember(member1)}).toThrow(new Error("Negative membership(s) in set(s) 2, 3"));    
    });
    it("should attach the members to the right sets", function() {
      testDataSource.addMember(member1);
      var member2 = {};
      member2[DataSource.nameKey] = "member2";
      member2[DataSource.membershipKey] = [0, 45, 2];
      testDataSource.addMember(member2);
      
      expect(testDataSource.getMembersForSet(sets[0]).length).toEqual(1);
      expect(testDataSource.getMembersForSet(sets[1]).length).toEqual(1);
      expect(testDataSource.getMembersForSet(sets[2]).length).toEqual(0);
    });
    it("should attach the members to the right sets", function() {
      testDataSource.addMember(member1);
      var member2 = {};
      member2[DataSource.nameKey] = "member2";
      member2[DataSource.membershipKey] = [0, 45, 2];
      testDataSource.addMember(member2);
      var member3 = {};
      member3[DataSource.nameKey] = "member3";
      member3[DataSource.membershipKey] = [0, 46, 2];
      testDataSource.addMember(member3);
      var member4 = {};
      member4[DataSource.nameKey] = "member4";
      member4[DataSource.membershipKey] = [0, 49, 2];
      testDataSource.addMember(member4);
      
      expect(testDataSource.getMembersForSet(sets[0]).length).toEqual(1);
      expect(testDataSource.getMembersForSet(sets[1]).length).toEqual(3);
      expect(testDataSource.getMembersForSet(sets[2]).length).toEqual(0);
    });
    
    it("should attach the right members to the right sets", function() {
      testDataSource.addMember(member1);
      var member2 = {};
      member2[DataSource.nameKey] = "member2";
      member2[DataSource.membershipKey] = [0, 45, 2];
      testDataSource.addMember(member2);
      
      expect(testDataSource.getMembersForSet(sets[0])[0]).toEqual(member1);
      expect(testDataSource.getMembersForSet(sets[1])[0]).toEqual(member2);
    });
  });
  
  describe("test helper functions", function() {
    describe("getHighestAffinitySet tests", function() {
      it("should return correctly", function() {
        expect(testDataSource.getHighestAffinitySet(member1)).toEqual(0);
      });
      
      it("should return the first set if there are multiple", function() {
        member1[DataSource.membershipKey] = [2, 3, 3];
        expect(testDataSource.getHighestAffinitySet(member1)).toEqual(1);
      });
      
    });
    
    describe("getAffinityForMember tests", function() {
      it("should return a -1 if the set is invalid", function() {
        expect(testDataSource.getAffinityForMember(member1, "set4")).toEqual(-1);
      });
      
      it("should return the correct affinity", function() {
        expect(testDataSource.getAffinityForMember(member1, "set1")).toEqual(4);
      });      
    });
    
    describe("getAffinityForMemberPct tests", function() {
      it("should return a -1 if the set is invalid", function() {
        expect(testDataSource.getAffinityForMemberPct(member1, "set4")).toEqual(-1);
      });
      
      it("should return the correct affinity", function() {
        expect(testDataSource.getAffinityForMemberPct(member1, "set1")).toEqual(4);
      });      
    });
    
    describe("getAllMembers tests", function() {
      it("should return all of the members", function() {
        var member2 = {};
        member2[DataSource.nameKey] = "member2";
        member2[DataSource.membershipKey] = [7, 8, 9];
        testDataSource.addMember(member1);
        testDataSource.addMember(member2);
        expect(testDataSource.getAllMembers()).toEqual([member1, member2]);
      });
      
      it("should return an empty array if there aren't any members", function() {
        expect(testDataSource.getAllMembers()).toEqual([]);      
      });
    });
    
    describe("getMembersForSet() tests", function() {
      it("should return all of the members", function() {
        var member2 = {};
        member2[DataSource.nameKey] = "member2";
        member2[DataSource.membershipKey] = [7, 8, 9];
        testDataSource.addMember(member1);
        testDataSource.addMember(member2);
        expect(testDataSource.getAllMembers()).toEqual([member1, member2]);
      });
      
      it("should return an empty array if there aren't any members", function() {
        expect(testDataSource.getAllMembers()).toEqual([]);      
      });
    });
  });
});
