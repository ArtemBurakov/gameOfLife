var cells = [];
var next_cells = [];
var limit = 100;
var ranning = 0;
var manually = 0;
var cell_size = 5;

init();

function gen(){
    if(!ranning){ return; }

    //generate next generation
    for (var x = 0; x < limit; x = x+1){
        next_cells[x] = [];

        for (var y = 0; y < limit; y = y+1){
            var lifes = 0;
            //calculate neighbours
            if (cells[x-1] && cells[x-1][y+1] && cells[x-1][y+1] == 1){
                lifes++;
            }
            if (cells[x][y+1] && cells[x][y+1] == 1){
                lifes++;
            }
            if (cells[x+1] && cells[x+1][y+1] && cells[x+1][y+1] == 1){
                lifes++;
            }
            if (cells[x+1] && cells[x+1][y] == 1){
                lifes++;
            }
            if (cells[x+1] && cells[x+1][y-1] && cells[x+1][y-1] == 1){
                lifes++;
            }
            if (cells[x][y-1] && cells[x][y-1] == 1){
                lifes++;
            }
            if (cells[x-1] && cells[x-1][y-1] && cells[x-1][y-1] == 1){
                lifes++;
            }
            if (cells[x-1] && cells[x-1][y] == 1){
                lifes++;
            }

            //life
            if (cells[x][y] == 1){
                if (lifes < 2 || lifes > 3){
                    next_cells[x][y] = 0;
                } else{
                    next_cells[x][y] = 1;
                }
            } else{
                //not alive
                if (lifes == 3){
                    next_cells[x][y] = 1;
                } else{
                    next_cells[x][y] = 0;
                }
            }
        }
    }

    //copy next generation to current
    cells = [];

    for (var i = 0; i < next_cells.length; i++)
        cells[i] = next_cells[i].slice();

    //clean copied next generation
    next_cells = [];

    print();

    setTimeout('gen()', 10);
}

function init(){

    cells = [];

    for (var x = 0; x < limit; x = x+1){
        cells[x] = [];

        for (var y = 0; y < limit; y = y+1){
            if (manually == 1){
                cells[x][y] = 0;
            } else{
                cells[x][y] = Math.round(Math.random());
            }
        }
    }
    print();
}

function print(){
    document.getElementById('field').innerHTML = '';

    for (var x = 0; x < limit; x = x+1){
        for (var y = 0; y < limit; y = y+1){
            var ele = document.createElement("div");
            ele.style.left = cell_size*(x+1)+'px';
            ele.style.top = cell_size*(y+1)+'px';
            ele.style.height = cell_size+'px';
            ele.style.width = cell_size+'px';
            ele.setAttribute("x", x);
            ele.setAttribute("y", y);
            ele.onclick = function(){
                this.style.background = 'black';
                cells[this.getAttribute("x")][this.getAttribute("y")] = 1;
            }

            if (cells[x][y] == 1){
                ele.style.background = 'black';
            } else{
                ele.style.background = 'white';
            }
            document.getElementById('field').appendChild(ele);
        }
    }
}
