var Crossed = function () {
    var menu = 0;
    var passWord = [0,6,6,6,0];
    var tryWord = [0,0,0,0,0];
    var nWord = 0;
    var tWord = 0;
    var ecart,taille,marge;
    function drawNumber(x,y,n,ctx){
	ctx.fillStyle = "rgb(200,200,200)";
        ctx.strokeStyle = "rgb(200,200,200)";
        ctx.lineWidth = 5;
	if (n == 1 | n == 6){ 
            ctx.beginPath();
            ctx.moveTo(x + taille/4,y + taille/4);
            ctx.lineTo(x + taille/4*3,y + taille/4);
            ctx.lineTo(x + taille/4*3,y + taille/4*3);
            ctx.lineTo(x + taille/4,y + taille/4*3);
            ctx.lineTo(x + taille/4,y + taille/4);
        }
        else if (n == 2 | n == 7){ 
            ctx.beginPath();
            ctx.moveTo(x + taille/2,y + taille/4);
            ctx.lineTo(x + taille/4*3,y + taille/4*3);
            ctx.lineTo(x + taille/4,y + taille/4*3);
            ctx.lineTo(x + taille/2,y + taille/4);
        }
        else if (n == 0 | n == 5){ 
            ctx.beginPath();
            ctx.arc(x + taille/2,y + taille/2,taille / 4,-Math.PI,Math.PI);
        }
        else if (n == 3 | n == 8){ 
            ctx.beginPath();
            ctx.arc(x + taille/2,y + taille/2,taille / 4,0,Math.PI);
        }
        else if (n == 4 | n == 9){ 
            ctx.beginPath();
            ctx.moveTo(x + taille/2,y + taille/6);
            ctx.lineTo(x + taille/4*3,y + taille/3);
            ctx.lineTo(x + taille/4*3,y + taille/3*2);
            ctx.lineTo(x + taille/2,y + taille/6*5);
            ctx.lineTo(x + taille/4,y + taille/3*2);
            ctx.lineTo(x + taille/4,y + taille/3);
        }
        ctx.closePath();
        if (n < 5) ctx.stroke();
        else ctx.fill();
    }

    function contenu(){
        var N = tryWord[4] + tryWord[3]*10 + tryWord[2]*100 + tryWord[1]*1000 + tryWord[0]*10000;
        if (N == 25652) selection("martheo1");
        else if (N == 19783) selection("maker1");
    }

    return {
	drawMenu: function( ctx , W, H ) {
	    ctx.globalAlpha = 0.5;
	    ctx.fillStyle = "rgb(200,200,200)";
	    ctx.fillRect(0,0,W,H);
	    passWord.forEach(
		function(e,i){
		    ctx.fillStyle = "rgb(0,0,0)";
		    ctx.strokeStyle = "rgb(250,250,250)";
		    ctx.lineWidth = 10;
		    ctx.fillRect(ecart*(i+1) + taille*i,marge,taille,taille);
		    if (i < nWord) drawNumber(ecart*(i+1) + taille*i,marge,e,ctx);
		}
	    );
	    tryWord.forEach(
		function(e,i){
		    ctx.fillStyle = "rgb(0,0,0)";
		    ctx.strokeStyle = "rgb(250,250,250)";
		    ctx.lineWidth = 10;
		    ctx.fillRect(ecart*(i+1) + taille*i,marge*5 + taille,taille,taille);
		    if (i == tWord) ctx.strokeRect(ecart*(i+1) + taille*i,marge*5 + taille,taille,taille);
		    drawNumber(ecart*(i+1) + taille*i,marge*5 + taille,e,ctx);
		}
	    );
	    ctx.globalAlpha = 1;
	    animation();
	},

	keyCrossed: function( ) {
	    if (menu == 0) menu = 1;
	    else {menu = 0;contenu();}	    
	},

	testCrossed: function( ) {
	    if (menu == 0) return 0;
	    else return 1;	    
	},

	init: function( W, H ) {
	    ecart = W/18;
	    taille = (W - ecart*6) / 5;
	    marge = (H - taille*2) / 6;
	},

        deplacement: function(n){
            if (n == 2) tryWord[tWord] = (tryWord[tWord]+1)%10;
            else if (n == -2) tryWord[tWord] = (tryWord[tWord]-1)%10;
            else if (n == 1) tWord += 1;
            else if (n == -1) tWord -= 1;
            if (tryWord[tWord] == -1) tryWord[tWord] = 9;
            if (tWord >= 5) tWord = 4;
            else if (tWord < 0) tWord = 0;
        },

        improve: function(){
            if (nWord < 5) nWord += 1;

        },
        
        keysPress: function(keyCode){
            if (keyCode == 67) Crossed.keyCrossed();
           
            if (menu == 1){
                if (keyCode == 39) Crossed.deplacement(1);
                else if (keyCode == 37) Crossed.deplacement(-1);
                else if (keyCode == 38) Crossed.deplacement(2);
                else if (keyCode == 40) Crossed.deplacement(-2);
            }

        }
    };
}();
