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
    else if (ennemis[n].ia == "mur"){
        for(var i = 0;i < 4;i++){
            if (final.indexOf((ennemis[n].sens-1 + i)%4) != -1) return (ennemis[n].sens-1 + i)%4;
        }
    return 4;
    }
}
