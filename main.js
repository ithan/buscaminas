let w, h, game, size = 40;


function setup ()
{
  // Canvas size.
  w = 802, h= 602;
  createCanvas(w,h);
  game = new Game(40,w, h, size);
  game.init();
}

function draw()
{
  if(game.debugMode)
  {
    game.render();
    game.debug();
  }
}

//Function called when someone press the "GO" Button.
function generateGame(){
   let width =  (size) * parseInt(document.querySelector('#width').value) +2;
   let height = (size) * parseInt(document.querySelector('#height').value)+2;
   let mines = parseInt(document.querySelector('#mines').value) ;
   resizeCanvas(width, height);
   game = new Game(mines, width, height, size);
   game.init();
}

//Event handlers
function mouseClicked()
{
  let clickedCell = game.getCell(mouseX, mouseY);
  if(clickedCell && !clickedCell.marked && !game.finished)
  {
    if(clickedCell) clickedCell.hidden = false;
    if(clickedCell && !clickedCell.text && !clickedCell.bomb) clickedCell.openWhite();
    if(clickedCell && clickedCell.bomb) game.field.filter(cell => cell.hidden = false);
    game.render();
  }


}

function keyPressed()
{
  if(keyCode == 32)  game.markCell();
  if(keyCode == 81)
  {
    game.debugMode = !game.debugMode;
    game.render();
  }
}
