/*This file was created for Terratap-Technologies-Inc by Cody Clattenburg, Sam Collins, Martin Suryadi, and Sergio Josue Villegas. This file is under the protection of the Apache 2.0 License.*/
/*SURREY - PUBLIC ART*/

/*Declare Variables*/
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
    obj = JSON.parse(data);

    if (prettyPrint == 1) {
      ppNL = '\n';
      ppTB = '\t';
    }

    /*Default Override*/
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].ARTWORK == "")
      obj[i].ARTWORK = "Name Unavailable";
      if (obj[i].ARTWORK.search("The Legacy of") != -1)
      obj[i].ARTWORK = "The Legacy of qÉyqÉÌyt Village"; /*Special Case Override*/
    }
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].ARTIST_NAME == "")
      obj[i].ARTIST_NAME = "Artist Name Unavailable";
      if (obj[i].ARTIST_NAME.search("<div>") != -1)
      obj[i].ARTIST_NAME = obj[i].ARTIST_NAME.slice(0, obj[i].ARTIST_NAME.search("<div>"));
    }
    for (var i = 0; i < obj.length; i++) {
      //if (obj[i].MEDIUM == "")
        obj[i].MEDIUM = "Art Type Unavailable";
    }
    for (var i = 0; i < obj.length; i++) {
      //if (obj[i].SUMMARY == "")
      obj[i].SUMMARY = "Summary Unavailable";
    }
    for (var i = 0; i < obj.length; i++) {
      //if (obj[i].DESCRIPTION == "")
      obj[i].DESCRIPTION = "Description Unavailable";
    }
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].LOCATION == "")
      obj[i].LOCATION = "Address Unavailable";
      if (obj[i].LOCATION.search("<br>") != -1)
      obj[i].LOCATION = obj[i].LOCATION.slice(obj[i].LOCATION.search("<br>") + 4, obj[i].LOCATION.length);
      if (obj[i].LOCATION.search("<br>") != -1)
      obj[i].LOCATION = obj[i].LOCATION.slice(0, obj[i].LOCATION.search("<br>"));
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
      + ppNL + ppTB + ppTB + '"nm": "' + obj[i].ARTWORK + '"'
      + ppNL + ppTB + ppTB + ',' + '"aNm": "' + obj[i].ARTIST_NAME + '"'
      + ppNL + ppTB + ppTB + ',' + '"type": "' + obj[i].MEDIUM + '"'
      + ppNL + ppTB + ppTB + ',' + '"summ": "' + obj[i].SUMMARY + '"'
      + ppNL + ppTB + ppTB + ',' + '"desc": "' + obj[i].DESCRIPTION + '"'
      + ppNL + ppTB + ppTB + ',' + '"adr": "' + obj[i].LOCATION + '"'
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
