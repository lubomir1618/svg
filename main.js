// jerseys configuration
const svgLocation = './jerseys/';

const color_type_names = {
  main: 'Main color (torso)',
  secondary: 'Secondary color',
  accent: 'Collar / strips'
}
// for new or different jersey just add it to this object and to svgLocation
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

function watchJerseyClick() {
  const highlight = 'picture-highlight';
  const svg1st = Object.keys(jerseys)[0]; 
  let images = document.querySelectorAll('.jersey');

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

  drawPicker(svg1st);
  pasteSVG(svgLocation + svg1st + '.svg', '#svg');
}

function removeClass(name) {
  let images = document.querySelectorAll('.jersey');

  [...images].forEach(
    (image) => {
      image.classList.remove(name);
    }
  );
};

function pasteSVG(svg, element) {
  fetch(svg).then(response => {
    return response.text()
  }).then(data => {
    document.querySelector(element).innerHTML = data;
    getColorsToPicker();
  })
}

function changeColorShade(color, percent) {
  //-n darken, n lighten
  let num = parseInt(color, 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = (num >> 8 & 0x00FF) + amt,
    G = (num & 0x0000FF) + amt;

  return (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (B < 255 ? B < 1 ? 0 : B : 255) * 0x100 + (G < 255 ? G < 1 ? 0 : G : 255)).toString(16).slice(1);
};

function svgStyleHandler() {
  const pickerContainer = document.querySelector('#form');
  let newStyle = '';
  let style = document.querySelector('#svg').querySelector('svg').getElementsByTagName('style')[0];
  let cssRules = style.sheet.cssRules;

  newStyle += '.shade{opacity:0.1;fill:#010101;}\n';

  [...cssRules].forEach(rule => {
    let color;
    color = pickerContainer.querySelector('#' + rule.selectorText.substr(1));

    if (color) {
      newStyle += rule.selectorText + '{fill:' + color.value + '} \n';
      newStyle += rule.selectorText !== '.secondary' ? rule.selectorText + '-shade' + '{fill:#' + changeColorShade(color.value.substr(1), -15) + '} \n' : '';
    }
  });

  style.innerHTML = newStyle;
  generateSVGLink();
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
    if (cssClasses.includes(cssSelector)) {
      form.querySelector('#' + cssSelector).value = rgbToHex(rule.style.fill);
      form.querySelector('#' + cssSelector + '-own').value = rgbToHex(rule.style.fill);
    }
  });

  svgStyleHandler();
}

function updateInputValue(from, to) {
  let source = document.querySelector('#' + from).value;
  const target = document.querySelector('#' + to).value;

  source = source.includes('#') ? source : '#' + source
  document.querySelector('#' + to).value = source;
  if (source !== target) {
    svgStyleHandler();
  }
}

function generateSVGLink() {
  svg = document.querySelector('#svg').querySelector('svg');

  serializer = new XMLSerializer();
  source = serializer.serializeToString(svg);
  source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

  url = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
  document.querySelector('#url').innerHTML = `<a href="${url}" title="Download the jersey" download>Download the jersey</a>`;
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
      <label for="${param}">${color_type_names[param]}</label><br/>
      <input type="color" id="${param}" name="${param}" value="#ffffff" onChange="updateInputValue('${param}', '${param}-own')" title="pick the color"/>
      <input type="text" name="${param}-own" id="${param}-own" value="ffffff" onChange="updateInputValue('${param}-own', '${param}')" title="or add your own color e.g. #ff0000"/> 
      <br/><br/>
    `
  });

  pickerContainer.innerHTML = picker;
}

function drawImages() {
  let images = document.querySelector('#content').querySelector('#pictures');
  let content = ''; 
  images.innerHTML = '<p class="loading">&nbsp;</p>';

  Object.keys(jerseys).forEach((image, index) => {
    content += `<img src="${svgLocation}${image}.svg" alt="${image}" id="${image}" class="jersey ${index === 0 ? 'picture-highlight': ''}"/>\n`;
  });

  images.innerHTML = content;

  watchJerseyClick(); 
}

drawImages();
