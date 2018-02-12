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
    const json        = JSON.parse(data);
    const artistsJSON = json[0].features;
    const worksJSON   = json[1].features;

    const converted    = {};
    converted.type     = "FeatureCollection";
    converted.features = [];

    const artists = {};

    for (var i = 0; i < artistsJSON.length; i++)
    {
        const featureJSON = artistsJSON[i];

        artists[featureJSON.properties.ARTISTID.toString()] = featureJSON.properties;
    }

    for (i = 0; i < worksJSON.length; i++)
    {
        const featureJSON = worksJSON[i];

        if(featureJSON.properties.Status === "Removed")
        {
            continue;
        }

        if(featureJSON.geometry === null && (featureJSON.properties.Latitude === null || featureJSON.properties.Longitude === null))
        {
            // would have to try a reverse geo lookup?
            continue;
        }

        var feature    = {};
        var geometry   = {};
        var properties = {};

        feature.type       = "Feature";
        feature.geometry   = geometry;
        feature.properties = properties;

        geometry.type      = "Point";
        var lat = featureJSON.properties.Latitude;
        var lng = featureJSON.properties.Longitude;

        if(lat == null || lng == null)
        {
            const latLong = utmToLatLng(10, featureJSON.geometry.coordinates[0], featureJSON.geometry.coordinates[1], true);

            lat = latLong.latitude;
            lng = latLong.longitude
        }

        geometry.coordinates =
        [
            lng,
            lat
        ];

        properties.name = featureJSON.properties.TitleOfWork;

        if(featureJSON.properties.DescriptionOfwork != null)
        {
            properties.description = featureJSON.properties.DescriptionOfwork;
        }

        if(featureJSON.properties.YearOfInstallation != null)
        {
            properties.year = featureJSON.properties.YearOfInstallation;
        }

        if(featureJSON.properties.Type !== null)
        {
            properties.type = featureJSON.properties.Type;
        }

        if(featureJSON.properties.PrimaryMaterial !== null)
        {
            properties.primaryMaterial = featureJSON.properties.PrimaryMaterial;
        }

        if(featureJSON.properties.URL !== null)
        {
            properties.website = featureJSON.properties.URL;
        }

        if(featureJSON.properties.SiteAddress !== null)
        {
            properties.addresss = featureJSON.properties.SiteAddress;
        }

        if(featureJSON.properties.PhotoURL !== null)
        {
            properties.image = featureJSON.properties.PhotoURL;
        }

        if(featureJSON.properties.PhotoCredits !== null)
        {
            properties.imageCredit = featureJSON.properties.PhotoCredits;
        }

        const artist = artists[featureJSON.properties.Artists];

        if(artist != null)
        {
            properties.artist = {};

            if(artist.FIRSTNAME !== null && artist.LASTNAME !== null)
            {
                properties.artist.name = artist.FIRSTNAME + " " + artist.LASTNAME;
            }
            else if(artist.FIRSTNAME !== null)
            {
                properties.artist.name = artist.FIRSTNAME;
            }
            else if(artist.LASTNAME !== null)
            {
                properties.artist.name = artist.LASTNAME;
            }

            if(artist.COUNTRY !== null)
            {
                properties.artist.country = artist.COUNTRY;
            }

            if(artist.WEBSITE !== null)
            {
                properties.artist.website = artist.WEBSITE;
            }

            if(artist.BIOGRAPHY !== null)
            {
                properties.artist.biography = artist.BIOGRAPHY;
            }

            if(artist.Photo !== null)
            {
                properties.artist.image = artist.Photo;
            }

            if(artist.PhotoCredit !== null)
            {
                properties.artist.imageCredit = artist.PhotoCredit;
            }
        }

        converted.features.push(feature)
    }

    return JSON.stringify(converted, null, 4);
}

function utmToLatLng(zone, easting, northing, northernHemisphere){
    if (!northernHemisphere){
        northing = 10000000 - northing;
    }

    var a = 6378137;
    var e = 0.081819191;
    var e1sq = 0.006739497;
    var k0 = 0.9996;

    var arc = northing / k0;
    var mu = arc / (a * (1 - Math.pow(e, 2) / 4.0 - 3 * Math.pow(e, 4) / 64.0 - 5 * Math.pow(e, 6) / 256.0));

    var ei = (1 - Math.pow((1 - e * e), (1 / 2.0))) / (1 + Math.pow((1 - e * e), (1 / 2.0)));

    var ca = 3 * ei / 2 - 27 * Math.pow(ei, 3) / 32.0;

    var cb = 21 * Math.pow(ei, 2) / 16 - 55 * Math.pow(ei, 4) / 32;
    var cc = 151 * Math.pow(ei, 3) / 96;
    var cd = 1097 * Math.pow(ei, 4) / 512;
    var phi1 = mu + ca * Math.sin(2 * mu) + cb * Math.sin(4 * mu) + cc * Math.sin(6 * mu) + cd * Math.sin(8 * mu);

    var n0 = a / Math.pow((1 - Math.pow((e * Math.sin(phi1)), 2)), (1 / 2.0));

    var r0 = a * (1 - e * e) / Math.pow((1 - Math.pow((e * Math.sin(phi1)), 2)), (3 / 2.0));
    var fact1 = n0 * Math.tan(phi1) / r0;

    var _a1 = 500000 - easting;
    var dd0 = _a1 / (n0 * k0);
    var fact2 = dd0 * dd0 / 2;

    var t0 = Math.pow(Math.tan(phi1), 2);
    var Q0 = e1sq * Math.pow(Math.cos(phi1), 2);
    var fact3 = (5 + 3 * t0 + 10 * Q0 - 4 * Q0 * Q0 - 9 * e1sq) * Math.pow(dd0, 4) / 24;

    var fact4 = (61 + 90 * t0 + 298 * Q0 + 45 * t0 * t0 - 252 * e1sq - 3 * Q0 * Q0) * Math.pow(dd0, 6) / 720;

    var lof1 = _a1 / (n0 * k0);
    var lof2 = (1 + 2 * t0 + Q0) * Math.pow(dd0, 3) / 6.0;
    var lof3 = (5 - 2 * Q0 + 28 * t0 - 3 * Math.pow(Q0, 2) + 8 * e1sq + 24 * Math.pow(t0, 2)) * Math.pow(dd0, 5) / 120;
    var _a2 = (lof1 - lof2 + lof3) / Math.cos(phi1);
    var _a3 = _a2 * 180 / Math.PI;

    var latitude = 180 * (phi1 - fact1 * (fact2 + fact3 + fact4)) / Math.PI;

    if (!northernHemisphere){
        latitude = -latitude;
    }

    var longitude = ((zone > 0) && (6 * zone - 183.0) || 3.0) - _a3;

    var obj = {
        latitude : latitude,
        longitude: longitude
    };


    return obj;
}
