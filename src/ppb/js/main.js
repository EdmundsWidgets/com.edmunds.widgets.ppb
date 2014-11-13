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
    return {
        apiKey:     window.widgetConfig.options.apiKey,
        franchaiseId: window.widgetConfig.options.franchaiseId,
        locationId: window.widgetConfig.options.locationId,
        vin: window.widgetConfig.options.vin,
        zipCode: window.widgetConfig.options.zipCode
    }
});
require([
    'app',
    'bootstrap'
], function(App) {
    var app = new App();
    $('#atglancewidget').html(app.el);
});
