/*This file was created for Terratap-Technologies-Inc by Cody Clattenburg, Sam Collins, Martin Suryadi, and Sergio Josue Villegas. This file is under the protection of the Apache 2.0 License.*/
/*VANCOUVER - PUBLIC ART*/

/*Declare Variables*/
var fs = require('fs');
var obj;
var inputPath = 'in.csv';
var outputPath = 'out.json';
var prettyPrint = 0; /*Setting this to 1 or TRUE formats the output with indentation.*/
var ppNL = '';
var ppTB = '';

/*Read the file and send to the callback*/
fs.readFile(inputPath, handleFile)

/*Write the callback function*/
function handleFile(err, data) {

    if (err) throw err
    obj = JSON.parse(csvJSON(data.toString()));

    if (prettyPrint == 1) {
      ppNL = '\n';
      ppTB = '\t';
    }

    /*Default Override*/
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].Title == "")
        obj[i].Title = "Name Unavailable";
    }
    for (var i = 0; i < obj.length; i++) {
      //if (obj[i].ARTIST_NAME == "")
        obj[i].ARTIST_NAME = "Artist Name Unavailable";
    }
    for (var i = 0; i < obj.length; i++) {
      //if (obj[i].MEDIUM == "")
        obj[i].MEDIUM = "Art Type Unavailable";
    }
    for (var i = 0; i < obj.length; i++) {
      //if (obj[i].AT_A_GLANCE == "")
        obj[i].AT_A_GLANCE = "Summary Unavailable";
    }
    for (var i = 0; i < obj.length; i++) {
      //if (obj[i].DESCRIPTION == "")
        obj[i].DESCRIPTION = "Description Unavailable";
    }
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].Address == "")
        obj[i].Address = "Address Unavailable";
    }

    /*Writing Loop*/
    var content = '[' + ppNL;
    for (var i = 0; i < obj.length; i++) {

      /*CSV Newline Fix*/
      if (obj[i].X == undefined) {
        while (content.slice(-1) == '\n' || content.slice(-1) == ',') {
          content = content.slice(0, -1);
        }
        continue;
      }

      /*Write to out.json*/
      content += '{'
      + ppNL + ppTB + '"type": "Feature"'
      + ppNL + ppTB + ',"geometry": {'
      + ppNL + ppTB + ppTB + '"type": "Point"'
      + ppNL + ppTB + ppTB + ',"coordinates": ' + '[' + obj[i].Y + ', ' + obj[i].X + ']'
      + ppNL + ppTB + '}'
      + ppNL + ppTB + ',"properties": ';

      content += '{'
      + ppNL + ppTB + ppTB + '"nm": "' + obj[i].Title + '"'
      + ppNL + ppTB + ppTB + ',' + '"aNm": "' + obj[i].ARTIST_NAME + '"'
      + ppNL + ppTB + ppTB + ',' + '"type": "' + obj[i].MEDIUM + '"'
      + ppNL + ppTB + ppTB + ',' + '"summ": "' + obj[i].AT_A_GLANCE + '"'
      + ppNL + ppTB + ppTB + ',' + '"desc": "' + obj[i].DESCRIPTION + '"'
      + ppNL + ppTB + ppTB + ',' + '"adr": "' + obj[i].Address + '"'
      + ppNL + ppTB + '}'
      + ppNL + '}';

      if (i < obj.length - 1) {
        content += ppNL + ',';
      }
    }
    content += ppNL + ']';

    /*Save File*/
    fs.writeFile(outputPath, content, 'utf8', function (err) {
      if (err) {
          return console.log(err);
      }

      /*Print File Status*/
      console.log("The file was converted!");
    });
}

/*CSV to JSON Function*/
function csvJSON(csv) {

  /*Remove Quotations & Commas(Commented out since homebrew dataset)*/
  /*var inQuote = 0;
  for (var i = 0; i < csv.length; i++) {
    if (csv[i] == '\"') {
      csv = csv.slice(0, i) + csv.slice(i + 1, csv.length);
      inQuote = inQuote * -1 + 1;
      i--;
      continue;
    }
    if (csv[i] == ',' && inQuote == 1) {
      csv = csv.slice(0, i) + csv.slice(i + 1, csv.length);
      i--;
      continue;
    }
    if (i < csv.length - 1 && inQuote == 0 && csv[i] == ',' && csv[i + 1] == ' ') {
      csv = csv.slice(0, i + 1) + csv.slice(i + 2, csv.length);
      i--;
      continue;
    }
  }*/

  /*Split into Array*/
  var lines = csv.split('\n');
  var result = [];
  var headers = lines[0].split(',');

  /*Parse CSV to JSON*/
  for(var i = 1;i < lines.length; i++) {
	  var obj = {};
	  var currentline = lines[i].split(',');
	  for(var j = 0;j < headers.length; j++) {
		  obj[headers[j]] = currentline[j];
	  }
	  result.push(obj);
  }

  return JSON.stringify(result);
}
