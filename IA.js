function choseDirection(n){
    var choices = [0,1,2,3];
    var final = [];
    choices.forEach(
        function(e){
            var x = Math.round(ennemis[n].x) + vecteurs[e][1];
            var y = Math.round(ennemis[n].y) + vecteurs[e][0];
            if (x >= 0 && y >= 0  && y < niveau.length){
                if (x < niveau[y].length){
                    if (niveau[y][x] > -1 && niveau[y][x] == Math.round(ennemis[n].z)){
                        if (isSolid(x,y) == false){ final.push(e);}
                    }
                }
            }
        }
    );
    if (ennemis[n].ia == "random"){
        if (final.length == 0){
            return 4;
        }
        else return final[rnd(final.length)];
    }
    else if (ennemis[n].ia == "chercheur"){
        if (heros[0].x > Math.round(ennemis[n].x) && final.indexOf(1) != -1) var cc = 1;
        else if (heros[0].x < Math.round(ennemis[n].x) && final.indexOf(3) != -1) var cc = 3;
        else if (heros[0].y > Math.round(ennemis[n].y) && final.indexOf(2) != -1) var cc = 2;
        else if (heros[0].y < Math.round(ennemis[n].y) && final.indexOf(0) != -1) var cc = 0;
        else {
            if (heros[0].x == Math.round(ennemis[n].x) && heros[0].y == Math.round(ennemis[n].y)){
                if (final.length == 0){
                    var cc = 4;
                }
                else var cc = final[rnd(final.length)]; 
            }
            else {
                var cc = 4;
            }
        }
        return cc;
    }
    else if (ennemis[n].ia == "mur"){
        for(var i = 0;i < 4;i++){
            if (final.indexOf(((ennemis[n].sens+3) + i)%4) != -1) return ((ennemis[n].sens+3) + i)%4;
        }
    return 4;
    }
}
