/**
 * Created by Administrator on 2016/11/28.
 */
//�жϴ���͹�ʵ�ľ���
function momFruitCollision(){
    if(!data.gameOver){
        for(var i=0;i<fruit.num;i++){
            if(fruit.alive[i]){
                var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
                if(l<900){
                    fruit.dead(i);
                    data.fruitNum++;
                    mom.bigfishbodyCount++;
                    if(mom.bigfishbodyCount>7){
                        mom.bigfishbodyCount=7;
                    }
                    if(fruit.fruitType[i]=="blue"){
                        data.double=2;
                    }
                    wave.born(fruit.x[i],fruit.y[i]);
                }
            }
        }
    }


}
//�жϴ����С��֮��ľ���   ������ιС��ĳ���
function momBabyCollision(){
    if(data.fruitNum>0 && !data.gameOver){
        var l=calLength2(mom.x,mom.y,baby.x,baby.y);
        if(l<900){
            //baby  recover
            if(data.fruitNum>0){
                baby.smallfishbodyCount=0;
            }
            //data.reset();
            mom.bigfishbodyCount=0;
            //score  update
            data.addScore();
            //��Ч
            halo.born(baby.x,baby.y);
        }
    }

}