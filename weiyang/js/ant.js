/**
 * Created by Administrator on 2016/11/25.
 */


var aneObj=function(){
    //start point,control point,end point(sin)

    this.rootx=[];    //即为canvas的高度，所以不用设置
    this.headx=[];
    this.heady=[];   //即为海葵的高度
    //this.len=[];
    this.amp=[];
    this.alpha=0;

};

//海葵的数量
aneObj.prototype.num=50;

//

aneObj.prototype.init=function(){
    //var h=can1.height;
    for (var i=0;i<this.num;i++){
        this.rootx[i]=i*17+Math.random()*20;  //[0,1)
        this.headx[i]=this.rootx[i];
        this.heady[i]=canvasHeight-200+Math.random()*50;
        //this.len[i]=200+Math.random()*50;
        this.amp[i]=Math.random()*50+30;
    }
};

//绘制海葵
aneObj.prototype.draw=function(){
    this.alpha+=deltaTime*0.0008;
    var l=Math.sin(this.alpha);
    ctx2.save();
    ctx2.globalAlpha=0.6;
    ctx2.lineWidth=20;
    ctx2.lineCap="round";
    ctx2.strokeStyle="#3b154e";
    for(var i=0;i<this.num;i++){
        ctx2.beginPath();
        ctx2.moveTo(this.rootx[i],canvasHeight);
        this.headx[i]=this.rootx[i]+ l*this.amp[i];   //正弦调整过的值
        ctx2.quadraticCurveTo(this.rootx[i],canvasHeight-100,this.headx[i],this.heady[i]);
        ctx2.stroke();
    }
    ctx2.restore();
};