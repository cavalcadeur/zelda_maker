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
                        var truc = objNiveau[y][x][0];
                        if (truc != "arbre0" && truc != "coffre0" && truc != "coffre1" && truc != "porte0" && truc != "bleu0" && truc != "rouge1" && truc != "switch0" && truc != "switch1" && truc != "house0" && truc != "house1" && truc != "house2" && truc != "house3" && truc != "house4" && truc != "pot")
                        final.push(e);
                    }
                }
            }
        }
    );
    if (final.length == 0){
        return 4;
    }
    else return final[rnd(final.length)];
}
