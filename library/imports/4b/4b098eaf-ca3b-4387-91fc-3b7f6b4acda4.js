"use strict";
cc._RF.push(module, '4b0986vyjtDh5H8O39rSs2k', 'saysomething');
// scripts/saysomething.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        layerNode: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function onLoad() {
        var that = this;
        that.node.on(cc.Node.EventType.TOUCH_START, function () {
            that.node.getComponent(cc.Animation).play('scaleflower');
            that.layerNode.active = true;
            that.scheduleOnce(function () {
                that.layerNode.active = false;
            }, 3);
        }, that, true);
    }
});

cc._RF.pop();