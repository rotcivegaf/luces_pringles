const ws281x = require('rpi-ws281x-native');

const n = 50; // number of lights

const channel = ws281x(n, { stripType: 'ws2812' });

const colorArray = channel.array;

const Colors = {
  white:   0xFFFFFF,

  red:     0xFF0000,
  blue:    0x00FF00,
  green:   0x0000FF,

  magenta: 0xFFFF00,
  cyan:    0x00FFFF,
  yellow:  0xFF00FF,
}

async function main() {
  while(true) {
    await B();
  }
  ws281x.reset();
  ws281x.finalize();
}

main();

// Effects

async function B() { 
  const colors = Object.values(Colors);

  function getShuffleIndexArray() {
    // Create numbers array
    const indexArray = [];
    for (let i = 0; i < n; i++) {
      indexArray.push(i);
    }
    // Shuffle the array
    let cIndex = indexArray.length;
    while (cIndex != 0) {
      const rIndex = Math.floor(Math.random() * cIndex);
      cIndex--;
      [indexArray[cIndex], indexArray[rIndex]] = [indexArray[rIndex], indexArray[cIndex]];
    }

    return indexArray;
  }

  // Effect
  for (let i = 0; i < colors.length; i++) {
    const indexArray = getShuffleIndexArray();
    for (let j = 0; j < n; j++) {
      colorArray[indexArray.pop()] = colors[i];
      ws281x.render();
      await sleep(2300);
    }
    
    await sleep(10000);
  }
}

async function A() { 
  const colors = Object.values(Colors);
  
  for (let i = 0; i < colors.length; i++) {
    for (let j = 0; j < n; j++) {
      colorArray[j] = colors[i];
      ws281x.render();
      await sleep(2300);
    }

    await sleep(10000);
  }
}


// Helpers

async function allColor(color) {
  for (let i = 0; i < n; i++) {
    colorArray[i] = color;
  }
  ws281x.render();  
}

function randomColor() {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '0x' + n.slice(0, 6);
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
