function drawSea(){
    var seaScroll = [boatPosition[1]*3 - 10-W/2,boatPosition[0]*3-30-H/2];
    ctx.fillStyle = "rgb(72,98,178)";
    ctx.fillRect(0,0,W,H);
    waves.forEach(
        function(f){
            waveMove(f);
        }
    );
    if (questObj["carteMaritime"] == 1){
        sea.forEach(
            function(e){
                drawIsland(e[0],e[1]*3-seaScroll[1],e[2]*3-seaScroll[0]);
            }
        );
        ctx.drawImage(imgBoat,boatPosition[1]*3 - 10 - seaScroll[0],boatPosition[0]*3 - 30 - seaScroll[1],30,30);
    }
    else alert("Vous ne possédez pas encore de carte maritime !");
}

function drawIsland(ile,Y,X){
    var truc = iles[ile].alti;
    truc.forEach(
        function(f,y){
            f.forEach(
                function(g,x){
                    if (g <= -1) return;
                    ctx.fillStyle = "rgb("+(20+g*5)+","+(80+g*20)+","+(10+g*2)+")";
                    ctx.fillRect(x*3 + X,y*3 + Y,4,4);
                }
            );
        }
    );

}

function waveMove(e){
    ctx.fillStyle = "rgb(180,180,215)";
    if (e[2] < 100 && e[2] > 0){
        ctx.beginPath();
        ctx.moveTo(e[0] - 25,e[1] - e[2] / 20);
        ctx.lineTo(e[0],e[1] - 5 - e[2] / 10 - e[2] / 20);
        ctx.lineTo(e[0] + 25,e[1] - e[2] / 20);
        ctx.lineTo(e[0],e[1] - 5 - e[2] / 20 - e[2] / 20);
        ctx.closePath();
        ctx.fill();
    }
    else if (e[2] >= 100){
        ctx.beginPath();
        ctx.moveTo(e[0] - 25,e[1] - e[2] / 20);
        ctx.lineTo(e[0],e[1] - 5 - (200-e[2]) / 10 - e[2] / 20);
        ctx.lineTo(e[0] + 25,e[1] - e[2] / 20);
        ctx.lineTo(e[0],e[1] - 5 - (200-e[2]) / 20 - e[2] / 20);
        ctx.closePath();
        ctx.fill();
    }
    if (e[2] == 200) {
        e[2] = -rnd(200);
        e[0] = rnd(W);
        e[1] = rnd(H);
    }
    e[2] += 1;
}

function goToLevel(oo,go,x,y,x2,y2){
    boomerang.forEach(
        function(e,n){
            if (e.endu > 5) {
                var X = e.x - vecteurs[e.sens][1]*(10-e.endu);
                var Y = e.y - vecteurs[e.sens][0]*(10-e.endu);
            }
            else{
                var X = e.x + vecteurs[e.sens][1]*(e.endu);
                var Y = e.y + vecteurs[e.sens][0]*(e.endu);
            }
            if (objNiveau[Y][X][0] == "main1") objNiveau[Y][X][0] = "main0";
            else objNiveau[Y][X].splice(0,0,"boomerang");
        }
    );
    boomerang = [];
    if (oo == -1 || go == "void"){
        onSea = 5;
        islandData = {out:1,ileSet:0,x:0,y:0,select:0};
        return;
    }
    heros[0].x = x;
    heros[0].y = y;
    heros[1].x = x2;
    heros[1].y = y2;
    heros[0].grap = 0;
    heros[0].grapD = -1;
    heros[1].grap = 0;
    heros[1].grapD = -1;
    hookShots = [];
    out = oo;
    chooseBack(oo);
    for(var i = 0;i<nSpeImg;i++){
        imgElement["spe"+i].src = "images/elements/spe/"+ out +"/spe" + i + ".png";
    }
    goto = go;
    if (oo == 1){
        if (iles[go].particles == undefined){
            particles = [];
        }
        else {
            particles = iles[go].particles;
        }
        niveau = iles[go].alti;
        ennemis = iles[go].ennemis;
        objNiveau = iles[go].obj;
    }
    else{
        if (interieurs[go].particles == undefined){
            particles = [];
        }
        else {
            particles = interieurs[go].particles;
        }
        niveau = interieurs[go].alti;
        ennemis = interieurs[go].ennemis;
        objNiveau = interieurs[go].obj;
    }
    onSea = 0;
    respawnPoint = [x,y];
    heros[0].z = niveau[heros[0].y][heros[0].x];
    heros[1].z = niveau[heros[1].y][heros[1].x];
    Painter.niveau(niveau);
    Painter.scroll(0,0);
    Painter.centerScroll(x,y,0,W,H);
    if (go == "sky4" && quests.sky == 0){
        cinematicos = 5;
        heros[0].x += 1;
    }
}

function defineTele(gg,outa){
    if (objNiveau[teleport[0]][teleport[1]][0] == "teleport"){
        objNiveau[teleport[0]][teleport[1]][1] = outa;
        objNiveau[teleport[0]][teleport[1]][2] = gg;
    }
    else {
        objNiveau[teleport[0]][teleport[1]][1] = gg;
    }

}

function chooseBack(oo){
    if (oo == 1){
        backDraw = backg.fa;
    }
    else if (oo == 2){
        backDraw = backg.fb;
    }
    else if (oo == 3){
        backDraw = backg.fc;
    }
    else if (oo == 5){
        backDraw = backg.fe;
    }
    else if (oo == 6){
        backDraw = backg.ff;
    }
    else if (oo == 4){
        backDraw = backg.fd;
    }
    else {
        backDraw = backg.nothing;
    }
    console.log(backDraw);
}
