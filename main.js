// jerseys configuration
const jersey_halves = {};
const jersey_hooped = {};
const jersey_quarters = {};

const jersey_plain = {
  base_color: '',
  collar: ''
};
const jersey_plain_shoulders = {
  base_color: '',
  collar: '',
  shoulders: '',
  shoulders_strips: ''
};
const jersey_plain_shoulders_cuffs = {
  base_color: '',
  collar: '',
  shoulders: '',
  shoulders_strips: '',
  cuffs: ''
};

const jersey_vertical_bars_shoulders = {};
const jersey_vertical_bars_shoulders_cuffs = {};
const jersey_vertical_bars_cuffss = {};

// click listener
let images = document.querySelectorAll('img');
images.forEach(image => {
  image.addEventListener('click', () => {
    debugger;
    removeClass('picture-highlight');
    image.classList.add('picture-highligt');
  });
});

function removeClass() {
  let elements = document.getElementsByClassName('jersey');
  [...elements].forEach(element => {
    element.classList.remove('picture-highlight');
    console.log('element', element.classList);
  });
}
