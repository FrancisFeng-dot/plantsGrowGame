cc.Class({
    extends: cc.Component,

    properties: {
        parentNode:{
            default:null,
            type:cc.Node
        },
        maskNode:{
            default:null,
            type:cc.Node
        },
        audio: {
            default: null,
            type: cc.AudioClip
        }
    },

    onLoad () {
        this.node.on(cc.Node.EventType.TOUCH_START, this.closelayer, this, true);
    },
    closelayer(){
        var that = this;
        that.current = cc.audioEngine.play(that.audio,false,1);
        that.node.getComponent(cc.Animation).play('scale109');
        that.scheduleOnce(function() {
            that.maskNode.active = false;
            that.parentNode.active = false;
        }, 0.4);
    },
    start () {

    },

    onDestroy:function(){
        cc.audioEngine.stop(this.current);
    }
});
