(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/saysomething.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4b0986vyjtDh5H8O39rSs2k', 'saysomething', __filename);
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
        //# sourceMappingURL=saysomething.js.map
        