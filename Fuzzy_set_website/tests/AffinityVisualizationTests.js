
describe("Tests AffinityVisualization", function() {
  var testDataSource;
  var member1;
  var member2;
  
  beforeEach(function() {
    sets = ["set1", "set2", "set3"];  //basic set of sets we'll add
    testDataSource = new DataSource(sets);
    member1 = {};
    member1[DataSource.nameKey] = "member1";
    member1[DataSource.membershipKey] = [4, 3, 2];
    testDataSource.addMember(member1);
    member2 = {};
    member2[DataSource.nameKey] = "member2";
    member2[DataSource.membershipKey] = [0, 40, 39];
    testDataSource.addMember(member2);
  });
  
  describe("buildVizObjects tests", function() {
    it("should have the correct number of setsViz's", function() {
      expect(buildVizObjects(testDataSource).length).toEqual(3);
    }); 
    it("should have the correct setViz's", function() {
      expect(buildVizObjects(testDataSource)[0].setName).toEqual("set1");
      expect(buildVizObjects(testDataSource)[1].setName).toEqual("set2");
      expect(buildVizObjects(testDataSource)[2].setName).toEqual("set3");
    });
  });
  
  describe("move tests", function() {
    it("should return the right sets with the right member objects", function() {
      expect(buildVizObjects(testDataSource)[0].getVizMembers().length).toEqual(1);
      expect(buildVizObjects(testDataSource)[1].getVizMembers().length).toEqual(1);
      expect(buildVizObjects(testDataSource)[2].getVizMembers().length).toEqual(0);
      expect(buildVizObjects(testDataSource)[0].getVizMembers()[0].memberObject).toEqual(member1);
      expect(buildVizObjects(testDataSource)[1].getVizMembers()[0].memberObject).toEqual(member2);   
    });
  });
});
