module.exports =
    {
        doConvert: function(data)
        {
            return convert(data);
        }
    };

function convert(data)
{
    const json         = JSON.parse(data);
    var converted      = {};

    converted.type     = "FeatureCollection";
    converted.features = [];

    var featuresJSON = json["features"];

    for(var i = 0; i < featuresJSON.length; i++)
    {
        const featureJSON = featuresJSON[i];
        var feature       = {};
        var properties    = {};

        feature.type       = "Feature";
        feature.geometry   = featureJSON.geometry;
        feature.properties = properties;
        properties.name    = featureJSON.properties.Name
        properties.type    = featureJSON.properties.Fuel
        properties.address = featureJSON.properties.Location
        properties.access  = featureJSON.properties.Access


        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}
