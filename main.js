paper.install(window);
paper.setup('my_canvas');
var height = $(document).height();
$('#my_manvas').height(height);

var Trunk = function (x) {
    'use strict';
    var v;
    this.vertices = v = [
        [0, height],
        [75, 400],
        [100, 300],
        [400, 200],
        [600, 150]
    ];
    this.path = new Path();
    this.path.strokeColor = '#567e37';
    this.path.strokeWidth = 5;
    this.path.add(new Point(v[0]));
    this.path.arcTo(new Point(v[1]), new Point(v[2]));
    this.path.arcTo(new Point(v[3]), new Point(v[4]));
    this.path.smooth();
};

var tentacle1 = new Trunk(90);

/*view.onFrame = function(event) {
  tentacle1.wiggle(event);
};*/