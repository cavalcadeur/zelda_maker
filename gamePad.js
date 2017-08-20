function videAsFuck(){
    //console.log("Vide");
}

function usualGamePad(){
    ctx.fillStyle = "rgb(0,0,0)";
    ctx.fillRect(mouse[1]-2,mouse[0]-2,5,5);
    if (gamePads.buttons[0].pressed == true){
        keyDown(heros[0].touche[4]);
    }
    else if (keys[heros[0].touche[4]] == 1) keyUp(heros[0].touche[4]);
    if (gamePads.buttons[1].pressed == true){
        keyDown(heros[0].touche[5]);
    }
    else if (keys[heros[0].touche[5]] == 1) keyUp(heros[0].touche[5]);

    if (gamePads.axes[0] > 0.5) move(1,0,0);
    else if (gamePads.axes[0] < -0.5) move(3,0,0);
    else if (gamePads.axes[1] > 0.5) move(2,0,0);
    else if (gamePads.axes[1] < -0.5) move(0,0,0);

    if (gamePads.axes[4] > 0) mouse[0] += gamePads.axes[4]*15;
    else if (gamePads.axes[4] < 0) mouse[0] += gamePads.axes[4]*15;
    if (gamePads.axes[3] > 0) mouse[1] += gamePads.axes[3]*15;
    else if (gamePads.axes[3] < 0) mouse[1] += gamePads.axes[3]*15;
}

function keyDown(keyCode){
    
    touchCount += 1;
    if (alerting == 1) {
        //disalert();
        if (figer == 1){
            disalert();
            figer = 0;
            heros[0].aura = "";
            heros[1].aura = "";
        }
        return;
    }
    //Crossed.keysPress(event.keyCode);
    if (keys[keyCode] != 1){
        if (keyCode == heros[0].touche[4] && onSea == 0) {disalert(); if (figer == 1){figer = 0; heros[0].aura = ""; heros[1].aura = "";} else{attack(0);}}
        else if (keyCode == heros[1].touche[4] && onSea == 0) {disalert(); if (figer == 1){figer = 0; heros[0].aura = ""; heros[1].aura = "";} else{attack(1);}}
        else if (keyCode == heros[0].touche[6] && onSea == 0) {disalert(); if (figer == 1){figer = 0; heros[0].aura = ""; heros[1].aura = "";} else{attack(0,1);}}
    }
    keys[keyCode] = 1;
}

function keyUp(keyCode){
    
    //touchCount += 1;
    keys[keyCode] = 0;
    if (onSea == 6){
        toucheHelp(keyCode);
        return;
    }
    if (alerting == 1) {
        //disalert();
        return;
    }
    if (keyCode == heros[0].touche[5] && onSea == 0) changeArme(0);
    else if (keyCode == heros[1].touche[5] && onSea == 0) changeArme(1);
    else if (keyCode == 77) {
        if (onSea == 1) onSea = 2;
        else if (onSea == 2) onSea = 1;
    }
    else if (keyCode == 73) {
        if (onSea == 0) goInvent();
        else if (onSea == 4) endInvent();
    }
    else if (keyCode == 65){
        if (edition == 1){
            helpPencil(editHand[editnumber]);
        }
        else if (onSea == 0){
            onSea = 6;
        }
        else if (onSea == 6){
            onSea = 0;
        }
    }
    if (cinematicos == 6){
        imgCinema[8] += 1;
    }
}
