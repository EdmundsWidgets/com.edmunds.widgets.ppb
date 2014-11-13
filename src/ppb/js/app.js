define([
    'jquery',
    'backbone',
    'dispatcher',
    'template/base/base-button',
    'view/button/button',
    'GoogleAnalytics'
], function($, Backbone, dispatcher, baseButtonTemplate, buttonView, GoogleAnalytics) {
    return Backbone.View.extend({
        className: 'edm-widget',
        subscriber: window.widgetSubscriber || {},
        events: {

        },
        initialize: function() {
            GoogleAnalytics.init();
            GoogleAnalytics.track(dispatcher);

            _.each(this.subscriber._deferredEvents, function(event) {
                dispatcher.on(event.name, event.callback, event.context);
            });
            this.buttonView = new buttonView();
            this.render();
        },
        render: function() {
            this.$el.html(baseButtonTemplate);

            //cache
            this.$mainContainer = this.$('#prise-promise-button');

            //Set element for subview
            this.buttonView.setElement(this.$mainContainer);
            this.buttonView.render();
            return this;
        }
    });
});