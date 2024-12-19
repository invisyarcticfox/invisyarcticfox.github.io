function createArtElement(data) {
  const cont = document.createElement('div')
  const imgurl = 'https://cdn.invisyarcticfox.uk/art'
  cont.className = 'cont'
  cont.innerHTML = `
    <img src='${imgurl}/${data.file}' alt='${data.artist}' loading='lazy' style='background-image: url(${imgurl}/small/${data.file}); background-size: contain;'>
    <div class="caption">
      <a href='${data.artisturl}' target='_blank' rel='noopener noreferrer'>
        @<u>${data.artist}</u>
      </a>
    </div>
  `
  return cont
}

async function getArt() {
  const url = 'https://api.invisyarcticfox.uk/sonaart'
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