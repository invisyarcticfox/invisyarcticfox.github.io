// https://stackoverflow.com/a/40982363/16581955


const hexcode = document.querySelectorAll('.hcodes')

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


hexcode[0].addEventListener('mouseover', function(e) {
    refsheet.classList.add('hexhover');
    overlays[0].classList.add('visible');

    addEventListener('mouseout', function(e) {
        refsheet.classList.remove('hexhover');
        overlays[0].classList.remove('visible');
    })
})

hexcode[1].addEventListener('mouseover', function(e) {
    refsheet.classList.add('hexhover');
    overlays[1].classList.add('visible');

    addEventListener('mouseout', function(e) {
        refsheet.classList.remove('hexhover');
        overlays[1].classList.remove('visible');
    })
})

hexcode[2].addEventListener('mouseover', function(e) {
    refsheet.classList.add('hexhover');
    overlays[2].classList.add('visible');

    addEventListener('mouseout', function(e) {
        refsheet.classList.remove('hexhover');
        overlays[2].classList.remove('visible');
    })
})

hexcode[3].addEventListener('mouseover', function(e) {
    refsheet.classList.add('hexhover');
    overlays[3].classList.add('visible');

    addEventListener('mouseout', function(e) {
        refsheet.classList.remove('hexhover');
        overlays[3].classList.remove('visible');
    })
})

hexcode[4].addEventListener('mouseover', function(e) {
    refsheet.classList.add('hexhover');
    overlays[4].classList.add('visible');

    addEventListener('mouseout', function(e) {
        refsheet.classList.remove('hexhover');
        overlays[4].classList.remove('visible');
    })
})

hexcode[5].addEventListener('mouseover', function(e) {
    refsheet.classList.add('hexhover');
    overlays[5].classList.add('visible');

    addEventListener('mouseout', function(e) {
        refsheet.classList.remove('hexhover');
        overlays[5].classList.remove('visible');
    })
})

hexcode[6].addEventListener('mouseover', function(e) {
    refsheet.classList.add('hexhover');
    overlays[6].classList.add('visible');

    addEventListener('mouseout', function(e) {
        refsheet.classList.remove('hexhover');
        overlays[6].classList.remove('visible');
    })
})

// is there a better way to do this?