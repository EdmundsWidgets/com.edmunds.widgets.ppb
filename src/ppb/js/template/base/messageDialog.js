/**
 * Created by Ivan_Kauryshchanka on 10/21/2014.
 */
define([
    'underscore'
], function(_) {
    return _.template('' +
            '<div class="message-block">'+
            '<div class="overlay-bg"></div>'+
            '<div class="message-content">'+
            '<div class="message-header">Oh no...</div>'+
            '<div class="message-body">'+
            '<p>Something went wrong!</p>'+
            '<p>Please return to the form and try again or <a href="Mailto:api@edmunds.com">contact</a> us directly.</p>'+
            '</div>'+
            '<div class="message-bottom">'+
            '<button type="button">Return and try again</button>'+
            '</div>'+
            '</div>'+
            '</div>'+
        '');
});