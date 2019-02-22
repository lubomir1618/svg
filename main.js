// jerseys configuration
const jerseys = {
  jersey_halves: {
    base_color: '',
    collar: ''
  },
   jersey_hooped: {
    base_color: '',
    collar: ''
  },
   jersey_quarters: {
    base_color: '',
    collar: ''
  },

   jersey_plain: {
    base_color: '',
    collar: ''
  },
   jersey_plain_shoulders: {
    base_color: '',
    collar: '',
    shoulders: '',
    shoulders_strips: ''
  },
   jersey_plain_shoulders_cuffs: {
    base_color: '',
    collar: '',
    shoulders: '',
    shoulders_strips: '',
    cuffs: ''
  },

   jersey_vertical_bars_shoulders: {
    base_color: '',
    collar: '',
    shoulders: '',
    shoulders_strips: '',
    cuffs: ''
  },
   jersey_vertical_bars_shoulders_cuffs: {
    base_color: '',
    collar: '',
    shoulders: '',
    shoulders_strips: '',
    cuffs: ''
  },
   jersey_vertical_bars_cuffs: {
    base_color: '',
    collar: '',
    shoulders: '',
    shoulders_strips: '',
    cuffs: ''
  },
}


// jersey click listener
let images = document.querySelectorAll('.jersey');

function watchJerseyClick() {
  const highlight = 'picture-highligt';
  [...images].forEach(
    (image) => {
      image.addEventListener('click', () => {
        removeClass(highlight);
        pasteSVG(image.id);
        drawPicker(image.id)
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

function drawPicker(svg) {
  let pickerContainer = document.getElementById('form');
  let picker = '';

  Object.keys(jerseys[svg]).forEach(param => {

    picker += `
      <input type="color" id="${param}" name="${param}" value="#ffffff">
      <label for="base_color">${param}</label>
      <br>
    `
  });

  pickerContainer.innerHTML = picker;
}

watchJerseyClick();


/*
<input type="color" id="base_color" name="base_color" value="#ffffff">
<label for="base_color">Base color</label>
<br>
*/