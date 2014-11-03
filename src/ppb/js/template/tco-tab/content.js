define([
    'underscore'
], function(_) {
    return _.template('' +
        '<div class="row">' +
        '<div class="vehicle-info-container col-xs-12">' +
        '<div class="vehicle-info">' +
        '<p>Based on a 5-year estimate with 15,000  miles driven per year.</p>' +
        '<div class="row">' +
        '<p class="col-sm-6 col-md-6 true-cost-to-own">' +
        'True Cost To Own &reg;<span><%= model.tcoTotal %></span>' +
        '</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<h4>5 Year Details</h4>' +
        '<div class="btn-group">' +
        '<button class="rating-selector visible-xs btn dropdown-toggle" data-toggle="dropdown">' +
        '<div class="category">5 Yr Total</div>' +
        '<div class="arrow-down"></div>' +
        '<div class="text-grade"><%= model.tcoTotal %></div>' +
        '</button>' +
        '<button class="rating-selector rating-medium visible-sm btn dropdown-toggle" data-toggle="dropdown">' +
        '<div class="category">1 - 3 years</div>' +
        '<div class="arrow-down"></div>' +
        '</button>' +
        '<ul class="dropdown-menu tco-years" role="menu">' +
        '<li class="visible-xs"><a href="#" data-id="year-1">Year 1</a></li>' +
        '<li class="visible-xs"><a href="#" data-id="year-2">Year 2</a></li>' +
        '<li class="visible-xs"><a href="#" data-id="year-3">Year 3</a></li>' +
        '<li class="visible-xs"><a href="#" data-id="year-4">Year 4</a></li>' +
        '<li class="visible-xs"><a href="#" data-id="year-5">Year 5</a></li>' +
        '<li class="visible-xs"><a href="#" data-id="year-total">5 Yr Total</a></li>' +
        '<li class="hidden-xs"><a href="#" data-id="year-1-3">1 - 3 years</a></li>' +
        '<li class="hidden-xs"><a href="#" data-id="year-4-total">4 - 5 years and total 5 years</a></li>' +
        '</ul>' +
        '</div>' +
        '<table class="table">' +
        '<thead class="hidden-xs">' +
        '<tr>' +
        '<th class="hidden-xs years year-1-3 year-4-total"></th>' +
        '<th class="hidden-xs years year-1-3">Year 1</th>' +
        '<th class="hidden-xs years year-1-3">Year 2</th>' +
        '<th class="hidden-xs years year-1-3">Year 3</th>' +
        '<th class="hidden-xs years year-4-total hidden-sm">Year 4</th>' +
        '<th class="hidden-xs years year-4-total hidden-sm">Year 5</th>' +
        '<th class="hidden-xs years year-4-total hidden-sm">5 Yr Total</th>' +
        '</tr>' +
        '</thead>' +
        '<tfoot>' +
        '<tr>' +
        '<td>True Cost to Own &reg;</td>' +
        '<td class="years year-1 year-1-3 hidden-xs"><%= model.totalOneYear %></td>' +
        '<td class="years year-2 year-1-3 hidden-xs"><%= model.totalTwoYears %></td>' +
        '<td class="years year-3 year-1-3 hidden-xs"><%= model.totalThreeYears %></td>' +
        '<td class="years year-4 year-4-total hidden-xs hidden-sm"><%= model.totalFourYears %></td>' +
        '<td class="years year-5 year-4-total hidden-xs hidden-sm"><%= model.totalFiveYears %></td>' +
        '<td class="years year-total year-4-total hidden-sm"><%= model.tcoTotal %></td>' +
        '</tr>' +
        '</tfoot>' +
        '<tbody>' +
        '<tr>' +
        '<td>Depreciation</td>' +
        '<td class="years year-1 year-1-3 hidden-xs"><%= model.depreciation.values[0] %></td>' +
        '<td class="years year-2 year-1-3 hidden-xs"><%= model.depreciation.values[1] %></td>' +
        '<td class="years year-3 year-1-3 hidden-xs"><%= model.depreciation.values[2] %></td>' +
        '<td class="years year-4 year-4-total hidden-xs hidden-sm"><%= model.depreciation.values[3] %></td>' +
        '<td class="years year-5 year-4-total hidden-xs hidden-sm"><%= model.depreciation.values[4] %></td>' +
        '<td class="years year-total year-4-total hidden-sm"><%= model.depreciation.total %></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Taxes & Fees</td>' +
        '<td class="years year-1 year-1-3 hidden-xs"><%= model.taxandfees.values[0] %></td>' +
        '<td class="years year-2 year-1-3 hidden-xs"><%= model.taxandfees.values[1] %></td>' +
        '<td class="years year-3 year-1-3 hidden-xs"><%= model.taxandfees.values[2] %></td>' +
        '<td class="years year-4 year-4-total hidden-xs hidden-sm"><%= model.taxandfees.values[3] %></td>' +
        '<td class="years year-5 year-4-total hidden-xs hidden-sm"><%= model.taxandfees.values[3] %></td>' +
        '<td class="years year-total year-4-total hidden-sm"><%= model.taxandfees.total %></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Financing</td>' +
        '<td class="years year-1 year-1-3 hidden-xs"><%= model.financing.values[0] %></td>' +
        '<td class="years year-2 year-1-3 hidden-xs"><%= model.financing.values[1] %></td>' +
        '<td class="years year-3 year-1-3 hidden-xs"><%= model.financing.values[2] %></td>' +
        '<td class="years year-4 year-4-total hidden-xs hidden-sm"><%= model.financing.values[3] %></td>' +
        '<td class="years year-5 year-4-total hidden-xs hidden-sm"><%= model.financing.values[3] %></td>' +
        '<td class="years year-total year-4-total hidden-sm"><%= model.financing.total %></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Fuel</td>' +
        '<td class="years year-1 year-1-3 hidden-xs"><%= model.fuel.values[0] %></td>' +
        '<td class="years year-2 year-1-3 hidden-xs"><%= model.fuel.values[1] %></td>' +
        '<td class="years year-3 year-1-3 hidden-xs"><%= model.fuel.values[2] %></td>' +
        '<td class="years year-4 year-4-total hidden-xs hidden-sm"><%= model.fuel.values[3] %></td>' +
        '<td class="years year-5 year-4-total hidden-xs hidden-sm"><%= model.fuel.values[3] %></td>' +
        '<td class="years year-total year-4-total hidden-sm"><%= model.fuel.total %></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Insurance</td>' +
        '<td class="years year-1 year-1-3 hidden-xs"><%= model.insurance.values[0] %></td>' +
        '<td class="years year-2 year-1-3 hidden-xs"><%= model.insurance.values[1] %></td>' +
        '<td class="years year-3 year-1-3 hidden-xs"><%= model.insurance.values[2] %></td>' +
        '<td class="years year-4 year-4-total hidden-xs hidden-sm"><%= model.insurance.values[3] %></td>' +
        '<td class="years year-5 year-4-total hidden-xs hidden-sm"><%= model.insurance.values[3] %></td>' +
        '<td class="years year-total year-4-total hidden-sm"><%= model.insurance.total %></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Maintenance</td>' +
        '<td class="years year-1 year-1-3 hidden-xs"><%= model.maintenance.values[0] %></td>' +
        '<td class="years year-2 year-1-3 hidden-xs"><%= model.maintenance.values[1] %></td>' +
        '<td class="years year-3 year-1-3 hidden-xs"><%= model.maintenance.values[2] %></td>' +
        '<td class="years year-4 year-4-total hidden-xs hidden-sm"><%= model.maintenance.values[3] %></td>' +
        '<td class="years year-5 year-4-total hidden-xs hidden-sm"><%= model.maintenance.values[3] %></td>' +
        '<td class="years year-total year-4-total hidden-sm"><%= model.maintenance.total %></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Repairs</td>' +
        '<td class="years year-1 year-1-3 hidden-xs"><%= model.repairs.values[0] %></td>' +
        '<td class="years year-2 year-1-3 hidden-xs"><%= model.repairs.values[1] %></td>' +
        '<td class="years year-3 year-1-3 hidden-xs"><%= model.repairs.values[2] %></td>' +
        '<td class="years year-4 year-4-total hidden-xs hidden-sm"><%= model.repairs.values[3] %></td>' +
        '<td class="years year-5 year-4-total hidden-xs hidden-sm"><%= model.repairs.values[3] %></td>' +
        '<td class="years year-total year-4-total hidden-sm"><%= model.repairs.total %></td>' +
        '</tr>' +
        '<tr>' +
        '<td>Tax Credit</td>' +
        '<td class="years year-1 year-1-3 hidden-xs"><%= model.taxcredit %></td>' +
        '<td class="years year-2 year-1-3 hidden-xs"><%= model.taxcredit %></td>' +
        '<td class="years year-3 year-1-3 hidden-xs"><%= model.taxcredit %></td>' +
        '<td class="years year-4 year-4-total hidden-xs hidden-sm"><%= model.taxcredit %></td>' +
        '<td class="years year-5 year-4-total hidden-xs hidden-sm"><%= model.taxcredit %></td>' +
        '<td class="years year-total year-4-total hidden-sm"><%= model.taxcredit %></td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
    '');
});