define([
    'jquery',
    'backbone',
    'dispatcher',
    'template/rating-tab/rating-tab',
    'model/rating-tab/rating-tab',
    'view/rating-tab/content',
    'view/rating-tab/details',
    'template/base/missing-content',
    'template/base/messageDialog',
    'template/base/loading'
], function($, Backbone, dispatcher, ratingTabTemplate, RatingTabModel, ContentView, DetailsView, missingContentTemplate, messageDialogTemplate, loadingTemplate) {
    return Backbone.View.extend({
        active: false,
        ready: false,
        viewName: 'rating-tab',
        missingContent: false,
        events: {
            'click .rating-selector': 'renderDetails',
            'click .close-button': 'renderContent'
        },
        model: new RatingTabModel(),
        initialize: function(options) {
            this.options = options;
            this.listenTo(dispatcher, 'onVehicleChange', this.load);
            this.listenTo(this.model, 'request', this.loading);
            this.listenTo(this.model, 'sync', this.init);
            this.listenTo(this.model, 'error', this.error);
        },
        render: function() {
            // Cache elements
            this.$currentTab = $('a[data-id="rating-tab"]').parent();
            this.$nextTab = this.$currentTab.next().children();

            if (this.active && this.ready && !this.missingContent) {
                this.$currentTab.removeClass('disabled');
                if(this.$nextTab.length === 0){
                    this.$currentTab.addClass('active');
                    this.$currentTab.off('click', this.showTooltip);
                }
                if(this.model.toJSON().errorType){
                    this.$el.html(ratingTabTemplate({
                        date: 'not found'
                    }));
                }else {
                    this.$el.html(ratingTabTemplate(this.model.toJSON()));
                }
                this.contentView = new ContentView({
                    collection: this.model.ratingCollection
                });
            } else if (this.active && this.ready && this.missingContent && this.$nextTab.length > 0) {
                this.$currentTab.on('click', this.showTooltip);
                this.$currentTab.addClass('disabled');
                dispatcher.trigger('prevTabIsDisabled');
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
            this.$currentTab.on('click', this.showTooltip);
            this.$currentTab.addClass('disabled');
        },
        load: function(styleId, submodel) {
            $('a[data-id="rating-tab"]').parent().off('click', this.showTooltip);
            this.model.fetch({
                url: this.model.url(this.options.make, this.options.modelName, this.options.year),
                dataType: "jsonp",
                data: {
                    api_key: this.options.apiKey,
                    submodel: submodel
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
        renderDetails: function(e) {
            var id = $(e.currentTarget).data('id');
            this.detailsView = new DetailsView({
                model: this.model.ratingCollection.get(id),
                make: this.model.ratingCollection.make,
                modelName: this.model.ratingCollection.modelName,
                year: this.model.ratingCollection.year,
                subModel: this.model.ratingCollection.subModel
            });
        },
        renderContent: function() {
            this.contentView.render();
        },
        showTooltip: function() {
            dispatcher.trigger('onNoContent')
        }
    });
});