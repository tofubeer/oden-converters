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
        properties.streetName        = featuresJSON[i].properties.Street_Name;
        properties.fromStreet = featuresJSON[i].properties.From_Street;
        properties.toStreet        = featuresJSON[i].properties.To_Street;
        properties.volume = featuresJSON[i].properties.Volume;
        properties.year        = featuresJSON[i].properties.Yr;
        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}
