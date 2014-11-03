define([
    'underscore'
], function(_){
    return _.template('' +
        '<button class="btn dropdown-toggle" title="<%= currentItem.name %>" data-toggle="dropdown"><span><%= currentItem.name %><span class="arrow-down"></span></span></button>' +
        '<ul class="dropdown-menu" role="menu">' +
        '<% _.each(collection, function(el){ %> <li><a data-id="<%= el.id %>" href="#" title="<%= el.name %>"><%= el.name %></a></li><% }) %>' +
        '</ul>' +
    '');
});