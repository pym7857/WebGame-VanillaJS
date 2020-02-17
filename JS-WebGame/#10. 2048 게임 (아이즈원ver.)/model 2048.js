class Table{

	constructor(){ //Construct empty table
		this.table = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
		this.moved = false;
	}

	isEmpty(){
		for(var i=0; i<4; ++i){
			for(var j=0; j<4; ++j){
				if(this.table[i][j]){
					return false;
				}
			}
		}
		return true;
	}

    /* 초기 테이블 랜덤값 2개 구성 */
	initialPopulate(){ //Fill 2 random squares
		var cell1 = [0,0];
		var cell2 = [0,0];
		while(cell1[0] == cell2[0] && cell1[1] == cell2[1]){ //Make sure 2 distinct squares
			cell1 = [Math.floor((Math.random() * 4)), Math.floor((Math.random() * 4))];
			cell2 = [Math.floor((Math.random() * 4)), Math.floor((Math.random() * 4))];
			if(cell1[0] != cell2[0] && cell1[1] != cell2[1]){ //Put 2 in cells
				if(Math.random() < .9){
					this.table[cell1[0]][cell1[1]] = 2;
				}
				else{ 
					this.table[cell1[0]][cell1[1]] = 4;
				}
				if(Math.random() < .9){
					this.table[cell2[0]][cell2[1]] = 2;
				}
				else{
					this.table[cell2[0]][cell2[1]] = 4;
				}
			}
		}
	}

    /* 랜덤값 1개 생성 */
	populateRandomCell(){ //Of the empty cells, populate a random one
		var done = false;
		while(!done){ //This algorithm tries to randomly match an empty cell -- needs update
			var cell = [Math.floor((Math.random() * 4)), Math.floor((Math.random() * 4))];
			if(this.table[cell[0]][cell[1]] == 0){ //if empty cell, fill it
				if(Math.random() < .9){
					this.table[cell[0]][cell[1]] = 2;
				}
				else{
					this.table[cell[0]][cell[1]] = 4;
				}
				done = true;
			}
		}
	}

	moveRight(){ //helper
		//Move everything rightmost from right to left
		for(var i=0; i<4; ++i){ //iterate down rows
			var counter = 0;
			while(counter < 3){ //do this 3 times (placeholder algorithm)
				for(var j=2; j>=0; --j){ //iterate across columns
					if(this.table[i][j+1] == 0 && this.table[i][j] != 0){ //move right if right side is empty
						this.moved = true;
						this.table[i][j+1] = this.table[i][j];
						this.table[i][j] = 0;
					}
				}
			++counter;
			}
		}
	}

	keyRight(){
		//this.moveRight();

		//Combine like tiles
		for(var i=0; i<4; ++i){ //iterate down rows
			for(var j=3; j>=0; --j){ //iterate across columns
				if(this.table[i][j] == this.table[i][j-1]){ // 같은숫자면 합쳐라 
					this.table[i][j] *= 2;
					this.table[i][j-1] = 0;
				}
			}
		}

		this.moveRight();
	}

	keyLeft(){
		this.rotateClockwise(); this.rotateClockwise();
		this.keyRight();
		this.rotateClockwise(); this.rotateClockwise();
	}

	keyUp(){
		this.rotateClockwise();
		this.keyRight();
		this.rotateClockwise(); this.rotateClockwise(); this.rotateClockwise();
	}

	keyDown(){
		this.rotateClockwise(); this.rotateClockwise(); this.rotateClockwise();
		this.keyRight();
		this.rotateClockwise();
	}

	rotateClockwise(){ //transpose then reverse each row
		//transpose:
		for(var i=0; i<3; ++i){
			for(var j=i+1; j<4; ++j){
				var holder = this.table[i][j];
				this.table[i][j] = this.table[j][i];
				this.table[j][i] = holder;
			}
		}
		//reverse each row:
		for(var i=0; i<4; ++i){
			for(var j=0; j<2; ++j){
				var holder = this.table[i][j];
				this.table[i][j] = this.table[i][3-j];
				this.table[i][3-j] = holder;
			}
		}
	}
}

var board = new Table();
while(board.isEmpty()){ //temporary fix to asynch
	board.initialPopulate();
	updateView();
}