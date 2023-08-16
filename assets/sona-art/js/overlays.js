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
const refsheet = document.querySelector("img.ref")


colours[0].addEventListener('mouseover', function(e) {
    refsheet.classList.add('green1');
    overlays[0].classList.add('visible');

    addEventListener('mouseout', function(e) {
        refsheet.classList.remove('green1');
        overlays[0].classList.remove('visible');
    })
})

colours[1].addEventListener('mouseover', function(e) {
    refsheet.classList.add('green1');
    overlays[1].classList.add('visible');

    addEventListener('mouseout', function(e) {
        refsheet.classList.remove('green1');
        overlays[1].classList.remove('visible');
    })
})

colours[2].addEventListener('mouseover', function(e) {
    refsheet.classList.add('green1');
    overlays[2].classList.add('visible');

    addEventListener('mouseout', function(e) {
        refsheet.classList.remove('green1');
        overlays[2].classList.remove('visible');
    })
})

colours[3].addEventListener('mouseover', function(e) {
    refsheet.classList.add('green1');
    overlays[3].classList.add('visible');

    addEventListener('mouseout', function(e) {
        refsheet.classList.remove('green1');
        overlays[3].classList.remove('visible');
    })
})

colours[4].addEventListener('mouseover', function(e) {
    refsheet.classList.add('green1');
    overlays[4].classList.add('visible');

    addEventListener('mouseout', function(e) {
        refsheet.classList.remove('green1');
        overlays[4].classList.remove('visible');
    })
})

colours[5].addEventListener('mouseover', function(e) {
    refsheet.classList.add('green1');
    overlays[5].classList.add('visible');

    addEventListener('mouseout', function(e) {
        refsheet.classList.remove('green1');
        overlays[5].classList.remove('visible');
    })
})

colours[6].addEventListener('mouseover', function(e) {
    refsheet.classList.add('green1');
    overlays[6].classList.add('visible');

    addEventListener('mouseout', function(e) {
        refsheet.classList.remove('green1');
        overlays[6].classList.remove('visible');
    })
})
