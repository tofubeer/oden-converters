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

        feature.type           = "Feature";
        feature.geometry       = featuresJSON[i].geometry;
        feature.properties     = properties
        properties.direction        = featuresJSON[i].properties.Traffic_Direction;
        properties.description = featuresJSON[i].properties.Sign_Definition;
        properties.meterType        = featuresJSON[i].properties.Meter_Type;
        properties.id = featuresJSON[i].properties.Sign_Id;
        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}
