define([
    'backbone',
    'collection/rating-tab/rating'
], function (Backbone, RatingCollection) {
    return Backbone.Model.extend({
        url: function (make, model, year) {
            return 'https://api.edmunds.com/api/vehicle/v2/grade/' + make + '/' + model + '/' + year;
        },
        initialize: function() {
            this.ratingCollection = new RatingCollection();
        },
        parse: function (response) {
            if (response.hasOwnProperty('errorType')) {
                this.trigger("error");
                return response;
            }
            this.ratingCollection.reset(response.ratings, {
                parse: true
            });
            this.ratingCollection.summary = response.summary;
            this.ratingCollection.make = response.make.name.toLowerCase();
            this.ratingCollection.modelName = response.model.name.toLowerCase();
            this.ratingCollection.subModel = response.style.submodel.niceName.toLowerCase();
            this.ratingCollection.year = response.year.year;
            response.grade = this.convertGrade(response.grade);
            return response;
        },
        convertGrade: function (grade) {
            switch (grade.toLowerCase()) {
                case 'a':
                    return {
                        grade: 'a',
                        textGrade: 'Excellent!',
                        gradeClass: 'excellent',
                        activeA: 'active'
                    };
                case 'b':
                    return {
                        grade: 'b',
                        textGrade: 'Good',
                        gradeClass: 'good',
                        activeB: 'active'
                    };
                case 'c':
                    return {
                        grade: 'c',
                        textGrade: 'Fair',
                        gradeClass: 'fair',
                        activeC: 'active'
                    };
                case 'd':
                    return {
                        grade: 'd',
                        textGrade: 'Poor',
                        gradeClass: 'poor',
                        activeD: 'active'
                    };
                case 'e':
                    return {
                        grade: 'e',
                        textGrade: 'Bad',
                        gradeClass: 'bad',
                        activeE: 'active'
                    };
                default:
                    return 'N/A';
            }
        }
    });
});