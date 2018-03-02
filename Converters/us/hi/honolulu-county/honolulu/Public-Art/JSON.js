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
    const json  = JSON.parse(data);

    const converted    = {};
    converted.type     = "FeatureCollection";
    converted.features = [];

    for (i = 1; i < json.length; i++)
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
                Number(itemJSON.longitude),
                Number(itemJSON.latitude)
            ];

        properties.name = itemJSON.title;

        if(itemJSON.description !== null)
        {
            properties.summary = itemJSON.description;
        }

        if(itemJSON.web_detail_page !== null)
        {
            properties.website = itemJSON.web_detail_page;
        }

        if(itemJSON.location !== null)
        {
            properties.address = itemJSON.location;
        }

        if(itemJSON.access !== null)
        {
            properties.access = itemJSON.access;
        }

        if(itemJSON.year !== null)
        {
            properties.year = itemJSON.year;
        }

        if(itemJSON.imagefile !== null)
        {
            properties.images = [];
            properties.images.push({ "image" : itemJSON.imagefile });
        }

        if(itemJSON.creator != null)
        {
            var artist = {};

            artist.name = itemJSON.creator;
        }

        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}
