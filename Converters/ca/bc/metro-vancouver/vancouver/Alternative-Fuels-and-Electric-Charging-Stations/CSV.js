/*This file was created for Terratap-Technologies-Inc by Cody Clattenburg, Sam Collins, Martin Suryadi, and Sergio Josue Villegas. This file is under the protection of the Apache 2.0 License.*/
/*VANCOUVER - ALTERNATIVE FUEL STATIONS*/

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

    /*Convert Data Here*/
    for (var i = 0; i < obj.length; i++) {
      obj[i].ACCESS = 'Public';
    }
    for (var i = 0; i < obj.length; i++) {
      obj[i].FUEL = 'Electric';
    }

    /*Default Override*/
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].ADDRESS == "")
      obj[i].ADDRESS = "Address Unavailable";
    }
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].LOT_OPERATOR == "")
      obj[i].LOT_OPERATOR = "Name Unavailable";
    }

    /*Writing Loop*/
    var content = '[' + ppNL;
    for (var i = 0; i < obj.length; i++) {

      /*CSV Newline Fix*/
      if (obj[i].LONGITUDE == undefined) {
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
      + ppNL + ppTB + ppTB + ',"coordinates": ' + '[' + obj[i].LATITUDE + ', ' + obj[i].LONGITUDE + ']'
      + ppNL + ppTB + '}'
      + ppNL + ppTB + ',"properties": ';

      content += '{'
      + ppNL + ppTB + ppTB + '"fT": "' + obj[i].FUEL + '"'
      + ppNL + ppTB + ppTB + ',' + '"nm": "' + obj[i].LOT_OPERATOR + '"'
      + ppNL + ppTB + ppTB + ',' + '"adr": "' + obj[i].ADDRESS + '"'
      + ppNL + ppTB + ppTB + ',' + '"ac": "' + obj[i].ACCESS + '"'
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

  /*Remove Quotations*/
  var p = csv.search('\"');
  while(p != -1) {
    csv = csv.slice(0, p) + csv.slice(p + 1, csv.length);
    p = csv.search('\"');
  }

  /*Split into Array*/
  var lines = csv.split('\r\n');
  var result = [];
  var headers = lines[0].split(',');
  headers[3] = 'ADDRESS'

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
