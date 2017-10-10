// Declare variables
var fs = require('fs');
var obj;
var inputPath = 'in.csv';
var outputPath = 'out.json';

// Read the file and send to the callback
fs.readFile(inputPath, handleFile)

// Write the callback function
function handleFile(err, data) {

    if (err) throw err
    obj = JSON.parse(csvJSON(data.toString()));

    // Convert Data Here
    for (var i = 0; i < obj.length; i++) {
      obj[i].ACCESS = 'Public';
    }
    for (var i = 0; i < obj.length; i++) {
      obj[i].FUEL = 'Electric';
    }

    // Re-Parse Data Here
    var content = '[';
    for (var i = 0; i < obj.length; i++) {
      content += '{"type": "Feature","geometry": {"type": "Point","coordinates":'
      + '[' + obj[i].LATITUDE + ', ' + obj[i].LONGITUDE + ']'
      + '},"properties": {';

      content += '"fuelType": "' + obj[i].FUEL + '",'; /*required*/

      content += '"name": "' + obj[i].LOT_OPERATOR + '",';
      content += '"address": "' + obj[i].ADDRESS + '",';
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

//CSV to JSON
function csvJSON(csv) {

  var lines = csv.split('\r\n');
  var result = [];
  var headers = lines[0].split(',');
  headers[3] = 'ADDRESS'


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
