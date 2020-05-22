(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/friendlist.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '12fac5XxJ9HroMjp4cAX28L', 'friendlist', __filename);
// scripts/friendlist.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab
    },

    onLoad: function onLoad() {
        var that = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                var response = JSON.parse(xhr.responseText);
                if (response.code == 1) {
                    var copydata = response.data;
                    for (var i = 0; i < copydata.length; i++) {
                        var item = cc.instantiate(that.itemPrefab);
                        var data = copydata[i];
                        that.node.addChild(item);
                        item.getComponent('friendprefab').init({
                            index: i,
                            data: copydata[i]
                        });
                    }
                }
            }
        };
        var urlstr = location.href == 'http://localhost:7456/' ? 'http://game.com' : 'https://h5xyx.jinlingkeji.cn';
        xhr.open('GET', urlstr + '/api/v11/game/gameFriend', true);
        xhr.send();
    },
    start: function start() {},
    sharetofriend: function sharetofriend() {
        var that = this;
        that.sharenode = cc.find("Canvas/myfriendslist/friendtip/btninvitefri");
        that.sharenode.getComponent(cc.Animation).play('scale109');
        that.scheduleOnce(function () {
            that.share = cc.find("Canvas/sharetofriend");
            that.mask = cc.find("Canvas/masklayer");
            that.parentnode = cc.find("Canvas/myfriendslist");
            that.mask.active = true;
            that.share.active = true;
            that.parentnode.active = false;
            setTimeout(function () {
                that.mask.active = false;
                that.share.active = false;
            }, 4000);
        }, 0.4);
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
        //# sourceMappingURL=friendlist.js.map
        