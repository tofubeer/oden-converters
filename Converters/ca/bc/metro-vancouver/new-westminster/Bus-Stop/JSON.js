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

    for(var i = 0; i < json.length; i++)
    {
        var feature = {}
        var properties = {}

        feature.type           = "Feature";
        feature.geometry       = json[i].json_geometry;
        feature.properties     = properties
        properties.onStreet      = json[i].ONSTREET;
        properties.crossStreet       = json[i].ATSTREET;
        properties.busStopNumber        = json[i].BUSSTOPNUM;
        properties.direction    = json[i].DIRECTION;
        properties.cityName   = json[i].CITY_NAME;
        properties.accessible        = json[i].ACCESSIBLE;
        properties.status    = json[i].STATUS;
        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}