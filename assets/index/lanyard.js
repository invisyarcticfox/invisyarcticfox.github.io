const APIRUL = 'https://api.lanyard.rest/v1/users/'
const DISCCDN = 'https://cdn.discordapp.com'
const USERID = '470193291053498369'
const pfp = document.getElementById('pfp')
const spotifylink = document.querySelector('.spotifylink')
const spotifytt = document.querySelector('.tooltip .txt')

async function fetchResponse(USERID) {
  try {
    const res = await fetch(APIRUL+USERID)
    return await res.json()
  } catch (err) {
    console.error(err)
  }
}

async function setAvatar() {
  const {
    data: {
      discord_user: {
        avatar
      }
    }
  } = await fetchResponse(USERID)
  const avaturl = `${DISCCDN}/avatars/${USERID}/${avatar}?size=512`
  pfp.src = avaturl
}

async function setListening() {
  const {
    data: {
      listening_to_spotify
    }
  } = await fetchResponse(USERID)
  if(!listening_to_spotify) {
    spotifylink.removeAttribute('href')
    spotifylink.removeAttribute('style')
    return
  } else {
    const {
      data: {
        spotify: {
          track_id,
          artist,
          song
        }
      }
    } = await fetchResponse(USERID)
    spotifylink.style.display = 'block'
    spotifytt.innerHTML = `${song} - ${artist}`
    spotifylink.href = `https://open.spotify.com/track/${track_id}`
    if(!track_id) {
      spotifylink.removeAttribute('href')
      spotifylink.style.cursor = 'default'
    }
  }
}

function invoke() {
  console.log(APIRUL+USERID)
  setInterval(() => {
    setListening()
  }, 2500);
  setAvatar()
}
invoke()