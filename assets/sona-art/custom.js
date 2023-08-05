// https://stackoverflow.com/a/40982363/16581955

const colours = [
    green1 = document.querySelector(".hcodes[style*='background: #99c317;'"),
    green2 = document.querySelector(".hcodes[style*='background: #ccff00;'"),
    pink = document.querySelector(".hcodes[style*='background: #f093c8;'"),
    grey = document.querySelector(".hcodes[style*='background: #7f7f7f;'"),
    black = document.querySelector(".hcodes[style*='background: #212121;'"),
    white = document.querySelector(".hcodes[style*='background: #ffffff;'"),
    blue = document.querySelector(".hcodes[style*='background: #172758;'")
]
const overlays = [
    green1_0 = document.querySelector("img[src*='/overlays/99c317']"),
    green2_0 = document.querySelector("img[src*='/overlays/ccff00']"),
    pink_0 = document.querySelector("img[src*='/overlays/f093c8']"),
    grey_0 = document.querySelector("img[src*='/overlays/7f7f7f']"),
    black_0 = document.querySelector("img[src*='/overlays/212121']"),
    white_0 = document.querySelector("img[src*='/overlays/ffffff']"),
    blue_0 = document.querySelector("img[src*='/overlays/172758']")
]
const refsheet = document.querySelector("img#ref")


colours[0].addEventListener('mouseover', function(e) { refsheet.classList.add('green1');})
colours[0].addEventListener('mouseout', function(e) { refsheet.classList.remove('green1');})
colours[0].addEventListener('mouseover', function(e) { overlays[0].classList.add('visible');})
colours[0].addEventListener('mouseout', function(e) { overlays[0].classList.remove('visible');})

colours[1].addEventListener('mouseover', function(e) { refsheet.classList.add('green2');})
colours[1].addEventListener('mouseout', function(e) { refsheet.classList.remove('green2');})
colours[1].addEventListener('mouseover', function(e) { overlays[1].classList.add('visible');})
colours[1].addEventListener('mouseout', function(e) { overlays[1].classList.remove('visible');})

colours[2].addEventListener('mouseover', function(e) { refsheet.classList.add('pink');})
colours[2].addEventListener('mouseout', function(e) { refsheet.classList.remove('pink');})
colours[2].addEventListener('mouseover', function(e) { overlays[2].classList.add('visible');})
colours[2].addEventListener('mouseout', function(e) { overlays[2].classList.remove('visible');})

colours[3].addEventListener('mouseover', function(e) { refsheet.classList.add('grey');})
colours[3].addEventListener('mouseout', function(e) { refsheet.classList.remove('grey');})
colours[3].addEventListener('mouseover', function(e) { overlays[3].classList.add('visible');})
colours[3].addEventListener('mouseout', function(e) { overlays[3].classList.remove('visible');})

colours[4].addEventListener('mouseover', function(e) { refsheet.classList.add('black');})
colours[4].addEventListener('mouseout', function(e) { refsheet.classList.remove('black');})
colours[4].addEventListener('mouseover', function(e) { overlays[4].classList.add('visible');})
colours[4].addEventListener('mouseout', function(e) { overlays[4].classList.remove('visible');})

colours[5].addEventListener('mouseover', function(e) { refsheet.classList.add('white');})
colours[5].addEventListener('mouseout', function(e) { refsheet.classList.remove('white');})
colours[5].addEventListener('mouseover', function(e) { overlays[5].classList.add('visible');})
colours[5].addEventListener('mouseout', function(e) { overlays[5].classList.remove('visible');})

colours[6].addEventListener('mouseover', function(e) { refsheet.classList.add('blue');})
colours[6].addEventListener('mouseout', function(e) { refsheet.classList.remove('blue');})
colours[6].addEventListener('mouseover', function(e) { overlays[6].classList.add('visible');})
colours[6].addEventListener('mouseout', function(e) { overlays[6].classList.remove('visible');})
