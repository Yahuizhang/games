/**
 * Created by Administrator on 2016/11/29.
 */
var smallFish=function(){
    this.x;
    this.y;
    this.angle;
    //this.smallBody=new Image();
    //this.smallEye=new Image();
    //this.smallTail=new Image();
    //����β�Ͷ�����ʱ��
    this.smallfishTimer=0;    //��ʱ��
    this.smallfishCount=0;    //���뵱ǰͼƬ��ŵı�������ִ�е���һ֡��

    //�����۾�����������
    this.smallfishEyeTimer=0;
    this.samllfishEyeCount=0;
    this.smallfishEyeInterval=100;   //һ��ͼƬ������ʱ��


    //�������塣��������
    this.smallfishbodyTimer=0;
    this.smallfishbodyCount=0;



};

smallFish.prototype.init=function(){
    this.x=canvasWidth*0.5-50;
    this.y=canvasHeight*0.5+50;
    this.angle=0;
    //this.smallEye.src="./images/babyEye0.png";
    //this.smallBody.src="./images/babyFade0.png";
    //this.smallTail.src="./images/babyTail0.png";


};

smallFish.prototype.draw=function(){
    //lerp x, y
    this.x=lerpDistance(mom.x,this.x,0.98);
    this.y=lerpDistance(mom.y,this.y,0.98);

    //lerp angle
    var deltaY=mom.y-this.y;
    var deltaX=mom.x-this.x;
    var beta=Math.atan2(deltaY,deltaX)+Math.PI;   //

    //lerp angle
    this.angle=lerpAngle(beta,this.angle,0.6);

    //smallfish tail count
    this.smallfishTimer+=deltaTime;
    if(this.smallfishTimer>50){
        this.smallfishCount=(this.smallfishCount+1)%8;    //����һֱ��0��7��ѭ��
        this.smallfishTimer%=50;   //this.smallfishTimer��50ȡģ������ԭֵ
    }

    //smallFish  eye
    this.smallfishEyeTimer+=deltaTime;
    if(this.smallfishEyeTimer > this.smallfishEyeInterval){
        this.samllfishEyeCount=(this.samllfishEyeCount+1)%2;
        this.smallfishEyeTimer%=this.smallfishEyeInterval;
        if(this.samllfishEyeCount==0){
            this.smallfishEyeInterval=Math.random()*1500+2000; //[2000,3500)
        }else{
            this.smallfishEyeInterval=200;   //գ�۶���ʱ��
        }
    }

    //smallfish  body
    this.smallfishbodyTimer+=deltaTime;
    if(this.smallfishbodyTimer>800){
        this.smallfishbodyCount=this.smallfishbodyCount+1;    //����ѭ��
        this.smallfishbodyTimer%=300;
        if(this.smallfishbodyCount>19){
            this.smallfishbodyCount=19;
            //gameover
            data.gameOver=true;


        }
    }

    ctx1.save();
    //translate  ת��ԭ����������
    ctx1.translate(this.x,this.y);
    ctx1.rotate(this.angle);

    var smallfishcount=this.smallfishCount;
    ctx1.drawImage(babyTail[smallfishcount],-babyTail[smallfishcount].width*0.5+23,-babyTail[smallfishcount].height*0.5);
    var smallfishbodycount=this.smallfishbodyCount;
    ctx1.drawImage(babyBody[smallfishbodycount],-babyBody[smallfishbodycount].width*0.5,-babyBody[smallfishbodycount].height*0.5);
    var smalleyecount=this.samllfishEyeCount;
    ctx1.drawImage(babyEye[smalleyecount],-babyEye[smalleyecount].width*0.5,-babyEye[smalleyecount].height*0.5);


    ctx1.restore();
};