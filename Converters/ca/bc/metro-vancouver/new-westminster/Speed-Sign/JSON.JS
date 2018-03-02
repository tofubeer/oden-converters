module.exports =
    {
        doConvert: function(data)
        {
            return convert(data);
        }
    };

function convert(data)
{
    var json = data;

    if(data instanceof String)
    {
        json = JSON.parse(data)
    }

    var converted = {}

    converted.type     = "FeatureCollection";
    converted.features = []

    var featuresJSON = json["features"];

    for(var i = 0; i < featuresJSON.length; i++)
    {
        var feature = {}
        var properties = {}

        feature.type          = "Feature";
        feature.geometry      = featuresJSON[i].geometry;
        feature.properties    = properties
        properties.speed      = featuresJSON[i].properties.Speed;
        properties.decription = featuresJSON[i].properties.Sign_Definition;

        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}
