define([
    'backbone',
    'model/rating-tab/sub-rating'
], function(Backbone, SubRatingModel) {
    return Backbone.Collection.extend({
        model: SubRatingModel,
        comparator: function(model) {
            return model.get('title');
        }
    });
});