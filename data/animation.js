function nonifiant(){

}

function walkAnim(i){
    if (heros[i].nAnim%5 == 0){
        if (heros[i].nAnim%10 == 0){
            if (heros[i].img == 4) heros[i].img = 8;
            else heros[i].img = 4;
        }
        //console.log(heros[i].vy);
        if (heros[i].vx > 0) {heros[i].vx -= 10; }
        else if (heros[i].vy > 0) {heros[i].vy -= 10; }
        else if (heros[i].vx < 0) {heros[i].vx += 10; }
        else if (heros[i].vy < 0) {heros[i].vy += 10; }

        //console.log(heros[i].vy);

        if (Math.abs(heros[i].vx) < 10) heros[i].vx = 0;
        if (Math.abs(heros[i].vy) < 10) heros[i].vy = 0;

        if (heros[i].vx == 0 && heros[i].vy == 0){
            heros[i].anim = nonifiant;
            heros[i].nAnim = -1;
            heros[i].img = 0;
            if (heros[i].carry[0] == 1) heros[i].img = 12;
        }
    }
    heros[i].nAnim += 1;
}

function jumpAnim(i){
    if (heros[i].nAnim == 3){
        heros[i].g = -0.45;
        heros[i].img = 4;
        heros[i].nAnim = -1;
        heros[i].anim = flyAnim;
        heros[i].x +=  vecteurs[heros[i].datAnim][1];
        heros[i].y +=  vecteurs[heros[i].datAnim][0];
        heros[i].vx = -50 * vecteurs[heros[i].datAnim][1];
        heros[i].vy = -50 * vecteurs[heros[i].datAnim][0];
    }
    heros[i].nAnim += 1;
}

function flyAnim(i){
    if (heros[i].vx > 0) {heros[i].vx -= 4; }
    else if (heros[i].vy > 0) {heros[i].vy -= 4; }
    else if (heros[i].vx < 0) {heros[i].vx += 4; }
    else if (heros[i].vy < 0) {heros[i].vy += 4; }
    if (Math.abs(heros[i].vx) < 8 && heros[i].vx != 0) {
        if (heros[i].z == getFloor(heros[i].x,heros[i].y,heros[i].z) || heros[i].datAnim == -1){
            heros[i].anim = nonifiant;
            heros[i].vx = 0;
            heros[i].vy = 0;
            heros[i].nAnim = 0;
            heros[i].img = 0;
            if (heros[i].carry[0] == 1) heros[i].img = 12;
        }
        else {
            heros[i].datAnim = -1;
            if (heros[i].vx > 0){
                if (SuperGetFloor(heros[i].x - 1 , heros[i].y , heros[i].z) <= heros[i].z){
                    heros[i].x -= 1;
                    heros[i].vx = 50;
                }
            }
            else {
                if (SuperGetFloor(heros[i].x + 1 , heros[i].y , heros[i].z) <= heros[i].z){
                    heros[i].x += 1;
                    heros[i].vx = -50;
                }
            }
        }
    }
    if (Math.abs(heros[i].vy) < 8 && heros[i].vy != 0){
        if (heros[i].z == getFloor(heros[i].x,heros[i].y,heros[i].z) || heros[i].datAnim == -1){
            heros[i].anim = nonifiant;
            heros[i].vx = 0;
            heros[i].vy = 0;
            heros[i].nAnim = 0;
            heros[i].img = 0;
            if (heros[i].carry[0] == 1) heros[i].img = 12;
        }
        else {
            heros[i].datAnim = -1;
            if (heros[i].vy > 0){
                if (SuperGetFloor(heros[i].x , heros[i].y - 1 , heros[i].z) <= heros[i].z){
                    heros[i].y -= 1;
                    heros[i].vy = 50;
                }
            }
            else {
                if (SuperGetFloor(heros[i].x , heros[i].y + 1 , heros[i].z) <= heros[i].z){
                    heros[i].y += 1;
                    heros[i].vy = -50;
                }
            }
        }
    }
}
