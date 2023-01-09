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

             for (let i = 0; i <= this.cells_in_rows; i++) {
                 this.active_array[i] = [];
                 for (let j = 0; j <= this.cells_in_column; j++) {
                     this.active_array[i][j] = 0;
                 }
             }
	

        };

        this.rand = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    this.active_array[i][j] = (Math.random() > 0.5) ? 1 : 0;
                }
            }

        };

        this.fillArray = () => {

            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j = 0; j < this.cells_in_column; j++) {
                    let colour;
                    if (this.active_array[i][j] == 1)
                        colour = this.alive_colour;
                    else
                        colour = this.dead_colour;
                    ctx.fillStyle = colour;
                    ctx.fillRect(j * this.cell_size, i * this.cell_size, this.cell_size, this.cell_size);
                }
            }

        };

        this.setCellValueHelper = (row, col) => {
            try {
                return this.active_array[row][col];
            }
            catch {
                let row_ = (row + this.cells_in_rows) % this.cells_in_rows;
                let col_ =  (col + this.cells_in_column) % this.cells_in_column;
                return this.active_array[row_][col_]
            }
           
        };


        this.rules = (total,row, col) => {
          let current_state = this.active_array[row][col];

            if (total > 4 || total == 1) {
                return 0;
            }
         
            else if (total == 3 || (current_state == 1 && total == 2)) {
                console.log(row,col,"has",total,"neighbours")
                return 1;
            }
   
            else {
                return 0;
            }

        };


        this.updateLifeCycle = () => {
	

	    let holder = []
            for (let i = 0; i <= this.cells_in_rows; i++) {
                holder[i] = [];
                for (let j = 0; j <= this.cells_in_column; j++) {
                   holder[i][j] = 0;
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
                    holder[i][j] = new_state;
                    if (new_state == 1) {
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

            this.active_array[col][row] = 1 - this.active_array[col][row];
            console.log(this.active_array.length,this.active_array[0].length,col,row,)
            
            this.fillArray();
            
        };
 
    }
}
