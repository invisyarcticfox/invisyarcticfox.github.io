const ws = new WebSocket('wss://api.lanyard.rest/socket');
const discordurl = 'https://cdn.discordapp.com';
const statustxt = document.querySelector('#head div span')
const spotifycont = document.querySelector('.spotify')
const spotifycover = document.querySelector('.spotify .cover')
const spotifytitle = document.querySelector('.spotify .title')
const spotifyartist = document.querySelector('.spotify .artist')
const spotifyalbum = document.querySelector('.spotify .album')
const spotifylink = document.querySelector('.links span[link="spotify"] a')
const lastfmlink = document.querySelector('.links span[link="lastfm"] a')


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
      case false:
        spotifycont.style.display = 'none'
        break;
      case true:
        spotifycont.style.display = 'block'
        break;

      default:
        spotifycont.style.display = 'none'
        break;
    }

    if (!data.d.spotify.track_id) {
      spotifycover.src = './assets/img/cover.png'
    } else {
      spotifycover.src = data.d.spotify.album_art_url	
    }

    spotifytitle.innerHTML = data.d.spotify.song
    spotifyartist.innerHTML = '<span style="color: #ccc">By </span><i>'+data.d.spotify.artist+'</i>'
    spotifyalbum.innerHTML = '<span style="color: #ccc">On </span><i>'+data.d.spotify.album+'</i>'

    spotifylink.href = `https://open.spotify.com/track/${data.d.spotify.track_id}`
    lastfmlink.href = `https://www.last.fm/music/${data.d.spotify.artist.split(';')[0]}/_/${data.d.spotify.song}`

    // this all could probably be done better lol
  } catch{}
}

ws.onerror = () => {
  try {
    document.querySelector('#head div').innerHTML = '<i style="opacity: .5;">lanyard broke lol</i><br><img src="https://i.imgur.com/A8YEwrw.png">'
  }
  catch{}
}