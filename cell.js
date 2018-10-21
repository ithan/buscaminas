class Cell
{
  constructor(x,y,size){
    this.pos    = {x,y};
    this.size   = size;
    this.bomb   = false;
    this.hidden = true ;
    this.text;
    this.marked = false;
  }

  //Open all the white cells near.
  openWhite()
  {
    //Open all the closeby white cells;
    this.hidden = false;
    let selfIndex = game.field.indexOf(this);                    //Index of this cell.
    let rowSize = floor(w/game.cellSize)+1;                      //Size of the rows
    let adjacentCells = game.getFourAdjacentCells(selfIndex);

    //For every adjacent cell, if it dosn't have any text and its hidden, call this function on it.
    adjacentCells.map(cell => {
      if( cell && !cell.text && cell.hidden ){ cell.openWhite()}
    });
  }

  //Render the cell on the canvas.
  show()
  {
    //Basic setup.
    fill(255);
    stroke(0);

    //Draw the box
    rect(this.pos.x, this.pos.y, size,size);

    //Chose the color of the cell.
    fill(this.hidden ? 100 : 255);
    if(this.marked) fill(0,0,255);
    if(!this.hidden && this.bomb) fill(255,0,0);
    rect(this.pos.x+1, this.pos.y+1, size-1,size-1);

    //Fill the text if needed.
    if(!this.hidden && this.text){
      fill(0,0,255);
      let s = this.size/2;
      textSize(20);
      text(this.text, this.pos.x+s-3, this.pos.y+s*1.4);
   }
  }

  debug()
  {
    //Draw a red box arround.
    stroke(255,0,0);
    noFill();
    rect(this.pos.x, this.pos.y, size,size);
  }

  debugFill()
  {
    fill(0);
    rect(this.pos.x, this.pos.y, size,size);
  }

}
