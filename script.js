const imagesToFind = Array.from(document.querySelectorAll('.find'));

imagesToFind.forEach(image => {
  image.addEventListener('click', () => {
    image.style.display = 'none';
  })
})