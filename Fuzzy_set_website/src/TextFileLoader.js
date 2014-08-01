<!-- this script is designed to handle converting tab delimited files into JSON objects -->
<!-- Written by Andre Gagne 2014 -->

var DELIMITER = "\t";
var END_LINE_CHARS = "\n";

/**
  convertTextFile
  
  we expect the data to be in the format of the following:
  
          header1 \t  header2  \t  header3 (\t) \n
  Datum1  3       \t  40       \t  89      (\t) \n
  Datum1  48      \t  90       \t  45      (\t)(\n)
  
  we will test all other possibilities.
  empty data points will be interpreted as 0 
  
  output will be a JSON object that looks like the following:
  { {sets: ["header1", "header2", "header3"]}, 
    {members: [{{name: Datum1}, {memberships: [3, 40, 89]}}, 
              {{name: Datum2}, {memberships: [48, 90, 45]}}]
    }
  }

*/
convertTextFile = function(textFileData) {
  var fileDataSource;
  var lastChar = 0, numLines = 0;   // How much have we already processed?
  
  //check for empty file
  if(textFileData.length == 0){
    throw new Error("File was empty");
  }
  
  if(textFileData.indexOf(END_LINE_CHARS) < 0){
    throw new Error("File is only one line");
  }
  
  if(textFileData.indexOf("\r\n") > 0 ) {  //checking to see if the file is windows or not
    END_LINE_CHARS = "\r\n";
  }
  
  var csvLines = textFileData.split(END_LINE_CHARS);
  var setNames = csvLines[0].split(DELIMITER);
  var checkedSetNames = [];
  
  //here we run through the setNames and add them as sets to the JSON objects
  for (var i = 0; i < setNames.length; i++) {
    var nameInt = parseInt(setNames[i]);
    var nameFloat = parseFloat(setNames[i]);
    
    if(isNaN(nameInt) && isNaN(nameFloat) && setNames[i] != ""){
      checkedSetNames.push(setNames[i]);
    } else {
      throw new Error("File is missing set names");
    }
  }
  
  checkedSetNames.shift();  //remove the "names" column from the headers
  
  fileDataSource = new DataSource(checkedSetNames);

  var members = [];
  for (var i=1; i<csvLines.length; i++) {
    var lineData = csvLines[i].split(DELIMITER);
    var memberObject = {};
    
    if(lineData.length == 0){
      throw new Error("A line in the file is empty");
    }
    
    if (i == (csvLines.length -1) && lineData.length == 1 && lineData[0] == "") {
      break;
    }   
    
    memberObject[DataSource.nameKey] = lineData.shift();  
    
    if (lineData.length >= checkedSetNames.length) {
      var membershipValues = [];
      for (var j=0; j<lineData.length; j++) {
        var membership = parseInt(lineData[j]);
        if(j >= checkedSetNames.length) { //check to see if there are too many items
          if(lineData[j] != "") {//only too many items if it's anything other than blank
            throw new Error("Too many data points in the file for line " + memberObject[DataSource.nameKey]);
          } 
        } else {     
          //So we know we're good and these will line up with sets
          if(lineData[j] == ""){  //if the value area is blank, we assume 0
            membershipValues.push(0);
          } else if(/^[0-9]+$/.test(lineData[j])) {  //we check to see if it's just an integer
            membershipValues.push(membership);
          } else { //if it's something else we fail it
            throw new Error("Data in line " + memberObject[DataSource.nameKey] + " isn't an integer");
          }
        }
      }
      memberObject[DataSource.membershipKey] = membershipValues;
      fileDataSource.addMember(memberObject);
    } else {
      throw new Error("Too few data points in the file for line " + memberObject[DataSource.nameKey] + 
                      " was expecting " + checkedSetNames.length + " but got " + lineData.length);
    }
  }
  return fileDataSource;
}

var convertFileAndLoadVisualization = function (fileData){
  console.log("Converting the file");
  var dataSources = convertTextFile(fileData);
  console.log("loading into the dataViz");
  $("#visualizationSpace").load("visualization_canvas.html", function() {
    startup(dataSources);
  });  
  
}

var loadFile = function (fileLocation){
    
    //TODO: add in a file for loading the DataSource file
    $.ajax({
      url: dataSourceFileLocation,
      dataType: "script"
    });
    
    //
    $.ajax({
        type: "GET",
        url: fileLocation,
        dataType: "text",
        success: function(data) {convertFileAndLoadVisualization(data);}
     });
}

var dataSourceFileLocation = "./src/DataSource.js";
var exampleFileLocation = "../sample_files/Generated_sample_5_Sets_4000_Samples.txt";

window.addEventListener("DOMContentLoaded", loadFile(exampleFileLocation), false);