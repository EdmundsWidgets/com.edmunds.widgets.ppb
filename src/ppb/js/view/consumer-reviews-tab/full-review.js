define([
    'backbone',
    'template/consumer-reviews-tab/full-review'
], function(Backbone, fullReviewTemplate) {
    return Backbone.View.extend({
        el: '.main-content',
        initialize: function(options) {
            this.options = options;

            this.render();

        },
        render: function() {
            this.$el.html(fullReviewTemplate({
                model: this.model.toJSON(),
                reviewsCount: this.options.reviewsCount,
                currentReview: this.options.currentReview
            }));

            // Cache elements
            this.$widget = $('.edm-widget');
            this.$header = $('header');
            this.$ratingBar = $('.rating-bar');
            this.$content = $('.content');
            this.$footer = $('footer');

            this.contentHeight = this.$widget.outerHeight() - this.$header.outerHeight() - this.$ratingBar.outerHeight() - this.$footer.outerHeight() - 2;
            this.$content.height(this.contentHeight);
            return this;
        }
    });
});