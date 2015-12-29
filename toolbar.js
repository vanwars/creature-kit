var Toolbar = function ($, _, project) {
    'use strict';
    this.MODES = {
        ZOOM_IN: 'zoom-in',
        ZOOM_OUT: 'zoom-out',
        PAN: 'pan',
        TRACE: 'TRACE'
    };
    this.mode = this.MODES.SELECT;
    this.init = function () {
        var that = this;
        $('i').click(function () {
            $('i').parent().removeClass('active');
            that.setMode($(this));
        });
    };

    this.setMode = function ($el) {
        $el.parent().addClass('active');
        if ($el.hasClass('zoom-in')) {
            $('#my_canvas').css("cursor", "zoom-in");
            this.mode = this.MODES.ZOOM_IN;
            this.scale(1.2);
        } else if ($el.hasClass('zoom-out')) {
            $('#my_canvas').css("cursor", "zoom-out");
            this.mode = this.MODES.ZOOM_OUT;
            this.scale(0.8);
        } else if ($el.hasClass('trace')) {
            this.mode = this.MODES.TRACE;
        }
    };

    this.scale = function (scaleFactor) {
        _.each(project.layers, function (layer) {
            // scale in relation to the top left corner:
            layer.scale(scaleFactor, layer.bounds.topLeft);
        });
    };
    this.init();
};