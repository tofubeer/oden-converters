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

    for(var i = 0; i < featuresJSON.length; i++)
    {
        var feature = {}
        var properties = {}

        feature.type            = "Feature";
        feature.geometry        = featuresJSON[i].json_geometry;
        feature.properties      = properties
        properties.name         = featuresJSON[i].Name;
        properties.fullName     = featuresJSON[i].FullName;
        properties.length       = featuresJSON[i].SHAPE_Length;
        properties.id           = featuresJSON[i].OBJECTID;

        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}