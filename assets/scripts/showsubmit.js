cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.showsubmit, this, true);
    },

    showsubmit(){
        this.mask = cc.find("Canvas/masklayer");
        this.submitinfo = cc.find("Canvas/submitinfo");
        this.mask.active = true;
        this.submitinfo.active = true;
    }
});
