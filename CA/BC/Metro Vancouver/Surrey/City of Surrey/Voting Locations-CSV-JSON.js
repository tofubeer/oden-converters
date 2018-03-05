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
    var converted      = {};

    converted.type     = "FeatureCollection";
    converted.features = [];

    var lines = data.split('\r\n');

    // Skip first line, it is titles
    for(var i = 1;i < lines.length;i++)
    {
        const line = lines[i];

        if(line.length === 0)
        {
            continue;
        }

        const fields = line.split(',');

        var feature       = {};
        var geometry      = {};
        var properties    = {};

        feature.type         = "Feature";
        feature.geometry     = geometry;
        feature.properties   = properties;
        geometry.type        = "Point";
        geometry.coordinates =
        [
            parseFloat(fields[4]),
            parseFloat(fields[5])
        ];

        properties.name = fields[0];
        properties.address = fields[1];
        properties.accessibilty = fields[2];

        if(fields[3] !== "No")
        {
            properties.transitStop = parseInt(fields[3]);
        }

        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}
