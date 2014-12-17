requirejs.config({
    //baseUrl: 'js/',
    paths: {
        jquery: './libs/jquery-2.1.0',
        backbone: './libs/backbone',
        underscore: './libs/underscore',
        bootstrap: './libs/bootstrap'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        }
    }
});
define('config', function() {
    var options = window.widgetConfig.options;
    var isConfigurator = (options.hasOwnProperty('isConfigurator')) ? options.isConfigurator : false;
    return {
        apiKey: options.apiKey,
        vin: options.vin,
        zipCode: options.zipCode,
        isConfigurator: isConfigurator,
        renderTo: window.widgetConfig.renderTo
    }
});
require([
    'app',
    'bootstrap',
    'config'
], function(App ,bootstrap,config) {
    var app = new App();
    $('#' + config.renderTo).html(app.el);
});
