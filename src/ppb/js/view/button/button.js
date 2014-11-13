/**
 * Created by Ivan_Kauryshchanka on 11/13/2014.
 */
define([
    'config',
    'backbone',
    'dispatcher',
    'template/button/button',
    'model/button/button'
], function(config,Backbone, dispatcher, buttonTemplate, buttonModel) {
    return Backbone.View.extend({
        events: {
          'click .price-button': 'buttonClick'
        },
        model: new buttonModel(),
        initialize: function (options) {
            this.render();
        },
        render: function () {
            this.getInventoryObj();
            this.$el.html(buttonTemplate);
            return this;
        },
        getInventoryObj : function(){
            var vin = config.vin,
                zip = config.zipCode;
            this.model.fetch({
                url: this.model.url(vin, zip),
                dataType: 'json',
                data: {
                    access_token: ''
                },
                success:function(response){

                },
                error: function(err, data){
                    if(err){
                        this.$('.price-button').prop('disabled', 'disabled');
                    }
                }
            });
            return this;
        },
        buttonClick: function(e){
            e.preventDefault();
            var franchiseId = this.model.toJSON().resultsList[0].franchiseId,
                locationId = this.model.toJSON().resultsList[0].dealerLocationId,
                inventoryId = this.model.toJSON().resultsList[0].inventoryId,
                make = this.model.toJSON().resultsList[0].make,
                model = this.model.toJSON().resultsList[0].model,
                sub = this.model.toJSON().resultsList[0].submodel,
                year = this.model.toJSON().resultsList[0].year,
                url = 'http://www.edmunds.com/inventory/lead_form_certificate.html?action=display&make='+ make +'&model='+model+'&sub='+ sub +'&locationId='+ locationId +'&franchiseId='+ franchiseId +'&inventoryId='+ inventoryId +'&year=' + year +'&rf=ddp&gp_lead_form=true';
            window.open(url, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=101, left=528, width=700, height=500");
        }

    });

});
