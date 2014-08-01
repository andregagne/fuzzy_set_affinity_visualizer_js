
describe("Tests VizObject", function() {
  var vizObject;
  var dataSet;
  
  beforeEach(function() {
    dataSet = new DataSource(["test"]);
    vizObject = new VizObject(dataSet);
  });
  
  describe("constructor tests", function() {
    it("should have the x, y locations set to 0", function() {
      expect(vizObject.xLocation).toEqual(0);
      expect(vizObject.yLocation).toEqual(0);
    }); 
  });
  
  describe("move tests", function() {
    it("should update the x direction", function() {
      vizObject.move(2, 0);
      expect(vizObject.xLocation).toEqual(2);
      expect(vizObject.yLocation).toEqual(0);
    }); 
    it("should update the y direction", function() {
      vizObject.move(0, 2);
      expect(vizObject.xLocation).toEqual(0);
      expect(vizObject.yLocation).toEqual(2);
    });     
    it("should update the x and y directions", function() {
      vizObject.move(2, 5);
      expect(vizObject.xLocation).toEqual(2);
      expect(vizObject.yLocation).toEqual(5);
    });
    it("should be ok with negative numbers", function() {
      vizObject.move(-2, -5);
      expect(vizObject.xLocation).toEqual(-2);
      expect(vizObject.yLocation).toEqual(-5);
    });    
  });
  
  describe("distance to vizObject tests", function() {
    it("should get the distance right", function() {
      otherObject = new VizObject();
      vizObject.move(3, 4);
      expect(vizObject.distanceToVizObject(otherObject)).toEqual(5);
    });    
  });
});
