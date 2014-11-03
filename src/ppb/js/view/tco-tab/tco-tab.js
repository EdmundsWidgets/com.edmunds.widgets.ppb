define([
    'jquery',
    'backbone',
    'dispatcher',
    'template/base/missing-content',
    'template/base/loading',
    'template/tco-tab/tco-tab',
    'template/base/messageDialog',
    'model/tco-tab/tco-tab',
    'view/tco-tab/content'
], function($, Backbone, dispatcher, missingContentTemplate, loadingTemplate, tcoTabTemplate, missingContentTemplate, TcoTabModel, TcoContentView) {
    return Backbone.View.extend({
        active: false,
        ready: false,
        missingContent: false,
        events: {
            'keypress #zip-code-control': 'zipCodeInputFilter',
            'keydown #zip-code-control': 'zipCodeInputFilter',
            'paste #zip-code-control': 'zipCodeInputFilter',
            'input #zip-code-control': 'enableUpdateButton',
            'click #update-zip': 'updateZipCode'
        },
        model: new TcoTabModel(),
        initialize: function(options) {
            this.options = options;

            // Initialize tco content view
            this.tcoContentView = new TcoContentView({
                apiKey: this.options.apiKey,
                make: this.options.make,
                modelName: this.options.modelName,
                year: this.options.year
            });

            this.listenTo(this.model, 'request', this.loading);
            this.listenTo(this.model, 'sync', this.init);
            this.listenTo(this.model, 'error', this.error);
            this.load(this.options.zipCode);

            dispatcher.trigger('zip.update', this.options.zipCode);
        },
        render: function() {
            // Cache elements
            this.$currentTab = $('a[data-id="tco-tab"]').parent();
            $('a[data-id="tco-tab"]').html('TCO <sup>&#174;</sup>');
            this.$nextTab = this.$currentTab.next().children();
            if (this.active && this.ready && !this.missingContent) {
                this.$currentTab.removeClass('disabled');
                this.$el.html(tcoTabTemplate({
                    zipCode: this.options.zipCode,
                    region: this.model.toJSON().region,
                    stateCode: this.model.toJSON().stateCode
                }));
                this.tcoContentView.setElement('.content');
                dispatcher.trigger('onZipCodeUpdate', this.zipCode, this.model.toJSON().stateCode);
            } else if (this.active && this.ready && this.missingContent && this.$nextTab.length > 0) {
                this.$currentTab.on('click', this.showTooltip);
                this.$currentTab.addClass('disabled');
                dispatcher.trigger('prevTabIsDisabled');
                this.$nextTab.click();
            } else if (this.active && this.ready && this.missingContent && this.$nextTab.length === 0) {
                this.$currentTab.on('click', this.showTooltip);
                this.$currentTab.removeClass().addClass('disabled');
                //this.$el.html(missingContentTemplate);
            }
            return this;
        },
        loading: function() {
            this.ready = false;
            this.missingContent = false;
            this.$el.html(loadingTemplate);
        },
        init: function() {
            this.ready = true;
            this.missingContent = false;
            this.render();
        },
        error: function() {
            this.ready = true;
            this.missingContent = true;
            this.render();
            this.$currentTab.addClass('disabled');
            if (this.$nextTab.length > 0) {
                $('button.action').removeData('action-id').data('action-id', this.$nextTab.first().data('id')).text(this.$nextTab.first().text());
                $('.dropdown-menu > li').removeClass('hidden').children('[data-id=' + this.$nextTab.first().data('id') + ']').parent().addClass('hidden');
            }
            this.$currentTab.on('click', this.showTooltip);
        },
        load: function(zipCode) {
            $('a[data-id="rating-tab"]').parent().off('click', this.showTooltip);
            this.zipCode = zipCode;
            this.model.fetch({
                dataType: "jsonp",
                data: {
                    zip: zipCode,
                    api_key: this.options.apiKey,
                    fmt: 'json'
                },
                error: function(err, data){
                    var that = this;
                    if(data.status == 403){
                        if(!that.$el.parent().find('.message-block').length){
                            that.loadErrorDialog();
                        }
                    }
                }
            });
        },
        loadErrorDialog: function(){
            var message = this.$el.parent().append(messageDialogTemplate),
                that = this;
            message.find('button').on('click', function(){
                that.load();
                message.find('.message-block').detach();
            });
        },
        updateZipCode: function() {
            this.options.zipCode = this.$('#zip-code-control').val();
            dispatcher.trigger('zip.update', this.options.zipCode);
            this.load(this.options.zipCode);
        },
        enableUpdateButton: function(e) {
            var zipCode = $(e.currentTarget).val(),
                zipCodeLength = $(e.currentTarget).val().length;

            if (zipCodeLength > 4) {
                $.ajax({
                    url: 'http://api.edmunds.com/v1/api/region/zip/validation/' + zipCode,
                    data: {
                        api_key: this.options.apiKey
                    },
                    dataType: 'jsonp',
                    context: this,
                    success: function (response) {
                        if (response[zipCode] === 'true') {
                            $(e.currentTarget).tooltip('hide');
                            this.$('#update-zip').removeAttr('disabled');
                        } else {
                            $(e.currentTarget).tooltip({
                                container: 'body',
                                title: 'Invalid zip code',
                                trigger: 'manual'
                            }).tooltip('show');
                            this.$('#update-zip').attr('disabled', 'disabled');
                        }
                    },
                    error: function () {
                        this.$('#update-zip').attr('disabled', 'disabled');
                    }
                });
            } else {
                this.$('#update-zip').attr('disabled', 'disabled');
            }
        },
        zipCodeInputFilter: function (e) {
            var code = e.charCode || e.keyCode,
                convertKeyCode = String.fromCharCode(code),
                regExp = /[0-9]/,
                zipCodeLength = $(e.currentTarget).val().length;

            if (code < 32 || e.charCode == 0 || e.ctrlKey || e.altKey) {
                return;
            }

            if (zipCodeLength > 4) {
                // Especially for Firefox that doesn't support window.getSelection() on input selection
                var input = document.getElementById('zip-code-control');

                if (input.value.substring(input.selectionStart, input.selectionEnd) < 1) {
                    e.preventDefault();
                    return false;
                }
            }

            if (!regExp.test(convertKeyCode)) {
                e.preventDefault();
                return false;
            }
        },
        showTooltip: function() {
            dispatcher.trigger('onNoContent', 'TCO Tab');
        }
    });
});