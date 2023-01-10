class Cell {
    constructor() {
        this.alive = false;
        this.history = [];
    
        this.get_count = () => {
            let true_count = 0;
            let hist = [...this.history];
            while (hist.at(-1)) {
                true_count++
                hist.pop()
            }
            return true_count;
        }
}

}

class GameOfLife {
    constructor() {

        this.cell_size = 20;
        this.dead_colour = `#C0C0C0`;
        this.alive_colour = `#000000`;
        this.cells_in_column = Math.floor(canvas.width / this.cell_size);
        this.cells_in_rows = Math.floor(canvas.height / this.cell_size);
        this.active_array = [];
        this.inactive_array = [];

     this.arrayInitialization = () => {

             for (let i = 0; i < this.cells_in_rows; i++) {
                 this.active_array[i] = [];
                 for (let j = 0; j < this.cells_in_column; j++) {
                     this.active_array[i][j] = new Cell();
                 }
             }
	

        };

        this.rand = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    let binary = (Math.random() > 0.5)
                    this.active_array[i][j].alive = binary;
                    this.active_array[i][j].history = [].concat(this.active_array[i][j].history, binary);
                    
                }
            }

        };

        this.fillArray = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    let colour;
                    let cell = this.active_array[i][j]
                    if (cell.alive) {
                        let count = cell.get_count()
                        console.log("count:",cell.history)
                        if (count == 0) {
                            colour = this.alive_colour;
                        }
                        else if (count == 1) {
                            colour = this.alive_colour;
                        }
                        else if (count == 2) {
                            colour = `#465e7d`
                        }
                        else if (count == 3) {
                            colour = `#446e66`
                        }
                        else if (count == 4) {
                            colour  = `#990000`
                        }
                        else {
                            colour = `#d5a6bd`
                        }
                        
                    }
                        
                    else
                        colour = this.dead_colour;
                    ctx.fillStyle = colour;
                    ctx.fillRect(j * this.cell_size, i * this.cell_size, this.cell_size, this.cell_size);
                }
            }

        };

        this.setCellValueHelper = (row, col) => {
            try {
                if (this.active_array[row][col].alive) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
            catch {
                let row_ = (row + this.cells_in_rows) % (this.cells_in_rows);
                let col_ =  (col + this.cells_in_column) % (this.cells_in_column);
                if (this.active_array[row_][col_].alive) {
                    return 1;
                }
                else {
                    return 0;
                }
            }
           
        };


        this.rules = (total,row, col) => {
          let current_state = this.active_array[row][col];

            if (total > 4 || total == 1) {
                return false;
            }
         
            else if (total == 3 || (current_state.alive && total == 2)) {
                console.log(row,col,"has",total,"neighbours")
                return true;
            }
   
            else {
                return false;
            }

        };


        this.updateLifeCycle = () => {
	

	    let holder = []
            for (let i = 0; i <= this.cells_in_rows; i++) {
                holder[i] = [];
                for (let j = 0; j <= this.cells_in_column; j++) {
                   holder[i][j] = new Cell();
                }
            }
		

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                     let  neigh1 = this.setCellValueHelper(i - 1, j - 1);
                     let  neigh2 = this.setCellValueHelper(i - 1, j);
                     let  neigh3 = this.setCellValueHelper(i - 1, j + 1);
                     let  neigh4 = this.setCellValueHelper(i, j - 1);
                     let  neigh5 = this.setCellValueHelper(i, j + 1);
                     let  neigh6 = this.setCellValueHelper(i + 1, j - 1);
                     let  neigh7 = this.setCellValueHelper(i + 1, j);
                     let  neigh8 = this.setCellValueHelper(i + 1, j + 1);
                    let total_neigh = neigh1 + neigh2 + neigh3 + neigh4+ neigh5+ neigh6+ neigh7+ neigh8
                    let new_state = this.rules(total_neigh,i, j);
                    holder[i][j].alive = new_state;
                    holder[i][j].history = [].concat(this.active_array[i][j].history,new_state)
                    if (new_state) {
                        console.log(i,j,"has been changed to",new_state)
                    }
                   
                }
            }
            this.active_array =[...holder];

        };

        this.gameSetUp = () => {
            this.arrayInitialization();
        };

        this.runGame = () => {
            this.fillArray();
            this.updateLifeCycle();
        };
           

        this.draw = (e) => {
            var rect = canvas.getBoundingClientRect(); 
            var width = canvas.width; //0 to 1400
            var height = canvas.height; //0 to 500
            let row = Math.floor(((e.clientX - rect.left) / width) * this.cells_in_column)
            let col = Math.floor(((e.clientY - rect.top)/ height) * this.cells_in_rows)

            this.active_array[col][row].alive = !this.active_array[col][row].alive;
            this.active_array[col][row].history = [].concat(this.active_array[col][row].history, !this.active_array[col][row].history.alive);
            console.log(this.active_array.length,this.active_array[0].length,col,row,)
            
            this.fillArray();
        };
 
    }
}
