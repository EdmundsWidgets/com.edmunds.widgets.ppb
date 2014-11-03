define([
    'underscore'
], function(_) {
    return _.template('' +
        '<div class="spinner">' +
        '<div class="loading">Loading</div>' +
        '<span class="side sp_left">' +
        '<span class="fill"></span>' +
        '</span>' +
        '<span class="side sp_right">' +
        '<span class="fill"></span>' +
        '</span>' +
        '</div>' +
    '');
});