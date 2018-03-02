module.exports =
    {
        doConvert: function(data)
        {
            return convert(data);
        }
    };

function convert(data)
{
    const json         = JSON.parse(data);
    var converted      = {};

    converted.type     = "FeatureCollection";
    converted.features = [];
    
    return JSON.stringify(converted, null, 4);
}