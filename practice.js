//Switch:
imagesToFind.forEach(image => {
  switch (image) {
    case image.classList.contains('cloud'):
      canvasBackgrounds.style.backgroundImage = 'url("images/cloud-background.jpeg")';
      document.querySelector('.search-cloud').style.filter = 'grayscale()';
      paint()
      break;
    case image.classList.contains('squirrel'):
      canvasBackgrounds.style.backgroundImage = 'url("images/squirrel-background.jpeg")';
      document.querySelector('.search-squirrel').style.filter = 'grayscale()';
      paint()
      break;
    case image.classList.contains('plant'):
      canvasBackgrounds.style.backgroundImage = 'url("images/plant-background.jpeg")';
      document.querySelector('.search-plant').style.filter = 'grayscale()';
      paint()
      break;
    case image.classList.contains('tree'):
      canvasBackgrounds.style.backgroundImage = 'url("images/tree-background.jpeg")';
      document.querySelector('.search-tree').style.filter = 'grayscale()';
      paint()
      break
    case image.classList.contains('palette'):
      canvasBackgrounds.style.backgroundImage = 'none';
      document.querySelector('.free-paint').style.display = 'block';
      paint()
      break;
    case image.classList.contains('bob'):
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
      })
      break;
    default:
      break;
  }
})