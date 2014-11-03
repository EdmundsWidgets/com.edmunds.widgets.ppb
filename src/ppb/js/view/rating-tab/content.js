define([
    'backbone',
    'template/rating-tab/content'
], function(Backbone, contentTemplate) {
    return Backbone.View.extend({
        el: '.content',
        initialize: function() {

            // Cache elements
            this.$widget = $('.edm-widget');
            this.$header = $('header');
            this.$ratingBar = $('.rating-bar');
            this.$footer = $('footer');

            this.contentHeight = this.$widget.outerHeight() - this.$header.outerHeight() - this.$ratingBar.outerHeight() - this.$footer.outerHeight() - 22;

            this.render();
        },
        render: function() {

            this.$el.html(contentTemplate({
                collection: this.collection.toJSON(),
                summary: this.collection.summary
            })).height(this.contentHeight);
            return this;
        }
    });
});