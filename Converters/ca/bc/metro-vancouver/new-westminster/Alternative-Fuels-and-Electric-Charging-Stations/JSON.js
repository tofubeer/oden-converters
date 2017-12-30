/*This file was created for Terratap-Technologies-Inc by Cody Clattenburg, Sam Collins, Martin Suryadi, and Sergio Josue Villegas. This file is under the protection of the Apache 2.0 License.*/
/*NEW WESTMINSTER - ALTERNATIVE FUEL STATIONS*/

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

function parseObject(Y, X, Fuel, Name, Location, Access, Flag) {
  var content = "";
  content += '{'
  + ppNL + ppTB + '"type": "Feature"'
  + ppNL + ppTB + ',"geometry": {'
  + ppNL + ppTB + ppTB + '"type": "Point"'
  + ppNL + ppTB + ppTB + ',"coordinates": ' + '[' + Y + ', ' + X + ']'
  + ppNL + ppTB + '}'
  + ppNL + ppTB + ',"properties": ';

  content += '{'
  + ppNL + ppTB + ppTB + '"fT": "' + Fuel + '"'
  + ppNL + ppTB + ppTB + ',' + '"nm": "' + Name + '"'
  + ppNL + ppTB + ppTB + ',' + '"adr": "' + Location + '"'
  + ppNL + ppTB + ppTB + ',' + '"ac": "' + Access + '"'
  + ppNL + ppTB + '}'
  + ppNL + '}';
  if (Flag == 1) {
    content += ppNL + ',';
  }
  return content;
}

/*Write the callback function*/
function handleFile(err, data) {

    if (err) throw err
    obj = JSON.parse(data);

    if (prettyPrint == 1) {
      ppNL = '\n';
      ppTB = '\t';
    }

    /*Convert Data Here*/
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].Access == 'Publically Accessible - Free') {
        obj[i].Access = 'Public';
      }
    }
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].Access == 'Available for patrons only - Free') {
        obj[i].Access = 'Members Only';
      }
    }
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].Fuel == 'Semacharge EV Level 2') {
        obj[i].Fuel = 'EV Level 2';
        obj[i].Access = 'Semacharge Required';
      }
    }
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].Fuel == 'Tesla EV Level 2') {
        obj[i].Fuel = 'EV Level 2(Tesla Only)';
      }
    }

    /*Re-Parse Data Here*/
    var content = '[' + ppNL;
    for (var i = 0; i < obj.length; i++) {

      /*Special Case for Multiple Types*/
      if (obj[i].Fuel == 'Diesel, Propane, Gas and Semacharge EV Level 2') {
        content += parseObject(obj[i].Y, obj[i].X, 'Diesel', obj[i].Name, obj[i].Location, obj[i].Access, 1);
        content += parseObject(obj[i].Y, obj[i].X, 'Propane', obj[i].Name, obj[i].Location, obj[i].Access, 1);
        content += parseObject(obj[i].Y, obj[i].X, 'Gas', obj[i].Name, obj[i].Location, obj[i].Access, 1);
        content += parseObject(obj[i].Y, obj[i].X, 'EV Level 2', obj[i].Name, obj[i].Location, obj[i].Access, 0);
        if (i < obj.length - 1) {
          content += ppNL + ',';
        }
        continue;
      }
      if (obj[i].Fuel == 'EV Level 1, EV Level 2') {
        content += parseObject(obj[i].Y, obj[i].X, 'EV Level 1', obj[i].Name, obj[i].Location, obj[i].Access, 1);
        content += parseObject(obj[i].Y, obj[i].X, 'EV Level 2', obj[i].Name, obj[i].Location, obj[i].Access, 0);
        if (i < obj.length - 1) {
          content += ppNL + ',';
        }
        continue;
      }
      /*Special Case for Multiple Types*/

      content += '{'
      + ppNL + ppTB + '"type": "Feature"'
      + ppNL + ppTB + ',"geometry": {'
      + ppNL + ppTB + ppTB + '"type": "Point"'
      + ppNL + ppTB + ppTB + ',"coordinates": ' + '[' + obj[i].Y + ', ' + obj[i].X + ']'
      + ppNL + ppTB + '}'
      + ppNL + ppTB + ',"properties": ';

      content += '{'
      + ppNL + ppTB + ppTB + '"fT": "' + obj[i].Fuel + '"'
      + ppNL + ppTB + ppTB + ',' + '"nm": "' + obj[i].Name + '"'
      + ppNL + ppTB + ppTB + ',' + '"adr": "' + obj[i].Location + '"'
      + ppNL + ppTB + ppTB + ',' + '"ac": "' + obj[i].Access + '"'
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
