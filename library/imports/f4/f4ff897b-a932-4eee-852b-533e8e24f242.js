"use strict";
cc._RF.push(module, 'f4ff8l7qTJO7oUrUz6OJPJC', 'afterwater');
// scripts/afterwater.js

"use strict";

cc.Class({
    extends: cc.Component,

    init: function init(data) {
        this.kettlevalue = data.kettlevalue; //传入firstprize节点和水壶内的量和增加的量
    },


    hidehasenergy: function hidehasenergy() {
        var that = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                var response = JSON.parse(xhr.responseText);
                var copydata = response.data;
                that.flowerbed = cc.find("Canvas/bigback/background2/GrassBud/stage");
                if (copydata.code) {
                    if (copydata.code == 4001) {
                        //先领取奖励吧
                        that.flowerbed.getChildByName("tiprectangle1").getChildByName("tip").getComponent(cc.RichText).string = '<b>植物成熟不需要浇水</b>';
                    } else if (copydata.code == 4002) {
                        //去商店种植                      
                        that.flowerbed.getChildByName("tiprectangle1").getChildByName("tip").getComponent(cc.RichText).string = '<b>农庄空着去商店看看</b>';
                    } else if (copydata.code == 4003) {
                        //水壶空了                      
                        that.flowerbed.getChildByName("tiprectangle1").getChildByName("tip").getComponent(cc.RichText).string = '<b>水壶空了去领水滴吧</b>';
                    } else if (copydata.code == 4004) {
                        //水滴不够了                      
                        that.flowerbed.getChildByName("tiprectangle1").getChildByName("tip").getComponent(cc.RichText).string = '<b>水滴不够去领水滴吧</b>';
                    }
                    //水壶空了在watering判断了
                } else if (response.code == 1) {
                    that.processbar = cc.find("Canvas/GroupUserinfo/processbar");
                    var str = that.processbar.getChildByName("ProgressLabel").getComponent(cc.Label).string;
                    var valuegroup = str.split('：');
                    var arr = valuegroup[1].split('/');
                    var hasenergy = parseInt(arr[0]) + 10;
                    var value = hasenergy == 750 ? 0 : hasenergy;
                    var totalenergy = parseInt(arr[1]);
                    that.processbar.getChildByName("ProgressLabel").getComponent(cc.Label).string = '进度：' + value + '/' + totalenergy;
                    var ctx = that.processbar.getChildByName("progressbar").getComponent(cc.Graphics);
                    var progpercent = value / totalenergy * 160;
                    ctx.moveTo(0, 17);
                    hasenergy == 750 ? ctx.clear() : '';
                    ctx.lineTo(progpercent, 17);
                    ctx.stroke();
                    that.flowerbed.getChildByName("tiprectangle1").getChildByName("tip").getComponent(cc.RichText).string = '<b>我长大啦\n主人离奖品更近一步啦</b>';
                    if (hasenergy == 150 || hasenergy == 400 || hasenergy == 750) {
                        cc.loader.load(copydata.level_image, function (err, texture) {
                            that.flowerbed.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                        });
                        if (hasenergy == 400) {
                            that.flowerbed.getChildByName("tiprectangle1").getChildByName("tip").getComponent(cc.RichText).string = '<b>我长大啦，\n主人离奖品只差一步啦</b>';
                        } else if (hasenergy == 750) {
                            that.flowerbed.getChildByName("tiprectangle1").getChildByName("tip").getComponent(cc.RichText).string = '<b>种植成功，\n快去领取奖励吧</b>';

                            that.successplant = cc.find("Canvas/GroupUserinfo/completed");
                            that.successplant.active = true;
                            that.processbar.active = false;
                        }
                    }

                    var num = parseInt(that.kettlevalue.string.replace(/\<b\>([0-9]+)g\<\/b\>/g, '$1')) - 10;
                    if (num >= 0) {
                        that.kettlevalue.string = '<b>' + num + 'g</b>'; //找到根节点然后改变水壶的显示值
                        if (num == 0) {
                            that.kettletip = cc.find("Canvas/kettle/tip");
                            that.kettletip.getChildByName("text").getComponent(cc.RichText).string = '<b>水壶空了去领水滴吧</b>';
                            that.kettletip.active = true;
                            that.scheduleOnce(function () {
                                that.kettletip.active = false;
                            }, 3);
                        }
                    }
                }
                that.flowerbed.getChildByName("tiprectangle1").active = true;
                that.scheduleOnce(function () {
                    that.flowerbed.getChildByName("tiprectangle1").active = false;
                }, 3);
            }
        };
        var urlstr = location.href == 'http://localhost:7456/' ? 'http://game.com' : 'https://h5xyx.jinlingkeji.cn';
        xhr.open('POST', urlstr + '/api/v11/game/reduceWater', true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.send();
        this.node.active = false;
    }
});

cc._RF.pop();