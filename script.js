const imagesToFind = Array.from(document.querySelectorAll('.find'));

imagesToFind.forEach(image => {
  image.addEventListener('click', () => {
    image.style.display = 'none';
  })
})

const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext('2d');

window.addEventListener('load', () => {
  canvas.width = window.innerWidth/1.4;
  canvas.height = windew.innerHeight/1.5;
})

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth/1.4;
  canvas.height = window.innerHeight/1.5;
})

// canvas.style.margin = '0 auto';