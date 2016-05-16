function drawPot(f,i){
    var vx = f.n*((f.ox - f.x)/32);
    var vy = f.n*((f.oy - f.y)/32);
    Painter.img( ctx, f.x + vx, f.y + vy, f.alti, imgElement.pot );
    f.alti += f.g / 50;
    f.g -= 1;
    f.n += 1;
    if (f.n == 33) {
        var choix = "rubisVert";
        pots.splice(i,1);
        var truc = objNiveau[Math.round(f.oy)][Math.round(f.ox)][0];
        if (objNiveau[Math.round(f.oy)][Math.round(f.ox)].length == 1 && objNiveau[Math.round(f.oy)][Math.round(f.ox)][0] == "") objNiveau[Math.round(f.oy)][Math.round(f.ox)][0] = choix;
        else if (truc == "arbre0" | truc == "coffre0" | truc == "coffre1" | truc == "porte0" | truc == "bleu0" | truc == "rouge1" | truc == "switch0" | truc == "switch1" | truc == "house0" | truc == "house1" | truc == "house2" | truc == "house3" | truc == "house4" | truc == "pot"){
            
        }
        else objNiveau[Math.round(f.oy)][Math.round(f.ox)].splice(0,0,choix);
    }
}
