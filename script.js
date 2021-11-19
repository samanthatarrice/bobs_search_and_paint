findItems();

const canvasBackgrounds = document.querySelector('.canvas-backgrounds');

function findItems() {
  const imagesToFind = Array.from(document.querySelectorAll('.find'));
  imagesToFind.forEach(image => {
    image.addEventListener('click', () => {
      image.style.display = 'none';

      if (image.classList.contains('cloud')) {
        canvasBackgrounds.style.backgroundImage = 'url("images/cloud-background.jpeg")';
      } else if (image.classList.contains('squirrel')) { 
        canvasBackgrounds.style.backgroundImage = 'url("images/squirrel-background.jpeg")';
      } else if (image.classList.contains('plant')) { 
        canvasBackgrounds.style.backgroundImage = 'url("images/plant-background.jpeg")';
      } else {
        canvasBackgrounds.style.backgroundImage = 'url("images/tree-background.jpeg")';
      }
    
      paint();
      findItems();
    })
  })
}

function paint() {

  //Declare variables and make elements visible:
  const closePainting = document.querySelector('.close-painting');
  closePainting.style.display = 'block';
  const canvas = document.querySelector(".canvas");
  canvas.style.display = 'block';
  // const canvasBackgrounds = document.querySelector('.canvas-backgrounds');
  canvasBackgrounds.style.display = 'block';
  const userColor = document.querySelector('.color-picker');
  const paintingContainer = document.querySelector('.painting-container')
  paintingContainer.style.display = "block";
    //Display all pant tools

  //Bring TV to foreground so it covers the coloring page but doesn't cover the canvas:
  document.querySelector('.tv').style.zIndex = '5';

  //Set canvas size dynamically by using ratio of TV:
  canvas.width = window.innerWidth/1.98;
  canvas.height = canvas.width * 0.792;
  //Set canvas size when user resizes window:
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth/1.98;
      canvas.height = canvas.width * 0.792;
    })


  let userSize = '20';
  //Select brush size:
  const sizes = Array.from(document.querySelectorAll('.sizes div'));
  sizes.forEach(size => {
    size.addEventListener('click', () => {
      if(size.classList.contains('large')) {
        userSize = '40';
      } else if (size.classList.contains('small')) {
        userSize = '8';
      } else if (size.classList.contains('extra-sm')) {
        userSize = '3';
      } else {
        userSize = '20';
      }
      return userSize;
    })
  })
  


  //Set up drawing on canvas:
  const ctx = canvas.getContext('2d');

  let isPainting = false;

  function startStroke(e) {
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
    if (!isPainting) return;
    ctx.lineWidth = userSize;
    ctx.strokeStyle = userColor.value;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.globalCompositeOperation = 'hue';
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
      // findItems();
    }) //This works, but big problem bc the findItems() function doesn't work after for some reason...

}


