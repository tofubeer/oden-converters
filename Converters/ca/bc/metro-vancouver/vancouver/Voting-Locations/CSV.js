module.exports =
    {
        doConvert: function(data)
        {
            return convert(data);
        }
    };

function convert(data)
{
    var converted      = {};

    converted.type     = "FeatureCollection";
    converted.features = [];

    var lines = data.split('\r\n');

    // Skip first line, it is titles
    for(var i = 1;i < lines.length;i++)
    {
        var line = lines[i];

        if(line.length === 0)
        {
            continue;
        }

        var fields = line.split(',');

        var feature    = {};
        var geometry   = {};
        var properties = {};

        feature.type       = "Feature";
        feature.geometry   = geometry;
        feature.properties = properties;

        geometry.type = "Point";
        geometry.coordinates =
            [
                parseFloat(fields[5]),
                parseFloat(fields[4])
            ];

        properties.name         = fields[1];
        properties.address      = fields[2];
        properties.location     = fields[3];
        properties.advancedOnly = (fields[6] === 'YES');

        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}
