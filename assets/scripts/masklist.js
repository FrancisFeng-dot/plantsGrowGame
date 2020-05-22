cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefab: cc.Prefab
    },

    onLoad () {
        
    },

    onEnable () {
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
                        item.getComponent('maskprefab').init(data);
                    }
                }
            }
        };
        var urlstr = location.href=='http://localhost:7456/'?'http://game.com':'https://h5xyx.jinlingkeji.cn';
        xhr.open('GET',urlstr+'/api/v11/game/getTaskSpeed',true);
        xhr.send();
    },

    onDisable(){
        for (var i = 0; i < this.node.childrenCount; i++) {
            this.node.children[i].destroy();
        }
    }
});
