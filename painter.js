var Painter = function() {
    var scrollX = 100;
    var scrollY = 130;
    var cellX = 50;  // Largeur d'une cellule.
    var cellY = 35;  // Profondeur.
    var cellZ = 30;
    var cellS = 10;  // Décalage.
    var walls;
    var wallsVert;

    function toX( x, y, z ) {
        return Math.floor( scrollX + x * cellX - y * cellS );
    }

    function toY( x, y, z ) {
        return Math.floor( scrollY + y * cellY - z * cellZ);
    }

    return {
        niveau: function( level ) {
			editNumber = 1;
            var rows = level.length;
            var cols = level[0].length;
            walls = [];
            wallsVert = [];
            level.forEach(function( row, y ) {
                var line = [];
                walls.push( line );
                var lineVert = [];
                wallsVert.push( lineVert );
                row.forEach(function ( z, x ) {
                    var v = 0;
                    if( y == 0 || level[y - 1][x] < z ) {
                        v += 1;
                    }
                    if( x == cols - 1 || level[y][x + 1] < z ) {
                        v += 2;
                    }
                    if( y == rows - 1 || level[y + 1][x] < z ) {
                        v += 4;
                    }
                    if( x == 0 || level[y][x - 1] < z ) {
                        v += 8;
                    }
                    line.push( v );

                    if( z < 0 ) {
                        // C'est la mer.
                        lineVert.push( [0,0,0] );
                        return;
                    }
                    var lineA = 0;
                    var lineB = 0;
                    var lineC = 0;

                    if( x == 0 ) lineA = z + 1;
                    else if( level[y][x - 1] < z ) {
                        lineA = z - level[y][x - 1];
                    }
                    lineC = y == 0 ? z + 1 : 0;
                    if( y > 0 && level[y - 1][x] < z ) {
                        lineC = z - level[y - 1][x];
                    }
                    if( x < cols - 1 ) {
                        lineC = Math.min( lineC, Math.max( 0, z - level[y][x + 1] ) );
                    }
                    lineB = z + 1;
                    if( x < cols - 1 && level[y][x + 1] <= z ) {
                        lineB = z - level[y][x + 1];
                    }
                    else if(x < cols - 1 && level[y][x + 1] >= z) lineB = 0;
                    if( y < rows - 1 ) {
                        lineB = Math.min( lineB, z - level[y + 1][x] );
                    }

                    lineVert.push( [lineA, lineB, lineC] );
                });
            });

            //console.info("[painter] wallsVert=...", wallsVert);
        },

        scroll: function( x, y ) {
            scrollX = x;
            scrollY = y;
        },

        img: function( ctx, x, y, z, img ) {
            if( !img ) return;

            var X = toX( x, y, z ) + cellS / 2 + (cellX - img.width) / 2;
            var Y = toY( x, y, z ) - img.height - cellY / 2;

            ctx.drawImage( img, X, Y );
        },

        imgBoomerang: function( ctx, x, y, z, r, img ) {
            if( !img ) return;

            var X = toX( x, y, z ) + cellS / 2 + (cellX - img.width) / 2;
            var Y = toY( x, y, z ) - img.height - cellY / 2;

            ctx.save();
            ctx.translate(X+12,Y);
            ctx.rotate(r);
            ctx.drawImage(img,-13,-13);
            ctx.restore();
        },
        imgScale: function( ctx, x, y, z, s, img ) {
            if( !img ) return;

            var X = toX( x, y, z ) + cellS / 2 + (cellX - img.width) / 2;
            var Y = toY( x, y, z ) - img.height - cellY / 2;

            ctx.save();
            ctx.translate(X+12,Y);
            ctx.scale(s,1);
            ctx.drawImage(img,-img.width/2,-img.height/2);
            ctx.restore();
        },

        cell: function( ctx, x, y, z ) {
     
            //-----------------------------------------------------------------
            
            if( z > -1 ) {
                var X = toX( x, y, z );
                var Y = toY( x, y, z );
                // Partie frontale (verticale)
                if  (y == niveau.length - 1 || z > niveau[y+1][x]){
                    ctx.fillStyle = colorSet[out][0];
                    ctx.fillRect( X, Y, cellX, cellZ * (z + 1) );
                }
                // Partie latérale (verticale)
                if  (x == niveau[y].length - 1 || z > niveau[y][x+1]){
                    ctx.fillStyle = colorSet[out][1];
                    ctx.beginPath();
                    ctx.moveTo( X + cellX, Y );
                    ctx.lineTo( X + cellX + cellS, Y - cellY );
                    ctx.lineTo( X + cellX + cellS, Y - cellY + (z + 1) * cellZ);
                    ctx.lineTo( X + cellX, Y + (z + 1) * cellZ );
                    ctx.closePath();
                    ctx.fill();
                }

                // Partie horizontale.
                ctx.fillStyle = "rgb("+(colorSet[out][2][0]+z*colorSet[out][2][3])+","+(colorSet[out][2][1]+z*colorSet[out][2][4])+","+(colorSet[out][2][2]+z*colorSet[out][2][5])+")";
                ctx.beginPath();
                ctx.moveTo( X, Y );
                ctx.lineTo( X + cellX + 1, Y );
                ctx.lineTo( X + cellX + 1 + cellS, Y - cellY );
                ctx.lineTo( X + cellS, Y - cellY );
                ctx.closePath();
                ctx.fill();

                ctx.strokeStyle = "#000";
                ctx.lineWidth = 2;
                // Tracer les lignes des plateaux.
                var wall = walls[y][x];
                if( wall & 1 ) {
                    ctx.beginPath();
                    ctx.moveTo( X + cellS, Y - cellY );
                    ctx.lineTo( X + cellS + cellX, Y - cellY );
                    ctx.stroke();
                }
                if( wall & 2 ) {
                    ctx.beginPath();
                    ctx.moveTo( X + cellX, Y );
                    ctx.lineTo( X + cellX + cellS, Y - cellY );
                    ctx.stroke();
                }
                if( wall & 4 ) {
                    ctx.beginPath();
                    ctx.moveTo( X, Y );
                    ctx.lineTo( X + cellX, Y );
                    ctx.stroke();
                }
                if( wall & 8 ) {
                    ctx.beginPath();
                    ctx.moveTo( X, Y );
                    ctx.lineTo( X + cellS, Y - cellY );
                    ctx.stroke();
                }
                // Tracer les lignes verticales.
                wall = wallsVert[y][x];
                if( wall[0] > 0 ) {
                    ctx.beginPath();
                    ctx.moveTo( X, Y );
                    ctx.lineTo( X, Y + cellZ * wall[0] );
                    ctx.stroke();
                }
                if( wall[1] > 0 ) {
                    ctx.beginPath();
                    ctx.moveTo( X + cellX, Y );
                    ctx.lineTo( X + cellX, Y + cellZ * wall[1] );
                    ctx.stroke();
                }
                if( wall[2] > 0 ) {
                    ctx.beginPath();
                    ctx.moveTo( X + cellX + cellS, Y - cellY);
                    ctx.lineTo( X + cellX + cellS, Y + cellZ * wall[2] - cellY);
                    ctx.stroke();
                }
            }
        },
        case: function(level,x,y){
            var result = ["ah","ah"];
            level.forEach(
                function(e,Y){
                    e.forEach(
                        function(f,X){
                            if (toY(X,Y,f) > y && toY(X,Y,f) - cellY < y){
                                if (toX(X,Y,f) < x && toX(X,Y,f) + cellX + cellS > x) result = [Y,X];
                            }
                        }
                    );
                }
            );
            return result;
        },
        scrolling: function(){
            var x = toX(heros[0].x+heros[0].vx/50,heros[0].y+heros[0].vy/50,heros[0].z);
            var y = toY(heros[0].x+heros[0].vx/50,heros[0].y+heros[0].vy/50,heros[0].z);
            if (x > W-100) scrollX = W-100-(x-scrollX);
            else if (x < 0) scrollX = -(x-scrollX);
            if (y > H-70) scrollY = H-70-(y-scrollY);
            else if (y < 0) scrollY = -(y-scrollY);
        }
    };
}();
