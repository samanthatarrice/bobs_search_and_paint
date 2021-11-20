findItems();

const canvasBackgrounds = document.querySelector('.canvas-backgrounds');

function findItems() {
  const imagesToFind = Array.from(document.querySelectorAll('.find'));
  imagesToFind.forEach(image => {
    image.addEventListener('click', () => {
      // image.style.display = 'none';
        //removed because it seemed better to leave them in the display
      if (image.classList.contains('cloud')) {
        canvasBackgrounds.style.backgroundImage = 'url("images/cloud-background.jpeg")';
        document.querySelector('.search-cloud').style.filter = 'grayscale()';
      } else if (image.classList.contains('squirrel')) { 
        canvasBackgrounds.style.backgroundImage = 'url("images/squirrel-background.jpeg")';
        document.querySelector('.search-squirrel').style.filter = 'grayscale()';
      } else if (image.classList.contains('plant')) { 
        canvasBackgrounds.style.backgroundImage = 'url("images/plant-background.jpeg")';
        document.querySelector('.search-plant').style.filter = 'grayscale()';
      } else {
        canvasBackgrounds.style.backgroundImage = 'url("images/tree-background.jpeg")';
        document.querySelector('.search-tree').style.filter = 'grayscale()';
      }
    
      //Hide search instructions:
      document.querySelector('.search-instructions').style.display = 'none';

      paint();
      // findItems();
    })
  })
}

function paint() {

  //Declare variables and make elements visible:
  const closePainting = document.querySelector('.close-painting');
  closePainting.style.display = 'block';
  const canvas = document.querySelector('.canvas');
  canvas.style.display = 'block';
  // const canvasBackgrounds = document.querySelector('.canvas-backgrounds');
  canvasBackgrounds.style.display = 'block';
  const userColor = document.querySelector('.color-picker');
  const paintingContainer = document.querySelector('.painting-container')
  paintingContainer.style.display = "block";
    //Display all pant tools

  //Darken background:
  document.body.classList.add('dark-background');

  //Display paint instructions:
  document.querySelector('.paint-instructions').style.display = 'block';

  //Bring TV to foreground so it covers the coloring page but doesn't cover the canvas:
  document.querySelector('.tv').style.zIndex = '5';

  //Set canvas size dynamically by using ratio of TV:
  canvas.width = window.innerWidth/2.25;
  canvas.height = canvas.width * 0.792;
  //Set canvas size when user resizes window:
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth/2.25;
      canvas.height = canvas.width * 0.792;
    })

  //Select brush size:
  let userSize = '20';
  const sizes = Array.from(document.querySelectorAll('.sizes div'));
  sizes.forEach(size => {
    size.addEventListener('click', () => {
      canvas.classList.remove(`size${userSize}`);
      if(size.classList.contains('large')) {
        userSize = '40';
        canvas.classList.add(`size${userSize}`);
      } else if (size.classList.contains('small')) {
        userSize = '8';
        canvas.classList.add(`size${userSize}`);
      } else if (size.classList.contains('extra-sm')) {
        userSize = '3';
        canvas.classList.add(`size${userSize}`);
      } else {
        userSize = '20';
        canvas.classList.add(`size${userSize}`);
      }
      return userSize;
    })
  })

  //Add class for cursor image:
  
  
  //Set up drawing on canvas:
  const ctx = canvas.getContext('2d');

  let isPainting = false;

  function startStroke(e) {
    preventDefault(e);
    isPainting = true;
    draw(e);
  }

  function finishStroke() {
    isPainting = false;
    ctx.beginPath();
  }

  function resetStroke() {
    isPainting = false;
    ctx.beginPath();
  }

  function draw(e) {
    preventDefault(e);
    if (!isPainting) return;
    ctx.lineWidth = userSize;
    ctx.strokeStyle = userColor.value;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.globalCompositeOperation = 'luminosity';
    //change this later?

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  }

    // MOUSE EVENTS:
    canvas.addEventListener('mousedown', startStroke);
    canvas.addEventListener('mouseup', finishStroke);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseout', resetStroke);

    //TOUCH EVENTS:

    
    // Close painting:
    closePainting.addEventListener('click', () => {
      closePainting.style.display = 'none';
      canvas.style.display = 'none';
      canvasBackgrounds.style.display = 'none';
      paintingContainer.style.display = 'none';
      document.querySelector('.tv').style.zIndex = '1';
      document.body.classList.remove('dark-background');
      document.querySelector('.paint-instructions').style.display = 'none';
      // findItems();
    })

}




