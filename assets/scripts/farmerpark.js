cc.Class({
    extends: cc.Component,

    properties: {
        fristinNode: {
            default: null,
            type: cc.Node
        },
        maskNode: {
            default: null,
            type: cc.Node
        },
        getenergyPrefab: cc.Prefab,

        friendsNode: {
            default: null,
            type: cc.Node
        },

        waterdropletsNode: {
            default: null,
            type: cc.Node
        },

        storeNode: {
            default: null,
            type: cc.Node
        },



        userimage: cc.Sprite,
        successplant: {
            default: null,
            type: cc.Node
        },
        processbarNode: {
            default: null,
            type: cc.Node
        },
        flowerbed: cc.Sprite,
        energytext: cc.RichText,



        leftloudeNode: {
            default: null,
            type: cc.Node
        },

        rightloudeNode: {
            default: null,
            type: cc.Node
        },
        backgroundaudio: {
            default: null,
            type: cc.AudioClip
        },
        functionaudio: {
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad() {
        var that = this;
        that.voiceshow = 1;
        that.backgaudio = cc.audioEngine.play(that.backgroundaudio, true, 1);
        that.redtip = cc.find("Canvas/FunctionArea/hasreward"); //这是红点显示
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = JSON.parse(xhr.responseText);
                if (response.code == 1) {
                    var copydata = response.data;
                    that.leftloudeNode.active = true;
                    that.rightloudeNode.active = true;
                    if (copydata.is_new == 1) {
                        that.maskNode.active = true;
                        that.fristinNode.active = true;
                    }

                    cc.loader.load({
                        url: copydata.user_image,
                        type: 'png'
                    }, function(err, texture) {
                        that.userimage.spriteFrame = new cc.SpriteFrame(texture);
                    });

                    var hasenergy = copydata.total_integtal && copydata.total_integtal != 750 ? copydata.total_integtal : 0;
                    var totalenergy = copydata.botany_power ? copydata.botany_power : 750;
                    that.processbarNode.getChildByName("ProgressLabel").getComponent(cc.Label).string = '进度：' + hasenergy + '/' + totalenergy;

                    var ctx = that.processbarNode.getChildByName("progressbar").getComponent(cc.Graphics);
                    var progpercent = (hasenergy / totalenergy) * 160;
                    ctx.moveTo(0, 17);
                    ctx.lineTo(progpercent, 17);
                    ctx.stroke();

                    if (copydata.level_image) {
                        cc.loader.load(copydata.level_image, function(err, texture) {
                            that.flowerbed.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                        });
                    } else {
                        that.flowerbed.node.getChildByName("tiprectangle1").getChildByName("tip").getComponent(cc.RichText).string = '<b>农庄现在空着哦\n去商店看看下一个植物吧</b>';
                        that.flowerbed.node.getChildByName("tiprectangle1").active = true;
                        that.scheduleOnce(function() {
                            that.flowerbed.node.getChildByName("tiprectangle1").active = false;
                        }, 3);
                    }
                    if (copydata.total_integtal == 750) {
                        that.flowerbed.node.getChildByName("tiprectangle1").getChildByName("tip").getComponent(cc.RichText).string = '<b>种植成功，\n快去领取奖励吧</b>';
                        that.flowerbed.node.getChildByName("tiprectangle1").active = true;
                        that.scheduleOnce(function() {
                            that.flowerbed.node.getChildByName("tiprectangle1").active = false;
                        }, 3);
                        that.successplant.active = true;
                        that.processbarNode.active = false;
                    }

                    var kettlevalue = copydata.kettle_water ? copydata.kettle_water : 0;
                    that.energytext.string = '<b>' + kettlevalue + 'g</b>';

                    if (copydata.is_prize == 1) {
                        that.redtip.active = true;
                    }

                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: copydata.appid, // 必填，公众号的唯一标识
                        timestamp: copydata.timestamp, // 必填，生成签名的时间戳
                        nonceStr: copydata.nonceStr, // 必填，生成签名的随机串
                        signature: copydata.signature, // 必填，签名
                        jsApiList: [
                                'checkJsApi',
                                'onMenuShareTimeline',
                                'onMenuShareAppMessage',
                                'onMenuShareQQ',
                                'onMenuShareWeibo'
                            ] // 必填，需要使用的JS接口列表
                    });
                    wx.ready(function() {
                        wx.checkJsApi({
                            jsApiList: [
                                'checkJsApi',
                                'onMenuShareTimeline',
                                'onMenuShareAppMessage',
                                'onMenuShareQQ',
                                'onMenuShareWeibo'
                            ], // 必填，需要使用的JS接口列表
                            success: function(res) {
                                console.log(res.errMsg);
                            }
                        });
                    });
                    wx.onMenuShareTimeline({
                        title: copydata.shareMessage.title,
                        link: copydata.shareMessage.link,
                        imgUrl: copydata.shareMessage.imageurl,
                        trigger: function(res) {
                            // alert('用户点击分享到朋友圈1');
                        },
                        success: function(res) {
                            alert('已分享1');
                        }
                    });
                    wx.onMenuShareAppMessage({
                        title: copydata.shareMessage.title,
                        desc: copydata.shareMessage.desc,
                        link: copydata.shareMessage.link,
                        imgUrl: copydata.shareMessage.imageurl,
                        trigger: function(res) {
                            // alert('用户点击分享到朋友圈2');
                        },
                        success: function(res) {
                            lert('已分享2');
                        }
                    });
                    wx.onMenuShareQQ({
                        title: copydata.shareMessage.title,
                        desc: copydata.shareMessage.desc,
                        link: copydata.shareMessage.link,
                        imgUrl: copydata.shareMessage.imageurl,
                        trigger: function(res) {
                            // alert('用户点击分享到朋友圈');
                        },
                        success: function(res) {
                            alert('已分享3');
                        }
                    });
                    wx.onMenuShareWeibo({
                        title: copydata.shareMessage.title,
                        desc: copydata.shareMessage.desc,
                        link: copydata.shareMessage.link,
                        imgUrl: copydata.shareMessage.imageurl,
                        trigger: function(res) {
                            // alert('用户点击分享到朋友圈');
                        },
                        success: function(res) {
                            alert('已分享4');
                        }
                    });
                }
            }
        };
        var urlstr = location.href == 'http://localhost:7456/' ? 'http://game.com' : 'https://h5xyx.jinlingkeji.cn';
        xhr.open('GET', urlstr + '/api/v11/game/index', true);
        xhr.send();


        that.getenergyPool = new cc.NodePool();
        that.node.on('hidefirstin', function(event) {
            let energy = null;
            if (that.getenergyPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                energy = that.getenergyPool.get();
            } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                energy = cc.instantiate(that.getenergyPrefab);
            }
            that.node.addChild(energy);
            energy.getComponent('getenergy').init({
                value: event.detail.energy,
                farmer: that,
                hasenergyvalue: that.energytext.string
            });
            console.log(that.node);
        });

        that.kettletip = cc.find("Canvas/kettle/tip");
        that.schedule(function() {
            that.kettletip.getChildByName("text").getComponent(cc.RichText).string = '<b>给植物浇水才生长哦</b>';
            that.kettletip.active = true;
            that.scheduleOnce(function() {
                that.kettletip.active = false;
            }, 3);
        }, 23);
    },

    start() {

    },

    showshat(event, customEventData) {
        var that = this;
        that.funcaudio = cc.audioEngine.play(that.functionaudio, false, 1);
        that.functionNode = cc.find("Canvas/FunctionArea");
        if (customEventData == 1) {
            that.functionNode.getChildByName("friends").getComponent(cc.Animation).play('scale109');
        } else if (customEventData == 2) {
            that.functionNode.getChildByName("waterdroplets").getComponent(cc.Animation).play('scale109');
            that.redtip.active = false;

        } else {
            that.functionNode.getChildByName("store").getComponent(cc.Animation).play('scale109');
        }
        that.scheduleOnce(function() {
            that.maskNode.active = true;
            if (customEventData == 1) {
                that.friendsNode.active = true;
            } else if (customEventData == 2) {
                that.waterdropletsNode.active = true;
            } else {
                that.storeNode.active = true;
            }
        }, 0.4);
    }, //功能区弹框 显示隐藏

    deenergy(hasenergy) {
        this.getenergyPool.put(hasenergy);
    },

    musicstatus(event) {
        var that = this;
        that.musicback = cc.find("Canvas/musicshow");
        if(that.voiceshow==1){
            cc.audioEngine.pause(that.backgaudio);
            that.voiceshow = 0;
            cc.loader.loadRes("musicclose", cc.SpriteFrame, function (err, spriteFrame) {
                that.musicback.getChildByName('Background').getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });//正在种植中
        }else{
            cc.audioEngine.play(that.backgaudio);
            that.voiceshow = 1;
            cc.loader.loadRes("musicopen", cc.SpriteFrame, function (err, spriteFrame) {
                that.musicback.getChildByName('Background').getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });//正在种植中
        }
    },

    onDestroy: function() {
        cc.audioEngine.stop(this.backgaudio);
        cc.audioEngine.stop(this.funcaudio);
    }

    // update: function (dt) {
    //     // 每帧更新计时器，超过限度还没有生成新的星星
    //     // 就会调用游戏失败逻辑
    //     if (this.timer > this.starDuration) {
    //         this.gameOver();
    //         this.enabled = false;   // disable this to avoid gameOver() repeatedly
    //         return;
    //     }
    //     this.timer += dt;
    // }

});