define([
    'config',
    'jquery',
    'backbone',
    'dispatcher',
    'template/base/base-button',
    'GoogleAnalytics'
], function(config, $, Backbone, dispatcher, buttonTemplate, GoogleAnalytics) {
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
            var make = config.make,
                model = config.model,
                franchiseId = config.franchaiseId,
                locationId = config.locationId,
                sub = config.sub,
                year = config.year,
                url = 'http://www.edmunds.com/inventory/lead_form_certificate.html?action=display&make='+ make +'&model='+model+'&sub='+ model +'%20'+sub + '&locationId='+ locationId +'&franchiseId='+ franchiseId +'&inventoryId=1669ED05200E890972418EA96C33253A&year=' + year +'&rf=ddp&gp_lead_form=true';
            window.open(url, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=101, left=528, width=700, height=500");
        }
    });
});