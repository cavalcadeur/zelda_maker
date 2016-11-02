function drawInvent(){
    ctx.drawImage(fondInvent,0,0,W,H);

    // inventaire defilable

    for (var i = 0; i < 5; i++){
        if (i < heros[0].invent.length) ctx.drawImage(imgMenu[heros[0].invent[i]],i*(W/15),W/30,W/30,W/30);
        else ctx.drawImage(imgMenu["blank"],i*(W/15),W/30,W/30,W/30);
    }
    for (var i = 0; i < 5; i++){
        if (i < heros[1].invent.length) ctx.drawImage(imgMenu[heros[1].invent[i]],W - W/30 - i*(W/15),W/30,W/30,W/30);
        else ctx.drawImage(imgMenu["blank"],W - W/30 - i*(W/15),W/30,W/30,W/30);
    }

    // inventaire prioritaire

    ctx.drawImage(imgMenu[heros[0].prim],W/2 - W/ 60,W/30,W/30,W/30);

    // inventaire interne

    for (var i = 0; i < 4; i++){
        for (var j = 0; j < 8; j++){
            if (i*8 + j < objInvent.length) ctx.drawImage(imgMenu[objInvent[j + 8*i]],W/4 + j*(W/15),H/2 + i*W/15,W/30,W/30);
            else ctx.drawImage(imgMenu["blank"],W/4 + j*(W/15),H/2 + i*W/15,W/30,W/30);
        }
    }

    ctx.drawImage(imgElement[useless[0]],mouse[1],mouse[0]);
}

function inventclick(x,y){
    if (y < W/10){
        if (x < W/3){
            var casa = (x-x%(W/15))/(W/15);
            if (useless[0] == "blank") {
                useless[0] = heros[0].invent[casa] + "";
                heros[0].invent[casa] = "blank";
            }
            else {
                if (heros[0].invent[casa] != "blank") objInvent.push(heros[0].invent[casa]);
                heros[0].invent[casa] = useless[0] + "";
                useless[0] = "blank";
            }
        }
        else if (x > W/3*2){
            var casa = 4 - (((x-W/3*2)-(x-W/3*2)%(W/15))/(W/15));
            if (useless[0] == "blank") {
                useless[0] = heros[1].invent[casa] + "";
                heros[1].invent[casa] = "blank";
            }
            else {
                if (heros[1].invent[casa] != "blank") objInvent.push(heros[1].invent[casa]);
                heros[1].invent[casa] = useless[0] + "";
                useless[0] = "blank";
            }
        }
        else {
            if (useless[0] == "blank") {
                useless[0] = heros[0].prim + "";
                heros[0].prim = "blank";
            }
            else {
                if (heros[0].prim != "blank") objInvent.push(heros[0].prim);
                heros[0].prim = useless[0] + "";
                useless[0] = "blank";
            }
        }
    }
    else{
        if (x > W/4 && x < W/4*3){
            x -= W/4;
            y -= H/2;
            var J = Math.round(x/(W/15));
            var I = Math.round(y/(W/15));
            var casa = J + 8*I;
            if (useless[0] == "blank") {
                if (objInvent[casa] != undefined && objInvent[casa] != "blank"){
                    useless[0] = objInvent[casa] + "";
                    objInvent.splice(casa,1);
                }
            }
            else {
                if (casa >= objInvent.length){
                    objInvent.push(useless[0]);
                    useless[0] = "blank";
                }
                else {
                    objInvent.splice(casa,0,useless[0]);
                    useless[0] = "blank";
                }
            }
        }
    }
}

function endInvent(){
    var suppr = [];
    var suppr2 = [];
    for (var i = 4;i>=0;i--){
        if (heros[0].invent[i] == "blank") suppr.push(i);
        if (heros[1].invent[i] == "blank") suppr2.push(i);
    }
    suppr.forEach(
        function (e){
            heros[0].invent.splice(e,1);
        }
    );
    suppr2.forEach(
        function (e){
            heros[1].invent.splice(e,1);
        }
    );
    if (heros[0].invent.length == 0) heros[0].invent[0] = "blank";
    if (heros[1].invent.length == 0) heros[1].invent[0] = "blank";
    if (useless[0] != "blank") {
        objInvent.push(useless[0]);
        useless[0] = "blank";
    }
    heros[0].objet = 0;
    heros[1].objet = 0;
    onSea = 0;
}

function goInvent(){
    onSea = 4;
    heros[0].invent.forEach(
        function(e,i){
            if (e == "batonF") heros[0].invent[i] = "baton";
        }
    );
    heros[1].invent.forEach(
        function(e,i){
            if (e == "batonF") heros[1].invent[i] = "baton";
        }
    );
    for (var i = heros[0].invent.length;i<5;i++){
        heros[0].invent.push("blank");
    }
    for (i = heros[1].invent.length;i<5;i++){
        heros[1].invent.push("blank");
    }
    heros[0].timerF = 0;
    heros[1].timerF = 0;
}
