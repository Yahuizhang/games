/**
 * Created by Administrator on 2016/11/28.
 */
var bigFish=function(){
    this.x;
    this.y;
    this.angle;
    //this.bigEye=new Image();
    //this.bigBody=new Image();
    //this.bigTail=new Image();

    //大鱼尾巴
    this.bigfishtailTimer=0;
    this.bigfishtailCount=0;

    //大鱼眨眼睛
    this.bigfisheyeCount=0;
    this.bigfisheyeTimer=0;
    this.bigfisheyeInterval=100;

    //
    this.bigfishbodyCount=0;

};

bigFish.prototype.init=function(){
    this.x=canvasWidth*0.5;
    this.y=canvasHeight*0.5;
    this.angle=0;
    //this.bigEye.src="./images/bigEye0.png";
    //this.bigBody.src="./images/bigSwim0.png";
    //this.bigTail.src="./images/bigTail0.png";
};
bigFish.prototype.draw=function(){
    //lerp x,y        lerp值即为趋向一个目标值
    this.x=lerpDistance(mx,this.x,0.9);
    this.y=lerpDistance(my,this.y,0.9);


    //delta angle   用Math.atan2(y,x)
    var deltaY=my-this.y;
    var deltaX=mx-this.x;
    var beta=Math.atan2(deltaY,deltaX)+Math.PI;   //

    //lerp angle
        this.angle=lerpAngle(beta,this.angle,0.6);

    //bigfish  tail
    this.bigfishtailTimer+=deltaTime;
    if(this.bigfishtailTimer>50){
        this.bigfishtailCount=(this.bigfishtailCount+1)%8;
        this.bigfishtailTimer%=50;
    }

    //bigfish  eye
    this.bigfisheyeTimer+=deltaTime;
    if(this.bigfisheyeTimer>this.bigfisheyeInterval){
        this.bigfisheyeCount=(this.bigfisheyeCount+1)%2;
        this.bigfisheyeTimer%=this.bigfisheyeInterval;
        if(this.bigfisheyeCount==0){
            this.bigfisheyeInterval=Math.random()*1500+2000;
        }else{
            this.bigfisheyeInterval=200;
        }
    }


    //translate方法仅限用于绘制大鱼，把身体三部分原点归一
    ctx1.save();
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);
    //console.log(this.angle);
    var bigfibodycount=this.bigfishbodyCount;
    //console.log(bigfibodycount);
    if(data.double==1){
        //console.log(mombodyOrange[bigfibodycount]);
        ctx1.drawImage(mombodyOrange[bigfibodycount],-mombodyOrange[bigfibodycount].width*0.5,-mombodyOrange[bigfibodycount].height*0.5);
    }else{
        ctx1.drawImage(mombodyBlue[bigfibodycount],-mombodyBlue[bigfibodycount].width*0.5,-mombodyBlue[bigfibodycount].height*0.5);
    }
    var bigfisheyecount=this.bigfisheyeCount;
    ctx1.drawImage(momEye[bigfisheyecount],-momEye[bigfisheyecount].width*0.5,-momEye[bigfisheyecount].height*0.5);
    var bigfishtailcount=this.bigfishtailCount;
    ctx1.drawImage(babyTail[bigfishtailcount],-babyTail[bigfishtailcount].width*0.5+30,-babyTail[bigfishtailcount].height*0.5);

    ctx1.restore();
};


/**
 * 趋向一个目标值
 * @param aim   目标值
 * @param cur   当前值
 * @param ratio   百分比
 * @returns {*}   在帧运行的时候，这个数值一直不断地追随目标值
 */
function lerpDistance(aim,cur,ratio){
    var delta=cur-aim;
    return aim+delta*ratio;
}

