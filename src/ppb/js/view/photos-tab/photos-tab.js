define([
    'backbone',
    'dispatcher',
    'atGlanceSlider',
    'template/photos-tab/photos-tab',
    'model/photos-tab/photos-tab',
    'template/base/missing-content',
    'template/base/messageDialog',
    'template/base/loading'
], function(Backbone, dispatcher, atGlanceSlider, photosTabTemplate, PhotosTabModel, missingContentTemplate, messageDialogTemplate, loadingTemplate) {
    return Backbone.View.extend({
        active: false,
        ready: false,
        missingContent: false,
        events: {
            'click .nav-left': 'moveLeft',
            'click .nav-right': 'moveRight',
            'click .nav-top': 'moveUp',
            'click .nav-bottom': 'moveDown',
            'click .slider-controls ul li': 'onClickChange',
            'click a[data-id="all"]': 'renderAll',
            'click a[data-id="interior"]': 'renderInterior',
            'click a[data-id="exterior"]': 'renderExterior',
            'click .dropdown-toggle':'onDropdownToggleClick',
            'loadError':'loadErrorFunction'
        },
        model: new PhotosTabModel(),
        initialize: function(options) {
            this.options = options;
            this.listenTo(dispatcher, 'onVehicleChange', this.load);
            this.listenTo(this.model, 'request', this.loading);
            this.listenTo(this.model, 'sync', this.init);
            this.listenTo(this.model, 'error', this.error);
        },
        render: function() {
            // Cache elements
            this.$currentTab = $('a[data-id="photos-tab"]').parent();
            this.$nextTab = this.$currentTab.next().children();
            if (this.active && this.ready && !this.missingContent) {
                this.$currentTab.removeClass('disabled');
                this.$el.html(photosTabTemplate({
                    items: this.model.toJSON().all
                }));
                this.slider = new atGlanceSlider();
            } else if (this.active && this.ready && this.missingContent && this.$nextTab.length > 0) {
                this.$currentTab.addClass('disabled');
                this.$nextTab.click();
            } else if (this.active && this.ready && this.missingContent && this.$nextTab.length === 0) {
                this.$currentTab.removeClass().addClass('disabled');
                //this.$el.html(missingContentTemplate);
            }
            if(this.$('.nav-pills.hidden-xs').is(':visible') && this.model.toJSON().interior.length == 0){
                this.$('.nav-pills.hidden-xs').find('a[data-id="interior"]').parent().addClass('disabled').tooltip({
                    trigger: 'hover',
                    title: 'Interior photo doesn\'t exist',
                    html: true
                });
            }
            if(this.$('.nav-pills.hidden-xs').is(':visible') && this.model.toJSON().exterior.length == 0){
                this.$('.nav-pills.hidden-xs').find('a[data-id="exterior"]').parent().addClass('disabled').tooltip({
                    trigger: 'hover',
                    title: 'Exterior photo doesn\'t exist',
                    html: true
                });
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
        load: function(styleId, submodel) {
            var that = this;
            if(submodel == undefined){
                submodel = window.parent.submodel;
            }
            this.ready = false;
            this.model.fetch({
                url: this.model.url(this.options.make, this.options.modelName, this.options.year, submodel),
                data: {
                    api_key: this.options.apiKey
                },
                error: function(err, data){
                    if(data.status == 403){
                       that.loadErrorDialog();
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
        onDropdownToggleClick: function(e){
            e.preventDefault();
            if(this.model.toJSON().interior.length == 0){
                this.$('.dropdown-menu').find('a[data-id="interior"]').parent().addClass('disabled');
            }
            if(this.model.toJSON().exterior.length == 0){
                this.$('.dropdown-menu').find('a[data-id="exterior"]').parent().addClass('disabled');
            }
        },
        renderAll: function(e) {
            e.preventDefault();
            dispatcher.trigger('photos.type.click', 'all');
            this.$el.html(photosTabTemplate({
                items: this.model.toJSON().all
            }));
            this.$('.dropdown-menu').find('li').removeClass('hidden');
            this.$('.dropdown-menu').find('[data-id=all]').parent().addClass('hidden');
            this.$('.photos-navigation').find('.dropdown-toggle').html('All <span class="caret"></span>').parent().addClass('active');
            this.$('.nav-pills').find('li').removeClass('active');
            this.$('.nav-pills').find('[data-id=all]').parent().addClass('active');
            if(this.$('.nav-pills.hidden-xs').is(':visible') && this.$('.nav-pills').find('[data-id=all]').parent().addClass('active') && this.model.toJSON().interior.length == 0){
                this.$('.nav-pills').find('a[data-id="interior"]').parent().addClass('disabled').tooltip({
                    trigger: 'hover',
                    title: 'Interior photo doesn\'t exist',
                    html: true
                });
            }
            if(this.$('.nav-pills.hidden-xs').is(':visible') && this.$('.nav-pills').find('[data-id=all]').parent().addClass('active') && this.model.toJSON().exterior.length == 0){
                this.$('.nav-pills').find('a[data-id="exterior"]').parent().addClass('disabled').tooltip({
                    trigger: 'hover',
                    title: 'Exterior photo doesn\'t exist',
                    html: true
                });
            }
            this.slider.resetSlider();
            return this;
        },
        renderInterior: function(e) {
            e.preventDefault();
            if(this.$('.dropdown-menu').find('a[data-id="interior"]').parent().hasClass('disabled') || this.$('.nav-pills.hidden-xs').find('a[data-id="interior"]').parent().hasClass('disabled')){
                return false;
            }
            dispatcher.trigger('photos.type.click', 'interior');
            this.$el.html(photosTabTemplate({
                items: this.model.toJSON().interior
            }));
            this.$('.dropdown-menu').find('li').removeClass('hidden');
            this.$('.dropdown-menu').find('[data-id=interior]').parent().addClass('hidden');
            this.$('.photos-navigation').find('.dropdown-toggle').html('Interior <span class="caret"></span>').parent().addClass('active');
            this.$('.nav-pills').find('li').removeClass('active');
            this.$('.nav-pills').find('[data-id=interior]').parent().addClass('active');

            if(this.$('.nav-pills.hidden-xs').is(':visible') && this.$('.nav-pills').find('[data-id=all]').parent().addClass('active') && this.model.toJSON().exterior.length == 0){
                this.$('.nav-pills').find('a[data-id="exterior"]').parent().addClass('disabled').tooltip({
                    trigger: 'hover',
                    title: 'Exterior photo doesn\'t exist',
                    html: true
                });
            }
            this.slider.resetSlider();
            return this;
        },
        renderExterior: function(e) {
            e.preventDefault();
            if(this.$('.dropdown-menu').find('a[data-id="exterior"]').parent().hasClass('disabled') || this.$('.nav-pills.hidden-xs').find('a[data-id="exterior"]').parent().hasClass('disabled')){
                return false;
            }
            dispatcher.trigger('photos.type.click', 'exterior');
            this.$el.html(photosTabTemplate({
                items: this.model.toJSON().exterior
            }));
            this.$('.dropdown-menu').find('li').removeClass('hidden');
            this.$('.dropdown-menu').find('[data-id=exterior]').parent().addClass('hidden');
            this.$('.photos-navigation').find('.dropdown-toggle').html('Exterior <span class="caret"></span>').parent().addClass('active');
            this.$('.nav-pills').find('li').removeClass('active');
            this.$('.nav-pills').find('[data-id=exterior]').parent().addClass('active');
            if(this.$('.nav-pills.hidden-xs').is(':visible') && this.$('.nav-pills').find('[data-id=all]').parent().addClass('active') && this.model.toJSON().interior.length == 0){
                this.$('.nav-pills').find('a[data-id="interior"]').parent().addClass('disabled').tooltip({
                    trigger: 'hover',
                    title: 'Interior photo doesn\'t exist',
                    html: true
                });
            }
            if(this.$('.nav-pills.hidden-xs').is(':visible') && this.$('.nav-pills').find('[data-id=all]').parent().addClass('active') && this.model.toJSON().exterior.length == 0){
                this.$('.nav-pills').find('a[data-id="exterior"]').parent().addClass('disabled');
            }
            this.slider.resetSlider();
            return this;
        },
        moveLeft: function() {
            this.slider.moveLeft();
        },
        moveRight: function() {
            this.slider.moveRight();
        },
        moveUp: function() {
            this.slider.moveUp();
        },
        moveDown: function() {
            this.slider.moveDown();
        },
        onClickChange: function(e) {
            this.slider.onClickChange(e);
        }
    });
});