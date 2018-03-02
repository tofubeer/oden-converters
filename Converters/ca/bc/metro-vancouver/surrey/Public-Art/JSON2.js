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

    const converted    = {};
    converted.type     = "FeatureCollection";
    converted.features = [];

    for (var i = 0; i < json.length; i++)
    {
        const itemJSON = json[i];

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

        properties.name = itemJSON.ARTWORK;

        if(itemJSON.WEBSITE !== null)
        {
            properties.website = itemJSON.WEBSITE;
        }

        if(itemJSON.LOCATION !== null)
        {
            properties.address = itemJSON.LOCATION;
        }

        if(itemJSON.PIC_URL !== null)
        {
            properties.images =
            [
                { "image" : itemJSON.PIC_URL }
            ]
        }

        if(itemJSON.ARTIST_NAME != null)
        {
            var artist = {};

            artist.name = itemJSON.ARTIST_NAME;
        }

        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}