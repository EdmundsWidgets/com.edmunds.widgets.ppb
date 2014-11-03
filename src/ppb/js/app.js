define([
    'config',
    'jquery',
    'backbone',
    'dispatcher',
    'template/base/base',
    'view/base/styles',
    'view/rating-tab/rating-tab',
    'view/edmunds-says-tab/edmunds-says-tab',
    'view/consumer-reviews-tab/consumer-reviews-tab',
    'view/tco-tab/tco-tab',
    'view/photos-tab/photos-tab',
    'GoogleAnalytics'
], function(config, $, Backbone, dispatcher, baseTemplate, StylesView, RatingTabView, EdmundsSaysTabView, ConsumerReviewsTabView, TcoTabView, PhotosTabView, GoogleAnalytics) {
    return Backbone.View.extend({
        className: 'edm-widget',
        subscriber: window.widgetSubscriber || {},
        events: {
            'click a[data-id="rating-tab"]': 'ratingTab',
            'click a[data-id="edmunds-says-tab"]': 'edmundsSaysTab',
            'click a[data-id="consumer-reviews-tab"]': 'consumerReviewsTab',
            'click a[data-id="tco-tab"]': 'tcoTab',
            'click a[data-id="photos-tab"]': 'photosTab',
            'click button.action': 'onClickSplitButton'
        },
        tabsToDisplay: {
            'rating-tab': 'Rating',
            'edmunds-says-tab': 'Edmunds says',
            'consumer-reviews-tab': 'Consumer Reviews',
            'tco-tab': 'TCO &reg;',
            'photos-tab': 'Photos'
        },
        initialize: function() {
            this.options = config;
            GoogleAnalytics.init();
            GoogleAnalytics.track(dispatcher);

            _.each(this.subscriber._deferredEvents, function(event) {
                dispatcher.on(event.name, event.callback, event.context);
            });
//            this.subscriber.on = function(name, callback, context) {
//                dispatcher.on(name, callback, context);
//            };

            // Initialization Styles View
            this.stylesView = new StylesView({
                apiKey: this.options.apiKey,
                make: this.options.make,
                modelName: this.options.model,
                year: this.options.year
            });
            // Initialization Rating Tab View
            this.ratingTabView = new RatingTabView({
                apiKey: this.options.apiKey,
                make: this.options.make,
                modelName: this.options.model,
                year: this.options.year
            });
            // Initialization Edmunds says Tab View
            this.edmundsSaysTabView = new EdmundsSaysTabView({
                apiKey: this.options.apiKey,
                make: this.options.make,
                modelName: this.options.model,
                year: this.options.year
            });
            // Initialization Consumer Reviews Tab View
            this.consumerReviewsTabView = new ConsumerReviewsTabView({
                apiKey: this.options.apiKey
            });
            // Initialization TCO Tab View
            this.tcoTabView = new TcoTabView({
                apiKey: this.options.apiKey,
                make: this.options.make,
                modelName: this.options.model,
                year: this.options.year,
                zipCode: this.options.zipCode
            });
            // Initialization Photos Tab View
            this.photosTabView = new PhotosTabView({
                apiKey: this.options.apiKey,
                make: this.options.make,
                modelName: this.options.model,
                year: this.options.year
            });
            this.listenTo(dispatcher, 'onVehicleChange', this.resetTabs);
            this.listenTo(dispatcher, 'onNoContent', this.showTooltip);
            this.render();
        },
        render: function() {
            this.$el.html(baseTemplate({
                make: this.options.make,
                model: this.options.model,
                year: this.options.year,
                tabsList: this.options.tabsList,
                tabsToDisplay: this.tabsToDisplay,
                windowWidth: $(window).width()
            }));
            // Cache elements
            this.$mainContainer = this.$('.main-content');
            this.$navigation = this.$('.edm-navigation');
            this.$navigationTabs = this.$navigation.find('li');
            this.$navigationFirstTab = this.$navigation.find('a[data-id=' + this.options.tabsList[0] + ']');
            this.$dropdownMenu = this.$('.dropdown-menu');
            this.$modalPanel = this.$('.modal');
            this.$submodel = this.$('.submodel');

            // Set elements for subviews
            this.stylesView.setElement(this.$('.list-style-id'));
            this.ratingTabView.setElement(this.$mainContainer);
            this.edmundsSaysTabView.setElement(this.$mainContainer);
            this.consumerReviewsTabView.setElement(this.$mainContainer);
            this.tcoTabView.setElement(this.$mainContainer);
            this.photosTabView.setElement(this.$mainContainer);
            return this;
        },
        ratingTab: function(e) {
            e.preventDefault();
            var target = $(e.currentTarget).parent(),
                targetUnder = $(e.currentTarget).attr('data-id');
            dispatcher.trigger('tab.click', 'Rating');
            if (target.hasClass('disabled')) {
                this.showTooltip();
                this.$('#mySmallModalLabel').find('span').text('the "Rating" tab');
            } else {
                this.$navigationTabs.removeClass('active');
                target.addClass('active');
                this.resetActiveLinks();
                this.ratingTabView.active = true;
                this.ratingTabView.render();
            }
        },
        edmundsSaysTab: function(e) {
            e.preventDefault();
            var target = $(e.currentTarget).parent();
            dispatcher.trigger('tab.click', 'Edmunds Says');
            if (target.hasClass('disabled')) {
                this.showTooltip();
                this.$('#mySmallModalLabel').find('span').text('the "Edmunds says" tab');
            } else {
                this.$navigationTabs.removeClass('active');
                target.addClass('active');
                this.resetActiveLinks();
                this.edmundsSaysTabView.active = true;
                this.edmundsSaysTabView.render();
            }
        },
        consumerReviewsTab: function(e) {
            e.preventDefault();
            var target = $(e.currentTarget).parent();
            dispatcher.trigger('tab.click', 'Consumer Reviews');
            if (target.hasClass('disabled')) {
                this.showTooltip();
                this.$('#mySmallModalLabel').find('span').text('the "Consumer reviews" tab');
            } else {
                this.$navigationTabs.removeClass('active');
                target.addClass('active');
                this.resetActiveLinks();
                this.consumerReviewsTabView.active = true;
                if (this.$dropdownMenu.find('[data-id=consumer-reviews-tab]').length > 0) {
                    this.$dropdownMenu.find('li').removeClass('hidden').find('[data-id=consumer-reviews-tab]').parent().addClass('hidden');
                    this.$navigation.find('.action').removeData('action-id').data('action-id', 'consumer-reviews-tab').text('Reviews').parent().addClass('active');
                }
                this.consumerReviewsTabView.render();
            }
        },
        tcoTab: function(e) {
            e.preventDefault();
            var target = $(e.currentTarget).parent();
            dispatcher.trigger('tab.click', 'TCO &reg;');
            //console.log(dispatcher.trigger('tab.click', 'TCO'));
            if (target.hasClass('disabled')) {
                this.showTooltip();
                this.$('#mySmallModalLabel').find('span').text('the "TCO &reg;" tab');
            } else {
                this.$navigationTabs.removeClass('active');
                target.addClass('active');
                this.resetActiveLinks();
                this.tcoTabView.active = true;
                if (this.$dropdownMenu.find('[data-id=tco-tab]').length > 0) {
                    this.$dropdownMenu.find('li').removeClass('hidden').find('[data-id=tco-tab]').parent().addClass('hidden');
                    this.$navigation.find('.action').removeData('action-id').data('action-id', 'tco-tab').html('TCO <sup>&#174;</sup>').parent().addClass('active');
                }
                this.tcoTabView.render();
            }
        },
        photosTab: function(e) {
            e.preventDefault();
            var target = $(e.currentTarget).parent();
            dispatcher.trigger('tab.click', 'Photos');
            if (target.hasClass('disabled')) {
                this.showTooltip();
                this.$('#mySmallModalLabel').find('span').text('the "Photos" tab');
            } else {
                this.$navigationTabs.removeClass('active');
                target.addClass('active');
                this.resetActiveLinks();
                this.photosTabView.active = true;
                if (this.$dropdownMenu.find('[data-id=photos-tab]').length > 0) {
                    this.$dropdownMenu.find('li').removeClass('hidden').find('[data-id=photos-tab]').parent().addClass('hidden');
                    this.$navigation.find('.action').removeData('action-id').data('action-id', 'photos-tab').text('Photos').parent().addClass('active');
                }
                this.photosTabView.render();
            }
        },
        onClickSplitButton: function(e) {
            e.preventDefault();
            var target = $(e.currentTarget);
            switch(target.data('action-id')) {
                case 'consumer-reviews-tab':
                    dispatcher.trigger('tab.click', 'Consumer Reviews');
                    this.consumerReviewsTabView.active = true;
                    this.$navigation.find('li').removeClass('active');
                    target.parent().addClass('active');
                    this.resetActiveLinks();
                    this.consumerReviewsTabView.active = true;
                    this.consumerReviewsTabView.render();
                    break;
                case 'tco-tab':
                    dispatcher.trigger('tab.click', 'TCO');
                    this.$navigation.find('li').removeClass('active');
                    target.parent().addClass('active');
                    this.resetActiveLinks();
                    this.tcoTabView.active = true;
                    this.tcoTabView.render();
                    break;
                case 'photos-tab':
                    dispatcher.trigger('tab.click', 'Photos');
                    this.$navigation.find('li').removeClass('active');
                    target.parent().addClass('active');
                    this.resetActiveLinks();
                    this.photosTabView.active = true;
                    this.photosTabView.render();
                    break;
            }
        },
        resetTabs: function(styleId) {
            this.$submodel.text(this.stylesView.collection.get(styleId).toJSON().submodel.niceName);
            this.$navigationTabs.removeClass('active disabled');
            this.$navigationFirstTab.click();
        },
        resetActiveLinks: function() {
            this.ratingTabView.active = false;
            this.edmundsSaysTabView.active = false;
            this.consumerReviewsTabView.active = false;
            this.tcoTabView.active = false;
            this.photosTabView.active = false;
        },
        showTooltip: function() {
            this.$modalPanel.modal('show');
        }
    });
});