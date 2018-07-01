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

    var converted      = {};

    converted.type     = "FeatureCollection";
    converted.features = [];

    var featuresJSON = json["features"];

    for(var i = 0; i < featuresJSON.length; i++)
    {
        var featureJSON = featuresJSON[i];
        var feature       = {};
        var properties    = {};

        feature.type       = "Feature";
        feature.geometry   = featureJSON.geometry;
        feature.properties = properties;
        properties.name    = featureJSON.properties.title;

        if(featureJSON.properties.description != null)
        {
            properties.summary = featureJSON.properties.description;
        }

        if(featureJSON.properties.at_a_glance)
        {
            properties.shortDescription = featureJSON.properties.at_a_glance;
        }

        if(featureJSON.properties.year != null)
        {
            properties.year = featureJSON.properties.year;
        }

        if(featureJSON.properties.medium !== null)
        {
            properties.medium = featureJSON.properties.medium;
        }

        if(featureJSON.properties.material !== null)
        {
            properties.material = featureJSON.properties.material;
        }

        if(featureJSON.properties.arts_council_url !== null)
        {
            properties.website = featureJSON.properties.arts_council_url;
        }

        if(featureJSON.properties.installation_address !== null)
        {
            properties.address = featureJSON.properties.installation_address;
        }

        var images = [];

        if(featureJSON.properties.image_01 !== null)
        {
            images.push({ "image" : featureJSON.properties.image_01 });
        }

        if(featureJSON.properties.image_02 !== null)
        {
            images.push({ "image" : featureJSON.properties.image_02 });
        }

        if(images.length > 0)
        {
            properties.images = images;
        }

        if(featureJSON.properties.PhotoCredits !== null)
        {
            properties.imageCredit = featureJSON.properties.PhotoCredits;
        }

        properties.artist = {};

        if(featureJSON.properties.artist_name !== null)
        {
            properties.artist.country = featureJSON.properties.artist_name;
        }

        if(featureJSON.properties.artist_website !== null)
        {
            properties.artist.website = featureJSON.properties.artist_website;
        }

        if(featureJSON.properties.artist_bio !== null)
        {
            properties.artist.biography = featureJSON.properties.artist_bio;
        }

        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}
