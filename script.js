
var selected = null;
class Cell {
    constructor(i, j, td) {
        this.i = i;
        this.j = j;
        this.td = td;
        this.value = 0;
        this.options = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        td.addEventListener("mouseenter", function(){
            for(let i2 = 0; i2 < 9; i2++){
                board[i2][j].td.style.backgroundColor = "#888888";
            }
            for(let j2 = 0; j2 < 9; j2++){
                board[i][j2].td.style.backgroundColor = "#888888";
            }
            td.style.backgroundColor = "#544f80";
            update();   
        });
        td.addEventListener("mouseleave", function(){
            for(let i2 = 0; i2 < 9; i2++){
                board[i2][j].td.style.backgroundColor = "";
            }
            for(let j2 = 0; j2 < 9; j2++){
                board[i][j2].td.style.backgroundColor = "";
            }
            td.style.backgroundColor = "";
            update();
        });
        td.addEventListener("click", () => {
            if(selected){
                selected.td.style.backgroundColor = "";
                if (selected == this){
                    selected = null;
                    return;
                }
            }
            selected = this;
            update();
        });
    }

    show() {
        if (this.value == 0) {
            this.td.innerHTML = `
            <table class="cell-options">
                <tr>
                    <td class="op" ${this.options.has(1) ? '' : "style='visibility:hidden'"}>1</td>
                    <td class="op" ${this.options.has(2) ? '' : "style='visibility:hidden'"}>2</td>
                    <td class="op" ${this.options.has(3) ? '' : "style='visibility:hidden'"}>3</td>
                </tr>
                <tr>
                    <td class="op" ${this.options.has(4) ? '' : "style='visibility:hidden'"}>4</td>
                    <td class="op" ${this.options.has(5) ? '' : "style='visibility:hidden'"}>5</td>
                    <td class="op" ${this.options.has(6) ? '' : "style='visibility:hidden'"}>6</td>
                </tr>
                <tr>
                    <td class="op" ${this.options.has(7) ? '' : "style='visibility:hidden'"}>7</td>
                    <td class="op" ${this.options.has(8) ? '' : "style='visibility:hidden'"}>8</td>
                    <td class="op" ${this.options.has(9) ? '' : "style='visibility:hidden'"}>9</td>
                </tr>
            </table>`
        } else {
            this.td.innerHTML = `<span class="value">${this.value != 0 ? this.value : ''}</span>`;
        }
    }

    setValue(value) {
        if (value == 0) {
            return;
        }
        for (let i = 0; i < 9; i++) {
            board[i][this.j].options.delete(value);
        }
        for (let j = 0; j < 9; j++) {
            board[this.i][j].options.delete(value);
        }
        let i_bl = ~~(this.i / 3);
        let j_bl = ~~(this.j / 3);
        for(let i = i_bl * 3; i < i_bl * 3 + 3; i++){
            for (let j = j_bl *3; j < j_bl*3+3; j++){
                board[i][j].options.delete(value);
            }
        }
        this.value = value;
    }



}

board = []

puzzle = [[5, 3, 0, 0, 7, 0, 0, 0, 0],
[6, 0, 0, 1, 9, 5, 0, 0, 0],
[0, 9, 8, 0, 0, 0, 0, 6, 0],
[8, 0, 0, 0, 6, 0, 0, 0, 3],
[4, 0, 0, 8, 0, 3, 0, 0, 1],
[7, 0, 0, 0, 2, 0, 0, 0, 6],
[0, 6, 0, 0, 0, 0, 2, 8, 0],
[0, 0, 0, 4, 1, 9, 0, 0, 5],
[0, 0, 0, 0, 8, 0, 0, 7, 9]]


for (let i = 0; i < 9; i++) {
    board.push([])
    for (let j = 0; j < 9; j++) {
        let td = document.getElementById(`c${i}${j}`);
        let newCell = new Cell(i, j, td);
        board[i].push(newCell);
    }
}

for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        board[i][j].setValue(puzzle[i][j]);
    }
}

document.addEventListener("keypress", function(e){
    if(!isNaN(e.key)){
        if(selected){
            selected.setValue(parseInt(e.key));
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    board[i][j].show();
                }
            }   
        }
    }
});

for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        board[i][j].show();
    }
}


function update(){
    if(selected)
        selected.td.style.backgroundColor = "#123456";
}

update();
