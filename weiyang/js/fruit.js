/**
 * Created by Administrator on 2016/11/28.
 */
var fruitObj=function(){
    this.alive=[];   //pool

    //fruit的位置
    this.x=[];
    this.y=[];
    this.aneNo=[];
    //图片的长度
    this.l=[];
    //果实成长、上升速度
    this.spd=[];
    //区别果实类型
    this.fruitType=[];
    this.orange=new Image();
    this.blue=new Image();
};

//果实的数量
fruitObj.prototype.num=30;

fruitObj.prototype.init=function(){
    for(var i=0;i<this.num;i++){
        this.alive[i]=false;
        this.x[i]= 0;
        this.y[i]= 0;
        this.l[i]=0;
        this.aneNo[i]=0;
        this.spd[i]=Math.random()*0.017+0.003;//[0.003,0.02)
        this.fruitType[i]="";

        this.born(i);
    }
    this.orange.src="./images/fruit.png";
    this.blue.src="./images/blue.png";
};

//绘制果实
fruitObj.prototype.draw=function(){
    for(var i=0;i<this.num;i++){
        //draw
        //find an ane,grow ,fly up
        var pic;
        if(this.fruitType[i]=="blue"){
            pic=this.blue;
        }else{
            pic=this.orange;
        }
       if(this.alive[i]){
           //果实长大,上升
           if(this.l[i]<=15){     //l为果实的大小，
               var NO=this.aneNo[i];
               this.x[i]=ane.headx[NO];
               this.y[i]=ane.heady[NO];
               this.l[i]+=this.spd[i]*deltaTime;
               ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);

           }else{
               this.y[i]-=this.spd[i]*7*deltaTime;
               ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);

           }
           //ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);

           //判断已哪些上升出canvas之外
           if(this.y[i]<10){
               this.alive[i]=false;
           }
       }


    }
};

//
fruitObj.prototype.born=function(i){
    //var aneID=Math.floor(Math.random()*ane.num);
    this.aneNo[i]=Math.floor(Math.random()*ane.num);
    //this.x[i]=ane.rootx[aneID];
    //this.y[i]=ane.heady[aneID];
    this.l[i]=0;
    this.alive[i]=true;
    var ran=Math.random();
    if(ran<0.8){
        this.fruitType[i]="fruit";
    }else{
        this.fruitType[i]="blue";
    }
};

fruitObj.prototype.dead=function(i){
    this.alive[i]=false;
};

//果实监视功能
function fruitMonitor(){
    var num=0;
    for(var i=0;i<fruit.num;i++){
        if(fruit.alive[i]){
            num++;
        }
        if(num<15){
            //send fruit
            sendFruit();
            return;
        }
    }
}

function sendFruit(){
    for(var i=0;i<fruit.num;i++){
        if(!fruit.alive[i]){
            fruit.born(i);
            return;
        }
    }
}

