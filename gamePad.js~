function TPisland(){
    ctx.drawImage(fondfond,0,0,W,H);
    // miniMap
    if (islandData.select == 0){
        ctx.fillStyle = colorSet[islandData.out][3];
        ctx.fillRect(W-W/5,0,W/5,H/3);
        var rgb = colorSet[islandData.out][2];
        ctx.fillStyle = "rgb(" + rgb[0] + "," + rgb[1] + "," +  rgb[0] + ")";
        ctx.fillRect(W-W/5 + W/20,H/12,W/5 - W/10,H/3 - H/6);
        ctx.strokeRect(W-W/5 + W/20,H/12,W/5 - W/10,H/3 - H/6);

        ctx.fillStyle = "rgb(109,133,35)";
    }
    else {
        ctx.fillStyle = "rgb(100,100,100)";
        ctx.fillRect(W-W/5,0,W/5,H/3);
    }
    // selection d'iles
    drawMiniIsland(interieurs.vide.alti,islandData.out,0,H/3,W/5,H/3,0);
    for (var i = 1;i<6;i++){
        if (markedLevels[i-1+(islandData.ileSet * 5)] != undefined){
            if (i > 2) var superN = 1;
            else var superN = 0;
            var weirdArray = markedLevels[i-1+(islandData.ileSet * 5)];
            if (weirdArray[1] == 1){
                drawMiniIsland(iles[weirdArray[0]].alti,1,(W/5)*(i%3),H/3+(H/3)*superN,W/5,H/3,i+(islandData.ileSet * 5));
            }
            else drawMiniIsland(interieurs[weirdArray[0]].alti,weirdArray[1],(W/5)*(i%3),H/3+(H/3)*superN,W/5,H/3,i+(islandData.ileSet * 5));

        }
    }
    // ile selectionnee
    if (islandData.select == 0) var nSelect = 0;
    else var nSelect = islandData.select - (islandData.ileSet * 5);
    if (islandData.select != 0 && nSelect == 0) nSelect = 42;
    if (nSelect >= 0 && nSelect <= 5){
        if (nSelect > 2) var superN = 1;
        else var superN = 0;
        ctx.beginPath();
        ctx.arc(W/10 + (W/5)*(nSelect%3),H/3 + H/6 + (H/3)*superN,W/10,Math.PI,-Math.PI);
        ctx.stroke();
    }
}

function drawMiniIsland(alti,outout,x,y,w,h,n){
    var rgb = colorSet[outout][2];
    var cote = 0;
    if ((w - w/5) / alti[0].length > (h - h/5) / alti.length) cote = (h - h/5) / alti.length;
    else cote = (w - w/5) / alti[0].length;
    alti.forEach(
        function(e,yy){
            e.forEach(
                function(f,xx){
                    if (f >= 0){
                        ctx.fillStyle = "rgb("+(rgb[0]+f*rgb[3])+","+(rgb[1]+f*rgb[4])+","+(rgb[2]+f*rgb[5])+")";
                        if (n == islandData.select){
                            if (xx == islandData.x && yy == islandData.y) ctx.fillStyle = "rgb(255,255,255)";
                        }
                        ctx.fillRect(x + w/10 + xx*cote,y + h/10 + yy*cote,cote,cote);
                    }
                }
            );
        }
    );
}

function TPclick(x,y){
    if (x > W - W/5){
        if (y > H - H/3) defineTP();
        else if (y > H/3) {
            if (islandData.select != 0) return;
            if (x > W - W/10) var change = 1;
            else var change = -1;
            islandData.out += change;
            if (islandData.out <= -1) islandData.out = colorSet.length - 1; 
            if (islandData.out >= colorSet.length) islandData.out = 0; 
        }
    }
    else if (x > W - W/5 - W/5){
        if (y > H/3){
            islandData.ileSet += 1;
            if (markedLevels.length <= islandData.ileSet*5) islandData.ileSet = 0;

        }
    }
    else if (y > H/3){
        var selection = 0;
        if (y < (H/3) * 2){
            if (x < W/5) selection = 0;
            else if (x < W/5 + W/ 5) selection = 1;
            else selection = 2;
        }
        else {
            if (x < W/5) selection = 3;
            else if (x < W/5 + W/ 5) selection = 4;
            else selection = 5;
        }
        if (selection == 0) {
            islandData.select = 0;
            TPPosition(x,y);
        }
        else if (markedLevels[selection + islandData.ileSet*5 - 1] == undefined) return;
        else {
            islandData.select = selection + islandData.ileSet*5;
            TPPosition(x,y);
        }
    }
}

