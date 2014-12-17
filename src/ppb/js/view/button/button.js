/**
 * Created by Ivan_Kauryshchanka on 11/13/2014.
 */
define([
    'jquery',
    'config',
    'backbone',
    'dispatcher',
    'template/button/button',
    'model/button/button'
], function($,config, Backbone, dispatcher, buttonTemplate, buttonModel) {
    return Backbone.View.extend({
        events: {
          'click .price-button': 'buttonClick'
        },
        model: new buttonModel(),
        initialize: function (){
            this.listenTo(this,'loading', this.loading);
            this.getData();
            this.render();
            if(config.isConfigurator){
                $('.logo').css('display','inline-block');
                $('.price-button').css('display','inline-block');
            }
            console.log(dispatcher);
        },
        render: function () {
            this.$el.html(buttonTemplate);
            return this;
        },
        loading: function(){
            console.log('loading');
        },
        getData: function(){
            var data = {
                vin : config.vin,
                zip : config.zipCode,
                api_key: config.apiKey
                },
                that = this;
            dispatcher.trigger('loading');
            $.ajax({
                type: 'POST',
                url: 'http://edmundswidgets-staging.herokuapp.com/api/ppb/inventory', // http://edmundswidgets-staging.herokuapp.com
                data: data,
			  	dataType: 'json',
                success: function(data){
                    that.init(data);
                        $('.logo').css('display','inline-block');
                        $('.price-button').css('display','inline-block');
                },
                error: function(err){
                    var button = $('.price-button');
                    button.prop('disabled','disabled');
                    if(config.isConfigurator){
                        $('.logo').css('display','inline-block');
                        button.css('display','inline-block');

                    }
                }
            });
            return this;
        },
        init: function(data){
            this.inventoryData = data;
        },
        buttonClick: function(e){
            e.preventDefault();
            dispatcher.trigger('ppb.button.click', 'Ppb Button');
            var franchiseId = this.inventoryData.franchiseId,
                locationId = this.inventoryData.locationId,
                inventoryId = this.inventoryData.inventoryId,
                make = this.inventoryData.make,
                model = this.inventoryData.model,
                sub = this.inventoryData.sub,
                year = this.inventoryData.year,
                apiKey = config.apiKey.substr(-4),
                guaranteedPrice = this.inventoryData.guaranteedPrice,
                expireDate = this.inventoryData.gpexperiationDate,
                $button = $('.price-button'),
                url = 'http://www.edmunds.com/inventory/lead_form_certificate.html?action=display&make='+ make +'&model='+model+'&sub='+ sub +'&locationId='+ locationId +'&franchiseId='+ franchiseId +'&inventoryId='+ inventoryId +'&year=' + year +'&rf=ppb-' + apiKey + '&gp_lead_form=true';
            var enWin = window.open(url, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=101, left=528, width=700, height=500");
            console.log(enWin);
            expireDate = new Date(expireDate);
            expireDate = expireDate.toString();
            expireDate = expireDate.slice(3,15);
            expireDate = expireDate.replace(/(\w+)\s(\w+)/, "$1 $2,");

            guaranteedPrice = parseInt(guaranteedPrice);
            guaranteedPrice = guaranteedPrice.toString();
            if(guaranteedPrice.length > 3){
                for(var i = 0; i < guaranteedPrice.length; i++){
                    guaranteedPrice = guaranteedPrice.replace(/(\d)(\d\d\d)(\.|\,|$)/, "$1,$2$3");
                }
            }
            if(guaranteedPrice && guaranteedPrice !== null && guaranteedPrice !== undefined){
                $button.hide();
                var template = _.template('' +
                    '<div class="price-wrap">' +
                    '<span class="guaranted-price">$<%= guaranteedPrice %></span>' +
                    '<p class="expire-date">Offer expires <span><%= expireDate %></span></p>' +
                    '</div>'+'');
                $('#prise-promise-button').append(template({
                    'guaranteedPrice' : guaranteedPrice,
                    'expireDate': expireDate
                }));
            }else {
                $button.prop('disabled','disabled');
            }

        }

    });
});