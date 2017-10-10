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
    obj = JSON.parse(data)
    // Convert Data Here
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].ACCESS == 'Publically Accessible - Free') {
        obj[i].ACCESS = 'Public';
      }
    }

    // Re-Parse Data Here
    var content = '[';
    for (var i = 0; i < obj.length; i++) {
      content += '{"type": "Feature","geometry": {"type": "Point","coordinates":'
      + '[' + obj[i].LATITUDE + ', ' + obj[i].LONGITUDE + ']'
      + '},"properties": {';

      content += '"fuelType": "' + obj[i].FUEL + '",'; /*required*/

      content += '"name": "' + obj[i].NAME + '",';
      content += '"address": "' + obj[i].LOCATION + '",';
      content += '"access": "' + obj[i].ACCESS + '"';

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
