module.exports =
    {
        doConvert: function(data)
        {
            return convert(data);
        }
    };

function convert(data)
{
    var json      = JSON.parse(data);
    var converted = {}

    converted.type     = "FeatureCollection";
    converted.features = []

    var featuresJSON = json["features"];

    for(var i = 0; i < json.length; i++)
    {
        var feature = {}
        var properties = {}

        feature.type           = "Feature";
        feature.geometry       = json[i].json_geometry;
        feature.properties     = properties
        properties.length      = json[i].LENGTH;
        properties.lineNumber  = json[i].LINEABBR;

        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}