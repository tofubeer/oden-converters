module.exports =
    {
        doConversion: function(data)
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
        properties.Status      = json[i].Status;
        properties.Paved       = json[i].Paved;
        properties.Name        = json[i].Name;
        properties.OnStreet    = json[i].Bike_OnStreet;
        properties.OffStreet   = json[i].Bike_OffStreet;
        properties.Lane        = json[i].Bike_Lane;
        properties.Distance    = json[i].Distance;
        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}