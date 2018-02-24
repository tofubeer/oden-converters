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

        feature.type           = "Feature";
        feature.geometry       = featuresJSON[i].geometry;
        feature.properties     = properties
        properties.status      = featuresJSON[i].properties.Status;
        properties.paved       = featuresJSON[i].properties.Paved;
        properties.name        = featuresJSON[i].properties.Name;
        properties.onStreet    = featuresJSON[i].properties.Bike_OnStreet;
        properties.offStreet   = featuresJSON[i].properties.Bike_OffStreet;
        properties.lane        = featuresJSON[i].properties.Bike_Lane;
        properties.distance    = featuresJSON[i].properties.Distance;
        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}