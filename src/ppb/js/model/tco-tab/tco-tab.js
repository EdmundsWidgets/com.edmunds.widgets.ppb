define([
    'backbone'
], function(Backbone) {
    return Backbone.Model.extend({
        url: 'https://api.edmunds.com/v1/api/region/regionrepository/findstatebyzip',
        parse: function(response) {
            response.stateCode = response.regionsHolder[0].stateCode;
            response.region = response.regionsHolder[0].name;
            return response;
        }
    });
});