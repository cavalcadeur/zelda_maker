function clicSword(x,y){
    x = Math.floor(x-scrollX);
    y = Math.floor(y+10-scrollY);
    var coor = Painter.case(niveau,x,y);
    var distM = Math.abs(coor[1]-heros[0].x + coor[0]-heros[0].y);
    if (distM == 1){
        if (coor[1] > heros[0].x) heros[0].sens = 1;
        else if (coor[1] < heros[0].x) heros[0].sens = 3;
        else{
            if (coor[0] > heros[0].y) heros[0].sens = 2;
            else if (coor[0] < heros[0].y) heros[0].sens = 0;
        }
        attack(0);
    }
    else if (distM == 2){
        //if (Math.abs(coor[1] - heros[0].x) !=  Math.abs(coor[0] - heros[0].y)){
            if (coor[1] > heros[0].x) var sensA = 1;
            else if (coor[1] < heros[0].x)  var sensA = 3;
            else{
                if (coor[0] > heros[0].y) var sensA = 2;
                else if (coor[0] < heros[0].y) var sensA = 0;
            }
            //if (niveau[heros[0].y][heros[0].x] == niveau[coor[0]][coor[1]] && niveau[coor[0]][coor[1]] == niveau[coor[0] + vecteurs[sensA][0]][coor[1] + vecteurs[sensA][1]] && niveau[coor[0]][coor[1]] == niveau[coor[0] - vecteurs[sensA][0]][coor[1] - vecteurs[sensA][1]]){
                var nfn = 0;
                ennemis.forEach(
                    function(e,gg){
                        if (Math.round(e.x) == coor[1] && Math.round(e.y) == coor[0]){
                            hitEnnemis(gg,4,heros[0].sens);
                            nfn = 1;
                        }
                    }
                );
                if (nfn == 1){
                    heros[0].sens = sensA;
                    heros[0].x = coor[1] + vecteurs[sensA][1];
                    heros[0].y = coor[0] + vecteurs[sensA][0];
                }
            //}
        //}
    }
    console.log(distM);
}
