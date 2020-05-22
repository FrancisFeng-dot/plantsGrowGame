(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/submitinfo.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '870a3SxYy1EV7SCctX04avd', 'submitinfo', __filename);
// scripts/submitinfo.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        username: cc.Label,
        phone: cc.Label,
        verifycode: cc.Label,
        address: cc.Label,
        countdown: {
            default: null,
            type: cc.Node
        },

        requestNode: {
            default: null,
            type: cc.Node
        }
    },

    onLoad: function onLoad() {
        this.layermsg = cc.find("Canvas/layertip");
    },
    start: function start() {},
    getverifycode: function getverifycode() {
        var that = this;
        that.count = 60;
        that.countdown.getComponent(cc.Button).interactable = false;
        that.callback1 = function () {
            if (that.count == 0) {
                that.countdown.getChildByName("Background").getChildByName("codetext").getComponent(cc.RichText).string = '重新获取';
                that.countdown.getComponent(cc.Button).interactable = true;
                that.unschedule(that.callback1);
            } else {
                that.count--;
                that.countdown.getChildByName("Background").getChildByName("codetext").getComponent(cc.RichText).string = that.count + 's';
            }
        };
        that.schedule(that.callback1, 1);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                var response = JSON.parse(xhr.responseText);
                that.layeropen(response.msg);
            }
        };
        var urlstr = location.href == 'http://localhost:7456/' ? 'http://game.com' : 'https://h5xyx.jinlingkeji.cn';
        xhr.open('POST', urlstr + '/api/v10/sms/send', true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.send('mobile=' + that.phone.string);
    },
    getinfo: function getinfo(event, customEventData) {
        var that = this;
        that.node.getChildByName("btnrequest").getComponent(cc.Animation).play('scale109');
        that.scheduleOnce(function () {
            var myreg = /^(((11[0-9]{1})|(13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if (!that.username.string) {
                that.layeropen('请输入姓名');
            } else if (!that.phone.string) {
                that.layeropen('请输入手机号');
            } else if (!that.verifycode.string) {
                that.layeropen('请输入验证码');
            } else if (!that.address.string) {
                that.layeropen('请输入地址');
            } else if (that.phone.string.length != 11) {
                that.layeropen('请输入有效的手机号码');
            } else if (!myreg.test(that.phone.string)) {
                that.layeropen('请输入有效的手机号码');
            } else {
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                        var response = JSON.parse(xhr.responseText);
                        that.layeropen(response.msg);
                        if (response.code == 1) {
                            that.mask = cc.find("Canvas/masklayer");
                            that.parentnode = cc.find("Canvas/submitinfo");
                            that.successplant = cc.find("Canvas/GroupUserinfo/completed");
                            that.processbar = cc.find("Canvas/GroupUserinfo/processbar");
                            that.flowerbed = cc.find("Canvas/bigback/background2/GrassBud/stage");
                            that.flowerbed.height = 200;
                            that.mask.active = false;
                            that.parentnode.active = false;
                            that.successplant.active = false;
                            that.processbar.active = true;

                            that.flowerbed.getComponent(cc.Sprite).spriteFrame = '';
                            that.flowerbed.getChildByName("tiprectangle1").getChildByName("tip").getComponent(cc.RichText).string = '<b>农庄现在空着哦\n去商店看看下一个植物吧</b>';
                            that.flowerbed.getChildByName("tiprectangle1").active = true;
                            setTimeout(function () {
                                that.flowerbed.getChildByName("tiprectangle1").active = false;
                            }, 4000);
                        }
                    }
                };
                var urlstr = location.href == 'http://localhost:7456/' ? 'http://game.com' : 'https://h5xyx.jinlingkeji.cn';
                xhr.open('POST', urlstr + '/api/v11/game/getDeliveryAddress', true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
                xhr.send('name=' + that.username.string + '&mobile=' + that.phone.string + '&code=' + that.verifycode.string + '&address=' + that.address.string);
            }
        }, 0.4);
    },
    layeropen: function layeropen(info) {
        var that = this;
        that.layermsg.getChildByName("layermsg").getComponent(cc.Label).string = info;
        that.layermsg.active = true;
        setTimeout(function () {
            that.layermsg.active = false;
        }, 3000);
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
        //# sourceMappingURL=submitinfo.js.map
        