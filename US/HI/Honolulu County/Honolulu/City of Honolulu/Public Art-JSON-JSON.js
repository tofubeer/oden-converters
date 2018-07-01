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

    for (i = 1; i < json.length; i++)
    {
        var itemJSON = json[i];

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

        if(itemJSON.title == null)
        {
            continue;
        }

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
