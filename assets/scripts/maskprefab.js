cc.Class({
    extends: cc.Component,

    properties: {
        maskimg: cc.Sprite,
        maskname: cc.RichText,
        maskvalue: cc.RichText,

        btnfinishNode: {
            default: null,
            type: cc.Node
        }
    },

    init:function(data){
        var that = this;
        that.mask = cc.find("Canvas/masklayer");
        that.parentnode = cc.find("Canvas/taskCollar");

        cc.loader.load(data.image, function (err, texture) {
            that.maskimg.spriteFrame = new cc.SpriteFrame(texture);
        });
        that.maskname.string = '<b>'+ data.name +'</b>';
        var str = data.frequency>1?' 每天限'+ data.frequency +'次':'';
        
        that.maskvalue.string = '<color=#9D5B34>水滴  </color><color=#E04500>+'+ data.integral + str +'</color>';

        if(data.prize_status==0){
            that.addbtnevent("clickbtn",data);
            //未完成
        }else if(data.prize_status==1){
            cc.loader.loadRes("maskreceive", cc.SpriteFrame, function (err, spriteFrame) {
                that.btnfinishNode.getChildByName('Background').getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            that.addbtnevent("invitereward",data.id);
            //未领取
        }else{
            cc.loader.loadRes("taskreceive", cc.SpriteFrame, function (err, spriteFrame) {
                that.btnfinishNode.getChildByName('Background').getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            //已领取
        }
    },

    clickbtn (event, customEventData) {
        var that = this;
        that.btnfinishNode.getComponent(cc.Animation).play('scale109');
        that.scheduleOnce(function() {
            if(customEventData.urltype==1){
                that.share = cc.find("Canvas/sharetofriend");
                that.mask.active = true;
                that.share.active = true;
                that.parentnode.active = false;
                setTimeout(function() {
                    that.mask.active = false;
                    that.share.active = false;
                }, 4000);
    //分享
            }else if(customEventData.urltype==2){
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function(){
                    if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                        var response = JSON.parse(xhr.responseText);
                        if(response.code==1){
                            var copydata = response.data;
                            cc.loader.loadRes("maskreceive", cc.SpriteFrame, function (err, spriteFrame) {
                                that.btnfinishNode.getChildByName('Background').getComponent(cc.Sprite).spriteFrame = spriteFrame;
                            });
                            that.addbtnevent("invitereward",customEventData.id);
                        }
                    }
                };
                xhr.open('POST',customEventData.url,true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
                xhr.send('gtid='+customEventData.id);
    //接口
            }else{
                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function(){
                    if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                        var response = JSON.parse(xhr.responseText);
                        if(response.code==1){
                            window.location.href = customEventData.url;
                        }
                    }
                };
                var urlstr = location.href=='http://localhost:7456/'?'http://game.com':'https://h5xyx.jinlingkeji.cn';
                xhr.open('POST',urlstr+'/api/v11/game/updateTaskSpeed',true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
                xhr.send('gtid='+customEventData.id);
                //链接
            }
        }, 0.4);
    },

    invitereward (event, customEventData) {
        var that = this;
        that.btnfinishNode.getComponent(cc.Animation).play('scale109');
        that.scheduleOnce(function() {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    var response = JSON.parse(xhr.responseText);
                    if(response.code==1){
                        var copydata = response.data;
                        that.parentnode.active = false;
                        var e = new cc.Event.EventCustom('hidefirstin', true);
                        e.setUserData({ energy:  copydata.water});
                        that.btnfinishNode.dispatchEvent(e);
                    }else{
                        that.layermsg = cc.find("Canvas/layertip");
                        that.layermsg.getChildByName("layermsg").getComponent(cc.Label).string = '水壶里的水满了，先去浇水哦';
                        that.layermsg.active = true;
                        setTimeout(function() {
                            that.layermsg.active = false;
                        }, 3000);
                    }
                }
            };
            var urlstr = location.href=='http://localhost:7456/'?'http://game.com':'https://h5xyx.jinlingkeji.cn';
            xhr.open('POST',urlstr+'/api/v11/game/getIntegral',true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
            xhr.send('gtid='+customEventData);
        }, 0.4);
    },

    addbtnevent(eventname,data){
        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "maskprefab";//这个是代码文件名
        clickEventHandler.handler = eventname;
        clickEventHandler.customEventData = data;

        var button = this.btnfinishNode.getComponent(cc.Button);
        button.clickEvents = [];
        button.clickEvents.push(clickEventHandler);
    },

    start () {

    }
});
