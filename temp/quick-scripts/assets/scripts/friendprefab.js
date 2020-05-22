(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/friendprefab.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1f92eGiqu5BfIwsj1RoNNiC', 'friendprefab', __filename);
// scripts/friendprefab.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        headimg: cc.Sprite,
        nickname: cc.RichText,
        hasenergy: cc.RichText,
        plantimage: cc.Sprite,
        plantname: cc.RichText,
        rankimg: cc.Sprite,
        ranklabel: cc.RichText
    },

    init: function init(data) {
        var that = this;
        cc.loader.load({ url: data.data.image, type: 'png' }, function (err, texture) {
            that.headimg.spriteFrame = new cc.SpriteFrame(texture);
        });
        if (data.index < 3) {
            cc.loader.loadRes('iconrank' + (data.index + 1), cc.SpriteFrame, function (err, spriteFrame) {
                that.rankimg.spriteFrame = spriteFrame;
                that.rankimg.node.active = true;
            });
        } else {
            that.ranklabel.string = '<b>' + (data.index + 1) + '</b>';
            that.ranklabel.node.active = true;
        }
        that.nickname.string = '<b>' + data.data.name + '</b>';
        that.hasenergy.string = '累计能量  +' + data.data.powers + 'g';
        if (data.data.botany.small_image) {
            cc.loader.load(data.data.botany.small_image, function (err, texture) {
                that.plantimage.spriteFrame = new cc.SpriteFrame(texture);
            });
        } else {
            that.plantimage.spriteFrame = undefined;
        }
        that.plantname.string = data.data.botany.name ? data.data.botany.name : '';
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
        //# sourceMappingURL=friendprefab.js.map
        