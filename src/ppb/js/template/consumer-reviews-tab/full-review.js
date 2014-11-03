define([
    'underscore'
], function(_) {
    return _.template('' +
        '<div class="reviews-tab">' +
        '<div class="rating-bar container-fluid">' +
        '<div class="list-reviews"></div>' +
        '<div class="list-reviews-nav">' +
        '<div class="next-review reviews-navigation"></div>' +
        '<div class="prev-review reviews-navigation"></div>' +
        '<div class="reviews-count hidden-xs">Review <%= currentReview %> out of <%= reviewsCount %></div>' +
        '</div>' +
        '</div>' +
        '<section class="content col-xs-12">' +
        '<div class="consumer-review">' +
        '<div class="container-fluid">' +
        '<div class="row">' +
        '<div class="col-xs-12">' +
        '<div class="row">' +
        '<div class="col-xs-12">' +
        '<div class="rating-stars">' +
        '<div class="star filled"></div>' +
        '<div class="star filled"></div>' +
        '<div class="star filled"></div>' +
        '<div class="star filled"></div>' +
        '<div class="star"></div>' +
        '</div>' +
        '<div class="date"><%= model.created %></div>' +
        '</div>' +
        '<div class="col-xs-12">' +
        '<h4><%= model.title %></h4>' +
        '<p class="title">Favorite Features:</p>' +
        '<p><%= model.favoriteFeatures %></p>' +
        '<p class="title">Suggested Improvements:</p>' +
        '<p><%= model.suggestedImprovements %></p>' +
        '<p><%= model.fullText %></p>' +
        '</div>' +
        '<div class="rated col-xs-12">' +
        '<div>Item rated:</div>' +
        '<div class="pros"><%= model.thumbsUpDownCounter.thumbsUp %></div>' +
        '<div class="cons"><%= model.thumbsUpDownCounter.thumbsDown %></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</section>' +
        '</div>' +
    '');
});