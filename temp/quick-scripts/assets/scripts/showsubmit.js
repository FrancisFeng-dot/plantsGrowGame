(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/showsubmit.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'da91806Vb5KP7qF+uRAu+Gj', 'showsubmit', __filename);
// scripts/showsubmit.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.showsubmit, this, true);
    },
    showsubmit: function showsubmit() {
        this.mask = cc.find("Canvas/masklayer");
        this.submitinfo = cc.find("Canvas/submitinfo");
        this.mask.active = true;
        this.submitinfo.active = true;
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
        //# sourceMappingURL=showsubmit.js.map
        