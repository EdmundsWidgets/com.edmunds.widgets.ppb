define([
    'jquery',
    'backbone',
    'dispatcher',
    'template/tco-tab/content',
    'model/tco-tab/content',
    'template/base/missing-tco',
    'template/base/loading'
], function($, Backbone, dispatcher, contentTemplate, TcoModel, missingTcoTemplate, loadingTemplate) {
    return Backbone.View.extend({
        active: false,
        ready: false,
        missingContent: false,
        events: {
            'click .tco-years a': 'onYearChange'
        },
        model: new TcoModel(),
        initialize: function(options) {
            this.options = options;

            // Stores styleID when it changes
            this.listenTo(dispatcher, 'onVehicleChange', function(styleId) {
                this.styleId = styleId;
            });
            this.listenTo(dispatcher, 'onZipCodeUpdate', this.load);
            this.listenTo(this.model, 'request', this.loading);
            this.listenTo(this.model, 'sync', this.init);
            this.listenTo(this.model, 'error', this.error);
        },
        render: function() {
            // Cache elements
            this.$widget = $('.edm-widget');
            this.$header = $('header');
            this.$ratingBar = $('.rating-bar');
            this.$footer = $('footer');

            this.contentHeight = this.$widget.outerHeight() - this.$header.outerHeight() - this.$ratingBar.outerHeight() - this.$footer.outerHeight() - 2;
            if( this.model.toJSON() && this.model.toJSON().hasOwnProperty('depreciation')){
                if (this.ready && !this.missingContent) {
                    this.$el.html(contentTemplate({
                        model: this.model.toJSON()
                    })).height(this.contentHeight);
                    this.$cells = this.$('.table').find('.years');
                    this.$select = this.$('.rating-selector');
                } else if (this.ready && this.missingContent) {
                    this.$el.html(missingTcoTemplate({
                        make: this.options.make,
                        modelName: this.options.modelName,
                        year: this.options.year,
                        styleId: this.styleId
                    })).height(this.contentHeight).css('overflow', 'hidden');
                }
            }else {
                this.$el.html(missingTcoTemplate({
                    make: this.options.make,
                    modelName: this.options.modelName,
                    year: this.options.year,
                    styleId: this.styleId
                })).height(this.contentHeight).css('overflow', 'hidden');
                return;
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
            this.missingContent = this.model.error === true;
            this.render();
        },
        error: function() {
            this.ready = true;
            this.missingContent = true;
            this.render();
        },
        load: function(zipCode, stateCode) {
            this.model.fetch({
                url: this.model.url(this.styleId, zipCode, stateCode),
                dataType: "jsonp",
                data: {
                    api_key: this.options.apiKey,
                    fmt: 'json'
                }
            });
        },
        onYearChange: function (e) {
            e.preventDefault();
            if ($(e.currentTarget).data('id') === 'year-1-3' || $(e.currentTarget).data('id') === 'year-4-total') {
                this.$select.find('.category').text($(e.currentTarget).text());
                this.$select.find('.text-grade').empty();
                this.$cells.addClass('hidden-sm');
                this.$cells.filter('.' + $(e.currentTarget).data('id')).removeClass('hidden-sm');
            } else {
                this.$select.find('.category').text($(e.currentTarget).text());
                this.$select.find('.text-grade').text(this.$('tfoot').find('.' + $(e.currentTarget).data('id')).text());
                this.$cells.addClass('hidden-xs');
                this.$cells.filter('.' + $(e.currentTarget).data('id')).removeClass('hidden-xs');
            }
        }
    });
});