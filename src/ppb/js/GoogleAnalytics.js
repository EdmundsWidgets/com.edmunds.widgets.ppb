define(function() {

    var _debug = false,
        console = window.console || {
            log: function() {}
        };

    function _trackEvent(category, action, label) {
        ga('send', 'event', category, action, label);
        if (_debug) {
            console.log('Track Event: ' + [category, action, label].join(' => '));
        }
    }

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    return {
        init: function(debug) {
            _debug = !!debug;
            ga('create', 'UA-24637375-4', 'auto');
            ga('send', 'pageview');
            return this;
        },

        track: function(widget) {
            widget.on('vehicle.style.select', function(styleId) {
                _trackEvent('Vehicle Configuration', 'Select a Style', styleId);
            });
            widget.on('tab.click', function(tabName) {
                _trackEvent('Tab', 'Click', tabName);
            });
            widget.on('zip.update', function(zipCode) {
                _trackEvent('Zip', 'Zip Code is updated', zipCode);
            });
            widget.on('photos.type.click', function(photosType) {
                _trackEvent('Photos', 'Photos type is changed', photosType);
            });
            widget.on('next.review.click', function() {
                _trackEvent('Reviews', 'Click', 'Next review clicked');
            });
            widget.on('prev.review.click', function() {
                _trackEvent('Reviews', 'Click', 'Previous review clicked');
            });
            widget.on('list.review.click', function() {
                _trackEvent('Reviews', 'Click', 'Full list reviews clicked');
            });
        }

    };
});
