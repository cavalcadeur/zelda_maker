function setColors(oo,hour){
    colors[0] = "rgb(" + Math.round(colorSet[oo][3][0]) + "," + Math.round(colorSet[oo][3][1]) + "," + Math.round(colorSet[oo][3][2]) + ")";
    colors[1] = "rgb(" + Math.round(colorSet[oo][0][0]) + "," + Math.round(colorSet[oo][0][1]) + "," + Math.round(colorSet[oo][0][2]) + ")";
    colors[2] = colorSet[oo][1];
    colors[3] = colorSet[oo][2];
}
