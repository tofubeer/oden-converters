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
        properties.name        = featuresJSON[i].properties.NAME;
        properties.addressNumber = featuresJSON[i].properties.ADDR_NUM;
        properties.addressRoad        = featuresJSON[i].properties.ADDR_ROAD;
        properties.city = featuresJSON[i].properties.CITY;
        properties.id        = featuresJSON[i].properties.ID;
        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}
