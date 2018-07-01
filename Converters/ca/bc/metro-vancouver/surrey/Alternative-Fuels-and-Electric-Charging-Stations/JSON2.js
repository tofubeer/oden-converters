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

    if(typeof(data) === 'string' || data instanceof String)
    {
        json = JSON.parse(data)
    }

    var converted    = {};
    converted.type     = "FeatureCollection";
    converted.features = [];

    for (var i = 0; i < json.length; i++)
    {
        var featureJSON = json[i];

        var feature    = {};
        var geometry   = {};
        var properties = {};

        feature.type         = "Feature";
        feature.geometry     = geometry;
        feature.properties   = properties;

        geometry.type        = "Point";
        geometry.coordinates =
        [
            featureJSON.LONGITUDE,
            featureJSON.LATITUDE
        ];

        properties.name    = featureJSON.NAME;
        properties.type    = featureJSON.FUEL;
        properties.address = featureJSON.LOCATION;
        properties.access  = featureJSON.ACCESS;

        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}