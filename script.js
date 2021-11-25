// Global Variables:
const canvas = document.querySelector('#canvas');
const canvasBackgrounds = document.querySelector('.canvas-backgrounds');
const closePainting = document.querySelector('.close-painting');
const bobVideo = document.querySelector('.bob-video');
const searchInstructions = document.querySelector('.search-instructions');

document.addEventListener("DOMContentLoaded", startup);

function startup() {

  //Toggle instructions:
  const help = document.querySelector('.fa-question');
  help.addEventListener('click', () => {
    if (canvas.style.display === 'block') {
      const paintInstructions = document.querySelector('.paint-instructions');
      if (paintInstructions.style.display === 'block') {
        paintInstructions.style.display = 'none';
      } else {
        paintInstructions.style.display = 'block';
      }
    } else {
      // const searchInstructions = document.querySelector('.search-instructions');
      if (searchInstructions.style.display === 'block') {
        searchInstructions.style.display = 'none';
      } else {
        searchInstructions.style.display = 'block';
      }
    } 
  });

  //Iterate through each findable object to set it's background and change to grayscale in search bar:
  const imagesToFind = Array.from(document.querySelectorAll('.find'));
  imagesToFind.forEach(image => {
    image.addEventListener('click', () => {
      if (image.classList.contains('cloud')) {
        canvasBackgrounds.style.backgroundImage = 'url("images/cloud-background.jpeg")';
        document.querySelector('.search-cloud').style.filter = 'grayscale()';
        paint()
      } else if (image.classList.contains('squirrel')) { 
        canvasBackgrounds.style.backgroundImage = 'url("images/squirrel-background.jpeg")';
        document.querySelector('.search-squirrel').style.filter = 'grayscale()';
        paint()
      } else if (image.classList.contains('plant')) { 
        canvasBackgrounds.style.backgroundImage = 'url("images/plant-background.jpeg")';
        document.querySelector('.search-plant').style.filter = 'grayscale()';
        paint()
      } else if (image.classList.contains('tree')) {
        canvasBackgrounds.style.backgroundImage = 'url("images/tree-background.jpeg")';
        document.querySelector('.search-tree').style.filter = 'grayscale()';
        paint()
      } else if (image.classList.contains('palette')) {
        canvasBackgrounds.style.backgroundImage = 'none';
        document.querySelector('.free-paint').style.display = 'block';
        paint()
      }
    });
    //Show video and close but hide other features:
    image.addEventListener('click', () => {
      if (image.classList.contains('bob')) {
        bobVideo.src = 'https://youtube.com/embed/19fZGODNHG4?autoplay=1&mute=1';
        document.body.classList.add('dark-background');
        bobVideo.style.display = 'block';
        closePainting.style.display = 'block';
        help.style.display = 'none';
        searchInstructions.style.display = 'none';
        closePainting.addEventListener('click', () => {
          bobVideo.style.display = 'none';
          document.querySelector('.bob-video').src = '';
          help.style.display = 'block';
        });
      }
    });
  });
}

