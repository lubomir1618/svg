// jerseys configuration

const jersey_halves = {
  base_color: '',
  collar: ''
};
const jersey_hooped = {
  base_color: '',
  collar: ''
};
const jersey_quarters = {
  base_color: '',
  collar: ''
};

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

const jersey_vertical_bars_shoulders = {
  base_color: '',
  collar: '',
  shoulders: '',
  shoulders_strips: '',
  cuffs: ''
};
const jersey_vertical_bars_shoulders_cuffs = {
  base_color: '',
  collar: '',
  shoulders: '',
  shoulders_strips: '',
  cuffs: ''
};
const jersey_vertical_bars_cuffss = {
  base_color: '',
  collar: '',
  shoulders: '',
  shoulders_strips: '',
  cuffs: ''
};

// jersey click listener
let images = document.querySelectorAll('.jersey');

function watchJerseyClick() {
  const highlight = 'picture-highligt';
  [...images].forEach(
    (image) => {
      image.addEventListener('click', () => {
        removeClass(highlight);
        pasteSVG(image.id);
        image.classList.add(highlight);
      });
    }
  );
}

function removeClass(name) {
  let images = document.querySelectorAll('.jersey');

  [...images].forEach(
    (image) => {
      image.classList.remove(name);
    }
  );
};

function pasteSVG(svg) {
  let svgContainer = document.getElementById('svg');

  svg = '<img src="./jerseys/' + svg +'.svg" />';
  svgContainer.innerHTML = svg;
};

watchJerseyClick();


/*
<input type="color" id="base_color" name="base_color" value="#ffffff">
<label for="base_color">Base color</label>
<br>
*/