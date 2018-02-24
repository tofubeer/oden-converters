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
        var feature    = {}
        var properties = {}

        feature.type        = "Feature";
        feature.geometry    = featuresJSON[i].geometry;
        properties.name     = featuresJSON[i].properties.Name;
        properties.fullName = featuresJSON[i].properties.FullName;
        properties.length   = featuresJSON[i].properties.SHAPE_Length;
        properties.id       = featuresJSON[i].properties.OBJECTID;
        feature.properties  = properties

        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}