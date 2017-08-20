function hitSpot(x,y,z,degat,sens){
    var grassContent = ["","","coeur","rubisVert","rubisVert","rubisBleu"];
    var machin = objNiveau[y][x];
    var truc = machin[0];
    if (Math.abs(z - niveau[y][x]) <= 1){
        if (truc == "herbe0" | truc == "herbe1" | truc == "pot" | truc == "palmier"){
            if (objNiveau[y][x].length > 1){
                objNiveau[y][x].splice(0,1);
            }
            else {
                objNiveau[y][x][0] = grassContent[rnd(grassContent.length - 1)];
            }
            if (truc == "herbe0" || truc == "herbe1") addParticles("debris",x,y,niveau[y][x],5,0,10,"herbe");
            else if (truc == "palmier") addParticles("debris",x,y,niveau[y][x],5,0,15,"palmier");
        }
        else if (truc == "switch0" || truc == "switch1") changeColor();
        else if (truc == "wSwitch0") {waterLevel(1);machin[0] = "wSwitch1";}
        else if (truc == "wSwitch1") {waterLevel(-1);machin[0] = "wSwitch0";}
        else if (truc == "switch2"){
            if (machin[3] == "") objNiveau[machin[2]][machin[1]] = [""];
            else if (machin[3] == 1 || machin[3] == -1){
                niveau[machin[2]][machin[1]] += machin[3];
                Painter.niveau(niveau);
            }
            else if (machin[3] == "monstre"){
                //ennemis.push(monstreType(machin[4],machin[1],machin[2]));
                findEnnemy(machin[4],ennemis.length,machin[1],machin[2],1);
            }
            else {
                for (var i = machin.length-1;i>2;i--){
                    objNiveau[machin[2]][machin[1]].splice(0,0,machin[i]);
                }
            }
            machin[0] = "switch3";
        }
        if (out == 7){
            if (truc == "spe3"){
                addParticles("debris",x,y,niveau[y][x],5,0,10,"herbe");
                //particles.push({n:0,type:"herbe",x:x,y:y,g:5,alti:niveau[y][x],lim:10});
                if (objNiveau[y][x].length > 1){
                    objNiveau[y][x].splice(0,1);
                }
                else {
                    objNiveau[y][x][0] = [""];
                }
            }
            else if (truc == "spe1" || truc == "spe2"){
                addParticles("debris",x,y,niveau[y][x],5,0,10,"herbe");
                //particles.push({n:0,type:"herbe",x:x,y:y,g:5,alti:niveau[y][x],lim:10});
                objNiveau[heros[n].y + vecteurs[heros[n].sens][0]][heros[n].x + vecteurs[heros[n].sens][1]] = [""];
                alert("Ah malheureux ! A vouloir couper trop vite voilà ce qui arrive ! Ce plant est perdu pour toujours ! Malheur à toutes tes futures plantations. Tu seras maudit pour ton impatience.");
            }
        }
    }
    ennemis.forEach(
        function (e,i){
            if (e.isThere(x,y,z) == true){
                e.damage(degat,sens);
            }
        }
    );
}
