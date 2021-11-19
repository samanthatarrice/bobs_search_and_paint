const imagesToFind = Array.from(document.querySelectorAll('.find'));

imagesToFind.forEach(image => {
  image.addEventListener('click', () => {
    image.style.display = 'none';

    canvas();
  })
})

const colorPicker = document.querySelector('.color-picker')
colorPicker.value = '#FFFFFF'
console.log(colorPicker);

function canvas() {

  const canvas = document.querySelector(".canvas");
  const canvasBackground = document.querySelector('.canvas-background');

  canvas.style.display = 'block';
  canvasBackground.style.display = 'block';
  
  canvas.width = window.innerWidth/1.98;
  canvas.height = canvas.width * 0.792;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth/1.98;
    canvas.height = canvas.width * 0.792;
  })
  canvas.style.zIndex = '6';
  document.querySelector('.tv').style.zIndex = '5';

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
    ctx.lineWidth = '20';
    ctx.strokeStyle = 'black';
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

}
