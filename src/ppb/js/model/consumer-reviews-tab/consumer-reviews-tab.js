define([
    'backbone',
    'collection/consumer-reviews-tab/reviews-list'
], function(Backbone, ReviewsListCollection) {
    return Backbone.Model.extend({
        url: function(styleId) {
            return 'https://api.edmunds.com/api/vehiclereviews/v2/styles/' + styleId;
        },
        parse: function(response) {
            if (response.hasOwnProperty('errorType')) {
                this.trigger("error")
            }
            if (response.hasOwnProperty('averageRating') == false) {
                response.averageRating = 'rating not found';
            }else {
                response.averageRating = parseFloat(response.averageRating).toFixed(1);
            }
            response.reviews = new ReviewsListCollection(response.reviews, {
                parse: true
            });
            return response;
        }
    });
});