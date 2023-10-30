const APIRUL = 'https://api.lanyard.rest/v1/users/'
const DISCCDN = 'https://cdn.discordapp.com'
const USERID = '470193291053498369'
const pfp = document.getElementById('pfp')
const spotifylink = document.querySelector('.spotifylink')

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
    spotifylink.style.opacity = ""
    spotifylink.style.cursor = ""
    spotifylink.removeAttribute("href")
    return
  } else {
    const {
      data: {
        spotify: {
          track_id,
          album,
          artist,
          song
        }
      }
    } = await fetchResponse(USERID)
    spotifylink.style.opacity = "1"
    spotifylink.style.cursor = "pointer"
    spotifylink.title = `${song} - ${artist}`
    spotifylink.href = `https://open.spotify.com/track/${track_id}`
    if(!track_id) {
      spotifylink.removeAttribute("href")
      spotifylink.style.cursor = ""
      spotifylink.title = `${song} - ${artist}\n`
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