define([
    'backbone',
    'model/rating-tab/rating'
], function(Backbone, RatingModel) {
    return Backbone.Collection.extend({
        model: RatingModel,
        comparator: function(model) {
            return model.get('title');
        }
    });
});
