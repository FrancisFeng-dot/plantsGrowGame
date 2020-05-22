"use strict";
cc._RF.push(module, '11b27YWZjJG3qpa1WLVviHl', 'closethelayer');
// scripts/closethelayer.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        parentNode: {
            default: null,
            type: cc.Node
        },
        maskNode: {
            default: null,
            type: cc.Node
        },
        audio: {
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.closelayer, this, true);
    },
    closelayer: function closelayer() {
        var that = this;
        that.current = cc.audioEngine.play(that.audio, false, 1);
        that.node.getComponent(cc.Animation).play('scale109');
        that.scheduleOnce(function () {
            that.maskNode.active = false;
            that.parentNode.active = false;
        }, 0.4);
    },
    start: function start() {},


    onDestroy: function onDestroy() {
        cc.audioEngine.stop(this.current);
    }
});

cc._RF.pop();