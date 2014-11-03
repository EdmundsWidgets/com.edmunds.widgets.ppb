define([
    'backbone'
], function(Backbone) {
    return Backbone.Collection.extend({
        url: function (make, model, year) {
            return 'https://api.edmunds.com/api/vehicle/v2/' + make + '/' + model + '/' + year + '/styles';
        },
        parse: function(response) {
            return response.styles;
        },
        comparator: 'name'
    });
});