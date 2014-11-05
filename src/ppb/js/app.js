define([
    'config',
    'jquery',
    'backbone',
    'dispatcher',
    'template/base/base-button',
    'view/button/button',
    'GoogleAnalytics'
], function(config, $, Backbone, dispatcher, buttonTemplate, buttonView, GoogleAnalytics) {
    return Backbone.View.extend({
        className: 'edm-widget',
        subscriber: window.widgetSubscriber || {},
        events: {
            'click .price-button': 'buttonClick'
//            'click a[data-id="edmunds-says-tab"]': 'edmundsSaysTab',
//            'click a[data-id="consumer-reviews-tab"]': 'consumerReviewsTab',
//            'click a[data-id="tco-tab"]': 'tcoTab',
//            'click a[data-id="photos-tab"]': 'photosTab',
//            'click button.action': 'onClickSplitButton'
        },
        initialize: function() {
            this.options = config;
            GoogleAnalytics.init();
            GoogleAnalytics.track(dispatcher);

            _.each(this.subscriber._deferredEvents, function(event) {
                dispatcher.on(event.name, event.callback, event.context);
            });
            this.buttonView = new buttonView({
                value: this.options.franchaiseId
            });
//            this.listenTo(dispatcher, 'onVehicleChange', this.resetTabs);
//            this.listenTo(dispatcher, 'onNoContent', this.showTooltip);
            this.render();
        },
        render: function() {
            this.$el.html(buttonTemplate);
            // Cache elements
//            this.$navigation = this.$('.edm-navigation');
//            this.$navigationTabs = this.$navigation.find('li');
//            this.$navigationFirstTab = this.$navigation.find('a[data-id=' + this.options.tabsList[0] + ']');
//            this.$dropdownMenu = this.$('.dropdown-menu');
//            this.$modalPanel = this.$('.modal');
//            this.$submodel = this.$('.submodel');
//
//            // Set elements for subviews
//            this.stylesView.setElement(this.$('.list-style-id'));
//            this.ratingTabView.setElement(this.$mainContainer);
//            this.edmundsSaysTabView.setElement(this.$mainContainer);
//            this.consumerReviewsTabView.setElement(this.$mainContainer);
//            this.tcoTabView.setElement(this.$mainContainer);
//            this.photosTabView.setElement(this.$mainContainer);
            return this;
        },
        buttonClick: function(e){
            e.preventDefault();
            window.open("http://www.edmunds.com/inventory/lead_form_certificate.html?action=display&make=Toyota&model=Corolla&sub=Corolla%20Sedan&locationId=16446&franchiseId=56729&inventoryId=1669ED05200E890972418EA96C33253A&year=2014&rf=ddp&gp_lead_form=true", "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=101, left=528, width=700, height=500");
            return;
        }
//        ratingTab: function(e) {
//            e.preventDefault();
//            var target = $(e.currentTarget).parent(),
//                targetUnder = $(e.currentTarget).attr('data-id');
//            dispatcher.trigger('tab.click', 'Rating');
//            if (target.hasClass('disabled')) {
//                this.showTooltip();
//                this.$('#mySmallModalLabel').find('span').text('the "Rating" tab');
//            } else {
//                this.$navigationTabs.removeClass('active');
//                target.addClass('active');
//                this.resetActiveLinks();
//                this.ratingTabView.active = true;
//                this.ratingTabView.render();
//            }
//        },
//        edmundsSaysTab: function(e) {
//            e.preventDefault();
//            var target = $(e.currentTarget).parent();
//            dispatcher.trigger('tab.click', 'Edmunds Says');
//            if (target.hasClass('disabled')) {
//                this.showTooltip();
//                this.$('#mySmallModalLabel').find('span').text('the "Edmunds says" tab');
//            } else {
//                this.$navigationTabs.removeClass('active');
//                target.addClass('active');
//                this.resetActiveLinks();
//                this.edmundsSaysTabView.active = true;
//                this.edmundsSaysTabView.render();
//            }
//        },
//        consumerReviewsTab: function(e) {
//            e.preventDefault();
//            var target = $(e.currentTarget).parent();
//            dispatcher.trigger('tab.click', 'Consumer Reviews');
//            if (target.hasClass('disabled')) {
//                this.showTooltip();
//                this.$('#mySmallModalLabel').find('span').text('the "Consumer reviews" tab');
//            } else {
//                this.$navigationTabs.removeClass('active');
//                target.addClass('active');
//                this.resetActiveLinks();
//                this.consumerReviewsTabView.active = true;
//                if (this.$dropdownMenu.find('[data-id=consumer-reviews-tab]').length > 0) {
//                    this.$dropdownMenu.find('li').removeClass('hidden').find('[data-id=consumer-reviews-tab]').parent().addClass('hidden');
//                    this.$navigation.find('.action').removeData('action-id').data('action-id', 'consumer-reviews-tab').text('Reviews').parent().addClass('active');
//                }
//                this.consumerReviewsTabView.render();
//            }
//        },
//        tcoTab: function(e) {
//            e.preventDefault();
//            var target = $(e.currentTarget).parent();
//            dispatcher.trigger('tab.click', 'TCO &reg;');
//            //console.log(dispatcher.trigger('tab.click', 'TCO'));
//            if (target.hasClass('disabled')) {
//                this.showTooltip();
//                this.$('#mySmallModalLabel').find('span').text('the "TCO &reg;" tab');
//            } else {
//                this.$navigationTabs.removeClass('active');
//                target.addClass('active');
//                this.resetActiveLinks();
//                this.tcoTabView.active = true;
//                if (this.$dropdownMenu.find('[data-id=tco-tab]').length > 0) {
//                    this.$dropdownMenu.find('li').removeClass('hidden').find('[data-id=tco-tab]').parent().addClass('hidden');
//                    this.$navigation.find('.action').removeData('action-id').data('action-id', 'tco-tab').html('TCO <sup>&#174;</sup>').parent().addClass('active');
//                }
//                this.tcoTabView.render();
//            }
//        },
//        photosTab: function(e) {
//            e.preventDefault();
//            var target = $(e.currentTarget).parent();
//            dispatcher.trigger('tab.click', 'Photos');
//            if (target.hasClass('disabled')) {
//                this.showTooltip();
//                this.$('#mySmallModalLabel').find('span').text('the "Photos" tab');
//            } else {
//                this.$navigationTabs.removeClass('active');
//                target.addClass('active');
//                this.resetActiveLinks();
//                this.photosTabView.active = true;
//                if (this.$dropdownMenu.find('[data-id=photos-tab]').length > 0) {
//                    this.$dropdownMenu.find('li').removeClass('hidden').find('[data-id=photos-tab]').parent().addClass('hidden');
//                    this.$navigation.find('.action').removeData('action-id').data('action-id', 'photos-tab').text('Photos').parent().addClass('active');
//                }
//                this.photosTabView.render();
//            }
//        },
//        onClickSplitButton: function(e) {
//            e.preventDefault();
//            var target = $(e.currentTarget);
//            switch(target.data('action-id')) {
//                case 'consumer-reviews-tab':
//                    dispatcher.trigger('tab.click', 'Consumer Reviews');
//                    this.consumerReviewsTabView.active = true;
//                    this.$navigation.find('li').removeClass('active');
//                    target.parent().addClass('active');
//                    this.resetActiveLinks();
//                    this.consumerReviewsTabView.active = true;
//                    this.consumerReviewsTabView.render();
//                    break;
//                case 'tco-tab':
//                    dispatcher.trigger('tab.click', 'TCO');
//                    this.$navigation.find('li').removeClass('active');
//                    target.parent().addClass('active');
//                    this.resetActiveLinks();
//                    this.tcoTabView.active = true;
//                    this.tcoTabView.render();
//                    break;
//                case 'photos-tab':
//                    dispatcher.trigger('tab.click', 'Photos');
//                    this.$navigation.find('li').removeClass('active');
//                    target.parent().addClass('active');
//                    this.resetActiveLinks();
//                    this.photosTabView.active = true;
//                    this.photosTabView.render();
//                    break;
//            }
//        },
//        resetTabs: function(styleId) {
//            this.$submodel.text(this.stylesView.collection.get(styleId).toJSON().submodel.niceName);
//            this.$navigationTabs.removeClass('active disabled');
//            this.$navigationFirstTab.click();
//        },
//        resetActiveLinks: function() {
//            this.ratingTabView.active = false;
//            this.edmundsSaysTabView.active = false;
//            this.consumerReviewsTabView.active = false;
//            this.tcoTabView.active = false;
//            this.photosTabView.active = false;
//        },
//        showTooltip: function() {
//            this.$modalPanel.modal('show');
//        }
    });
});