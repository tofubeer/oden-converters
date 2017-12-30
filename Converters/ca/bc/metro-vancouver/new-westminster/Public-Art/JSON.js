/*This file was created for Terratap-Technologies-Inc by Cody Clattenburg, Sam Collins, Martin Suryadi, and Sergio Josue Villegas. This file is under the protection of the Apache 2.0 License.*/
/*NEW WESTMINSTER - PUBLIC ART*/

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
  obj = obj.features;

  if (prettyPrint == 1) {
    ppNL = '\n';
    ppTB = '\t';
  }

  /*Default Override*/
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].properties.Name == "")
      obj[i].properties.Name = "Name Unavailable";
  }
  for (var i = 0; i < obj.length; i++) {
    //if (obj[i].properties.ARTIST_NAME == "")
      obj[i].properties.ARTIST_NAME = "Artist Name Unavailable";
  }
  for (var i = 0; i < obj.length; i++) {
    //if (obj[i].properties.MEDIUM == "")
      obj[i].properties.MEDIUM = "Art Type Unavailable";
  }
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].properties.summary == "")
      obj[i].properties.summary = obj[i].properties.Descriptn;
    if (obj[i].properties.summary == "")
      obj[i].properties.summary = "Summary Unavailable";
    while(obj[i].properties.summary.search('\"') != -1)
      obj[i].properties.summary = obj[i].properties.summary.slice(0, obj[i].properties.summary.search('\"')) + '\'' + obj[i].properties.summary.slice(obj[i].properties.summary.search('\"') + 1, obj[i].properties.summary.length);
  }
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].properties.Descriptn == "")
      obj[i].properties.Descriptn = "Description Unavailable";
      while(obj[i].properties.Descriptn.search('\"') != -1)
        obj[i].properties.Descriptn = obj[i].properties.Descriptn.slice(0, obj[i].properties.Descriptn.search('\"')) + '\'' + obj[i].properties.Descriptn.slice(obj[i].properties.Descriptn.search('\"') + 1, obj[i].properties.Descriptn.length);
      while(obj[i].properties.Descriptn.search('\n') != -1)
        obj[i].properties.Descriptn = obj[i].properties.Descriptn.slice(0, obj[i].properties.Descriptn.search('\n')) + ' ' + obj[i].properties.Descriptn.slice(obj[i].properties.Descriptn.search('\n') + 1, obj[i].properties.Descriptn.length);
      while(obj[i].properties.Descriptn.search('\r') != -1)
        obj[i].properties.Descriptn = obj[i].properties.Descriptn.slice(0, obj[i].properties.Descriptn.search('\r')) + obj[i].properties.Descriptn.slice(obj[i].properties.Descriptn.search('\r') + 1, obj[i].properties.Descriptn.length);
  }

  for (var i = 0; i < obj.length; i++) {
    if (obj[i].properties.Address == "")
    obj[i].properties.Address = "Address Unavailable";
  }

  /*Writing Loop*/
  var content = '[' + ppNL;
  for (var i = 0; i < obj.length; i++) {

    /*CSV Newline Fix*/
    if (obj[i].properties.X == undefined) {
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
    + ppNL + ppTB + ppTB + ',"coordinates": ' + '[' + obj[i].properties.Y + ', ' + obj[i].properties.X + ']'
    + ppNL + ppTB + '}'
    + ppNL + ppTB + ',"properties": ';

    content += '{'
    + ppNL + ppTB + ppTB + '"nm": "' + obj[i].properties.Name + '"'
    + ppNL + ppTB + ppTB + ',' + '"aNm": "' + obj[i].properties.ARTIST_NAME + '"'
    + ppNL + ppTB + ppTB + ',' + '"type": "' + obj[i].properties.MEDIUM + '"'
    + ppNL + ppTB + ppTB + ',' + '"summ": "' + obj[i].properties.summary + '"'
    + ppNL + ppTB + ppTB + ',' + '"desc": "' + obj[i].properties.Descriptn + '"'
    + ppNL + ppTB + ppTB + ',' + '"adr": "' + obj[i].properties.Address + '"'
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
