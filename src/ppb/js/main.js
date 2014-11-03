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
        year:     window.widgetConfig.options.year,
        zipCode: window.widgetConfig.options.zipCode,
        tabsList: window.widgetConfig.options.tabsList
    }
});
require([
    'app',
    'bootstrap'
], function(App) {
    var app = new App();
    $('#atglancewidget').html(app.el);
});
