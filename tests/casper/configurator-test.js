/**
 * Created by Ivan_Kauryshchanka on 12/18/2014.
 */
var x = require('casper').selectXPath;
casper.options.viewportSize = {width: 1094, height: 1075};
casper.on('page.error', function(msg, trace) {
    this.echo('Error: ' + msg, 'ERROR');
    for(var i=0; i<trace.length; i++) {
        var step = trace[i];
        this.echo('   ' + step.file + ' (line ' + step.line + ')', 'ERROR');
    }
});
casper.test.begin('Resurrectio test', function(test) {
    casper.start('http://localhost:3000/ppb/configure');
    casper.waitForSelector("form#widget-configurator input[name='vehicleapikey']",
        function success() {
            test.assertExists("form#widget-configurator input[name='vehicleapikey']");
            this.click("form#widget-configurator input[name='vehicleapikey']");
        },
        function fail() {
            test.assertExists("form#widget-configurator input[name='vehicleapikey']");
        });
    casper.waitForSelector("form#widget-configurator input[name='vehicleapikey']",
        function success() {
            test.assertExists("form#widget-configurator input[name='vehicleapikey']");
            this.click("form#widget-configurator input[name='vehicleapikey']");
        },
        function fail() {
            test.assertExists("form#widget-configurator input[name='vehicleapikey']");
        });
    casper.waitForSelector("form#widget-configurator button#vehicle-api-key-apply",
        function success() {
            test.assertExists("form#widget-configurator button#vehicle-api-key-apply");
            this.click("form#widget-configurator button#vehicle-api-key-apply");
        },
        function fail() {
            test.assertExists("form#widget-configurator button#vehicle-api-key-apply");
        });
    casper.waitForSelector("form#widget-configurator input#zip-code-input",
        function success() {
            test.assertExists("form#widget-configurator input#zip-code-input");
            this.click("form#widget-configurator input#zip-code-input");
        },
        function fail() {
            test.assertExists("form#widget-configurator input#zip-code-input");
        });
    casper.waitForSelector("input#zip-code-input",
        function success() {
            this.sendKeys("input#zip-code-input", "90404");
        },
        function fail() {
            test.assertExists("input#zip-code-input");
        });
    casper.waitForSelector("form#widget-configurator button#zip-code-apply",
        function success() {
            test.assertExists("form#widget-configurator button#zip-code-apply");
            this.click("form#widget-configurator button#zip-code-apply");
        },
        function fail() {
            test.assertExists("form#widget-configurator button#zip-code-apply");
        });
    casper.waitForSelector("form#widget-configurator input[name='vin']",
        function success() {
            test.assertExists("form#widget-configurator input[name='vin']");
            this.click("form#widget-configurator input[name='vin']");
        },
        function fail() {
            test.assertExists("form#widget-configurator input[name='vin']");
        });
    casper.waitForSelector("form#widget-configurator button#vin-code-apply",
        function success() {
            test.assertExists("form#widget-configurator button#vin-code-apply");
            this.click("form#widget-configurator button#vin-code-apply");
        },
        function fail() {
            test.assertExists("form#widget-configurator button#vin-code-apply");
        });
    casper.waitForSelector("form#widget-configurator .btn.btn-small.btn-default.active",
        function success() {
            test.assertExists("form#widget-configurator .btn.btn-small.btn-default.active");
            this.click("form#widget-configurator .btn.btn-small.btn-default.active");
        },
        function fail() {
            test.assertExists("form#widget-configurator .btn.btn-small.btn-default.active");
        });
    casper.waitForSelector("form#widget-configurator button#widget-get",
        function success() {
            test.assertExists("form#widget-configurator button#widget-get");
            this.click("form#widget-configurator button#widget-get");
        },
        function fail() {
            test.assertExists("form#widget-configurator button#widget-get");
        });
    casper.waitForSelector(".modal-footer .btn.btn-default",
        function success() {
            test.assertExists(".modal-footer .btn.btn-default");
            this.click(".modal-footer .btn.btn-default");
        },
        function fail() {
            test.assertExists(".modal-footer .btn.btn-default");
        });

    casper.run(function() {test.done();});
});
