/**
 * Created by Ivan_Kauryshchanka on 11/5/2014.
 */
define(['jquery','underscore','backbone'],function($,_,Backbone){
    return Backbone.Model.extend({
       url: function(value){
           return 'http://api.edmunds.com/api/dealer/v2/franchises/' + value;
       },
       parse: function(response){

       }
    });
});