function paint() {
  //Hide search instructions if open:
  searchInstructions.style.display = 'none';

  //Declare variables and make elements visible:
  closePainting.style.display = 'block';
  canvas.style.display = 'block';
  canvasBackgrounds.style.display = 'block';
  const userColor = document.querySelector('.color-picker');
  const download = document.querySelector('.fa-download');
  download.style.visibility = 'visible';
  const eraseParts = document.querySelector('.fa-eraser');
  eraseParts.style.visibility = 'visible';
  const eraseAll = document.querySelector('.fa-trash');
  eraseAll.style.visibility = 'visible';
  const paintingContainer = document.querySelector('.painting-container')
  paintingContainer.style.display = "block";
    //Display all pant tools

  //Darken background:
  document.body.classList.add('dark-background');
  //Bring TV to foreground so it covers the coloring page but doesn't cover the canvas:
  document.querySelector('.tv').style.zIndex = '5';

  //Set canvas size dynamically by using ratio of TV:
  canvas.width = window.innerWidth/2.25;
  canvas.height = canvas.width * 0.792;
  //Set canvas size when user resizes window:
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth/2.25;
    canvas.height = canvas.width * 0.792;
  });

  //Select brush size:
  let userSize = '20';
  let mode = 'brush';
  const sizes = Array.from(document.querySelectorAll('.brush-sizes img'));
  const large = document.querySelector('.large');
  const medium = document.querySelector('.medium');
  const small = document.querySelector('.small');
  const extraSm = document.querySelector('.extra-sm');
  sizes.forEach(size => {
    size.addEventListener('click', () => {
      mode = 'brush';
      canvas.classList.remove(`size${userSize}`);
      if (size.classList.contains('large')) {
        if (medium.style.visibility === 'hidden' | small.style.visibility === 'hidden' | extraSm.style.visibility === 'hidden') {
          medium.style.visibility = 'visible';
          small.style.visibility = 'visible';
          extraSm.style.visibility = 'visible';
        }
        userSize = '40';
        canvas.classList.remove('eraser');
        canvas.classList.add(`size${userSize}`);
        large.style.visibility = 'hidden';
      } else if (size.classList.contains('medium')) {
        if (large.style.visibility === 'hidden' | small.style.visibility === 'hidden' | extraSm.style.visibility === 'hidden') {
          large.style.visibility = 'visible';
          small.style.visibility = 'visible';
          extraSm.style.visibility = 'visible';
        }
        userSize = '20';
        canvas.classList.remove('eraser');
        canvas.classList.add(`size${userSize}`);
        medium.style.visibility = 'hidden';
      } else if (size.classList.contains('small')) {
        if (medium.style.visibility === 'hidden' | large.style.visibility === 'hidden' | extraSm.style.visibility === 'hidden') {
          medium.style.visibility = 'visible';
          large.style.visibility = 'visible';
          extraSm.style.visibility = 'visible';
        }
        userSize = '8';
        canvas.classList.remove('eraser');
        canvas.classList.add(`size${userSize}`);
        small.style.visibility = 'hidden';
      } else {
        if (medium.style.visibility === 'hidden' | small.style.visibility === 'hidden' | large.style.visibility === 'hidden') {
          medium.style.visibility = 'visible';
          small.style.visibility = 'visible';
          large.style.visibility = 'visible';
        }
        userSize = '3';
        canvas.classList.remove('eraser');
        canvas.classList.add(`size${userSize}`);
        extraSm.style.visibility = 'hidden';
      }
      return userSize;
    });
  });

  //Declare eraser mode on click:
  eraseParts.addEventListener('click', () => { 
    mode = 'eraser';
    canvas.classList.add('eraser');
    large.style.visibility = 'visible';
    medium.style.visibility = 'visible';
    small.style.visibility = 'visible';
    extraSm.style.visibility = 'visible';
  });
  
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
    ctx.beginPath();
    if (mode==='brush') {
      ctx.globalCompositeOperation = 'hue';
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      ctx.moveTo(e.offsetX, e.offsetY);
    } else {
      ctx.globalCompositeOperation="destination-out";
      ctx.arc(e.offsetX,e.offsetY,8,0,Math.PI*2,false);
      ctx.fill();
    }
  }

  // MOUSE EVENTS:
  canvas.addEventListener('mousedown', startStroke);
  canvas.addEventListener('mouseup', finishStroke);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseout', resetStroke);

  //Save Image:
  download.addEventListener('click', function() {
    const link = document.createElement('a');
    link.download = 'download.png';
    link.href = canvas.toDataURL();
    link.click();
    link.delete;
  });
    //Not exactly working right. When you cancel downloading, move onto another painting background, then try to cancel downloading again, the box pops up for each time you have gone to a new background. Can exit box by pressing esc.

  //Delete whole painting:
  eraseAll.addEventListener('click', () => {
    canvas.width = canvas.width;
  });

  //Code for canvas touch events:
    //Taken from: https://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html
    //It works, but only on my iPad. However, when you change the screen size, the coordinates are off. It also doesn't work on my Android phone with this code:

  // Set up touch events for mobile, etc
  canvas.addEventListener("touchstart", function (e) {
    mousePos = getTouchPos(canvas, e);
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
    //Need to reconcile mouseEvent since it isn't declared in my original code.
  }, false);

  canvas.addEventListener("touchend", function (e) {
    var mouseEvent = new MouseEvent("mouseup", {});
    canvas.dispatchEvent(mouseEvent);
    }, false);
    canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0];
    var mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
    }, false);

  // Get the position of a touch relative to the canvas
  function getTouchPos(canvasDom, touchEvent) {
    var rect = canvasDom.getBoundingClientRect();
    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top
    };
  }

  // Prevent scrolling when touching the canvas
  document.body.addEventListener("touchstart", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, { passive: false });
  document.body.addEventListener("touchend", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, { passive: false });
  document.body.addEventListener("touchmove", function (e) {
    if (e.target == canvas) {
      e.preventDefault();
    }
  }, { passive: false });

  /*
  // FIRST ATTEMPT AT TOUCH EVENTS: Set up touch drawing: Unfortunately, not quite working yet (see notes below), but hope to get it working soon!
  let isTouching = false;

  function startTouch(e) {
    isTouching = true;
    drawTouch(e);
  }

  function finishTouch() {
    isTouching = false;
    // ctx.beginPath();
  }

  function cancelTouch() {
    isTouching = false;
    // ctx.beginPath();
  }

  function drawTouch(e) {
    if (!isTouching) return;
    e.preventDefault();
    e.stopPropagation();
    ctx.lineWidth = userSize;
    ctx.strokeStyle = userColor.value;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.globalCompositeOperation = 'luminosity';

    let xAxis = (e.touches[0].pageX) - 226;
    let yAxis = (e.touches[0].pageY) - 160;
      // The touches were off, I am guessing because of how the canvas is positioned. I tried to offset the x and y axis this way by just tinkering with it with Chrome Dev Tools. It shows up fine with the dev tool's iPad simulator, but on my android phone the coordinates are off. Also, on my iPad it only shows up as short lines, and doesn't draw a path.

    ctx.beginPath();
    ctx.moveTo(xAxis, yAxis);
    ctx.lineTo(xAxis, yAxis);
    ctx.stroke();

  }
  
  // TOUCH EVENTS:
  canvas.addEventListener('touchstart', startTouch);
  canvas.addEventListener('touchend', finishTouch);
  canvas.addEventListener('touchmove', drawTouch);
  canvas.addEventListener('touchcancel', cancelTouch);
  */
    
  // Close painting:
  closePainting.addEventListener('click', () => {
    closePainting.style.display = 'none';
    canvas.style.display = 'none';
    canvasBackgrounds.style.display = 'none';
    canvas.classList.remove('eraser');
    paintingContainer.style.display = 'none';
    sizes.forEach(size => {
      size.style.visibility = 'visible';
    });
    download.style.visibility = 'hidden';
    eraseParts.style.visibility = 'hidden';
    eraseAll.style.visibility = 'hidden';
    bobVideo.style.display = 'none';
    canvas.style.zIndex = '6';
    document.querySelector('.tv').style.zIndex = '1';
    document.body.classList.remove('dark-background');
    document.querySelector('.paint-instructions').style.display = 'none';
    document.querySelector('.free-paint').style.display = 'none';
  })

}



