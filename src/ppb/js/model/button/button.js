/**
 * Created by Ivan_Kauryshchanka on 11/13/2014.
 */
define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone) {
    return Backbone.Model.extend({
        url: function(vin, zip) {
            return 'http://api.edmunds.com/api/inventory/v1/lookup?vin='+ vin +'&zipcode='+ zip + '&range=50';
        }
    });
});