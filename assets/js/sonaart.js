function createArtElement(data) {
  const cont = document.createElement('div')
  cont.className = 'cont'
  cont.innerHTML = `
    <img src='${data.imgurl}' alt='${data.artist}' loading='lazy' style='background-image: url(${data.smallimgurl}); background-size: contain;'>
    <figcaption>
      <a href='${data.artisturl}' target='_blank' rel='noopener noreferrer'>
        @<u>${data.artist}</u>
      </a>
    </figcaption>
  `
  return cont
}

async function getArt() {
  const url = "https://cdn.invisyarcticfox.uk/sonaart.json"
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Response status: ${response.status}`)
    const json = await response.json()

    const gallery = document.querySelector('div.gallery')
    const imagesPlaceholder = document.querySelector('div#imagesgohere')

    Object.keys(json).forEach((key) => {
      const data = json[key]
      const artElement = createArtElement(data)
      gallery.insertBefore(artElement, imagesPlaceholder)
    })
  } catch (error) {
    console.error(error.message)
  }
}

getArt()