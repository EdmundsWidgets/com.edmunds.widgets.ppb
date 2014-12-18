/**
 * Created by Ivan_Kauryshchanka on 12/18/2014.
 */
console.log(casper.cli.get('baseUrl'));
casper
    .start(casper.cli.get('baseUrl'))
    .then(function () {
        this.waitForSelector("form#widget-configurator input[name='vehicleapikey']",
            function success() {
                this.test.assertExists("form#widget-configurator input[name='vehicleapikey']");
                this.click("form#widget-configurator input[name='vehicleapikey']");
            },
            function fail() {
                this.test.assertExists("form#widget-configurator input[name='vehicleapikey']");
            });
        this.waitForSelector("form#widget-configurator input[name='vehicleapikey']",
            function success() {
                this.test.assertExists("form#widget-configurator input[name='vehicleapikey']");
                this.click("form#widget-configurator input[name='vehicleapikey']");
            },
            function fail() {
                this.test.assertExists("form#widget-configurator input[name='vehicleapikey']");
            });
        this.waitForSelector("form#widget-configurator button#vehicle-api-key-apply",
            function success() {
                this.test.assertExists("form#widget-configurator button#vehicle-api-key-apply");
                this.click("form#widget-configurator button#vehicle-api-key-apply");
            },
            function fail() {
                this.test.assertExists("form#widget-configurator button#vehicle-api-key-apply");
            });
        this.waitForSelector("form#widget-configurator input#zip-code-input",
            function success() {
                this.test.assertExists("form#widget-configurator input#zip-code-input");
                this.click("form#widget-configurator input#zip-code-input");
            },
            function fail() {
                this.test.assertExists("form#widget-configurator input#zip-code-input");
            });
        this.waitForSelector("input#zip-code-input",
            function success() {
                this.sendKeys("input#zip-code-input", "90404");
            },
            function fail() {
                this.test.assertExists("input#zip-code-input");
            });
        this.waitForSelector("form#widget-configurator button#zip-code-apply",
            function success() {
                this.test.assertExists("form#widget-configurator button#zip-code-apply");
                this.click("form#widget-configurator button#zip-code-apply");
            },
            function fail() {
                this.test.assertExists("form#widget-configurator button#zip-code-apply");
            });
        this.waitForSelector("form#widget-configurator input[name='vin']",
            function success() {
                this.test.assertExists("form#widget-configurator input[name='vin']");
                this.click("form#widget-configurator input[name='vin']");
            },
            function fail() {
                this.test.assertExists("form#widget-configurator input[name='vin']");
            });
        this.waitForSelector("form#widget-configurator button#vin-code-apply",
            function success() {
                this.test.assertExists("form#widget-configurator button#vin-code-apply");
                this.click("form#widget-configurator button#vin-code-apply");
            },
            function fail() {
                this.test.assertExists("form#widget-configurator button#vin-code-apply");
            });
        this.waitForSelector("form#widget-configurator .btn.btn-small.btn-default.active",
            function success() {
                this.test.assertExists("form#widget-configurator .btn.btn-small.btn-default.active");
                this.click("form#widget-configurator .btn.btn-small.btn-default.active");
            },
            function fail() {
                this.test.assertExists("form#widget-configurator .btn.btn-small.btn-default.active");
            });
        this.waitForSelector("form#widget-configurator button#widget-get",
            function success() {
                this.test.assertExists("form#widget-configurator button#widget-get");
                this.click("form#widget-configurator button#widget-get");
            },
            function fail() {
                this.test.assertExists("form#widget-configurator button#widget-get");
            });
        this.waitForSelector(".modal-footer .btn.btn-default",
            function success() {
                this.test.assertExists(".modal-footer .btn.btn-default");
                this.click(".modal-footer .btn.btn-default");
            },
            function fail() {
                this.test.assertExists(".modal-footer .btn.btn-default");
            });

    })
    .run(function () {
        this.test.done();
    });
