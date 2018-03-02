// https://stackoverflow.com/questions/343865/how-to-convert-from-utm-to-latlng-in-python-or-javascript

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

    for (i = 0; i < json.length; i++)
    {
        const itemJSON = json[i];

        var feature    = {};
        var geometry   = {};
        var properties = {};

        feature.type         = "Feature";
        feature.geometry     = itemJSON.geolocation;
        feature.properties   = properties;

        properties.name = itemJSON.title;

        if(itemJSON.description !== null)
        {
            properties.summary = itemJSON.description;
        }

        if(itemJSON.address !== null)
        {
            properties.address = itemJSON.address;
        }

        if(itemJSON.classification !== null)
        {
            properties.medium = itemJSON.classification;
        }

        if(itemJSON.media !== null)
        {
            properties.material = itemJSON.media;
        }

        if(itemJSON.artist_first_name !== null || itemJSON.artist_last_name !== null)
        {
            properties.artist = {};

            if (itemJSON.artist_first_name !== null && itemJSON.artist_last_name !== null)
            {
                properties.artist.name = itemJSON.artist_first_name + " " + itemJSON.artist_last_name;
            }
            else if (itemJSON.artist_first_name !== null)
            {
                properties.artist.name = itemJSON.artist_first_name;
            }
            else if (itemJSON.artist_last_namee !== null)
            {
                properties.artist.name = itemJSON.artist_last_name;
            }
        }

        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}
