// Canvas in cui generare il tutto
var canvas = document.getElementById("canvas");

function windowResizeHandler() {
    canvas.width = $(window).width();
    canvas.height = $(window).height();
    canvas.style.position = "absolute";
    canvas.style.left = 0 * .5 + "px";
    canvas.style.top = 0 * .5 + "px"
}

$(document).ready(function () {
    windowResizeHandler();
    $("a").click(function () {
        $(this).effect("pulsate", {
            times: 5
        }, 1000);
    });
    
     if ($.cookie('hintshown') == undefined) {
        setTimeout("showHint()",2000);
        $.cookie('hintshown', 'true', { expires: 2 });
     }
})

function showHint() {
    $('.hint').css('opacity', 0.6);
}

// Carichiamo un effetto random
var script = 'js/effect-' + Math.floor((Math.random() * 2) + 1) + '.js';
$.getScript(script);

