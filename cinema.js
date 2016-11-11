function cIntro(){
    if (keys[32] == 1){
        cIntroCinq();
    }
    else{
        imgCinema[0].src = "images/cinematiques/intro0.png";
        imgCinema[1].src = "images/cinematiques/tache.png";
        ctx.fillStyle = "rgb(0,0,0)";
        ctx.fillRect(0,0,W,H);
        imgCinema[0].onload = function(){
            ctx.drawImage(imgCinema[0],(W-500)/2,(H-319)/2);
            imgCinema[0].src = "images/cinematiques/intro1.png";
            imgCinema[0].onload = function(){};
            alert("Il n'y a pas si longtemps, le seigneur du mal fut vaincu par le heros du vent.");
            var timeoutID = window.setTimeout(transition, 9000);
            var timeoutA = window.setTimeout(cIntroDeux, 9600);
        };
    }

}

function transition(){
    disalert();
    var timeOut = [];
    for (var i = 0;i<60;i++){
        timeOut[i] = window.setTimeout(drawohoh, i*5);
    }
    for (var i = 0;i<30;i++){
        timeOut[i] = window.setTimeout(drawfafa, (i*10) + 300);
    }
}

function drawohoh(){
    ctx.drawImage(imgCinema[1],rnd(W)-200,rnd(H)-200);
}

function drawfafa(){
    ctx.globalAlpha = 0.1;
    ctx.fillRect(0,0,W,H);
    ctx.globalAlpha = 1;
}

function cIntroDeux(){
    ctx.globalAlpha = 1;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,W,H);
    ctx.drawImage(imgCinema[0],(W-600)/2,H-600);
    imgCinema[0].src = "images/cinematiques/intro2.png";
    alert("Sa légende fit le tour de l'océan. Et nombreux furent ceux qui voulurent marcher sur ses pas. Ce fut le cas de nos deux jeunes héros.");
    var timeoutID = window.setTimeout(transition, 9000);
    var timeoutA = window.setTimeout(cIntroTrois, 9600);
}

function cIntroTrois(){
    ctx.globalAlpha = 1;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,W,H);
    ctx.drawImage(imgCinema[0],(W-500)/2,(H-500)/2);
    imgCinema[0].src = "images/cinematiques/intro3.png";
    alert("Mais le heros ne reparut point et sa legende ne devint plus qu'une rumeur tenue. Les peuples de l'océan le prirent pour mort et son nom tomba dans l'oubli.");
    var timeoutID = window.setTimeout(transition, 9000);
    var timeoutA = window.setTimeout(cIntroQuatre, 9600);
}

function cIntroQuatre(){
    ctx.globalAlpha = 1;
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(0,0,W,H);
    ctx.drawImage(imgCinema[0],(W-600)/2,(H-600)/2);
    alert("Cependant, certains ne perdirent pas espoir et unirent leurs forces pour retrouver leur heros perdu.");
    var timeoutID = window.setTimeout(transition, 9000);
    var timeoutA = window.setTimeout(cIntroCinq, 9900);
}

function cIntroCinq(){
    imgCinema[0].src = "images/cinematiques/reveil1.png";
    ctx.globalAlpha = 1;
    cinematicos = 0;
    animation();
}

function cReveil(){
    ctx.fillStyle = "rgb(20,80,10)";
    ctx.fillRect(0,0,W,H);
    ctx.drawImage(imgCinema[0],W/2 - 357,H/2 - 250);
    imgCinema[0].src = "images/cinematiques/reveil2.png";
    alert("Open your eyes ...");
    var timeoutID = window.setTimeout(cReveil2, 2500);
}

function cReveil2(){
    disalert();
    var timeoutID = window.setTimeout(cReveil3, 2000);
}

function cReveil3(){
    alert("Je voulais dire : Il est temps de vous reveiller Link et toi aussi, mysterieux deuxieme joueur. S'habiller en vert ne fait pas de vous des héros. Il vous faut partir à l'aventure et dès maintenant.");
    var timeoutID = window.setTimeout(cReveil4, 9000);
}

function cReveil4(){
    disalert();
    ctx.drawImage(imgCinema[0],W/2 - 357,H/2 - 250);
    imgCinema[0].src = "images/cinematiques/reveil3.png";
    imgCinema[1].src = "images/cinematiques/reveil4.png";
    imgCinema[2] = 0;
    imgCinema[3] = 0;
    var timeoutID = window.setTimeout(cReveil5, 2000);
}

function cReveil5(){
    var ff = function(t) {
        fondReveil();
        if (imgCinema[2] < Math.PI/2){
            ctx.save();
            ctx.translate(W/3,H);
            ctx.rotate(-Math.PI/2+imgCinema[2]);
            ctx.drawImage(imgCinema[0],-200,-400);
            ctx.restore();
            ctx.save();
            ctx.translate(W/3*2,H);
            ctx.rotate(Math.PI/2-imgCinema[2]);
            ctx.drawImage(imgCinema[1],-200,-400);
            ctx.restore();
            imgCinema[2] += 0.02;
            window.requestAnimationFrame(ff);
        }
        else if (imgCinema[3] < 100){
            ctx.save();
            ctx.translate(W/3,H);
            ctx.rotate(-Math.PI/2+imgCinema[2]);
            ctx.drawImage(imgCinema[0],-200,-400);
            ctx.restore();
            ctx.save();
            ctx.translate(W/3*2,H);
            ctx.rotate(Math.PI/2-imgCinema[2]);
            ctx.drawImage(imgCinema[1],-200,-400);
            ctx.restore();
            imgCinema[3] += 1;
            window.requestAnimationFrame(ff);
        }
        else cReveilFin();
    };
    window.requestAnimationFrame(ff);
}

function fondReveil(){
    ctx.fillStyle = "rgb(28,134,182)";
    ctx.fillRect(0,0,W,H);
    ctx.fillStyle = "rgb(72,98,178)";
    ctx.fillRect(0,H/4*3,W,H);
    waves.forEach(
        function(e){
            waveReveil(e);
        }
    );
}


function waveReveil(e){
    ctx.fillStyle = "rgb(180,180,215)";
    if (e[1] > H/4*3){
        if (e[2] < 100 && e[2] > 0){
            ctx.beginPath();
            ctx.moveTo(e[0] - 50,e[1] - e[2] / 10);
            ctx.lineTo(e[0],e[1] - 5 - e[2] / 5 - e[2] / 10);
            ctx.lineTo(e[0] + 50,e[1] - e[2] / 10);
            ctx.lineTo(e[0],e[1] - 5 - e[2] / 10 - e[2] / 10);
            ctx.closePath();
            ctx.fill();
        }
        else if (e[2] >= 100){
            ctx.beginPath();
            ctx.moveTo(e[0] - 50,e[1] - e[2] / 10);
            ctx.lineTo(e[0],e[1] - 5 - (200-e[2]) / 5 - e[2] / 10);
            ctx.lineTo(e[0] + 50,e[1] - e[2] / 10);
            ctx.lineTo(e[0],e[1] - 5 - (200-e[2]) / 10 - e[2] / 10);
            ctx.closePath();
            ctx.fill();
        }
    }
    if (e[2] >= 200) {
        e[2] = -rnd(300)-100;
        e[0] = rnd(W);
        e[1] = rnd(H);
    }
    e[2] += 1;
}

function cReveilFin(){
    heros[0].sens = 2;
    heros[1].sens = 2;
    cinematicos = 0;
    animation();
}
