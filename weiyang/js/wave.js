/**
 * Created by Administrator on 2016/11/29.
 */
var waveObj=function(){
    this.x=[];
    this.y=[];
    this.alive=[];
    this.r=[];
    this.alpha;
};
waveObj.prototype.num=10;
waveObj.prototype.init=function(){
    for(var i=10;i<this.num;i++){
        this.alive[i]=false;
        this.r[i]=0;
    }
};
waveObj.prototype.draw=function(){
    ctx1.save();
    ctx1.strokeStyle="#ffffff";
    ctx1.lineWidth=2;
    ctx1.shadowBlur=10;
    ctx1.shadowColor="white";
    for(var i=0;i<this.num;i++){
        if(this.alive[i]){
            this.r[i]+=deltaTime*0.04;
            //console.log(this.r[i]);
            if(this.r[i]>50)
            {
                this.alive[i]=false;
                break;    //防止透明度大于1和小于0的情况
            }
            var op=this.r[i]/50;
            this.alpha=1-op;
            //if(this.alpha<0){
            //    this.alpha=0;
            //}
            //绘制圆圈
            ctx1.beginPath();
            ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI*2);
            ctx1.globalAlpha=this.alpha;
            ctx1.closePath();
            ctx1.stroke();
        }
    }
    ctx1.restore();

};
waveObj.prototype.born=function(x,y){
    for(var i=0;i<this.num;i++){
        if(!this.alive[i]){
            this.alive[i]=true;
            this.r[i]=10;
            this.x[i]=x;
            this.y[i]=y;
            return;
        }
    }
};