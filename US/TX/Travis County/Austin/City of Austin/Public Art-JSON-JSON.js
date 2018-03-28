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

    const converted    = {};
    converted.type     = "FeatureCollection";
    converted.features = [];

    for (i = 0; i < json.length; i++)
    {
        const itemJSON = json[i];

        if(itemJSON.location == null)
        {
            continue;
        }

        var feature    = {};
        var geometry   = {};
        var properties = {};

        feature.type         = "Feature";
        feature.geometry     = geometry;
        feature.properties   = properties;

        geometry.type        = "Point";
        geometry.coordinates = itemJSON.location.coordinates;

        properties.name = itemJSON.artwork_title;

        if(itemJSON.material !== null)
        {
            properties.material = itemJSON.material;
        }


        if(itemJSON.web_page !== null)
        {
            properties.website = itemJSON.web_page;
        }

        if(itemJSON.location_street_address !== null)
        {
            properties.address = itemJSON.location_street_address;
        }

        if(itemJSON.artist != null)
        {
            var artist = {};

            artist.name = itemJSON.artist;
        }

        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}
