$(document).ready(function(){
    var world = [
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        [1,0,1,2,2,2,1,2,2,2,1,2,2,2,2,2,2,2,2,1],
        [1,2,2,2,1,2,2,2,1,2,1,1,1,1,1,2,0,1,1,1],
        [1,1,1,2,1,1,1,2,2,2,1,2,2,2,2,2,0,2,2,1],
        [1,2,0,0,2,1,1,1,2,1,1,2,2,2,1,1,1,1,1,1],
        [1,2,1,1,2,2,2,2,2,1,1,2,1,2,2,2,2,2,2,1],
        [1,2,2,1,2,1,1,0,2,2,1,2,1,1,1,2,2,0,2,1],
        [1,1,2,1,2,2,2,2,1,2,1,1,2,2,2,2,2,0,2,1],
        [1,2,0,1,2,2,2,2,1,2,2,2,2,2,2,1,1,1,1,1],
        [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,0,1,1],
        [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    ];
    //console.log(world.length);
    var pacman = {
        x: 1,
        y: 1,
    };
    var ghost = {
        x: 8,
        y: 9,
    }
    var score = 0;
    var gameStart = 0;
    var gameEnd = 0;
    function displayWorld(){
        var output = "";
        for(var a =0; a<world.length; a +=1)
        {
            output += '<div class="row">\n';
            for(var i =0; i<world[a].length; i += 1)
            {
                if(world[a][i] == 1)
                {
                    output += '\t<div class="wall"></div>\n';
                } else if(world[a][i] == 2){
                    output += '\t<div class="coin"></div>\n';
                } else if (world[a][i] == 0) {
                    output += '\t<div class="empty"></div>\n';
                } else if (world[a][i] == 4)
                {
                    output += '\t<div class="cherry"></div>\n';
                } else if (world[a][i] == 3)
                {
                    output += '\t<div class="ghost"></div>\n';
                }
            }
            output += "</div>\n";
        }
        //console.log(output);
        document.getElementById('world').innerHTML = output;
    };
        setInterval(
            function() {
                var xCord = Math.floor((Math.random() * world.length));
                var yCord = Math.floor((Math.random() * world[xCord].length));
                if(world[yCord][xCord] !== 1)
                {
                    world[yCord][xCord] = 4;
                }
            }, 3000
        );
    function moveGhost(){
                var num = Math.floor(Math.random() * 4) + 1 ;
                if(num === 1)
                {
                    if(world[ghost.y+1][ghost.x] !==1)
                    {
                        ghost.y++;
                    }

                } else if (num === 2)
                {
                    if(world[ghost.y-1][ghost.x] !== 1)
                    {
                        ghost.y--;
                    }
                }
                else if (num === 3)
                {
                    if(world[ghost.y][ghost.x+1] !== 1)
                    {
                        ghost.x++;
                    }
                }
                else if (num === 4)
                {
                    if(world[ghost.y][ghost.x-1] !== 1)
                    {
                        ghost.x--;
                    }
                }
                displayGhost();
                setTimeout(moveGhost, 500);
    };

    document.onkeydown = function(e){
        if(gameStart !== 2) {
            if(e.keyCode == 38)// up = 38
            {
                if(world[pacman.y-1][pacman.x] !== 1)
                {
                    pacman.y--;
                }
                $("#pacman").css("transform", "rotate(270deg)");
            }
            else if (e.keyCode == 40) // down = 40
            {
                if(world[pacman.y+1][pacman.x] !== 1)
                {
                    pacman.y++;
                }
                $("#pacman").css("transform", "rotate(90deg)");
            }
            else if (e.keyCode == 37) // left = 37
            {
                if(world[pacman.y][pacman.x-1] !== 1)
                {
                    pacman.x--;
                }
                $("#pacman").css("transform", "rotate(180deg) scaleY(-1)");
            }
            else if (e.keyCode == 39) // right = 39
            {
                if(world[pacman.y][pacman.x+1] !== 1)
                {
                    pacman.x++;
                }
                $("#pacman").css("transform", "rotate(0deg)");
            }

            displayWorld();
            displayPacman();
            displayScore();

        }
    };

    function displayScore(){
            if(world[pacman.y][pacman.x] === 2)
            {
                world[pacman.y][pacman.x] = 0;
                score += 10;

            } else if (world[pacman.y][pacman.x] === 4)
            {
                world[pacman.y][pacman.x] = 0;
                score += 40;
            } else if (ghost.y === pacman.y && ghost.x === pacman.x) {
                gameStart = 2;
                alert('Game Over!');
                $('#score-board').append("<h1>Game Over!!!</h1>");
            }
            $('#score-board p').html(score);

    };


    function displayPacman(){
        document.getElementById('pacman').style.top = pacman.y*24+"px";
        document.getElementById('pacman').style.left = pacman.x*24+"px";
    }
    function displayGhost(){
        document.getElementById('ghost').style.top = ghost.y*24+"px";
        document.getElementById('ghost').style.left = ghost.x*24+"px";
    }
    displayWorld();
    displayPacman();
    displayGhost();
    displayScore();
    moveGhost();



});
