function AEditInterface(){
    sideSelect = -1;
    sideEdit.forEach(
        function(el,i){
            var yel = i*(H/(4*sideEdit.length)*3) + H/8;
            var epel = H/(4*sideEdit.length)*3;
            var hautel = epel/8*7;
            if (mouse[1] > W - epel){
                if (mouse[0] > yel && mouse[0] < yel + hautel){
                    epel = epel * 1.3;
                    sideSelect = i;
                }
            }
            ctx.fillStyle = "rgb(20,178,139)";
            ctx.fillRect(W-epel,yel,epel*1.5,hautel);
            ctx.drawImage(imgElement[el],W-epel,yel,(imgElement[el].width * hautel) / imgElement[el].height,hautel);
        }
    );
    if (editHand[editnumber] != "rien"){
        if (editM == 0 || editHand[editnumber] == "return") ctx.drawImage(imgElement[editHand[editnumber]],mouse[1],mouse[0]- imgElement[editHand[editnumber]].height / 2);
        else ctx.drawImage(imgMonstre[editHand[editnumber]+2],mouse[1],mouse[0]- imgMonstre[editHand[editnumber]+2].height / 2);
        if (editHand[editnumber] == "tele"){
            objNiveau.forEach(
                function (ee,YY){
                    ee.forEach(
                        function (fe,XX){
                            if (fe[0] == "teleport"){
                                ctx.globalAlpha = 0.1;
                                Painter.cell( ctx, XX, YY, niveau[YY][XX] ,1);
                                ctx.globalAlpha = 1;

                            }
                        }
                    );
                }
            );
        }
    }
    
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
