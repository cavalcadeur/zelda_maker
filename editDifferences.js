function AEditInterface(){
    ctx.fillStyle = "rgb(0,39,43)";
    ctx.fillRect(0,0,150,H);
    ctx.fillRect(W-150,0,150,H);
    ctx.globalAlpha = 0.5;
    ctx.fillRect(150,0,5,H);
    ctx.fillRect(W-155,0,5,H);
    ctx.globalAlpha = 1;
    ctx.fillStyle = "rgb(0,81,89)";
    sideEdit.forEach(
        function(e,i){
            if (i + editNs[0]*10 == editNs[1]) ctx.fillRect((i%2) * 60 + 15,Math.floor(i/2)*80-5,60,80);
            ctx.drawImage(imgElement[e],(i%2) * 60 + 20,Math.floor(i/2)*80,50,70);
        }
    );
    for(var i = 0;i<10;i++){
        if (editNs[1] == 0){
            if (editObject[out][i + editNs[2]*10] != undefined){
                if (i + editNs[2]*10 == editNs[3]) ctx.fillRect((i%2) * 60 + 15 + W - 150,Math.floor(i/2)*80-5,60,80);
                ctx.drawImage(imgMonstre[editObject[out][i + editNs[2]*10][1]],(i%2) * 60 + 20 + W - 150,Math.floor(i/2)*80,50,70);
            }
        }
        else {
            if (editArray[sideEdit[editNs[1]]][i + editNs[2]*10] != undefined){
                if (i + editNs[2]*10 == editNs[3]) ctx.fillRect((i%2) * 60 + 15 + W - 150,Math.floor(i/2)*80-5,60,80);
                ctx.drawImage(imgElement[editArray[sideEdit[editNs[1]]][i + editNs[2]*10]],(i%2) * 60 + 20 + W - 150,Math.floor(i/2)*80,50,70);
            }
        }
    }

    if (editArray[sideEdit[editNs[1]]].length > 10){
        ctx.fillStyle = "rgb(250,250,250)";
        drawFleche(80 + W - 150,5*80+10,50);
        drawFleche(70 + W - 150,5*80+10,-50);
    }

    ctx.drawImage(imgElement["save"],0,H-70);

    if (editPlate == 1 || editPlate == 2){
        ctx.beginPath();
        ctx.arc(mouse[1],mouse[0],15,-Math.PI,Math.PI);
        ctx.stroke();
    }
}

function AInterface(){
    ctx.drawImage(imgMenu[heros[0].invent[heros[0].objet]],W-50,0);
    if (heros[0].invent[heros[0].objet] == "seeds"){
        ctx.fillStyle = "rgb(250,250,250)";
        ctx.font = "20px purisa";
        ctx.textAlign = "right";
        ctx.fillText(heros[0].seedCount,W-2,40);
        //ctx.strokeText(heros[0].seedCount,W-5,40);
    }
    ctx.drawImage(imgMenu[heros[0].prim],W-105,0);
    if (heros[0].prim == "seeds"){
        ctx.fillStyle = "rgb(250,250,250)";
        ctx.font = "20px purisa";
        ctx.textAlign = "right";
        ctx.fillText(heros[0].seedCount,W-57,40);
        //ctx.strokeText(heros[0].seedCount,W-5,40);
    }
    ctx.drawImage(imgMenu[heros[1].invent[heros[1].objet]],W-50,55);
    if (heros[1].invent[heros[1].objet] == "seeds"){
        ctx.fillStyle = "rgb(250,250,250)";
        ctx.font = "20px purisa";
        ctx.textAlign = "right";
        ctx.fillText(heros[0].seedCount,W-2,95);
        //ctx.strokeText(heros[0].seedCount,W-5,40);
    }
    heros.forEach(
        function(h,index){
            for (var i = 0;i < h.vieTotale;i++){
                if (i < 10) ctx.drawImage(imgMenu.coeurVide,5 + i*15,5 + index*35);
                else ctx.drawImage(imgMenu.coeurVide,5 + (i-14)*15,15 + index*35);
                if (h.vie > i){
                    if (h.vie - 0.5 > i){
                        if (i < 10) ctx.drawImage(imgMenu.coeur1,5 + i*15,5 + index*35);
                        else ctx.drawImage(imgMenu.coeur1,5 + (i-14)*15,15 + index*35);
                    }
                    else {
                        if (i < 10) ctx.drawImage(imgMenu.coeur05,5 + i*15,5 + index*35);
                        else ctx.drawImage(imgMenu.coeur05,5 + (i-14)*15,15 + index*35);
                    }
                }
            }
        }
    );

}

function drawFleche(x,y,s){
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x+s,y+Math.abs(s/2));
    ctx.lineTo(x,y+Math.abs(s));
    ctx.closePath();
    ctx.fill();
}

function clickEdit(x,y,b){
    if (x < 150){
        if (y > H-70) exportFileAsFuck();
        else if (y < 400){
            editNs[1] = Math.floor(y / 80)*2 + Math.floor(x/75) + editNs[0]*10;
            editNs[2] = 0;
            editNs[3] = 0;
        }
    }
    else if (x > W-150){
        if (y < 400){
            var truc = Math.floor(y / 80)*2 + Math.floor((x-W+150)/75) + editNs[2]*10;
            if (editArray[sideEdit[editNs[1]]][truc] != undefined) editNs[3] = truc;
        }
        else if (y < 600){
            if (x > W-75){
                editNs[2] = (editNs[2]+1)%Math.ceil(editArray[sideEdit[editNs[1]]].length/10);
            }
            else {
                editNs[2] -= 1;
                if (editNs[2] <= -1) editNs[2] = Math.ceil(editArray[sideEdit[editNs[1]]].length/10)-1;
            }
        }
    }
    else {
        if (b == 0) pencil(x,y,editArray[sideEdit[editNs[1]]][editNs[3]]);
        else {
            if (editArray[sideEdit[editNs[1]]][editNs[3]] == "sky") pencil(x,y,-1);
            else if (editArray[sideEdit[editNs[1]]][editNs[3]] == "sky2") pencil(x,y,-0.2);
            else pencil(x,y,"delete");
        }
        //if (b == 0) pencil(x,y,1);
        //else pencil(x,y,-1);
    }
}

function exportFileAsFuck(){
    var result = "";
   
    result += "Niveau Maker's Pencil " + goto + " out="+out + " :\n \n";
    
    var nnn = niveau;
    var ooo = objNiveau;
    var eee = ennemis;
    
    var body = JSON.stringify(nnn);
    result += body + "\n \n";
    body = JSON.stringify(ooo);
    result += body + "\n \n";
    body = JSON.stringify(eee);
    result += body + "\n \n";
    
    markedLevels.forEach(
        function (ee){
            if (ee[0] != goto){
                if (ee[1] == 1){
                    var llevel = iles[ee[0]];
                }
                else {
                    var llevel = interieurs[ee[0]];
                }
                var nnn = llevel.alti;
                var ooo = llevel.obj;
                var eee = llevel.ennemis;
                result += "Niveau Maker's Pencil " + ee[0] + " out=" + ee[1] + " : \n \n";
                var body = JSON.stringify(nnn);
                result += body + "\n \n";
                body = JSON.stringify(ooo);
                result += body + "\n \n";
                body = JSON.stringify(eee);
                result += body + "\n \n";
            }
        }
    );

    SaveAs(new Blob([result]),"ile"+rnd(78000)+".txt");
}
