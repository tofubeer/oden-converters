// Copyright 2018 TerraTap Technologies Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
