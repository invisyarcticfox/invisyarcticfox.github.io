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
        <img src='${json[key].imgurl}' alt='${json[key].artist}' loading='lazy' style='background-image: url(${json[key].smallimgurl}); background-size: contain;'>
        <figcaption>
          <a href='${json[key].artisturl}' target='_blank' rel='noopener noreferrer'>
            @<u>${json[key].artist}</u>
          </a>
        </figcaption>
      `
    })

  } catch (error) {
    console.error(error.message);
  }
}
getArt()