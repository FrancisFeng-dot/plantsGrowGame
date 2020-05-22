"use strict";
cc._RF.push(module, 'da91806Vb5KP7qF+uRAu+Gj', 'showsubmit');
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