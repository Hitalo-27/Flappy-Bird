var cenario = document.getElementById("cenario");
var ctx = cenario.getContext("2d");

var bg = new Image();
var chao = new Image();
var passaro = new Image();
var pipeN = new Image();
var pipeS = new Image();

bg.src = "images/bg.png";
chao.src = "images/fg.png";
passaro.src = "images/bird.png";
pipeN.src = "images/pipeNorth.png";
pipeS.src = "images/pipeSouth.png";

var xP=15;
var yP=120;
var gravidade = 1.5;
var start = false;
var gap = 100;
var canos = [];
var pontuacao = 0;
canos[0] = {
    x:200,
    y:0
};

function voar(){
    start = true;
    yP-= 25;
}

document.addEventListener("keydown",voar);


function pintarCenario(){
    ctx.drawImage(bg,0,0);
    ctx.drawImage(passaro,xP,yP);
    
}
function acaoCenario(){
    pintarCenario();
    yP+= gravidade;
    for(var i=0;i<canos.length;i++){
        ctx.drawImage(pipeN,canos[i].x,canos[i].y);
        ctx.drawImage(pipeS,canos[i].x,canos[i].y + pipeN.height+gap);
        canos[i].x--;
        
        if(canos[i].x == 20){
            canos.push({
                x: 250,
                y: Math.floor(Math.random() * pipeN.height)-
                pipeN.height
            });
        } 
        
        //Cano teto
        if(canos[i].x< xP+passaro.width && xP< canos[i].x+pipeN.width && canos[i].y<yP &&
          canos[i].y+pipeN.height> yP){
            location.reload();
        }
        
        //Cano chao
        var yCano = canos[i].y + pipeN.height+gap;
        if(canos[i].x< xP+passaro.width && xP< canos[i].x+pipeS.width && yCano<yP+passaro.height &&
          yCano+pipeS.height> yP){
            location.reload();
        }
        
        if(canos[i].x == xP){
            pontuacao++;
        }
        
    }
    ctx.drawImage(chao,0,bg.height - chao.height);
 
    //colisao Teto
    if (yP<0 ){
        location.reload();
    }
    
    //colisao chao
    if(yP+passaro.height > (bg.height - chao.height)){
        location.reload();
    }
}

function play(){
    if(start){
        acaoCenario();
    }else{
        pintarCenario();
    }
    ctx.font = "25px Century Gothic";
    ctx.fillText("Score: "+pontuacao,20,450);
    requestAnimationFrame(play);
}


play();