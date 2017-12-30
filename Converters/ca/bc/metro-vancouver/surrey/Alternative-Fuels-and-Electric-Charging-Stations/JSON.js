/*This file was created for Terratap-Technologies-Inc by Cody Clattenburg, Sam Collins, Martin Suryadi, and Sergio Josue Villegas. This file is under the protection of the Apache 2.0 License.*/
/*SURREY - ALTERNATIVE FUEL STATIONS*/

/*Declare variables*/
var fs = require('fs');
var obj;
var inputPath = 'in.json';
var outputPath = 'out.json';
var prettyPrint = 0; /*Setting this to 1 or TRUE formats the output with indentation.*/
var ppNL = '';
var ppTB = '';

/*Read the file and send to the callback*/
fs.readFile(inputPath, handleFile)

/*Write the callback function*/
function handleFile(err, data) {

    if (err) throw err
    obj = JSON.parse(data)

    if (prettyPrint == 1) {
      ppNL = '\n';
      ppTB = '\t';
    }

    /*Convert Data Here*/
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].ACCESS == 'Publically Accessible - Free') {
        obj[i].ACCESS = 'Public';
      }
    }
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].FUEL == 'Electric (240 Volt)') {
        obj[i].FUEL = 'EV Level 2';
      }
    }
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].FUEL == 'DC Fast Charge (DCFC)') {
        obj[i].FUEL = 'EV Level 3(DCFC)';
      }
    }

    /*Re-Parse Data Here*/
    var content = '[' + ppNL;
    for (var i = 0; i < obj.length; i++) {
      content += '{'
      + ppNL + ppTB + '"type": "Feature"'
      + ppNL + ppTB + ',"geometry": {'
      + ppNL + ppTB + ppTB + '"type": "Point"'
      + ppNL + ppTB + ppTB + ',"coordinates": ' + '[' + obj[i].LATITUDE + ', ' + obj[i].LONGITUDE + ']'
      + ppNL + ppTB + '}'
      + ppNL + ppTB + ',"properties": ';

      content += '{'
      + ppNL + ppTB + ppTB + '"fT": "' + obj[i].FUEL + '"'
      + ppNL + ppTB + ppTB + ',' + '"nm": "' + obj[i].NAME + '"'
      + ppNL + ppTB + ppTB + ',' + '"adr": "' + obj[i].LOCATION + '"'
      + ppNL + ppTB + ppTB + ',' + '"ac": "' + obj[i].ACCESS + '"'
      + ppNL + ppTB + '}'
      + ppNL + '}';

      if (i < obj.length - 1) {
        content += ppNL + ',';
      }
    }
    content += ppNL + ']';

    fs.writeFile(outputPath, content, 'utf8', function (err) {
      if (err) {
          return console.log(err);
      }

      console.log("The file was converted!");
    });
}
