define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    return Backbone.Model.extend({
        url: function(make, model, year, submodel) {
            return 'http://api.edmunds.com/api/media/v2/photos/' + make +'/' + model + '/' + year + '/' + submodel;
        },
        parse: function(response) {

            response = _.reject(response, function(el) {
                return el.id.indexOf('/evox/') > -1;
            });

            var interior = _.where(response, {
                subType: 'interior'
            }),
                exterior = _.where(response, {
                subType: 'exterior'
            }),
                baseUrl = 'http://media.ed.edmunds-media.com';
            response.interior = _.map(interior, function(el) {
                return baseUrl + el.id.replace('dam/photo', '') + '_500.jpg';
            });
            response.exterior = _.map(exterior, function(el) {
                return baseUrl + el.id.replace('dam/photo', '') + '_500.jpg';
            });
//            response.colorOptions = _.sortBy(response.colorOptions, 'color');
            response.all = _.union(response.exterior, response.interior);
            this.preLoader(response.interior);
            this.preLoader(response.exterior);
            this.preLoader(response.all);
            return response;
        },
        preLoader: function(array) {
            var loadedImages = 0;
            function load() {
                $('<img>').load(function() {
                    loadedImages++;
                    if (loadedImages === array.length) {
                        return array;
                    } else {
                        load();
                    }
                }).error(function() {
                    array.splice(loadedImages, 1);
                    if (loadedImages === array.length) {
                        return array;
                    } else {
                        load();
                    }
                }).attr('src', array[loadedImages]);
            }
            load();
        }
    });
});