define([
    'underscore',
    'backbone'
], function(_, Backbone) {
    return Backbone.Collection.extend({
        parse: function(response) {
            response = this.convertDates(response);
            response = this.unTruncateText(response);
            response = this.truncateText(response);
            return response;
        },
        unTruncateText: function(data){
            _.each(data, function(model){
                model['fullText'] = model.text.substr(0);
            });
            return data;
        },
        truncateText: function(data) {
            _.each(data, function(model) {
                model.text = model.text.substr(0,147) + '...';
            });
            return data;
        },
        convertDates: function(data) {
            _.each(data, function(model) {
                var fullDate = new Date(model.created),
                    year = fullDate.getFullYear(),
                    month = fullDate.getMonth(),
                    date = fullDate.getDate();
                model.created = year + '/' + month + '/' + date;
            });
            return data;
        }
    });
});