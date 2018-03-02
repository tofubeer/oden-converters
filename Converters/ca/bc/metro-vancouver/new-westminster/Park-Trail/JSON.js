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
        properties.status        = featuresJSON[i].properties.Status;
        properties.paved = featuresJSON[i].properties.Paved;
        properties.bikeOnStreet        = featuresJSON[i].properties.Bike_OnStreet;
        properties.bikeOffStreet = featuresJSON[i].properties.Bike_OffStreet;
        properties.bikeLane        = featuresJSON[i].properties.Bike_Lane;
        properties.name = featuresJSON[i].properties.Name;
        properties.bike        = featuresJSON[i].properties.Bike;
        properties.length = featuresJSON[i].properties.SHAPE_Length;
        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}
