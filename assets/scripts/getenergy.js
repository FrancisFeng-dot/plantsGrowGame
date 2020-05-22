cc.Class({
    extends: cc.Component,

    properties: {
        value: cc.RichText,

        inviteprizeNode: {
            default: null,
            type: cc.Node
        }
    },

    init:function(data){
        this.value.string = '<b>'+ data.value +'g</b>';
        
        this.node.getChildByName("dynamic").active = true;
        this.node.getChildByName("howmuch").active = true;
        this.inviteprizeNode.active = true;

        var clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "getenergy";//这个是代码文件名
        clickEventHandler.handler = "inviteprize";
        clickEventHandler.customEventData = data.value;

        var button = this.inviteprizeNode.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);

        this.farmer = data.farmer;
        this.node.getChildByName("iconenergy").getComponent('energyAnim').init({
            energy:this,
            hadvalue:data.hasenergyvalue,
            addvalue:data.value
        });
    },

    deprize() {
        this.farmer.deenergy(this.node);
    },

    //领取能量
    inviteprize(event, customEventData){
        this.node.getChildByName("dynamic").active = false;
        this.node.getChildByName("howmuch").active = false;
        this.inviteprizeNode.active = false;
        this.farmer.maskNode.active = false;
        this.node.getChildByName("iconenergy").getComponent(cc.Animation).play('kettlehasenergy');
    }
});
