var background = function(ctx) {

    var waves = [];

    function bnothing(){

    }

    function bfa(){
        waves.forEach(
            function(e){
                waveNiveau(e);
            }
        );
    }

    function bfb(){
        waves.forEach(
            function(e){
                lavaNiveau(e);
            }
        );
        waves.forEach(
            function(e){
                lavaNiveauUp(e);
            }
        );
    }

    function bfc(){
        waves.forEach(
            function(e,n){
                if (n < 7) rondNiveau(e);
            }
        );
    }

    function bfd(){
        waves.forEach(
            function(e,n){
                starNiveau(e);
            }
        );
    }

    function bfe(){
        waves.forEach(
            function(e,n){
                if (n < 5) cloudNiveau(e,n);
            }
        );
    }

    function bff(){
        waves.forEach(
            function(e,n){
                if (n < 10) leafNiveau(e,n);
            }
        );
    }

    function bfg(){
        waves.forEach(
            function(e,n){
                crystalNiveau(e,n);
            }
        );
    }

    function waveNiveau(e){
        ctx.fillStyle = "rgb(180,180,215)";
        if (e[2] < 100 && e[2] > 0){
            ctx.beginPath();
            ctx.moveTo(e[0] - 50,e[1] - e[2] / 10);
            ctx.lineTo(e[0],e[1] - 5 - e[2] / 5 - e[2] / 10);
            ctx.lineTo(e[0] + 50,e[1] - e[2] / 10);
            ctx.lineTo(e[0],e[1] - 5 - e[2] / 10 - e[2] / 10);
            ctx.closePath();
            ctx.fill();
        }
        else if (e[2] >= 100){
            ctx.beginPath();
            ctx.moveTo(e[0] - 50,e[1] - e[2] / 10);
            ctx.lineTo(e[0],e[1] - 5 - (200-e[2]) / 5 - e[2] / 10);
            ctx.lineTo(e[0] + 50,e[1] - e[2] / 10);
            ctx.lineTo(e[0],e[1] - 5 - (200-e[2]) / 10 - e[2] / 10);
            ctx.closePath();
            ctx.fill();
        }
        if (e[2] >= 200) {
            e[2] = -rnd(300)-100;
            e[0] = rnd(W);
            e[1] = rnd(H);
        }
        e[2] += 1;
    }

    function crystalNiveau(e,i){

    }

    function cloudNiveau(e,i){
        var size = [1.1,1,1.5,2.5,1,1.1,1,1,1];
        var co = size[i];
        ctx.fillStyle = "rgb(160,160,220)";
        ctx.strokeStyle = "rgb(220,220,240)";
        ctx.fillRect(e[0]-60*co,e[1]-20*co,80*co,40*co);
        ctx.fillRect(e[0]+10*co,e[1]-8*co,70*co,40*co);
        ctx.fillRect(e[0]-10*co,e[1]-40*co,75*co,40*co);
        ctx.fillRect(e[0],e[1]-55*co,30*co,22*co);
        ctx.strokeRect(e[0]-60*co,e[1]-20*co,80*co,40*co);
        ctx.strokeRect(e[0]+10*co,e[1]-8*co,70*co,40*co);
        ctx.strokeRect(e[0]-10*co,e[1]-40*co,75*co,40*co);
        ctx.strokeRect(e[0],e[1]-55*co,30*co,22*co);
        e[1] += (Math.sin(e[2]/50) - Math.sin((e[2]-1)/50))*4;
        e[0] -= 0.1;
        e[2] = (e[2]+1)%200;
        if (e[0] < -100){
            e[0] = W + 100;
            e[1] = rnd(H);

        }
    }

    function drawLeaf(){
        ctx.beginPath();
        ctx.moveTo(-10,0);
        ctx.lineTo(0,-20);
        ctx.lineTo(10,0);
        ctx.lineTo(0,10);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = colors[0];
        ctx.beginPath();
        ctx.moveTo(-5,0);
        ctx.lineTo(0,-12);
        ctx.lineTo(5,0);
        ctx.lineTo(0,5);
        ctx.closePath();
        ctx.fill();
    }

    function leafNiveau(e,i){
        var size = ["rgb(191,0,0)","rgb(29,164,28)","rgb(93,86,206)","rgb(38,147,142)","rgb(253,244,0)","rgb(27,101,82)","rgb(0,209,239)","rgb(12,113,44)","rgb(97,20,66)","rgb(253,244,0)"];
        var co = size[i];
        ctx.fillStyle = co;
        //e[1] += (Math.sin(e[2]/50) - Math.sin((e[2]-1)/50))*20;
        if (e[3] > -1){
            var angle = e[3]/60*Math.PI;
            ctx.save();
            ctx.translate(e[0] + Math.sin(angle)*20,e[1] + Math.sin(e[2]/100*Math.PI)*10 + Math.cos(angle)*20 - 20);
            ctx.rotate(e[2]/200*Math.PI + angle);
            drawLeaf();
            ctx.restore();
            e[3] += 1;
            if (e[3] >= 120){
                e[3] = -1;
            }
        }
        else {
            e[0] += 1;
            ctx.save();
            ctx.translate(e[0],e[1] + Math.sin(e[2]/100*Math.PI)*10);
            ctx.rotate(e[2]/200*Math.PI);
            drawLeaf();
            ctx.restore();
            e[2] = (e[2]+1)%400;
            if (rnd(1000) == 1){
                e[3] = 0;
            }
        }
        if (e[0] > W+50){
            e[0] = -50;
            e[1] = rnd(H);
        }
    }

    function lavaNiveau(e){
        ctx.fillStyle = "rgb(225,115,36)";
        if (e[2] < 100 && e[2] > 0){
            ctx.beginPath();
            ctx.ellipse(e[0],e[1],e[2]*1.5,e[2]*0.5,0,- Math.PI,Math.PI);
            ctx.fill();
        }
        else if (e[2] < 200 && e[2] > 0){
            ctx.beginPath();
            ctx.ellipse(e[0],e[1],(200 - e[2])*1.5,(200 - e[2])*0.5,0,- Math.PI,Math.PI);
            ctx.fill();
        }
    }

    function lavaNiveauUp(e){
        ctx.fillStyle = "rgb(223,213,45)";
        if (e[2] < 100 && e[2] > 0){
            ctx.beginPath();
            ctx.ellipse(e[0],e[1],e[2],e[2]*0.25,0,- Math.PI,Math.PI);
            ctx.fill();
        }
        else if (e[2] < 200 && e[2] > 0){
            ctx.beginPath();
            ctx.ellipse(e[0],e[1],(200 - e[2]),(200 - e[2])*0.25,0,- Math.PI,Math.PI);
            ctx.fill();
        }
        if (e[2] >= 200) {
            e[2] = -rnd(300);
            e[0] = rnd(W);
            e[1] = rnd(H);
        }
        e[2] += 0.3;
    }

    function rondNiveau(e){
        ctx.strokeStyle = "rgb(32,49,154)";
        if (e[2] >= 0 && e[2] < 150) ctx.globalAlpha = 1 - e[2]/152;
        if (e[2] < 150){
            for (var i = 0;i < 4;i ++){
                if (e[2] > 30*i){
                    ctx.beginPath();
                    ctx.ellipse(e[0],e[1],e[2]-30*i,(e[2]-30*i)*0.25,0,- Math.PI,Math.PI);
                    ctx.stroke();
                }
            }
        }
        ctx.globalAlpha = 1;
        if (e[2] >= 200) {
            e[2] = -rnd(300);
            e[0] = rnd(W);
            e[1] = rnd(H);
        }
        e[2] += 1;
    }

    function starNiveau(e){
        ctx.fillStyle = "rgb(255,255,250)";
        if (e[2]%3 != 1) ctx.fillRect(e[0],e[1],3,3);
        else{
            ctx.beginPath();
            ctx.moveTo(e[0] - 2,e[1] - 2);
            ctx.lineTo(e[0],e[1] - 10);
            ctx.lineTo(e[0] + 2,e[1] - 2);
            ctx.lineTo(e[0] + 10,e[1]);
            ctx.lineTo(e[0] + 2,e[1] + 2);
            ctx.lineTo(e[0],e[1] + 10);
            ctx.lineTo(e[0] - 2,e[1] + 2);
            ctx.lineTo(e[0] - 10,e[1]);
            ctx.closePath();
            ctx.fill();
        }
    }


    function waveMapNiveau(e){
        ctx.fillStyle = "rgb(180,180,215)";
        if (e[2] < 100 && e[2] > 0){
            ctx.beginPath();
            ctx.moveTo(e[0] - 25,e[1] - e[2] / 20);
            ctx.lineTo(e[0],e[1] - 5 - e[2] / 10 - e[2] / 20);
            ctx.lineTo(e[0] + 25,e[1] - e[2] / 20);
            ctx.lineTo(e[0],e[1] - 5 - e[2] / 20 - e[2] / 20);
            ctx.closePath();
            ctx.fill();
        }
        else if (e[2] >= 100){
            ctx.beginPath();
            ctx.moveTo(e[0] - 25,e[1] - e[2] / 20);
            ctx.lineTo(e[0],e[1] - 5 - (200-e[2]) / 10 - e[2] / 20);
            ctx.lineTo(e[0] + 25,e[1] - e[2] / 20);
            ctx.lineTo(e[0],e[1] - 5 - (200-e[2]) / 20 - e[2] / 20);
            ctx.closePath();
            ctx.fill();
        }
        if (e[2] == 200) {
            e[2] = -rnd(200);
            e[0] = rnd(W);
            e[1] = rnd(H);
        }
        e[2] += 1;
    }

    return{

        backGroundMap: function(){
            waves.forEach(
                function(e){
                    waveMapNiveau(e);
                }
            );
        },

        wavesPlenish: function(){
            for(var i = 0;i < 17;i ++){
                waves.push([rnd(W),rnd(H),-rnd(200) + 100,-1]);
            }
        },
        pushWave: function(x,y,W,H){
            waves.forEach(
                function(e){
                    e[1] = (e[1] + x + H)%H;
                    e[0] = (e[0] + y + W)%W;
                }
            );
        },
        nothing: bnothing,
        fa: bfa,
        fb: bfb,
        fc: bfc,
        fd: bfd,
        fe: bfe,
        ff: bff,
        fg: bfg
    };
};
