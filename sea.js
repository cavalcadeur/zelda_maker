function seaAction(t){
    var controlKeys = [[38,39,40,37],[101,99,98,97]];
    drawSea();
    if (1 == keys[controlKeys[0][1]]) moveBoat(1);
    if (1 == keys[controlKeys[0][3]]) moveBoat(3);
    if (1 == keys[controlKeys[0][0]]) moveBoat(0);
    if (1 == keys[controlKeys[0][2]]) moveBoat(2);
    if (goto != ""){
        goToLevel(1,goto,iles[goto].heros[0][1],iles[goto].heros[0][0],iles[goto].heros[1][1],iles[goto].heros[1][0]);
        niveau = iles[goto].alti;
        onSea = 0;
        heros[0].x = iles[goto].heros[0][1];
        heros[0].y = iles[goto].heros[0][0];
        heros[0].z = niveau[heros[0].y][heros[0].x];
        heros[1].x = iles[goto].heros[1][1];
        heros[1].y = iles[goto].heros[1][0];
        heros[1].z = niveau[heros[1].y][heros[1].x];
        ennemis = iles[goto].ennemis;
        objNiveau = iles[goto].obj;
        Painter.niveau(niveau);
    }
    else {
        boatPosition[0] = heros[0].y;
        boatPosition[1] = heros[0].x;
    }
}

function drawSea(){
    ctx.fillStyle = "rgb(72,98,178)";
    ctx.fillRect(0,0,W,H);
    waves.forEach(
        function(f){
            waveMove(f);
        }
    );
    sea.forEach(
        function(e){
            drawIsland(e[0],e[1]-seaScroll[1],e[2]-seaScroll[0]);
        }
    );
    ctx.drawImage(imgBoat,heros[0].x - 35 - seaScroll[0],heros[0].y - 35 - seaScroll[1]);
}

function drawIsland(ile,Y,X){
    var truc = iles[ile].alti;
    truc.forEach(
        function(f,y){
            f.forEach(
                function(g,x){
                    if (g == -1) return;
                    ctx.fillStyle = "rgb("+(20+g*5)+","+(80+g*20)+","+(10+g*2)+")";
                    ctx.fillRect(x*4 + X,y*4 + Y,4,4);
                }
            );
        }
    );

}

function testIsland(ile){
    if (Math.hypot(heros[0].x - ile[2] - 2.5*iles[ile[0]].alti[0].length,heros[0].y+30 - ile[1] - 2.5*iles[ile[0]].alti.length) < 2.5*iles[ile[0]].alti.length){
        goto = ile[0];
    }
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

function waveNiveau(e){
    ctx.fillStyle = "rgb(180,180,215)";
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
    if (e[2] >= 200) {
        e[2] = -rnd(300)-100;
        e[0] = rnd(W);
        e[1] = rnd(H);
    }
    e[2] += 1;
}

function lavaNiveau(e){
    ctx.fillStyle = "rgb(225,115,36)";
    if (e[2] < 100 && e[2] > 0){
        ctx.beginPath();
        ctx.ellipse(e[0],e[1],e[2]*1.5,e[2]*0.5,0,- Math.PI,Math.PI);
        ctx.fill();
    }
    else if (e[2] < 200 && e[2] > 0){
        ctx.beginPath();
        ctx.ellipse(e[0],e[1],(200 - e[2])*1.5,(200 - e[2])*0.5,0,- Math.PI,Math.PI);
        ctx.fill();
    }
}

function lavaNiveauUp(e){
    ctx.fillStyle = "rgb(223,213,45)";
    if (e[2] < 100 && e[2] > 0){
        ctx.beginPath();
        ctx.ellipse(e[0],e[1],e[2],e[2]*0.25,0,- Math.PI,Math.PI);
        ctx.fill();
    }
    else if (e[2] < 200 && e[2] > 0){
        ctx.beginPath();
        ctx.ellipse(e[0],e[1],(200 - e[2]),(200 - e[2])*0.25,0,- Math.PI,Math.PI);
        ctx.fill();
    }
    if (e[2] >= 200) {
        e[2] = -rnd(300);
        e[0] = rnd(W);
        e[1] = rnd(H);
    }
    e[2] += 0.3;
}

function rondNiveau(e){
    ctx.strokeStyle = "rgb(32,49,154)";
    if (e[2] >= 0 && e[2] < 150) ctx.globalAlpha = 1 - e[2]/152;
    if (e[2] < 150){
        for (var i = 0;i < 4;i ++){
            if (e[2] > 30*i){
                ctx.beginPath();
                ctx.ellipse(e[0],e[1],e[2]-30*i,(e[2]-30*i)*0.25,0,- Math.PI,Math.PI);
                ctx.stroke();
            }
        }
    }
    ctx.globalAlpha = 1;
    if (e[2] >= 200) {
        e[2] = -rnd(300);
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
    out = oo;
    goto = go;
    if (oo == 1){
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
