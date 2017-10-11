// Declare variables
var fs = require('fs');
var obj;
var inputPath = 'in.json';
var outputPath = 'out.json';

// Read the file and send to the callback
fs.readFile(inputPath, handleFile)

// Write the callback function
function handleFile(err, data) {

    if (err) throw err
    obj = JSON.parse(data);

    // Convert Data Here
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].Access == 'Publically Accessible - Free') {
        obj[i].Access = 'Public';
      }
    }
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].Fuel == 'Diesel, Propane, Gas and Semacharge EV Level 2') {
        obj[i].Fuel = 'Semacharge EV Level 2';
      }
    }

    // Re-Parse Data Here
    var content = '[';
    for (var i = 0; i < obj.length; i++) {
      content += '{"type": "Feature","geometry": {"type": "Point","coordinates":'
      + '[' + obj[i].X + ', ' + obj[i].Y + ']'
      + '},"properties": {';

      content += '"fuelType": "' + obj[i].Fuel + '",'; /*required*/

      content += '"name": "' + obj[i].Name + '",';
      content += '"address": "' + obj[i].Location + '",';
      content += '"access": "' + obj[i].Access + '"';

      content += '}}';
      if (i < obj.length - 1) {
        content += ',';
      }
    }
    content += ']';
    fs.writeFile(outputPath, content, 'utf8', function (err) {
      if (err) {
          return console.log(err);
      }

      console.log("The file was converted!");
    });
}
