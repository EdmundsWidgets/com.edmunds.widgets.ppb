define([
    'backbone',
    'dispatcher',
    'model/edmunds-says-tab/edmunds-says-tab',
    'template/edmunds-says-tab/edmunds-says-tab',
    'template/base/missing-content',
    'template/base/messageDialog',
    'template/base/loading'
], function(Backbone, dispatcher, EdmundsSaysTabModel, edmundsSaysTabTemplate, missingContentTemplate, messageDialogTemplate, LoadingTemplate) {
    return Backbone.View.extend({
        active: false,
        ready: false,
        missingContent: false,
        model: new EdmundsSaysTabModel(),
        initialize: function(options) {
            this.options = options;
            this.listenTo(dispatcher, 'onVehicleChange', this.load);
            this.listenTo(this.model, 'request', this.loading);
            this.listenTo(this.model, 'sync', this.init);
            this.listenTo(this.model, 'error', this.error);
        },
        render: function() {
            // Cache elements
            this.$currentTab = $('a[data-id="edmunds-says-tab"]').parent();
            this.$nextTab = this.$currentTab.next().children();

            if (this.active && this.ready && !_.isEmpty(this.model.toJSON()) && !this.missingContent) {
                this.$el.html(edmundsSaysTabTemplate({
                    model: this.model.toJSON(),
                    cons: this.model.get('con'),
                    pros: this.model.get('pro'),
                    introduction: this.model.get('introduction'),
                    make: this.options.make,
                    modelName: this.options.modelName,
                    year: this.options.year,
                    submodel: this.submodel
                }));

                // Cache elements
                this.$widget = $('.edm-widget');
                this.$header = $('header');
                this.$ratingBar = $('.rating-bar');
                this.$content = $('.content');
                this.$footer = $('footer');

                this.contentHeight = this.$widget.outerHeight() - this.$header.outerHeight() - this.$ratingBar.outerHeight() - this.$footer.outerHeight() - 22;
                this.$content.height(this.contentHeight);
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
            this.missingContent = false;
            this.$el.html(LoadingTemplate);
        },
        init: function() {
            this.ready = true;
//            this.missingContent = false;
            this.render();
        },
        error: function() {
            this.ready = true;
            this.missingContent = true;
            this.render();
        },
        load: function(styleId, submodel) {
            this.submodel = submodel;
            this.model.fetch({
                data: {
                    model: this.options.modelName,
                    make: this.options.make,
                    year: this.options.year,
                    api_key: this.options.apiKey
                },
                dataType: "jsonp",
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
        showTooltip: function() {
            dispatcher.trigger('onNoContent')
        }
    });
});