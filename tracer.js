var ImageTracer = function () {
    'use strict';
    this.raster = null;
    this.path = null;
    this.padding = 10;

    this.loadImage = function () {
        var img = new Image(),
            that = this;
        img.src = 'buddies/pig.jpg';
        img.onload = function () {
            that.resizeCanvasAndDrawRaster(img);
            that.initPath();
        };
    };

    this.initPath = function () {
        var i = 0;
        if (this.path) {
            this.path.remove();
            this.path = null;
            for (i = 0; i < this.circles.length; i++) {
                this.circles[i].remove();
            }
        }
        this.path = new Path({
            segments: [],
            strokeColor: '#B6FFBF',
            strokeWidth: 3,
            strokeCap: 'round'//,
            //closed: true
        });
        this.segments = [];
        this.circles = [];
    };

    this.onDocumentDrag = function (event) {
        event.preventDefault();
    };

    this.resizeCanvasAndDrawRaster = function (image) {
        /*$('#my_canvas').width(image.width + 2 * this.padding);
        $('#my_canvas').height(image.height + 2 * this.padding);
        view.viewSize = new Size(image.width + 2 * this.padding, image.height + 2 * this.padding);*/
        this.raster = new Raster(image);
        this.raster.position = new Point(this.raster.width / 2 + this.padding, this.raster.height / 2 + this.padding);
        view.draw();
    };

    this.onDocumentDrop = function (event) {
        event.preventDefault();
        var file = event.originalEvent.dataTransfer.files[0],
            that = this,
            reader = new FileReader(),
            image;
        reader.onload = function (event) {
            image = new Image(); //document.createElement('img');
            image.onload = function () {
                that.raster.remove();
                that.resizeCanvasAndDrawRaster(image);
                that.initPath();
            };
            image.src = event.target.result;
        };
        reader.readAsDataURL(file);
    };
    
    this.updatePathAndReturnCode = function (event) {
        this.path.add(event.point);
        this.segments.push([parseInt(event.point.x) - this.padding, parseInt(event.point.y) - this.padding]);
        this.circles.push(
            new Path.Circle({
                center: event.point,
                radius: 4,
                fillColor: 'rgba(255, 255, 255, 0.5)',
                strokeColor: '#B6FFBF',
                strokeWidth: 2
            })
        );
        // Output Code:
        var s = "var path = new Path({";
        s += "<br>&nbsp;&nbsp;segments: " + JSON.stringify(this.segments, null, 0);
        s += ",<br>&nbsp;&nbsp;closed: true";
        s += ",<br>&nbsp;&nbsp;strokeColor: \"#B6FFBF\"";
        s += ",<br>&nbsp;&nbsp;strokeWidth: 5";
        s += "<br>});";
        return s;
    };

    $(document).on({
        drop: this.onDocumentDrop.bind(this),
        dragover: this.onDocumentDrag,
        dragleave: this.onDocumentDrag
    });
    this.loadImage();
};