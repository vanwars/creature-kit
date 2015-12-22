var Editor = function () {
    'use strict';
    this.handle = null;
    this.handleSize = 15;
    this.hitOptions = {
        segments: true,
        tolerance: 5,
        handles: true,
        stroke: true,
        fill: true
    };
    this.path = new Path();
    this.path.importJSON('["Path",{"applyMatrix":true,"selected":true,"segments":[[{"x":564,"y":247,"selected":true},{"x":22,"y":41.22847,"selected":true},{"x":0,"y":-55.22847,"selected":true}],[{"x":640,"y":181,"selected":true},{"x":-66.22847,"y":5,"selected":true},{"x":60.22847,"y":-3,"selected":true}],[{"x":716,"y":249,"selected":true},{"x":0,"y":-55.22847,"selected":true},{"x":-18,"y":36.22847,"selected":true}],[{"x":633,"y":230,"selected":true},{"x":55.22847,"y":0,"selected":true},{"x":-16.22847,"y":60,"selected":true}]],"closed":true,"fillColor":[255,0,0],"strokeColor":[255,0,0]}]');

    this.flatten = function () {
        var i, s;
        for (i = 0; i < this.path.segments.length; i++) {
            s = this.path.segments[i];
            s.handleIn = new Point(0, 0);
            s.handleOut = new Point(0, 0);
        }
    };

    this.makeSmooth = function () {
        this.path.smooth();
    };

    this.clickEvent = function (event) {
        this.handle = null;
        var hitResult = this.path.hitTest(event.point, this.hitOptions);
        if (!hitResult) { return; }
        switch (hitResult.type) {
        case 'handle-in':
            this.handle = hitResult.segment.handleIn;
            break;
        case 'handle-out':
            this.handle = hitResult.segment.handleOut;
            break;
        case 'segment':
            this.handle = hitResult.segment.point;
            break;
        case 'stroke':
            var index = hitResult.location._segment1.index + 1,
                curveLocation = this.path.getLocationOf(hitResult.point),
                tangent = curveLocation.tangent,
                handle2 = new Point(this.handleSize * tangent.x, this.handleSize * tangent.y),
                handle1 = new Point(-1 * this.handleSize * tangent.x, -1 * this.handleSize * tangent.y),
                seg = new Segment(event.point, handle1, handle2);
            seg.selected = true;
            this.path.insertSegments(index, [seg]); //note: segments are relative
            break;
        }
    };

    this.dragEvent = function (event) {
        if (this.handle) {
            this.handle.x += event.delta.x;
            this.handle.y += event.delta.y;
        }
    };
};

/*var path = new Path.Square({
    center: view.center,
    radius: 100,
    strokeColor: 'black',
    fillColor: 'black',
    fullySelected: true
});

var path = new Path({
    segments: [[18,56],[179,2],[149,20],[160,51],[187,62],[202,98],[204,128],[186,128],[185,179],[177,178],[177,128],[79,131],[78,145],[60,147],[61,131],[19,57]],
    closed: true,
    strokeColor: "#B6FFBF",
    strokeWidth: 5,
    fullySelected: true
});
path.smooth();
*/