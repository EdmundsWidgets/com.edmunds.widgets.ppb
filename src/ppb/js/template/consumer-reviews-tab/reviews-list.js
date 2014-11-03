define([
    'underscore'
], function(_) {
    return _.template('' +
        '<div class="reviews-tab">' +
        '<div class="rating-bar container-fluid">' +
        '<div class="row">' +
        '<% if(averageRating == "rating not found"){%>' +
            '<div class="rating-stars col-xs-6 col-sm-6">' +
            '<div class="big-stars">' +
            '<div class="star" style="background-color: #0075b8"></div>' +
            '<div class="star" style="background-color: #0075b8"></div>' +
            '<div class="star" style="background-color: #0075b8"></div>' +
            '<div class="star" style="background-color: #0075b8"></div>' +
            '<div class="star" style="background-color: #0075b8"></div>' +
            '<div class="rating-strip" style="width: <%= averageRating * 20 %>%"></div>' +
            '</div>' +
            '<div class="text-rating-star hidden-xs small-rating small-empty-rating"><span><%= averageRating %></span></div>' +
            '</div>' +
                '<div class="reviews-count col-xs-6 col-sm-6 visible-small-screen">' +
            '<span><%= averageRating %></span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<section class="content col-xs-12 custom-height">' +
            '<p style="margin: 15px 15px 0">There is no Consumer Review for this vehicle on Edmunds.com at this time. Please check back at another time!</p>' +
            '</section>' +
        '</div>' +
        '<% } else { %>' +
            '<div class="rating-stars col-xs-7 col-sm-8">' +
            '<div class="big-stars">' +
            '<div class="star"></div>' +
            '<div class="star"></div>' +
            '<div class="star"></div>' +
            '<div class="star"></div>' +
            '<div class="star"></div>' +
            '<div class="rating-strip" style="width: <%= averageRating * 20 %>%"></div>' +
            '</div>' +
            '<div class="text-rating-star hidden-xs small-rating"><span><%= averageRating %></span> out of 5.0</div>' +
            '</div>' +
            '<div class="reviews-count col-xs-5 col-sm-4">' +
            '<span class="hidden-xs">Based on</span> <span><%= reviewsCount %></span> <span class="reviews-span">reviews</span></div>' +
            '</div>' +
            '</div>' +
            '<section class="content col-xs-12 custom-height">' +
            '<% _.each(collection, function(review) { %><div class="consumer-review reviews-list" data-id="<%= review.id %>"><div class="container-fluid"><div class="row"><div class="col-xs-12 col-sm-10"><div class="row"><div class="col-xs-12"><div class="small-stars"><div class="star"></div><div class="star"></div><div class="star"></div><div class="star"></div><div class="star"></div><div class="rating-strip" style="width: <%= review.averageRating * 20 %>%"></div></div><div class="date"><%= review.created %></div> </div> <div class="col-xs-12"><h4><%= review.title %></h4> <p class="vehicle"><%= review.text %></p></div> </div> </div> <div class="hidden-xs col-sm-2"> <div class="pros"><%= review.thumbsUpDownCounter.thumbsUp %></div> <div class="clearmine"></div> <div class="cons"><%= review.thumbsUpDownCounter.thumbsDown %></div> </div> </div> </div> </div> <% }) %>' +
            '</section>' +
            '</div>' +
        '<% } %>' +

    '');
});