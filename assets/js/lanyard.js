const ws = new WebSocket('wss://api.lanyard.rest/socket');
const discordurl = 'https://cdn.discordapp.com';
const statustxt = document.querySelector('#head span b')
const actcont = document.querySelector('.actcont')
const actspotify = document.querySelector('.actcont .spotify')
const spotifyimg = document.querySelector('.spotify img')
const spotifysong = document.querySelector('.spotify .song')
const spotifyalbum = document.querySelector('.spotify .album')
const spotifyartist = document.querySelector('.spotify .artist')
const spotifyurl = document.querySelector('.spotify a.spoturl')
const spotifylfmurl = document.querySelector('.spotify a.lfmurl')


ws.onopen = console.log('WebSocket open!')
ws.onmessage = ({data: msg}) => {
  try {
    const data = JSON.parse(msg);
    console.log(data)
    switch (data.op) {
      case 1:
        ws.send(JSON.stringify({
          op: 2,
          d: {
            subscribe_to_id: '470193291053498369'
          }
        }));
        setInterval(() => {
          ws.send(JSON.stringify({
            op: 3
          }))
        }, data.d.heartbeat_interval);
        break
    }


    switch (data.d.discord_status) {
      case "online":
        statustxt.innerHTML = data.d.discord_status
        statustxt.style.color = '#23A55A'
        break;
      case "idle":
        statustxt.innerHTML = data.d.discord_status
        statustxt.style.color = '#F0B232'
        break
      case "dnd":
        statustxt.innerHTML = data.d.discord_status
        statustxt.style.color = '#F23F43'
        break
      case "offline":
        statustxt.innerHTML = data.d.discord_status
        statustxt.style.color = '#80848E'
        break
      default:
        statustxt.innerHTML = 'offline'
        statustxt.style.color = '#80848E'
        break;
    }

    switch (data.d.listening_to_spotify) {
      case true:
        actspotify.style.display = 'block'
        if (!data.d.spotify.track_id) {
          spotifyimg.src = './assets/img/cover.png'
          spotifyurl.href = ''
        } else {
          spotifyimg.src = data.d.spotify.album_art_url
          spotifyurl.href = `https://open.spotify.com/track/${data.d.spotify.track_id}`
        }
        spotifysong.innerHTML = `<b>${data.d.spotify.song}</b>`
        spotifyalbum.innerHTML = `<empty style='color: #aaa'>On </empty><i>${data.d.spotify.album}</i>`
        spotifyartist.innerHTML = `<empty style='color: #aaa'>By </empty><i>${data.d.spotify.artist}</i>`
        spotifylfmurl.href = `https://last.fm/music/${data.d.spotify.artist}/_/${data.d.spotify.song}`
        break;
      case false:
        actspotify.style.display = 'none'
        break
      default:
        actspotify.style.display = 'none'
    }

    // this all could probably be done better lol
  } catch{}
}
