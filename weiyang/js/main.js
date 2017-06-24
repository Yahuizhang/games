/**
 * Created by Administrator on 2016/11/25.
 */
var can1,can2;
var ctx1,ctx2;

//执行动画时的时间、当前两针动画之间的时间间隔
var lastTime,deltaTime;

//定义背景图片
var bgPic=new Image();

//定义canvas的尺寸
var canvasWidth,canvasHeight;

var ane;
var fruit;

var mom;
var baby;

//有关鼠标的变量
var mx;
var my;

//小鱼尾巴动画数组    注意：此处小鱼尾巴图片缺失，换用的大鱼尾巴图片，因此大鱼也用这个
var babyTail=[];
//小鱼眨眼睛动画数组
var babyEye=[];
//小鱼身体数组
var babyBody=[];

//大鱼眨眼睛动画数组
var momEye=[];
var mombodyOrange=[];
var mombodyBlue=[];

//定义数据
var data;

//特效
var wave;
var halo;

var dust;
var dustPic=[];

document.body.onload=game;   //body加载完了之后就把game作为所有js脚本的入口

/**
 *所有js脚本的入口
 */
function game(){
    init();
    lastTime=new Date();
    deltaTime=0;
    gameloop();
}

/**
 * 初始化工作
 */
function init(){
    //获得canvas context
    can1=document.getElementById("canvase1");
    ctx1=can1.getContext("2d");
    can2=document.getElementById("canvase2");
    ctx2=can2.getContext("2d");

    //监听鼠标
    can1.addEventListener("mousemove",onMousemove,false);

    //get canvas'value
    canvasWidth=can1.width;
    canvasHeight=can1.height;

    ctx1.font="30px Verdana";
    ctx1.textAlign="center";

    mx=canvasWidth*0.5;
    my=canvasHeight*0.5;

    bgPic.src='./images/background.jpg';

    ane=new aneObj();
    ane.init();

    fruit=new fruitObj();
    fruit.init();

    mom=new bigFish();
    mom.init();

    baby=new smallFish();
    baby.init();

    //预加载小鱼尾巴帧图片
    for(var i=0;i<8;i++){
        babyTail[i]=new Image();
        babyTail[i].src="./images/bigTail"+i+".png";
    }
    //预加载小鱼眨眼睛帧图片
    for(var i=0;i<2;i++){
        babyEye[i]=new Image();
        babyEye[i].src="./images/babyEye"+i+".png";
    }
    //预加载小鱼身体变化帧图片
    for(var i=0;i<20;i++){
        babyBody[i]=new Image();
        babyBody[i].src="./images/babyFade"+i+".png";
    }
    //预加载大鱼眨眼睛帧图片
    for(var i=0;i<2;i++){
        momEye[i]=new Image();
        momEye[i].src="./images/bigEye"+i+".png";
    }
    data=new dataObj();
    for(var i=0;i<8;i++){
        mombodyOrange[i]=new Image();
        mombodyBlue[i]=new Image();
        mombodyOrange[i].src="./images/bigSwim"+i+".png";
        mombodyBlue[i].src="./images/bigSwimBlue"+i+".png";
    }
    wave=new waveObj();
    wave.init();
    halo=new haloObj();
    halo.init();

    for(var i=0;i<7;i++){
        dustPic[i]=new Image();
        dustPic[i].src="./images/dust"+i+".png";
    }
    dust=new dustObj();
    dust.init();




}

function gameloop(){
    window.requestAnimationFrame(gameloop);//当前绘制完成之后，根据机器的性能去计算何时执行下一帧
    var now=new Date();
    deltaTime=now-lastTime;
    lastTime=now;
    if(deltaTime>40) deltaTime=40;
    drawBackground();
    ane.draw();
    fruitMonitor();
    fruit.draw();

    ctx1.clearRect(0,0,canvasWidth,canvasHeight);
    mom.draw();
    momFruitCollision();
    momBabyCollision();
    baby.draw();
    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}

function onMousemove(e){
    if(!data.gameOver){
        if(e.offsetX || e.layerX){
            mx= e.offsetX==undefined? e.layerX: e.offsetX;
            my= e.offsetY==undefined? e.layerY: e.offsetY;

        }
    }
}
