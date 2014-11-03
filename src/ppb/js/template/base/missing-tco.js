define([
    'underscore'
], function(_) {
    return _.template('' +
        '<div class="missing-tco">' +
            '<h4>Edmunds True Cost to Own<sup>&reg;</sup></h4>' +
            '<p>There is not enough TCO data available at this time to calculate the Edmunds True Cost to Own<sup>&reg;</sup>. Please check back soon or <a href="http://www.edmunds.com/<%= make %>/<%= modelName %>/<%= year %>/tco.html?style=<%= styleId %>" target="_blank">see more TCO<sup>&reg;</sup> info.</a></p>' +
        '</div>' +
    '');
});