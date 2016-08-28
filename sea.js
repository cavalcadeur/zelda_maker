function seaAction(t){
    var controlKeys = [[38,39,40,37],[101,99,98,97]];
    drawSea();
    if (1 == keys[controlKeys[0][1]]) moveBoat(1);
    if (1 == keys[controlKeys[0][3]]) moveBoat(3);
    if (1 == keys[controlKeys[0][0]]) moveBoat(0);
    if (1 == keys[controlKeys[0][2]]) moveBoat(2);
    if (goto != ""){
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

function moveBoat(d){
    heros[0].x += vecteurs[d][1] * 5;
    heros[0].y += vecteurs[d][0] * 5;
    if (heros[0].x < 0) heros[0].x = 0;
    if (heros[0].y < 0) heros[0].y = 0;
    if (heros[0].x > seaLimit[0]) heros[0].x = seaLimit[0];
    if (heros[0].y > seaLimit[1]) heros[0].y = seaLimit[1];
    if (heros[0].x - seaScroll[0] > W) seaScroll[0] = heros[0].x - W;
    if (heros[0].x - seaScroll[0] < 0) seaScroll[0] = heros[0].x;
    if (heros[0].y - seaScroll[1] > H) seaScroll[1] = heros[0].y - H;
    if (heros[0].y - seaScroll[1] < 0) seaScroll[1] = heros[0].y;
    sea.forEach(
        function(e){
            testIsland(e);
        }
    );
    if (goto == "") boatPosition = [heros[0].y,heros[0].x];
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
    if (e[2] == 200) {
        e[2] = -rnd(500)+100;
        e[0] = rnd(W);
        e[1] = rnd(H);
    }
    e[2] += 1;    
}
