define([
    'underscore'
], function(_) {
    return _.template('' +
        '<% if(date == "not found"){%>' +
            '<div class="rating-bar container-fluid">' +
            '<div class="row">' +
            '<div class="rating-container col-md-12">' +
            '<div class="test-drive-date pull-right">' +
            '<p class="bold">Driven on</p>' +
            '<p>-/-/-</p>' +
            '</div>' +
            '<div class="rating clearfix">' +
            '<div class="right-side">' +
            '<div class="thumbs-down hidden-xs">' +
            '</div>' +
            '<div class="letter-grade hidden-xs  fair">c</div>' +
            '<div class="letter-grade hidden-xs  poor">d</div>' +
            '<div class="letter-grade hidden-xs  bad">e</div>' +
            '</div>' +
            '<div class="left-side clearfix">' +
            '<div class="letter-grade active  visible-xs">a</div>' +
            '<div class="letter-grade hidden-xs  excellent">a</div>' +
            '<div class="letter-grade hidden-xs  good">b</div>' +
            '<div class="thumbs-up hidden-xs"></div>' +
            '</div> <div class="edmunds-grade-separator hidden-xs"><span>Edmunds rating</span></div>' +
            '<div class="edmunds-rating visible-xs">' +
            '<p>Edmunds Rating</p>' +
            '<p class="text-grade"></p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="container-fluid clearfix" style="background-color: #fff">' +
            '<p style="margin: 15px 0 0; color: #000">There is no Edmunds Rating for this vehicle on Edmunds.com at this time. Please check back at another time!</p>' +
            '</div>' +
        '<% } else { %>' +
        '<div class="rating-tab">' +
        '<div class="rating-bar container-fluid">' +
        '<div class="row">' +
        '<div class="rating-container col-md-8">' +
        '<div class="test-drive-date pull-right">' +
        '<p class="bold">Driven on</p>' +
        '<p><%= date %></p>' +
        '</div>' +
        '<div class="rating clearfix">' +
        '<div class="right-side">' +
        '<div class="thumbs-down hidden-xs">' +
        '</div>' +
        '<div class="letter-grade hidden-xs <%= grade.activeC %> fair">c</div>' +
        '<div class="letter-grade hidden-xs <%= grade.activeD %> poor">d</div>' +
        '<div class="letter-grade hidden-xs <%= grade.activeE %> bad">e</div>' +
        '</div>' +
        '<div class="left-side clearfix">' +
        '<div class="letter-grade active <%= grade.gradeClass %> visible-xs"><%= grade.grade %></div>' +
        '<div class="letter-grade hidden-xs <%= grade.activeA %> excellent">a</div>' +
        '<div class="letter-grade hidden-xs <%= grade.activeB %> good">b</div>' +
        '<div class="thumbs-up hidden-xs"></div>' +
        '</div> <div class="edmunds-grade-separator hidden-xs"><span>Edmunds rating</span></div>' +
        '<div class="edmunds-rating visible-xs">' +
        '<p>Edmunds Rating</p>' +
        '<p class="text-grade"><%= grade.textGrade %></p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="vehicle-info-container col-md-4">' +
        '<div class="vehicle-info">' +
        '<p>Vehicle Tested: <%= make.name %> <%= model.name %> <%= year.year %> <%= style.submodel.niceName %> <%= style.name %></p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<section class="content container-fluid custom-height"></section>' +
        '</div>' +
        '<% } %>' +
    '');
});