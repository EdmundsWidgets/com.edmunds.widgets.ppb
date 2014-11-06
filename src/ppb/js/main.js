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
        make:     window.widgetConfig.options.make,
        model:     window.widgetConfig.options.model,
        sub: window.widgetConfig.options.submodel,
        year:     window.widgetConfig.options.year,
        franchaiseId: window.widgetConfig.options.franchaiseId,
        locationId: window.widgetConfig.options.locationId
    }
});
require([
    'app',
    'bootstrap'
], function(App) {
    var app = new App();
    $('#atglancewidget').html(app.el);
});
