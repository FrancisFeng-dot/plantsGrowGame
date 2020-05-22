(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/masklist.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '12c55pVWktOe7DQAB2ztZQz', 'masklist', __filename);
// scripts/masklist.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab
    },

    onLoad: function onLoad() {},
    onEnable: function onEnable() {
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
                        item.getComponent('maskprefab').init(data);
                    }
                }
            }
        };
        var urlstr = location.href == 'http://localhost:7456/' ? 'http://game.com' : 'https://h5xyx.jinlingkeji.cn';
        xhr.open('GET', urlstr + '/api/v11/game/getTaskSpeed', true);
        xhr.send();
    },
    onDisable: function onDisable() {
        for (var i = 0; i < this.node.childrenCount; i++) {
            this.node.children[i].destroy();
        }
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
        //# sourceMappingURL=masklist.js.map
        