/*!
 * jquery.mousehold.
 * Mousehold event for jQuery
 *
 * Copyright (c) 2014 Jensen Tonne
 * http://www.jstonne.com
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

(function($){

var mouseholdactivate = function(event) {

        var node = this,
            elem = $(this),
            data = $.extend({event: event}, event.data);

        // Cancel execution of previously delayed mouseholdstart
        clearTimeout(elem.data("mousehold_delay"));

        // Listen to the mousemove event, and if user
        // moves the cursor beyond tolerated distance,
        // deactivate mousehold.
        var x = data.event.clientX,
            y = data.event.clientY,
            tolerance = data.tolerance;

        elem.on("mousemove.hold", function(event){

                var dx = Math.abs(x - event.clientX),
                    dy = Math.abs(y - event.clientY);

                if (dx >= tolerance || dy >= tolerance) {
                    mouseholddeactivate.call(this, event);
                }
            })
            .data({
                // Trigger mouseholdstart event
                // after the specified amount of delay.
                mousehold_delay: setTimeout(function(){
                    mouseholdstart.call(node, data);
                }, data.delay)
            })
            // Trigger mouseholdactivate event
            .trigger("mouseholdactivate", data);
    },

    mouseholdstart = function(data) {

        var elem = $(this);

        elem.data({
                mousehold_started: true,
                mousehold_released: false,
                mousehold_timer: setTimeout(function(){

                    // After user holds the cursor for a specified
                    // amount of time, trigger mousehold event.
                    elem.trigger("mousehold", data)
                        .data({
                            mousehold_started: false,
                            mousehold_released: true
                        })
                        // then trigger mouseholdstop event.
                        .trigger("mouseholdstop");

                }, data.duration)
            })
            // Trigger mouseholdstart event
            .trigger("mouseholdstart", data);
    },

    mouseholddeactivate = function(event) {

        var elem = $(this),
            data = $.extend({event: event}, event.data);

        // Cancel execution of mouseholdstart
        // Cancel execution of mousehold
        clearTimeout(elem.data("mousehold_delay"));
        clearTimeout(elem.data("mousehold_timer"));

        // Unbind mousemove event
        elem.off("mousemove.hold")
            // Trigger mouseholddeactivate
            .trigger("mouseholddeactivate", data)

        // If mousehold wasn't started, stop.
        if (!elem.data("mousehold_started")) return;

        // If mousehold was deactivated before it was released,
        // trigger mouseholdcancel event.
        !elem.data("mousehold_released") && elem.trigger("mouseholdcancel", data);
    },

    mousehold = $.event.special.mousehold = {

        defaults: {
            delay: 500,
            duration: 1000,
            tolerance: 0
        },

        add: function(event) {

            var data = $.extend({}, mousehold.defaults, event.data),
                selector = event.selector;

            $(this)
                .on("mousedown.hold", selector, data, mouseholdactivate)
                .on("mouseleave.hold mouseup.hold", selector, data, mouseholddeactivate);
        },

        remove: function() {

            $(this)
                .off("mousemove.hold")
                .off("mousedown.hold", mouseholdactivate)
                .off("mouseleave.hold mouseup.hold", mouseholddeactivate);
        }
    };

})(jQuery);