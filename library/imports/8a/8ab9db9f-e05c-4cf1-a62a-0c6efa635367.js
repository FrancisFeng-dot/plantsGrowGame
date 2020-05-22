"use strict";
cc._RF.push(module, '8ab9duf4FxM8aYqDG76Y1Nn', 'croplistprefab');
// scripts/croplistprefab.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        plantimage: cc.Sprite,
        energy: cc.Label,
        prize: cc.Label,

        plantNode: {
            default: null,
            type: cc.Node
        }
    },

    init: function init(data) {
        var that = this;
        that.isnew = data.isnew;
        that.parentnode = cc.find("Canvas/superMarket");

        cc.loader.load(data.plantinfo.image, function (err, texture) {
            that.plantimage.spriteFrame = new cc.SpriteFrame(texture);
        });
        that.energy.string = data.plantinfo.power;

        var str = '小件精装';
        for (var j = 0; j < data.plantinfo.prize_ids.length; j++) {
            str += j == data.plantinfo.prize_ids.length - 1 ? data.plantinfo.prize_ids[j].name + '等' : data.plantinfo.prize_ids[j].name + '/';
        }
        that.prize.string = str;

        if (data.plantinfo.status == 0) {
            if (data.isbotany == 1) {
                //有植物在种植了，弹框
                var clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = that.node; //这个 node 节点是你的事件处理代码组件所属的节点
                clickEventHandler.component = "croplistprefab"; //这个是代码文件名
                clickEventHandler.handler = "justoneplant";
                var button = that.plantNode.getComponent(cc.Button);
                button.clickEvents.push(clickEventHandler);
            } else {
                var clickEventHandler = new cc.Component.EventHandler();
                clickEventHandler.target = that.node; //这个 node 节点是你的事件处理代码组件所属的节点
                clickEventHandler.component = "croplistprefab"; //这个是代码文件名
                clickEventHandler.handler = "startplanting";
                clickEventHandler.customEventData = data.plantinfo.id;
                var button = that.plantNode.getComponent(cc.Button);
                button.clickEvents.push(clickEventHandler);
            }
        } else if (data.plantinfo.status == 1) {
            that.plantNode.getComponent(cc.Button).interactable = false;
            cc.loader.loadRes("beingplant", cc.SpriteFrame, function (err, spriteFrame) {
                that.plantNode.getChildByName('Background').getComponent(cc.Sprite).spriteFrame = spriteFrame;
            }); //正在种植中
        } else {
            cc.loader.loadRes("btnschedule", cc.SpriteFrame, function (err, spriteFrame) {
                that.plantNode.getChildByName('Background').getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            that.plantNode.width = 282;

            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = that.node; //这个 node 节点是你的事件处理代码组件所属的节点
            clickEventHandler.component = "croplistprefab"; //这个是代码文件名
            clickEventHandler.handler = "showqrcode";

            var button = that.plantNode.getComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);
        } //查看进度
    },

    startplanting: function startplanting(event, customEventData) {
        var that = this;
        that.node.getChildByName("rightlayout").getChildByName("plantnow").getComponent(cc.Animation).play('scale109');
        that.scheduleOnce(function () {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.code == 1) {
                        var copydata = response.data;
                        that.changgeplant = cc.find("Canvas/bigback/background2/GrassBud/stage");
                        cc.loader.load(copydata.botany_image, function (err, texture) {
                            that.changgeplant.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                        });
                        if (that.isnew == 1) {
                            that.fristinNode = cc.find("Canvas/firstshow");
                            that.fristinNode.active = false;
                            var e = new cc.Event.EventCustom('hidefirstin', true);
                            e.setUserData({ energy: copydata.water });
                            that.plantNode.dispatchEvent(e);
                        } else {
                            that.parentnode.active = false;
                            that.masknode = cc.find("Canvas/masklayer");
                            that.masknode.active = false;

                            that.kettletip = cc.find("Canvas/kettle/tip");
                            that.kettletip.getChildByName("text").getComponent(cc.RichText).string = '<b>给植物浇水才生长哦</b>';
                            that.kettletip.active = true;

                            that.changgeplant.getChildByName("tiprectangle1").getChildByName("tip").getComponent(cc.RichText).string = '<b>我发芽啦\n主人快给我浇水吧</b>';
                            that.changgeplant.getChildByName("tiprectangle1").active = true;
                            that.scheduleOnce(function () {
                                that.kettletip.active = false;
                                that.changgeplant.getChildByName("tiprectangle1").active = false;
                            }, 5);
                        }
                    }
                }
            };
            var urlstr = location.href == 'http://localhost:7456/' ? 'http://game.com' : 'https://h5xyx.jinlingkeji.cn';
            xhr.open('POST', urlstr + '/api/v11/game/choiceBotany', true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.send('gbid=' + customEventData);
        }, 0.4);
    },
    showqrcode: function showqrcode() {
        var that = this;
        that.node.getChildByName("rightlayout").getChildByName("plantnow").getComponent(cc.Animation).play('scale109');
        that.scheduleOnce(function () {
            that.qrcode = cc.find("Canvas/qr");
            that.parentnode.active = false;

            var url = 'https://h5xyx.jinlingkeji.cn/erweima.png'; //要显示的图片url地址
            var gameDiv = document.getElementById('Cocos2dGameContainer'); //获取div元素
            var bigImg = document.createElement("img"); //创建img元素
            bigImg.id = 'QRCode';
            bigImg.src = url; //给img标签添加图片源
            bigImg.alt = 'bigImg';

            bigImg.width = 189;
            bigImg.height = 191;
            console.log(bigImg.style);
            bigImg.style.position = 'absolute';
            bigImg.style.top = '0px';
            bigImg.style.bottom = '0px';
            bigImg.style.left = '0px';
            bigImg.style.right = '0px';
            bigImg.style.margin = "auto"; //y坐标
            //bigImg.style.left = parseInt(gameDiv.style.width.replace(/px/, '')) / 2 - bigImg.width / 2 + "px";//设置图片居中显示

            gameDiv.appendChild(bigImg); //为div添加子元素img
            that.qrcode.active = true;
        }, 0.4);
    },
    justoneplant: function justoneplant() {
        var that = this;
        that.node.getChildByName("rightlayout").getChildByName("plantnow").getComponent(cc.Animation).play('scale109');
        that.scheduleOnce(function () {
            // that.justone = cc.find("Canvas/superMarket/layertip");
            // that.justone.active = true;
            // setTimeout(function(){
            //     that.justone.active = false;
            // },3000);

            that.layermsg = cc.find("Canvas/layertip");
            that.layermsg.getChildByName("layermsg").getComponent(cc.Label).string = '农庄只能种植一种植物哦';
            that.layermsg.active = true;
            setTimeout(function () {
                that.layermsg.active = false;
            }, 3000);
        }, 0.4);
    },
    start: function start() {}
});

cc._RF.pop();