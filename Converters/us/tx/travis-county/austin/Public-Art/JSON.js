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

    var converted    = {};
    converted.type     = "FeatureCollection";
    converted.features = [];

    for (i = 0; i < json.length; i++)
    {
        var itemJSON = json[i];

        var feature    = {};
        var geometry   = {};
        var properties = {};

        feature.type         = "Feature";
        feature.geometry     = geometry;
        feature.properties   = properties;

        geometry.type        = "Point";
        geometry.coordinates = itemJSON.location.coordinates;

        properties.name = itemJSON.art_title;

        if(itemJSON.web_detail_page !== null)
        {
            properties.website = itemJSON.web_detail_page;
        }

        if(itemJSON.art_location_street_address !== null)
        {
            properties.address = itemJSON.art_location_street_address;
        }

        if(itemJSON.images !== null)
        {
            properties.images = [];
            properties.images.push({ "image" : itemJSON.images });
        }

        if(itemJSON.artist_full_name != null)
        {
            var artist = {};

            artist.name = itemJSON.artist_full_name;
        }

        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}
