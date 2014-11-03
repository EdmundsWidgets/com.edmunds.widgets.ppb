define([
    'jquery',
    'backbone',
    'dispatcher',
    'model/consumer-reviews-tab/consumer-reviews-tab',
    'template/consumer-reviews-tab/reviews-list',
    'template/base/missing-content',
    'template/base/messageDialog',
    'template/base/loading',
    'view/consumer-reviews-tab/full-review'
], function($, Backbone, dispatcher, ConsumerReviewsModel, reviewsListTemplate, missingContentTemplate, messageDialogTemplate, loadingTemplate, FullReviewView) {
    return Backbone.View.extend({
        active: false,
        ready: false,
        missingContent: false,
        events: {
            'click .reviews-list': 'renderFullReview',
            'click .list-reviews': 'renderListReviews',
            'click .reviews-navigation': 'switchReview'
        },
        model: new ConsumerReviewsModel(),
        initialize: function(options) {
            this.options = options;
            this.listenTo(dispatcher, 'onVehicleChange', this.load);
            this.listenTo(dispatcher, 'prevTabIsDisabled', function() {
                $('a[data-id="consumer-reviews-tab"]').parent().off('click', this.showTooltip);
            });
            this.listenTo(this.model, 'request', this.loading);
            this.listenTo(this.model, 'sync', this.init);
            this.listenTo(this.model, 'error', this.error);
        },
        render: function() {
            // Cache elements
            this.$currentTab = $('a[data-id="consumer-reviews-tab"]').parent();
            this.$nextTab = this.$currentTab.next().children();
            if (this.active && this.ready && !this.missingContent) {
                if(this.$nextTab.length === 0){
                    this.$currentTab.addClass('active');
                    $('a[data-id="consumer-reviews-tab"]').parent().off('click', this.showTooltip);
                }
                this.$currentTab.removeClass('disabled');
                this.$el.html(reviewsListTemplate({
                    collection: this.model.get('reviews').toJSON(),
                    averageRating: this.model.get('averageRating'),
                    reviewsCount: this.model.get('reviewsCount'),
                    starRating: this.model.get('starRating')
                }));
                // Cache elements
                this.$widget = $('.edm-widget');
                this.$header = $('header');
                this.$ratingBar = $('.rating-bar');
                this.$content = $('.content');
                this.$footer = $('footer');

                this.contentHeight = this.$widget.outerHeight() - this.$header.outerHeight() - this.$ratingBar.outerHeight() - this.$footer.outerHeight() - 2;
                this.$content.height(this.contentHeight);

            } else if (this.active && this.ready && this.missingContent && this.$nextTab.length > 0) {
                this.$currentTab.on('click', this.showTooltip);
                this.$currentTab.addClass('disabled');
                this.$nextTab.click();
            } else if (this.active && this.ready && this.missingContent && this.$nextTab.length === 0) {
                this.$currentTab.on('click', this.showTooltip);
                this.$currentTab.removeClass().addClass('disabled');
                //this.$el.html(missingContentTemplate);
            }
            return this;
        },
        loading: function() {
            this.ready = false;
            this.missingContent = false;
            this.$el.html(loadingTemplate);
        },
        init: function() {
            this.ready = true;
            this.missingContent = false;
            this.render();
        },
        error: function() {
            this.ready = true;
            this.missingContent = true;
            this.render();
            this.$currentTab.addClass('disabled');
            if (this.$nextTab.length > 0) {
                if (this.$nextTab.first().data('id')) {
                    $('button.action').removeData('action-id').data('action-id', this.$nextTab.first().data('id')).text(this.$nextTab.first().text());
                    $('.dropdown-menu > li').removeClass('hidden').children('[data-id=' + this.$nextTab.first().data('id') + ']').parent().addClass('hidden');
                }
            }
            this.$currentTab.on('click', this.showTooltip);
        },
        load: function (styleId) {
            $('a[data-id="consumer-reviews-tab"]').parent().off('click', this.showTooltip);
            this.model.fetch({
                dataType: "jsonp",
                url: this.model.url(styleId),
                data: {
                    api_key: this.options.apiKey,
                    pagesize: 50 //todo: This number should be over 100 or it should be created pagination for the reviews list
                },
                error: function(err, data){
                    var that = this;
                    if(data.status == 403){
                       if(!that.$el.parent().find('.message-block').length){
                            that.loadErrorDialog();
                       }
                    }
                }
            });
        },
        loadErrorDialog: function(){
            var message = this.$el.parent().append(messageDialogTemplate),
                that = this;
            message.find('button').on('click', function(){
                that.load();
                message.find('.message-block').detach();
            });
        },
        renderListReviews: function() {
            dispatcher.trigger('list.reviews.click');
            this.render();
        },
        renderFullReview: function (e) {
            var id = $(e.currentTarget).data('id');
            this.currentReview = this.model.get('reviews').indexOf(this.model.get('reviews').get(id));
            this.reviewsCount = this.model.get('reviewsCount');
            this.fullReviewView = new FullReviewView({
                model: this.model.get('reviews').at(this.currentReview),
                reviewsCount: this.model.get('reviewsCount'),
                currentReview: this.currentReview + 1
            });
        },
        switchReview: function(e) {
            if ($(e.currentTarget).hasClass('next-review')) {
                dispatcher.trigger('next.review.click');
                if (this.currentReview + 1 < this.reviewsCount) {
                    this.currentReview += 1;
                } else {
                    this.currentReview = 0;
                }
            }
            if ($(e.currentTarget).hasClass('prev-review')) {
                dispatcher.trigger('prev.review.click');
                if (this.currentReview > 0) {
                    this.currentReview = this.currentReview - 1;
                } else {
                    this.currentReview = this.reviewsCount - 1;
                }
            }
            this.fullReviewView = new FullReviewView({
                model: this.model.get('reviews').at(this.currentReview),
                reviewsCount: this.model.get('reviewsCount'),
                currentReview: this.currentReview + 1
            });
        },
        showTooltip: function() {
            dispatcher.trigger('onNoContent');
        }
    });
});