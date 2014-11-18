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
            'valid #zip-code-control': 'onZipCodeChange',
            'valid #vin-code-control':'onVinKeyChange',
            'keyup #vehicle-api-key-input': 'onApplyApiKey',
            'keyup #zip-code-input': 'onApplyZipCode',
            'keypress #zip-code-input': 'zipCodeInputFilter',
            'paste #zip-code-input': 'zipCodeInputFilter',
            'click #vehicle-api-key-control [data-section="change"] .btn': 'onChangeClickKey',
            'click #vin-code-control [data-section="change"] .btn': 'onChangeClickVinKey',
            'click #zip-code-control [data-section="change"] .btn': 'onChangeClickZip'
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
            this.vinCodeControl = this.$('#vin-code-control').inputGroupControl({
                tooltipTitle: 'Please enter a valid VIN code',
                disabled: true,
                validate: this.vin
            }).data('inputGroupControl');
            this.vinCodeControl.disable();
            this.zipCodeControl = this.$('#zip-code-control').inputGroupControl({
                tooltipTitle: 'Please enter a valid ZIP code',
                disabled: true,
                validate: this.zipCodeValidator
            }).data('inputGroupControl');
            this.zipCodeControl.disable();
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
            if(this.vehicleApiKey && this.zipCode && this.vin !== "please enter VIN here" && this.vin !== undefined){
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
                        zipCode:  global.zipCode
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
            global.zipCode = this.zipCode;
            this.renderWidget();
        },
        onVehicleApiKeyChange: function(event, apiKey) {
            this.vehicleApiKey = apiKey;
            global.apiKey = this.vehicleApiKey;
            this.zipCodeControl.enable();
            this.$('#franchise-id-input').focus();
            this.zipCodeControl.options.apiKey = apiKey;
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
        onZipCodeChange: function (event, zipCode) {
            this.zipCode = zipCode;
            global.zipCode = this.zipCode;
            if(!this.vehicleApiKey){
                return;
            }
            this.vinCodeControl.enable();
            this.renderWidget();
        },
        onApplyZipCode: function(e) {
            if (e.keyCode == 13) {
                $("#zip-code-apply").click();
            }
        },
        zipCodeInputFilter: function (e) {
            var code = e.keyCode || e.which,
                convertKeyCode = String.fromCharCode(code),
                regExp = /[0-9]/;

            // Firefox fix. Prevent disable the backspace key.
            // note: Need to prevent disable all functional keys like delete, control, alt etc.
            if (code === 8) {
                return;
            }

            if (!regExp.test(convertKeyCode)) {
                e.preventDefault();
                return false;
            }
        },
        onChangeClickZip: function(){
            this.zipCode = undefined;
        },
        zipCodeValidator: function(value) {
            var deferred = new jQuery.Deferred();
            if (!/^\d{5}$/.test(value)) {
                deferred.rejectWith(this, [value]);
                return deferred.promise();
            }
            jQuery.ajax({
                url: 'http://api.edmunds.com/v1/api/region/zip/validation/' + value,
                data: {
                    api_key: this.options.apiKey
                },
                dataType: 'jsonp',
                context: this,
                success: function (response) {
                    deferred[response[value] === 'true' ? 'resolveWith' : 'rejectWith'](this, [value]);
                },
                error: function () {
                    deferred.rejectWith(this, [value]);
                }
            });
            return deferred.promise();
        },
        zipCodeReset: function() {
            this.renderWidget();
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
            if (!this.zipCode) {
                this.zipCodeControl.$input.tooltip('show');
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
                    vin: global.vin,
                    zipCode:  global.zipCode
                }
            };
        },
        onReset: function () {
            this.vehicleApiControl.reset();
            this.vinCodeControl.reset();
            this.zipCodeControl.reset();
            if (this.vehicleApiKey) {
                this.zipCodeControl.enable();
            }
            this.widthSlider.option(widthSliderOptions);
            global.apiKey = undefined;
            this.vin = undefined;
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


