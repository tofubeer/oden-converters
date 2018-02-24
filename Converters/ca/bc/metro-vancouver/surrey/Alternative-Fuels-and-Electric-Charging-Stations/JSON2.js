module.exports =
    {
        doConvert: function(data)
        {
            return convert(data);
        }
    };

function convert(data)
{
    const json        = JSON.parse(data);
    const artistsJSON = json[0].features;
    const worksJSON   = json[1].features;

    const converted    = {};
    converted.type     = "FeatureCollection";
    converted.features = [];

    for (var i = 0; i < json.length; i++)
    {
        const featureJSON = json[i];

        var feature    = {};
        var geometry   = {};
        var properties = {};

        feature.type         = "Feature";
        feature.geometry     = geometry;
        feature.properties   = properties;

        geometry.type        = "Point";
        geometry.coordinates =
        [
            itemJSON.LONGITUDE,
            itemJSON.LATITUDE
        ];

        properties.name    = featureJSON.properties.NAME
        properties.type    = featureJSON.properties.FUEL
        properties.address = featureJSON.properties.LOCATION
        properties.access  = featureJSON.properties.ACCESS

        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}