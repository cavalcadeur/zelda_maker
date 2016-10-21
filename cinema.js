function cIntro(){
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
    imgCinema[0].src = "images/cinematiques/intro2.png";
    alert("Mais le heros ne reparut point et sa legende ne devint plus qu'une rumeur tenue. Les peuples de l'océan le prirent pour mort et son nom tomba dans l'oubli.");
    var timeoutID = window.setTimeout(transition, 9000);
    var timeoutA = window.setTimeout(cIntroQuatre, 9600);
}

function cIntroQuatre(){
    ctx.globalAlpha = 1;
    cinematicos = 0;
    animation();
}
