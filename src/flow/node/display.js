import zrender from 'zrender'
import mixin from '../help/mixin'
import common from './common'
var display = zrender.Path.extend({
    type: 'display',
    shape: {
        x: 0,
        y: 0,
        width: 0,
        height: 0
    },
    buildPath: function (ctx, shape) {
       let {x,y,width,height}=shape;
       var r=height/2;
       ctx.moveTo(x+16,y);
       ctx.lineTo(x+width-r,y);
       ctx.arc(x+width-r, y+r, r, -Math.PI/2, Math.PI/2 , false);
       ctx.lineTo(x+16,y+height);
       ctx.lineTo(x,y+height/2);
       ctx.closePath();
       return ;
    }
});

class Display extends display {
    constructor(data) {
        super(data);
        this.data = data;
        this.oldfill = this.data.style.fill;
        this.anchors = [];
        this.nodeType = "node";
        this.createAnchors();
    }
    createAnchors() {
        this.anchors = [];
        var g = new zrender.Group();
        var box = g.getBoundingRect([this]);
        var t = { x: box.x + box.width / 2, y: box.y, index: 1, node: this, direct: 'top' };
        var r = { x: box.x + box.width, y: box.y + box.height / 2, index: 2, node: this, direct: 'right' };
        var b = { x: box.x + box.width / 2, y: box.y + box.height, index: 3, node: this, direct: 'bottom' };
        var l = { x: box.x, y: box.y + box.height / 2, index: 4, node: this, direct: 'left' };
        this.anchors.push(t, r, b, l);
    }
}


mixin(common,Display.prototype);

export default Display;