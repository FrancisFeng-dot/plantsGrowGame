(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/watering.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '94fde8YUB9Hz5rtwx159rhH', 'watering', __filename);
// scripts/watering.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        kettlevalue: cc.RichText,
        tip: {
            default: null,
            type: cc.Node
        },
        audio: {
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad: function onLoad() {
        var that = this;
        that.node.on(cc.Node.EventType.TOUCH_START, that.startwater, that, true);
        that.waterplant = cc.find("Canvas/bigback/background2/GrassBud/stage/watering");
        that.waterplant.getComponent('afterwater').init({
            kettlevalue: this.kettlevalue
        });
        that.prefrequentclick = false;
    },
    startwater: function startwater() {
        var that = this;
        that.node.getChildByName("laykettle").getChildByName("kettle").getComponent(cc.Animation).play('scale109');
        that.scheduleOnce(function () {
            var num = parseInt(that.kettlevalue.string.replace(/\<b\>([0-9]+)g\<\/b\>/g, '$1'));
            if (that.prefrequentclick && num >= 10) {
                that.tip.getChildByName("text").getComponent(cc.RichText).string = '<b>正在浇水呢～</b>';
                that.tip.active = true;
                that.scheduleOnce(function () {
                    that.tip.active = false;
                }, 3);
            } else {
                that.prefrequentclick = true;
                if (num < 10) {
                    that.tip.getChildByName("text").getComponent(cc.RichText).string = num == 0 ? '<b>水壶空了去领水滴吧</b>' : '<b>水滴不够去领水滴吧</b>';
                    that.tip.active = true;
                    that.scheduleOnce(function () {
                        that.tip.active = false;
                    }, 3);
                } else {
                    that.current = cc.audioEngine.play(that.audio, false, 1);
                    that.waterplant.active = true;
                    that.waterplant.getComponent(cc.Animation).play('watering');
                }
                that.scheduleOnce(function () {
                    that.prefrequentclick = false;
                }, 4);
            }
        }, 0.4);
    },


    onDestroy: function onDestroy() {
        cc.audioEngine.stop(this.current);
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=watering.js.map
        