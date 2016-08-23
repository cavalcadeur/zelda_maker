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
