define([
    'underscore'
], function(_) {
    return _.template('' +
        '<div class="photos-tab">' +
        '<div class="rating-bar container-fluid">' +
        '<div class="row">' +
        '<div class="rating-container col-xs-12">' +
        '<div class="photos-navigation">' +
        '<div class="btn-group visible-xs clearfix">' +
        '<button type="button" class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown">All <span class="caret"></span></button>' +
        '<ul class="dropdown-menu" role="menu">' +
        '<li class="hidden"><a data-id="all" href="#">All</a></li>' +
        '<li><a data-id="interior" href="#">Interior</a></li>' +
        '<li><a data-id="exterior" href="#">Exterior</a></li>' +
        '</ul>' +
        '</div>' +
        '<ul class="nav nav-pills hidden-xs">' +
        '<li class="active"><a data-id="all" href="#">All</a></li>' +
        '<li><a data-id="interior" href="#">Interior</a></li>' +
        '<li style="margin-left: 10px"><a data-id="exterior" href="#">Exterior</a></li>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="content photos-tab">' +
        '<div class="list-photos visible-xs">' +
        '<ul>' +
        '<% _.each(items, function(el) { %><li><img src="<%= el %>" alt="slider"/></li><% }) %>' +
        '</ul>' +
        '</div>' +
        '<div class="slider-wrapper hidden-xs">' +
        '<div class="slider-viewport">' +
        '</div>' +
        '<div class="slider-controls">' +
        '<ul>' +
        '<% _.each(items, function(el) { %><li><img src="<%= el %>" alt="slider"/></li><% }) %>' +
        '</ul>' +
        '<div class="nav-left visible-sm"></div>' +
        '<div class="nav-right visible-sm"></div>' +
        '<div class="nav-top visible-md visible-lg"></div>' +
        '<div class="nav-bottom visible-md visible-lg"></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<script>(function($){$.fn.disableSelection = function () {return this.attr("unselectable", "on").css("user-select", "none").on("selectstart", false);};})(jQuery);$(".content").disableSelection();</script>' +
    '');
});