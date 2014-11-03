define([
    'underscore'
], function(_){
    return _.template('' +
        '<div class="edmunds-says-tab">' +
        '<div <% if (!model.edmundsSays) { %>style="display: none;"<% } %> class="rating-bar container-fluid">' +
        '<p><%= model.edmundsSays %></p>' +
        '</div>' +
        '<section class="content container-fluid custom-height">' +
        '<div class="row">' +
        '<div class="col-xs-12 col-md-6">' +
        '<div class="pros">' +
        '<h4>PROs</h4>' +
        '<ul>' +
        '<% _.each(pros, function(el) { %><li>- <%= el %></li><% }) %>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-12 col-md-6">' +
        '<div class="cons">' +
        '<% if(cons){%><h4>CONs</h4><%} %>' +
        '<ul>' +
        '<% _.each(cons, function(el) { %><li>- <%= el %></li><% }) %>' +
        '</ul>' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-12">' +
        '<div class="rating-summary">' +
        '<h4>What\'s new for <%= year %>?</h4>' +
        '<p><%= model.whatsNew %></p>' +
        '</div>' +
        '</div>' +
        '<div class="hidden-xs col-sm-12">' +
        '<div class="rating-summary">' +
        '<h4>Introduction</h4>' +
        '<p><%= introduction %></p>' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-12">' +
        '<a target="_blank" href="http://www.edmunds.com/<%= make %>/<%= modelName %>/<%= year %>/?tab-id=reviews-tab&sub=<%= submodel %>" class="btn btn-primary btn-primary-dark">Read full review <span class="hidden-xs">on Edmunds.com</span></a>' +
        '</div>' +
        '</div>' +
        '</section>' +
        '</div>' +
    '');
});