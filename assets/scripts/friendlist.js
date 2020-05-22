cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab
    },

    onLoad () {
        var that = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                var response = JSON.parse(xhr.responseText);
                if(response.code==1){
                    var copydata = response.data;
                    for (var i = 0; i < copydata.length; i++) {
                        var item = cc.instantiate(that.itemPrefab);
                        var data = copydata[i];
                        that.node.addChild(item);
                        item.getComponent('friendprefab').init({
                            index:i,
                            data:copydata[i]
                        });
                    }
                }
            }
        };
        var urlstr = location.href=='http://localhost:7456/'?'http://game.com':'https://h5xyx.jinlingkeji.cn';
        xhr.open('GET',urlstr+'/api/v11/game/gameFriend',true);
        xhr.send();
    },

    start () {

    },

    sharetofriend(){
        var that = this;
        that.sharenode = cc.find("Canvas/myfriendslist/friendtip/btninvitefri");
        that.sharenode.getComponent(cc.Animation).play('scale109');
        that.scheduleOnce(function() {
            that.share = cc.find("Canvas/sharetofriend");
            that.mask = cc.find("Canvas/masklayer");
            that.parentnode = cc.find("Canvas/myfriendslist");
            that.mask.active = true;
            that.share.active = true;
            that.parentnode.active = false;
            setTimeout(function() {
                that.mask.active = false;
                that.share.active = false;
            }, 4000);
        }, 0.4);
    }
});
