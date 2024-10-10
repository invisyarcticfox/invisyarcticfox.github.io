async function getArt() {
  const url = "https://cdn.invisyarcticfox.uk/sonaart.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    
    // https://jsfiddle.net/jbke43to/
    Object.keys(json).forEach(function(key){
      const cont = document.createElement('div')
      cont.setAttribute('class', 'cont')

      document.querySelector('div.gallery').insertBefore(cont, document.querySelector('div#imagesgohere'))
      cont.innerHTML = `
        <img src='${json[key].imgurl}' alt='${json[key].artist}' loading='lazy'>
        <figcaption>
          <a href='${json[key].artisturl}' target='_blank' rel='noopener noreferrer'>
            @<u>${json[key].artist}</u>
          </a>
        </figcaption>
      `
    })

    var el = document.querySelectorAll('figcaption');
    for(var i=0;i<el.length;i++){
      el[i].style.bottom = `${el[0].clientHeight}px`;
    }

  } catch (error) {
    console.error(error.message);
  }
}
getArt()