(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/getenergy.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e990a3ZPyJCkYbXzuGxj4mu', 'getenergy', __filename);
// scripts/getenergy.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        value: cc.RichText,

        inviteprizeNode: {
            default: null,
            type: cc.Node
        }
    },

    init: function init(data) {
        this.value.string = '<b>' + data.value + 'g</b>';

        this.node.getChildByName("dynamic").active = true;
        this.node.getChildByName("howmuch").active = true;
        this.inviteprizeNode.active = true;

        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "getenergy"; //这个是代码文件名
        clickEventHandler.handler = "inviteprize";
        clickEventHandler.customEventData = data.value;

        var button = this.inviteprizeNode.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);

        this.farmer = data.farmer;
        this.node.getChildByName("iconenergy").getComponent('energyAnim').init({
            energy: this,
            hadvalue: data.hasenergyvalue,
            addvalue: data.value
        });
    },

    deprize: function deprize() {
        this.farmer.deenergy(this.node);
    },


    //领取能量
    inviteprize: function inviteprize(event, customEventData) {
        this.node.getChildByName("dynamic").active = false;
        this.node.getChildByName("howmuch").active = false;
        this.inviteprizeNode.active = false;
        this.farmer.maskNode.active = false;
        this.node.getChildByName("iconenergy").getComponent(cc.Animation).play('kettlehasenergy');
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
        //# sourceMappingURL=getenergy.js.map
        