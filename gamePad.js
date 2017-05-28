function videAsFuck(){
    //console.log("Vide");
}

function usualGamePad(){
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(mouse[1]-2,mouse[0]-2,5,5);
    if (gamePads.buttons[0].pressed == true){
        if (gameKey[0] == 1){

        }
        else{
            if (alerting == 1) {
                disalert();
                if (figer == 1){
                    figer = 0;
                    heros[0].aura = "";
                    heros[1].aura = "";
                }
                return;
            }
            gameKey[0] = 1;
            if (onSea == 0){
                disalert();
                if (figer == 1){figer = 0; heros[0].aura = ""; heros[1].aura = "";} else{attack(0);}
            }
        }
    }
    else gameKey[0] = 0;
    if (gamePads.buttons[1].pressed == true){
        if (gameKey[1] == 1){

        }
        else{
            if (alerting == 1) {
                disalert();
                if (figer == 1){
                    figer = 0;
                    heros[0].aura = "";
                    heros[1].aura = "";
                }
                return;
            }
            gameKey[1] = 1;
            if (onSea == 0){
                disalert();
                changeArme(0);
            }
        }
    }
    else gameKey[1] = 0;
    if (heros[0].vx == 0 && heros[0].vy == 0 && heros[0].imgUp != 1){
        if (onSea == 0){
            if (gamePads.axes[0] > 0.5) move(1,0,0);
            else if (gamePads.axes[0] < -0.5) move(3,0,0);
            else if (gamePads.axes[1] > 0.5) move(2,0,0);
            else if (gamePads.axes[1] < -0.5) move(0,0,0);
        }
        else{
            if (gamePads.axes[0] > 0.5) moveBoat(1);
            else if (gamePads.axes[0] < -0.5) moveBoat(3);
            else if (gamePads.axes[1] > 0.5) moveBoat(2);
            else if (gamePads.axes[1] < -0.5) moveBoat(0);
        }
    }
    if (gamePads.axes[4] > 0.1) mouse[0] += gamePads.axes[4]*10;
    else if (gamePads.axes[4] < -0.1) mouse[0] += gamePads.axes[4]*10;
    if (gamePads.axes[3] > 0.1) mouse[1] += gamePads.axes[3]*10;
    else if (gamePads.axes[3] < -0.1) mouse[1] += gamePads.axes[3]*10;
}
