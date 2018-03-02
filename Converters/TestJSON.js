module.exports =
    {
        doConvert: function(data)
        {
            return convert(data);
        }
    };

function convert(data)
{
    var objData = data;

    if(data instanceof String)
    {
        objData = JSON.parse(data)
    }

    return JSON.stringify(objData, null, 4);
}