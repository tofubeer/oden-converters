module.exports =
    {
        doConvert: function(data)
        {
            return convert(data);
        }
    };

function convert(data)
{
    var json           = JSON.parse(data);
    var converted      = {};

    converted.type     = "FeatureCollection";
    converted.features = [];

    return JSON.stringify(converted, null, 4);
}