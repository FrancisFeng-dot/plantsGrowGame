"use strict";
cc._RF.push(module, 'c3b9cIwEjNGFLcaA27JR9TS', 'energyAnim');
// scripts/energyAnim.js

'use strict';

cc.Class({
    extends: cc.Component,

    init: function init(data) {
        this.prize = data; //传入firstprize节点和水壶内的量和增加的量
    },


    hidehasenergy: function hidehasenergy() {
        var that = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                var response = JSON.parse(xhr.responseText);
                if (response.code == 1) {
                    var copydata = response.data;
                    that.kettletip = cc.find("Canvas/kettle/tip");
                    if (copydata.status == 0) {
                        var num = parseInt(that.prize.hadvalue.replace(/\<b\>([0-9]+)g\<\/b\>/g, '$1')) + parseInt(that.prize.addvalue);
                        that.prize.energy.farmer.energytext.string = '<b>' + num + 'g</b>'; //找到根节点然后改变水壶的显示值
                        that.kettletip.getChildByName("text").getComponent(cc.RichText).string = '<b>给植物浇水才生长哦</b>';
                    } else {
                        that.kettletip.getChildByName("text").getComponent(cc.RichText).string = '<b>水壶满了，先浇水吧</b>';
                    }
                    that.kettletip.active = true;

                    if (copydata.enough.signal == 1) {
                        that.planttip = cc.find("Canvas/bigback/background2/GrassBud/stage/tiprectangle1");
                        that.planttip.getChildByName("tip").getComponent(cc.RichText).string = '<b>我发芽啦\n主人快给我浇水吧</b>';
                        that.planttip.active = true;
                        that.scheduleOnce(function () {
                            that.kettletip.active = false;
                            that.planttip.active = false;
                        }, 5);
                    } else {
                        that.scheduleOnce(function () {
                            that.kettletip.active = false;
                        }, 5);
                    }
                }
            }
        };
        var urlstr = location.href == 'http://localhost:7456/' ? 'http://game.com' : 'https://h5xyx.jinlingkeji.cn';
        xhr.open('POST', urlstr + '/api/v11/game/addWater', true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
        xhr.send('water=' + parseInt(that.prize.addvalue));
        that.prize.energy.deprize();
    }
});

cc._RF.pop();