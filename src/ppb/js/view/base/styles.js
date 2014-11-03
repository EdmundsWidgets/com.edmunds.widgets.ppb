define([
    'jquery',
    'backbone',
    'dispatcher',
    'collection/base/styles',
    'template/base/styles'
], function($, Backbone, dispatcher, StylesCollection, stylesTemplate) {
    return Backbone.View.extend({
        collection: new StylesCollection(),
        events: {
            'click .dropdown-menu a': 'getStyleId'
        },
        initialize: function(options) {
            this.options = options || {};
            this.listenTo(this.collection, 'reset', this.render);
            this.load(options.make, options.modelName, options.year);
        },
        render: function() {
            var firstItem = this.collection.at(0).toJSON();
            this.$el.html(stylesTemplate({
                collection: this.collection.toJSON(),
                currentItem: firstItem
            }));

            // Cache elements
            this.$button = this.$('.btn');

            dispatcher.trigger('onVehicleChange', firstItem.id, firstItem.submodel.niceName);
            dispatcher.trigger('vehicle.style.select', firstItem.id, firstItem.name);
            return this;
        },
        load: function(make, model, year) {
            this.collection.fetch({
                url: this.collection.url(make, model, year),
                data: {
                    api_key: this.options.apiKey
                },
                reset: true,
                dataType: "jsonp"
            });
        },
        getStyleId: function(e) {
            e.preventDefault();
            var target = $(e.currentTarget),
                styleId = target.data('id'),
                styleName = this.collection.get(styleId).toJSON().name,
                submodel = this.collection.get(styleId).toJSON().submodel.niceName;
            this.$button.html('<span>' + target.text() + '<span class="arrow-down"></span></span>');
            dispatcher.trigger('onVehicleChange', styleId, submodel);
            dispatcher.trigger('vehicle.style.select', styleId, styleName);
        }
    });
});