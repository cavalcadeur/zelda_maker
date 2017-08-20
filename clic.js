function clicSword(x,y){
    x = Math.floor(x-scrollX);
    y = Math.floor(y+10-scrollY);
    var coor = Painter.case(niveau,x,y);
    var distM = Math.abs(coor[1]-heros[1].x + coor[0]-heros[1].y);
    if (distM == 1){
        if (coor[1] > heros[1].x) heros[1].sens = 1;
        else if (coor[1] < heros[1].x) heros[1].sens = 3;
        else{
            if (coor[0] > heros[1].y) heros[1].sens = 2;
            else if (coor[0] < heros[1].y) heros[1].sens = 0;
        }
        attack(1);
    }
    console.log(distM);
}
