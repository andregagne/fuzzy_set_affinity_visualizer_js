
describe("TextFileLoader", function() {
  describe("Test 'loadFile'", function(){
    beforeEach(function() {
      sinon.stub(jQuery, "ajax");    
    });
    
    afterEach(function() {
      jQuery.ajax.restore();
    });

    it("Should load call AJAX for a file", function() {
      var fileLocation = "testLocation";      
      loadFile(fileLocation);    
      expect(jQuery.ajax).toHaveBeenCalledWithMatch({ url: fileLocation });
    });
  });
  
  describe("Test 'convertTextFile'", function(){  
    it("Should fail a blank file", function() {
      var testData = "";
      expect(function() {convertTextFile(testData)}).toThrow(new Error("File was empty"));
    });
    
    it("Should throw an error if the file is only one line", function() {
      var testData = "Blah\tslkjd\t";
      expect(function() {convertTextFile(testData)}).toThrow(new Error("File is only one line"));
    });
    
    it("Should throw an error if the file is missing headers", function() {
      var testData = "Blah\t20\t40\t50\nBoo\t33\t44\t55";
      expect(function() {convertTextFile(testData)}).toThrow(new Error("File is missing set names"));
     });
     
    it("Should throw an error if the header is missing data", function() {
      var testData = "Names\tGroup1\t\t\nDatum1\t2\t3\t4";
      expect(function() {convertTextFile(testData)}).toThrow(new Error("File is missing set names"));
    });
     
    describe("Tests for mismatch between header and data", function() {
      it("Should throw an error if there are too few data points", function() {
        var testData = "Names\tGroup1\tGroup2\tGroup3\nDatum1\t3\t2\n";
        expect(function() {convertTextFile(testData)}).toThrow(new Error("Too few data points in the file for line Datum1 was expecting 3 but got 2"));
      });
      
      it("Should throw an error if there no data points", function() {
        var testData = "Names\tGroup1\tGroup2\tGroup3\nDatum1\n";
        expect(function() {convertTextFile(testData)}).toThrow(new Error("Too few data points in the file for line Datum1 was expecting 3 but got 0"));
      });
      
      it("Should throw an error if there are too many data points", function() {
        var testData = "Names\tGroup1\tGroup2\nDatum1\t3\t5\t6\t7\n";
        expect(function() {convertTextFile(testData)}).toThrow(new Error("Too many data points in the file for line Datum1"));
      });
    });
    
    describe("Tests that the lines are read properly", function() {
      it("Should read lines with an extra tab the same", function() {
        var testData1 = "Names\tGroup1\tGroup2\tGroup3\nDatum1\t2\t3\t4\t",
            testData2 = "Names\tGroup1\tGroup2\tGroup3\nDatum1\t2\t3\t4";            
        expect(convertTextFile(testData1)).toEqual(convertTextFile(testData2));      
      });
      
      it("Should interpret empty data points as 0", function() {
        var testData1 = "Names\tGroup1\tGroup2\tGroup3\nDatum1\t\t\t",
            testData2 = "Names\tGroup1\tGroup2\tGroup3\nDatum1\t0\t0\t0";            
        expect(convertTextFile(testData1)).toEqual(convertTextFile(testData2));
      });
      
      it("Should ignore an extra \n", function() {
        var testData1 = "Names\tGroup1\tGroup2\tGroup3\nDatum1\t0\t0\t0\n",
            testData2 = "Names\tGroup1\tGroup2\tGroup3\nDatum1\t0\t0\t0";            
        expect(convertTextFile(testData1)).toEqual(convertTextFile(testData2));
      });

      describe("tests that the values for the members are integers", function() {
        it("Should throw an error if the value is a float", function() {
          var testData = "Names\tGroup1\tGroup2\nDatum1\t3\t7.4";
          expect(function() {convertTextFile(testData)}).toThrow(new Error("Data in line Datum1 isn't an integer"));
        });
        it("Should throw an error if the value is a string or character", function() {
          var testData = "Names\tGroup1\tGroup2\nDatum1\t3\tlkj";
          expect(function() {convertTextFile(testData)}).toThrow(new Error("Data in line Datum1 isn't an integer"));
        });
      });
    });
    
    describe("Should parse the data in the line properly", function() {
      it("Should return a proper dataSource object", function() {
        var testData1 = "Names\tGroup1\tGroup2\tGroup3\nDatum1\t0\t0\t0\n";
        //want json data to look like this:
        // {{"sets":["Group1","Group2","Group3"]}, {"members":[{"name":"Datum1"},{"memberships:[0,0,0]}]}}
        //set names
        var setArray = ["Group1", "Group2", "Group3"];
        var dataSource = new DataSource(setArray);

        //member stuff
        var memberships = [0,0,0];
        var memberData = {};
        memberData["name"] = "Datum1";
        memberData["memberships"] = memberships;
        
        dataSource.addMember(memberData);
        
        expect(convertTextFile(testData1)).toEqual(dataSource);
      });    
    });
  });
});
