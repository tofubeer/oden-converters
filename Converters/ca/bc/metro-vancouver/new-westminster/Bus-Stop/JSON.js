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

        feature.type             = "Feature";
        feature.geometry         = featuresJSON[i].geometry;
        properties.onStreet      = featuresJSON[i].properties.ONSTREET;
        properties.crossStreet   = featuresJSON[i].properties.ATSTREET;
        properties.busStopNumber = featuresJSON[i].properties.BUSSTOPNUM;
        properties.direction     = featuresJSON[i].properties.DIRECTION;
        properties.cityName      = featuresJSON[i].properties.CITY_NAME;
        properties.accessible    = featuresJSON[i].properties.ACCESSIBLE;
        properties.status        = featuresJSON[i].properties.STATUS;
        feature.properties       = properties

        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}