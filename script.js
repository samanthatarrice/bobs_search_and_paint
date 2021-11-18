const imagesToFind = Array.from(document.querySelectorAll('.find'));

imagesToFind.forEach(image => {
  image.addEventListener('click', () => {
    image.style.display = 'none';
  })
})

const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext('2d');

window.addEventListener('load', () => {
  canvas.width = window.innerWidth/1.8;
  canvas.height = canvas.width * 0.82;
})

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth/1.8;
  canvas.height = canvas.width * 0.82;
})

canvas.style.zIndex = '3';

const tv = document.querySelector('.tv');

tv.style.zIndex = '4';
