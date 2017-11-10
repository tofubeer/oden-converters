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

  if (prettyPrint == 1) {
    ppNL = '\n';
    ppTB = '\t';
  }

  /*Default Override*/
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].Name == "")
      obj[i].Name = "Name Unavailable";
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
    if (obj[i].summary == "")
      obj[i].summary = obj[i].Descriptn;
    if (obj[i].summary == "")
      obj[i].summary = "Summary Unavailable";
    while(obj[i].summary.search('\"') != -1)
      obj[i].summary = obj[i].summary.slice(0, obj[i].summary.search('\"')) + '\'' + obj[i].summary.slice(obj[i].summary.search('\"') + 1, obj[i].summary.length);
  }
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].Descriptn == "")
      obj[i].Descriptn = "Description Unavailable";
      while(obj[i].Descriptn.search('\"') != -1)
        obj[i].Descriptn = obj[i].Descriptn.slice(0, obj[i].Descriptn.search('\"')) + '\'' + obj[i].Descriptn.slice(obj[i].Descriptn.search('\"') + 1, obj[i].Descriptn.length);
      while(obj[i].Descriptn.search('\n') != -1)
        obj[i].Descriptn = obj[i].Descriptn.slice(0, obj[i].Descriptn.search('\n')) + ' ' + obj[i].Descriptn.slice(obj[i].Descriptn.search('\n') + 1, obj[i].Descriptn.length);
      while(obj[i].Descriptn.search('\r') != -1)
        obj[i].Descriptn = obj[i].Descriptn.slice(0, obj[i].Descriptn.search('\r')) + obj[i].Descriptn.slice(obj[i].Descriptn.search('\r') + 1, obj[i].Descriptn.length);
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
    + ppNL + ppTB + ppTB + '"nm": "' + obj[i].Name + '"'
    + ppNL + ppTB + ppTB + ',' + '"aNm": "' + obj[i].ARTIST_NAME + '"'
    + ppNL + ppTB + ppTB + ',' + '"type": "' + obj[i].MEDIUM + '"'
    + ppNL + ppTB + ppTB + ',' + '"summ": "' + obj[i].summary + '"'
    + ppNL + ppTB + ppTB + ',' + '"desc": "' + obj[i].Descriptn + '"'
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
