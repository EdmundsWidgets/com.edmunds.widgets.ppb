define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    return Backbone.Model.extend({
        url: 'https://api.edmunds.com/v1/content/editorreviews',
        parse: function (response) {
            if (!_.isEmpty(response)) {
                response = response.editorial;
                if(response.con && response.pro){
                    response.con = response.con.replace('<p>', '').replace('</p>', '').split('; ');
                    response.pro = response.pro.replace('<p>', '').replace('</p>', '').split('; ');
                }
                if (response.introduction) {
                    response.introduction = response.introduction.replace(/\s<p>.*/g, '');
                } else if (response.review) {
                    response.introduction = response.review;
                } else if(response.fvOverview){
                    response.introduction = response.fvOverview;
                }
                if(response.introduction !== undefined){
                    response.introduction = response.introduction.replace(/\s<p>.*/g, '');
                }
            } else {
                this.trigger('error');
            }
            return response;
        }
    });
});