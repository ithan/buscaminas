class Game{

  constructor(mines,initialWidth, initialHeight, initialCellSize)
  {
    this.mines         = mines;
    this.field         = [];

    //Map values.
    this.width     = initialWidth;
    this.height    = initialHeight;
    this.cellSize  = initialCellSize;

    //Gane status
    this.finished  = false;
    this.debugMode = false;

    //Player object
    this.player    = {
      score: 0
    };
  }

  init()
  {
    //Generate a new map.
    this.generateMap(this.width,this.height,this.cellSize, this.fillMapWithMines);
    this.fillMapWithMines();
    this.fillText();
    this.render();


  }

  generateMap(fieldWidth, fieldHeight, cellSize, callback)
  {
    //Reset the field.
    this.field = [];
    for(let wh = 0; wh <= fieldHeight - cellSize ; wh+=cellSize){
      // For all the height
      for(let wi = 0; wi <= fieldWidth - cellSize; wi+=cellSize){
        //For all the width
         //Create a new cell and store it.
        this.field.push(new Cell(wi,wh,size));
      }
    }
  }

  fillMapWithMines()
  {
    for(let i = 0; i < this.mines; i++){
      let randomCell = floor(random(0, this.field.length));                                  //Random cell from the field.
      while(this.field[randomCell].bomb)  randomCell = floor(random(0, this.field.length));  //If the cell already contains a bomb, chose another one.
      this.field[randomCell].bomb = true;                                                    //Add a bomb to the random cell selected.
    }
  }

  fillText()
  {
    this.field.map((item ,index ,fieldArray) =>{
        let bombs   = 0;                                          //Bombs near the element
        let rowSize = floor(this.width/size)+1;                   //Lenght of the field per row.
        let adjacentCells = this.getAllAdjacentCells(index);
        adjacentCells.map(cell => {
          if(cell && cell.bomb) bombs++;                          //For every adjacent cell that contains a bomb, increase the counter.
        });
        if(!item.bomb) item.text = bombs;                         //Set the text to the number of bombs.
    });
  }

  render()
  {
    background(0);                                          //Reset the canvas.
    this.field.map( cell => cell.show() );                  //Render all the cells individualy.
  }

  getFourAdjacentCells(index)
  {
    let rowSize = floor(this.width/size)+1;
    let adjacentCells =
    [this.field[index+rowSize-1   ], //bottom
     this.field[index-rowSize+1   ]]; //top

    //If they cells its not at the border.
    if( this.field[index-1] && this.field[index-1].pos.x != (this.width - size) - 2) adjacentCells.push(this.field[index-1]); //left
    if( this.field[index+1] && this.field[index+1].pos.x != 0) adjacentCells.push(this.field[index+1]);                 //right
    return adjacentCells;
  }

  getAllAdjacentCells(index)
  {
    let rowSize = floor(this.width/size)+1;
    let adjacentCells =
    [this.field[index+rowSize-1   ], //bottom
     this.field[index-rowSize+1   ]]; //top

     //If they cells its not at the border.
     if( this.field[index].pos.x != 0)
     {
       adjacentCells.push(this.field[index-1        ]);      //left
       adjacentCells.push(this.field[index+rowSize-2])       //bottom leff
       adjacentCells.push(this.field[index-rowSize  ])       //top left
     }
     if( this.field[index].pos.x != (this.width - size) - 2)
     {
       adjacentCells.push(this.field[index+1        ]);       //right
       adjacentCells.push(this.field[index+rowSize  ]);       //bottom right
       adjacentCells.push(this.field[index-rowSize+2]);       //top right
     }
     return adjacentCells;
  }


  getCell(x,y)
  {
    return this.field.filter(cell => (x > cell.pos.x && x < cell.pos.x + this.cellSize) && (y > cell.pos.y && y < cell.pos.y + this.cellSize))[0];
  }

  markCell()
  {
    let clickedCell = this.getCell(mouseX, mouseY);                  //Get the cell at the mouse position.
    if(clickedCell && clickedCell.hidden && !this.finished)
    {
      clickedCell.marked = !clickedCell.marked;                         //Swap the clickedCell boolean;
      if(clickedCell.marked && clickedCell.bomb)  this.player.score++;  //If the marked cell is a bomb, increase score.
      if(!clickedCell.marked && clickedCell.bomb) this.player.score--;  //If the unmarked cell us a bomb, decrease core.

      this.render();                                                    //render the game.

      //If you finished the game, show you win on the screen and stop the game.
      if(this.player.score == this.mines)
      {
        game.finished = true;
        textAlign(CENTER);
        fill(0,255,0);
        textSize(50);
        text('You win!', width/2, height/2);
      }
    }

  }

  //Debug info.
  debug()
  {
    let clickedCell = this.getCell(mouseX, mouseY);
    if(clickedCell)
    {
      let index = this.field.indexOf(clickedCell);
      let rowSize = floor(this.width/size)+1;
      textSize(20);
      fill(255,0,0);
      text('I: ' +index, width/2+6, height/2 - 25);
      text('X: ' + clickedCell.pos.x, width/2, height/2);
      text('Y: ' +clickedCell.pos.y, width/2, height/2 + 20);
      let adj = this.getAllAdjacentCells(index);
      clickedCell.debugFill();
      for(let i of adj){
        i && i.debug();
      }
    }

  }
}
