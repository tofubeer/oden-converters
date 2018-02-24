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

        feature.type            = "Feature";
        feature.geometry        = featuresJSON[i].geometry;
        feature.properties      = properties
        properties.id           = featuresJSON[i].properties.OBJECTID;
        properties.streetNumber = featuresJSON[i].properties.BLOCK_NUM;
        properties.streetName   = featuresJSON[i].properties.STREET_NAM;
        properties.streetTo     = featuresJSON[i].properties.TO_;
        properties.streetFrom   = featuresJSON[i].properties.FROM_;
        properties.length       = featuresJSON[i].properties["Shape.len"];
        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}
