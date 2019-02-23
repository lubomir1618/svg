// jerseys configuration
let finalJersey;
const svgLocation = './jerseys/';

const color_type_names = {
  main: 'main color (torso)',
  secondary: 'secondary color',
  accent: 'collar / shoulders strips / cuffs'
}
const jerseys = {
  jersey_halves: ['main', 'secondary', 'accent'],
  jersey_hooped: ['main', 'secondary', 'accent'],
  jersey_quarters: ['main', 'secondary', 'accent'],

  jersey_plain: ['main', 'accent'],
  jersey_plain_shoulders: ['main', 'secondary', 'accent'],
  jersey_plain_shoulders_cuffs: ['main', 'accent'],

  jersey_vertical_bars_shoulders: ['main', 'secondary', 'accent'],
  jersey_vertical_bars_cuffs: ['main', 'secondary', 'accent'],
  jersey_vertical_bars_shoulders_cuffs: ['main', 'secondary', 'accent'],
}

// jersey click listener
let images = document.querySelectorAll('.jersey');

function watchJerseyClick() {
  const highlight = 'picture-highligt';  

  [...images].forEach(
    (image) => {
      image.addEventListener('click', () => {
        let svg = svgLocation + '' + image.id + '.svg';

        removeClass(highlight);
        pasteSVG(svg, '#svg');
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

function watchPickerClick() {
  return
};

function pasteSVG(svg, element) {
  fetch(svg).then(response => {
    return response.text()
  }).then(data => {
    finalJersey = data;
    document.querySelector(element).innerHTML = finalJersey;
    getColorsToPicker();
    svgStyleHandler();
  })
}

function changeColorShade(color, percent) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R < 255) ? R : 255;
  G = (G < 255) ? G : 255;
  B = (B < 255) ? B : 255;

  const RR = ((R.toString(16).length == 1) ? '0' + R.toString(16) : R.toString(16));
  const GG = ((G.toString(16).length == 1) ? '0' + G.toString(16) : G.toString(16));
  const BB = ((B.toString(16).length == 1) ? '0' + B.toString(16) : B.toString(16));

  return '#' + RR + GG + BB;
};

function svgStyleHandler() {
  let style = document.querySelector('#svg').querySelector('svg').getElementsByTagName('style')[0];
  console.log(style);
  //debugger;
}

function getColorsToPicker() {
  const svg = document.querySelector('svg');
  const svgRules = svg.getElementsByTagName('style')[0].sheet.cssRules;
  const cssClasses = [];
  let form = document.querySelector('#form'); 

  Object.keys(color_type_names).forEach(color => {
    cssClasses.push(color);
  });

  [...svgRules].forEach(rule => {
    const cssSelector = rule.selectorText.substr(1);
    if(cssClasses.includes(cssSelector)) {
      form.querySelector('#' + cssSelector).value = rgbToHex(rule.style.fill);
    }
  });
}

function rgbToHex(rgb) { 
  rgb = rgb.match(/\d+/g);

  return '#' + rgb.map(function (number) {
    let hex = Number(number).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

function drawPicker(svg) {
  let pickerContainer = document.getElementById('form');
  let svgContainer = document.getElementById('svg');
  let picker = '';

  svgContainer.innerHTML = '<p class="loading"></p>';
  jerseys[svg].forEach(param => {
    picker += `
      <input type="color" id="${param}" name="${param}" value="#FFFFFF"/>
      <label for="base_color">${color_type_names[param]}</label>
      <br/>
    `
  });

  pickerContainer.innerHTML = picker;
}

watchJerseyClick();
watchPickerClick();
