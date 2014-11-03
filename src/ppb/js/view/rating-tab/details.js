define([
    'backbone',
    'template/rating-tab/details'
], function(Backbone, detailsTemplate) {
    return Backbone.View.extend({
        el: '.content',
        initialize: function(options) {
            this.options = options;

            // Cache elements
            this.$widget = $('.edm-widget');
            this.$header = $('header');
            this.$ratingBar = $('.rating-bar');
            this.$footer = $('footer');

            this.contentHeight = this.$widget.outerHeight() - this.$header.outerHeight() - this.$ratingBar.outerHeight() - this.$footer.outerHeight() - 22;

            this.render();
        },
        render: function() {
            this.$el.html(detailsTemplate({
                rating: this.model.toJSON(),
                subrating: this.model.get('subRatings').toJSON(),
                make: this.options.make,
                modelName: this.options.modelName,
                year: this.options.year,
                subModel: this.options.subModel
            })).height(this.contentHeight);
            return this;
        }
    });
});