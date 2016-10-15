function sail(t){
    drawSail(t);
    var controlKeys = [[38,39,40,37],[101,99,98,97]];
    if (1 == keys[controlKeys[0][1]]) moveBoat(1);
    if (1 == keys[controlKeys[0][3]]) moveBoat(3);
    if (1 == keys[controlKeys[0][0]]) moveBoat(0);
    if (1 == keys[controlKeys[0][2]]) moveBoat(2);
}

function moveBoat(n){
    var shallPass = 1;
    onSeaIsland.forEach(
        function(e){
            var IIII = iles[e[0]].alti;
            if (boatPosition[0] + vecteurs[n][0]/4 >= e[2] && boatPosition[0] + vecteurs[n][0]/4 < e[2] + IIII.length && boatPosition[1] + vecteurs[n][1]/4 >= e[1] && boatPosition[1] + vecteurs[n][1]/4 < e[1] + IIII[0].length){
                if (IIII[Math.floor(boatPosition[0] + vecteurs[n][0]/4)-e[2]][Math.floor(boatPosition[1] + vecteurs[n][1]/4)-e[1]] > -1){
                    shallPass = 0;
                    if (IIII[Math.floor(boatPosition[0] + vecteurs[n][0]/4)-e[2]][Math.floor(boatPosition[1] + vecteurs[n][1]/4)-e[1]] == 0){
                        var XX = Math.floor(boatPosition[1] + vecteurs[n][1]/4)-e[1];
                        var YY = Math.floor(boatPosition[0] + vecteurs[n][0]/4)-e[2];
                        boatPosition = [e[2],e[1]];
                        onSeaIsland = [];
                        goToLevel(1,e[0],XX,YY,XX,YY);
                        return;
                    }
                }
            }
        }
    );
    if (shallPass == 0) return;
    boatPosition[0] += vecteurs[n][0]/4;
    boatPosition[1] += vecteurs[n][1]/4;
    waves.forEach(
        function (e){
            e[0] -= vecteurs[n][1]*12 - vecteurs[n][0]*2.5;
            e[1] -= vecteurs[n][0]*9;
            if (e[1] > H+10) e[1] = -10;
            else if (e[1] < -10) e[1] = H+10;
            if (e[0] > W+10) e[0] = -10;
            else if (e[0] < -10) e[0] = W+10;
        }
    );
}

function drawSail(t){
    ctx.fillStyle = "rgb(72,98,178)";
    ctx.fillRect(0,0,W,H);
    waves.forEach(
        function(f){
            waveNiveau(f);
        }
    );
    onSeaIsland = [];
    ctx.drawImage(imgBoat,W/2 - imgBoat.width/2,H/2 - imgBoat.height);
    sea.forEach(
        function(e){ 
            if ((W/100+boatPosition[1] > e[2]-5) && (boatPosition[1] - (W/100) < e[2]+iles[e[0]].alti[0].length+5) && (H/70+boatPosition[0] > e[1]) && (boatPosition[0] - H/70 < e[1]+iles[e[0]].alti.length)){
                drawIleSail(e[0],e[2],e[1]);
                onSeaIsland.push([e[0],e[2],e[1]]);
            }
        }
    );
}

function drawIleSail(name,X,Y){
    var Y2 = (Y - boatPosition[0] + (H/70))*35;
    var X2 = ((X - Y/5) - (boatPosition[1] - boatPosition[0]/5 - (W/100)))*50;
    Painter.scroll(X2,Y2);
    var loc = iles[name];
    var objNi = loc.obj;
    Painter.niveau(loc.alti);
    loc.alti.forEach(
        function(e,y){
            e.forEach(
                function(f,x){
                    Painter.cell(ctx,x,y,f,0,loc.alti);
                    if (loc.alti[y][x] < 0){
                        if (isFloodable(x,y,objNi) == false){
                            if (objNi[y][x][0] == "bleu0" || objNi[y][x][0] == "bleu1" || objNi[y][x][0] == "rouge0" || objNi[y][x][0] == "rouge1") Painter.img( ctx, x + 0.05, y + 0.45, f, imgElement[objNi[y][x][0]] );
                            else if (objNi[y][x][0] == "house0") Painter.img( ctx, x - 0.07, y + 0.35, f, imgElement[objNi[y][x][0]] );
                            else if (objNi[y][x][0] == "PNJ") Painter.img( ctx, x,y,f,imgPersoN[objNi[y][x][1]]);
                            else Painter.img( ctx, x, y, f, imgElement[objNi[y][x][0]] );
                        }
                    }
                    else{
                        if (objNi[y][x][0] == "bleu0" || objNi[y][x][0] == "bleu1" || objNi[y][x][0] == "rouge0" || objNi[y][x][0] == "rouge1") Painter.img( ctx, x + 0.05, y + 0.45, f, imgElement[objNi[y][x][0]] );
                        else if (objNi[y][x][0] == "house0") Painter.img( ctx, x - 0.07, y + 0.35, f, imgElement[objNi[y][x][0]] );
                        else if (objNi[y][x][0] == "PNJ") Painter.img( ctx, x,y,f,imgPersoN[objNi[y][x][1]]);
                        else Painter.img( ctx, x, y, f, imgElement[objNi[y][x][0]] );
                    }
                }
            );
            if (y + Y == Math.floor(boatPosition[0])) ctx.drawImage(imgBoat,W/2 - imgBoat.width/2,H/2 - imgBoat.height);
        }
    );
    if (Math.floor(boatPosition[0]) >= Y + loc.alti.length) ctx.drawImage(imgBoat,W/2 - imgBoat.width/2,H/2 - imgBoat.height);

}
