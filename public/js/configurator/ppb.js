(function(global) {
    "use strict";
    var widthSliderOptions = {

        min: 250,
        max: 970,
        value: 250
        },
        loadingTemplate = _.template(['' +
            '<div id="prise-promise-button-disabled">' +
            '<span class="logo"></span>' +
            '<p class="prise-promise-text"><span class="red">Price</span><span class="blue">Promise <span class="sm"><sup style="color: #627697">℠</sup></span></span></p>' +
            '<button class="price-button disabled" disabled="disabled">Get Your Special Offer</button>' +
            '</div>' +
        ''].join('')),
    AtGlanceConfigurator = Backbone.View.extend({
        events: {
            'click #widget-get': 'onSubmit',
            'reset': 'onReset',
            'valid #vehicle-api-key-control': 'onVehicleApiKeyChange',
            'valid #franchise-id-control':'onFranchiseIdChange',
            'valid #vin-code-control':'onVinKeyChange',
            'keyup #vehicle-api-key-input': 'onApplyApiKey',
            'paste #zip-code-input': 'zipCodeInputFilter',
            'click #vehicle-api-key-control [data-section="change"] .btn': 'onChangeClickKey',
            'click #franchise-id-control [data-section="change"] .btn': 'onChangeClickFranchiseId',
            'click #vin-code-control [data-section="change"] .btn': 'onChangeClickVinKey'
        },
        initialize: function() {
            var me = this;
            this.$width = this.$('[name="width"]');
            this.$height = this.$('[name="height"]');
            this.$widthSlider = this.$('#width_slider');
            this.$inputVin = this.$('#vin-code-input');
            this.vehicleApiControl = this.$('#vehicle-api-key-control').inputGroupControl({
                tooltipTitle: 'Please enter a valid API key',
                validate: this.vehicleApiKeyValidator
            }).data('inputGroupControl');
            this.franchiseCodeControl = this.$('#franchise-id-control').inputGroupControl({
                tooltipTitle: 'Please enter a valid franchise id',
                disabled: true,
                validate: this.franchiseIdCodeValidator
            }).data('inputGroupControl');
            this.vinCodeControl = this.$('#vin-code-control').inputGroupControl({
                tooltipTitle: 'Please enter a valid VIN code',
                disabled: true,
                validate: this.vin
            }).data('inputGroupControl');
            this.vinCodeControl.disable();
            this.franchiseCodeControl.disable();

            this.$('#franchise-id-control div[data-section=change] .btn').on('click', $.proxy(this.franchiseIdReset, this));
            this.$('#vehicle-api-key-control div[data-section=change] .btn').on('click', $.proxy(this.zipCodeReset, this));
            this.$('#option_colorscheme')
                .radioGroup({
                    name: 'colorScheme',
                    value: 'light'
                })
                .on('change',function(event, name, value) {
                    $('#widget-placeholder')[ value === 'dark' ? 'addClass' : 'removeClass']('dark');
                    me.options.colorscheme = value;
                    me.renderWidget();
                })
                .data('radiogroup');
            this.$('#option_colorscheme button').on('click', $.proxy(this.onChangeClass, this));
            this.widthSlider = this.createSlider(this.$widthSlider, widthSliderOptions, _.bind(this.onWidthChange, this));
            this.renderWidget = _.debounce(this.renderWidget, 500);
            this.onReset = _.debounce(this.onReset, 500, true);
        },

        $widgetPlaceholder: $('#widget-placeholder'),

        renderWidget: function () {
            this.options = this.toJSON();
            if(this.vehicleApiKey && this.franchaiseId && this.vin !== "please enter VIN here" && this.vin !== undefined){
                this.$widgetPlaceholder.find("#atglancewidget").remove();
                this.$widgetPlaceholder.prepend('<div id="atglancewidget"></div>');
                this.widget = EDM.createWidget({
                    type: 'glance',
                    renderTo: 'atglancewidget',
                    style: {
                        width: this.options.width.replace('px', ''),
                        height: this.options.height.replace('px', ''),
                        color:  this.options.colorScheme
                    },
                    scripts: [
                        '/libs/requirejs/require.js" data-main="js/main.js'
                    ],
                    options: {
                        apiKey: global.apiKey,
                        vin: global.vin,
                        franchaiseId: global.franchaiseId,
                        locationId: global.franchiseObj.dealerId,
                        zipCode: global.franchiseObj.address.zipcode
                    }
                });
            }else {
                this.loading();
                return;
            }
            return this;
        },
        loading : function(){
            this.$widgetPlaceholder.find("#atglancewidget").remove();
            this.$widgetPlaceholder.prepend('<div id="atglancewidget"></div>');
            this.$widgetPlaceholder.find("#atglancewidget").html(loadingTemplate);
        },
        createSlider: function ($el, options, onChange) {
            return $el.slider({
                range: 'min',
                value: options.value,
                min: options.min,
                max: options.max,
                create: function (event, ui) {
                    $(this).find('.ui-slider-handle').tooltip({
                        animation: false,
                        title: options.value + 'px',
                        trigger: 'manual',
                        placement: 'bottom',
                        container: $el.find('.ui-slider-handle')
                    }).tooltip('show');
                },
                slide: function (event, ui) {
                    $(this)
                        .find('.ui-slider-handle .tooltip-inner')
                        .text(ui.value + 'px');
                },
                change: function (event, ui) {
                    $(this)
                        .find('.ui-slider-handle .tooltip-inner')
                        .text(ui.value + 'px');
                    if (_.isFunction(onChange)) {
                        onChange(ui.value);
                    }
                }
            }).data('ui-slider');
        },
        onWidthChange: function (value) {
            this.$width.val(value + 'px');
            this.$height.val(100 + 'px');
            this.renderWidget();
        },
        onVehicleApiKeyChange: function(event, apiKey) {
            this.vehicleApiKey = apiKey;
            global.apiKey = this.vehicleApiKey;
            this.franchiseCodeControl.enable();
            this.$('#franchise-id-input').focus();
            this.franchiseCodeControl.options.apiKey = apiKey;
        },
        onChangeClass: function(event){
           var current = event.currentTarget;
           if(!$(current).hasClass('active')){
               $(current).addClass('active');
           }else {
               $(current).removeClass('active');
           }
        },
        onChangeClickKey: function(){
            this.vehicleApiKey = undefined;
        },
        onChangeClickVinKey: function(){
            //this.vinKey = undefined;
        },
        onChangeClickFranchiseId: function(){
            this.franchaiseId = undefined;
            global.vin = undefined;
        },
        onFranchiseIdChange: function(event, value){
            this.franchaiseId = value;
            global.franchaiseId = this.franchaiseId;
            this.vinCodeControl.enable();
            this.$('#vin-code-input').focus();
            if(!this.vehicleApiKey){
                return;
            };
            global.vin = this.vin;
            console.log(this.vin);
            this.renderWidget();
        },
        onVinKeyChange: function(event, value){
            this.vin = value;
            global.vin = this.vin;
            this.validateVin();
            this.renderWidget();
        },
        vehicleApiKeyValidator: function(value) {
            var deferred = new jQuery.Deferred();
            if (!value) {
                deferred.rejectWith(this, [value]);
                return deferred.promise();
            }
            jQuery.ajax({
                url: '/api/keyvalidate',
                data: {
                    api_key: value,
                    service: 'vehicle'
                },
                dataType: 'json',
                context: this,
                success: function (response) {
                    deferred[response.valid === true ? 'resolveWith' : 'rejectWith'](this, [value]);
                },
                error: function () {
                    deferred.rejectWith(this, [value]);
                }
            });
            return deferred.promise();
        },
        franchiseIdReset: function() {
            this.franchaiseId = undefined;
        },
        franchiseIdCodeValidator: function(value) {
            var deferred = new jQuery.Deferred();
            if (/[^[0-9]/.test(value) || !value) {
                deferred.rejectWith(this, [value]);
                return deferred.promise();
            }
            jQuery.ajax({
                url: 'http://api.edmunds.com/api/dealer/v2/franchises/' + value,
                data: {
                    api_key: this.options.apiKey
                },
                dataType: 'jsonp',
                context: this,
                success: function (response) {
                    if(response.status === 'NOT_FOUND'){
                        deferred.rejectWith(this, [value]);
                    }else {
                        //workaround
                        global.franchiseObj = response;
                        deferred.resolveWith(this, [value]);
                    }
                },
                error: function () {
                    deferred.rejectWith(this, [value]);
                }
            });
            return deferred.promise();
        },
        validateVin: function(){
            var value = this.$inputVin.val();
            if (vinValidate.validVin(value)){
                this.vin = global.vin = value;
            }else {
                this.vin = global.vin = 'please enter VIN here';
            }
        },
        vin: function(value){
           var deferred = new jQuery.Deferred();
               deferred.resolveWith(this, [value]);
           return deferred.promise();
        },
        onApplyApiKey: function(e) {
            if (e.keyCode == 13) {
                $("#vehicle-api-key-apply").click();
            }
        },
        toJSON: function() {
            var options = {};
            _.each(this.$el.serializeArray(), function (option) {
                options[option.name] = option.value;
            });
            return options;
        },
        onSubmit: function (event) {
            var isValid = true;
            event.preventDefault();
            if (!this.vehicleApiKey) {
                this.vehicleApiControl.$input.tooltip('show');
                isValid = false;
            }
            if (!this.franchaiseId) {
                this.franchiseCodeControl.$input.tooltip('show');
                isValid = false;
            }
            if (isValid) {
                // TODO show instructions
                console.log(this.toJSON());
                $('#insert-js').html(this.getJavaScriptSnippet());
                $('#widget-instructions').modal({
                    backdrop: 'static',
                    show: true
                });
            }
        },

        getJavaScriptSnippet: function() {
            _.templateSettings = {
                interpolate : /\{\{(.+?)\}\}/g
            };
            var template = this.htmlEntities([
                    '<script type="text/javascript" src="' + AtGlanceConfigurator.ORIGIN + '/loader-ppb.js"></script>\n',
                    '<script type="text/javascript">\n' + $('#js-snippet-template').html() + '\n</script>'
            ].join(''));
            return _.template(template, {
                widgetConfig: JSON.stringify(this.getWidgetConfig(), "", 4)
            }, true);
        },

        htmlEntities: function (str) {
            return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
        },

        getWidgetConfig: function() {
            return {
                type: 'glance',
                renderTo: 'atglancewidget',
                style: {
                    width: this.options.width.replace('px', ''),
                    height: this.options.height.replace('px', ''),
                    color:  this.options.colorScheme
                },
                "scripts": [
                    "/libs/requirejs/require.js\" data-main=\""+ AtGlanceConfigurator.ORIGIN + "/ppb/js/main.js"
                ],
                options: {
                    apiKey: global.apiKey,
                    franchaiseId: global.franchaiseId,
                    locationId: global.franchiseObj.dealerId,
                    zipCode: global.franchiseObj.address.zipcode,
                    vin: global.vin
                }
            };
        },
//        getInventoryObj : function(){
//            var vin = global.vin,
//                zip = global.franchiseObj.address.zipcode,
//                that = this;
//            jQuery.ajax({
//                url: 'http://api.edmunds.com/api/inventory/v1/lookup?vin='+ vin +'&zipcode='+ zip +'&range=50',
//                dataType: 'json',
//                data: {
//                    access_token: 'bdn6hgycbzk33ertkkvvurfw'
//                },
//                crossDomain: true,
//                context: this,
//                success: function (response) {
//                    that.callback(response);
//                },
//                error: function () {
//                }
//            });
//        },

        onReset: function () {
            this.franchiseCodeControl.reset();
            this.vehicleApiControl.reset();
            this.vinCodeControl.reset();
            this.widthSlider.option(widthSliderOptions);
            global.apiKey = undefined;
            global.franchaiseId = undefined;
            this.vin = undefined;
            global.franchiseObj = {};
//            if (this.vehicleApiKey) {
//                this.franchiseCodeControl.enable();
//                this.$makesList.html('<option>List of Makes</option>').attr('disabled', 'disabled');
//                this.$modelsList.html('<option>List of Models</option>').attr('disabled', 'disabled');
//                this.$yearsList.html('<option>List of Years</option>').attr('disabled', 'disabled');
//            }

//            if (global.year) {
//                global.make = this.make;
//                global.model = this.model;
//                global.submodel = this.submodel;
//                global.year = this.year;
//                global.apiKey = this.vehicleApiKey;
//                global.franchaiseId = this.franchaiseId;
////                global.zipCode = this.zipCode;
//                global.tabsList = this.tabsList;
//                this.renderWidget();
//            }

            this.widget = null;
            this.renderWidget();
        },
        reset: function () {
            this.el.reset();
            return this;
        }
    });
    global.AtGlanceConfigurator = AtGlanceConfigurator;
}(this));


