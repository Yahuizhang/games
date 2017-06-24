/**
 * Created by Administrator on 2016/11/30.
 */
var haloObj=function(){
    this.x=[];
    this.y=[];
    this.alive=[];
    this.r=[];
};
haloObj.prototype.num=5;
haloObj.prototype.init=function(){
    for(var i=0;i<this.num;i++){
        this.x[i]=0;
        this.y[i]=0;
        this.alive[i]=false;
        this.r[i]=0;
    }
};
haloObj.prototype.draw=function(){
    ctx1.save();
    ctx1.strokeStyle="#ffab94";
    ctx1.lineWidth=2;
    ctx1.shadowBlur=10;
    ctx1.shadowColor="#ffab94";
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            this.r[i]+=deltaTime*0.03;
            if(this.r[i]>70){
                this.alive[i]=false;
                break;
            }
            var alpha=1-this.r[i]/70;
            //draw
            ctx1.beginPath();
            ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI*2);
            ctx1.globalAlpha=alpha;
            ctx1.closePath();
            ctx1.stroke();
        }
    }
    ctx1.restore();
};
haloObj.prototype.born=function(x,y){
    for(var i=0;i<this.num;i++){
        if(!this.alive[i]){
            this.alive[i]=true;
            this.x[i]=x;
            this.y[i]=y;
            this.r[i]=10;
            return;
        }
    }
};