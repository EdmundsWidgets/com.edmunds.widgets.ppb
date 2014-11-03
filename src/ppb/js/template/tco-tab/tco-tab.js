    define([
        'underscore'
    ], function(_) {
    return _.template('' +
        '<div class="tco-tab">' +
        '<div class="rating-bar container-fluid">' +
        '<div class="row">' +
        '<div class="rating-container col-xs-12">' +
        '<div class="input-group zip-code pull-left">' +
        '<input type="text" id="zip-code-control" class="form-control" placeholder="zip" value="<%= zipCode %>">' +
        '</div>' +
        '<p class="pull-left"><%= region %>, <%= stateCode %></p>' +
        '<button id="update-zip" class="btn btn-primary pull-left update-zip">Update</button>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<section class="content container-fluid custom-height"></section>' +
        '</div>' +
    '');
});