function TPPosition(x,y){
    var hautGauche = [[W/50,H/3 + H/30],[W/5 + W/50,H/3 + H/30],[W/5 + W/5 + W/50,H/3 + H/30],[W/50,H/3 + H/30 + H/3],[W/5 + W/50,H/3 + H/30 + H/3],[W/5 + W/5 + W/50,H/3 + H/30 + H/3]];
    if (islandData.select == 0) var reference = hautGauche[0];
    else var reference = hautGauche[islandData.select - islandData.ileSet*5];
    var w = W/5;
    var h = H/3;
    if (islandData.select == 0) var weirdArray = ["vide",0];
    else {
        var weirdArray = markedLevels[islandData.select-1];
    }
    if (weirdArray[1] == 1){
        var alti = iles[weirdArray[0]].alti;
    }
    else var alti = interieurs[weirdArray[0]].alti;
    var cote = 0;
    if ((w - w/5) / alti[0].length > (h - h/5) / alti.length) cote = (h - h/5) / alti.length;
    else cote = (w - w/5) / alti[0].length;
    x -= reference[0];
    y -= reference[1];
    x = Math.round(x);
    y = Math.round(y);
    while (x%Math.round(cote) != 0){
        x -= 1;
    }
    while (y%Math.round(cote) != 0){
        y -= 1;
    }
    x = x/Math.round(cote);
    y = y/Math.round(cote);
    if (y < alti.length){
        if (x < alti[y].length){
            if (x >= 0 && y >= 0){
                if (alti[y][x] > -1){
                    islandData.x = x;
                    islandData.y = y;
                    return;
                }
            }
        }
    }
    x = 0;
    y = 0;
    while (alti[y][x] < 0){
        x += 1;
        if (x == alti[y].length) {
            y += 1;
            x = 0;
        }
        if (y == alti.length) {
            islandData.x = 0;
            islandData.y = 0;
            return;
        }
    }
    islandData.x = x;
    islandData.y = y;
}

function defineTP(){
    if (teleport[0] == -1){
        if (islandData.select != 0){
            goToLevel(markedLevels[islandData.select - 1][1],markedLevels[islandData.select - 1][0],islandData.x,islandData.y,islandData.x,islandData.y);
        }
    }
    else {
        if (islandData.select == 0){
            islandData.goto = newLevel(islandData.out);
            
        }
        else {
            islandData.goto = markedLevels[islandData.select - 1][0];
            islandData.out = markedLevels[islandData.select - 1][1];
        }
        if (objNiveau[teleport[0]][teleport[1]][0] == "teleport"){
            objNiveau[teleport[0]][teleport[1]] = ["teleport",islandData.out+"",islandData.goto+"",islandData.x,islandData.y,islandData.x,islandData.y];
        }
        else {
            objNiveau[teleport[0]][teleport[1]][1] = islandData.goto + "";
            if (islandData.select == 0) {
                if (islandData.out == 1){
                    iles[islandData.goto].heros = [[islandData.y,islandData.x],[islandData.y,islandData.x]];
                }
                else interieurs[islandData.goto].heros = [[islandData.y,islandData.x],[islandData.y,islandData.x]];
            }
        }
    }
    onSea = 0;
}


function newLevel(outaa){
    var alpha = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    var result = "depart";
    while (iles[result] != undefined || interieurs[result] != undefined){
        var gg = rnd(10) + 10;
        result = "-";
        for (var i = 0;i < gg;i ++){
            result = result + alpha[rnd(alpha.length)];
        }
    }
    if (outaa == 1){
        iles[result] = {"obj":[[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]]],
                              "alti":[[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0]],
                              "heros":[[0,0],[0,0]],
                              "ennemis":[],
	                      "out":1,
	                      "particles":[]};
    }
    else{
        interieurs[result] = {"obj":[[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]],[[""],[""],[""],[""],[""],[""],[""],[""],[""],[""],[""]]],
                              "alti":[[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0]],
                              "heros":[[0,0],[0,0]],
                              "ennemis":[],
	                      "out":outaa,
	                      "particles":[]};
    }
    markedLevels.push([result,outaa]);
    return result;
}
