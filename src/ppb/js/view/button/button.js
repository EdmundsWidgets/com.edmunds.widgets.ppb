/**
 * Created by Ivan_Kauryshchanka on 11/5/2014.
 */
define(['backbone',
        'dispatcher',
        'model/button/button'],function(Backbone, dispatcher, buttonModel){
    return Backbone.View.extend({
        model: new buttonModel(),
        initialize: function(options) {
            this.options = options;
//            this.listenTo(dispatcher, 'onVehicleChange', this.load);
//            this.listenTo(this.model, 'request', this.load);
//            this.listenTo(this.model, 'sync', this.init);
//            this.listenTo(this.model, 'error', this.error);
            this.render();

    },
        render: function(){
            this.load();
            console.log(this.model.toJSON());
            return this;
        },
        loading: function(){

        },
        load: function(){
            this.model.fetch({
                url: this.model.url(this.options.franchaiseId),
                data: {
                    api_key: this.options.apiKey
                },
                dataType: "jsonp",
                success: function(data){
                    console.log(data);
                },
                error: function(err, data){
                    console.log('error');
                }
            });
        },
        init: function(){
            console.log(this.model.toJSON());
            this.render();
        }
    });
});