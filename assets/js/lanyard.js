const ws = new WebSocket('wss://api.lanyard.rest/socket');
const discordurl = 'https://cdn.discordapp.com';
const uid = '470193291053498369';
const spotifycont = document.querySelector('.spotify')
const spotifycover = document.querySelector('.spotify .cover')
const spotifytitle = document.querySelector('.spotify .title a')
const spotifyartist = document.querySelector('.spotify .artist')
const spotifyalbum = document.querySelector('.spotify .album')


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
            subscribe_to_id: uid
          }
        }));
        setInterval(() => {
          ws.send(JSON.stringify({
            op: 3
          }))
        }, data.d.heartbeat_interval);
        break
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
      spotifycover.src = './assets/cover.png'
      spotifytitle.removeAttribute('href')
      spotifytitle.removeAttribute('target')
      spotifytitle.removeAttribute('rel')
      spotifytitle.style.color = '#fff'
      spotifytitle.style.textDecoration  = 'none'
    } else {
      spotifycover.src = data.d.spotify.album_art_url	
      spotifytitle.setAttribute('href', `https://open.spotify.com/track/${data.d.spotify.track_id}`)
      spotifytitle.setAttribute('target', '_blank')
      spotifytitle.setAttribute('rel', 'noopener noreferrer')
      spotifytitle.removeAttribute('style')
    }

    spotifytitle.innerHTML = data.d.spotify.song
    spotifyartist.innerHTML = '<span style="color: #ccc">By </span><i>'+data.d.spotify.artist+'</i>'
    spotifyalbum.innerHTML = '<span style="color: #ccc">On </span><i>'+data.d.spotify.album+'</i>'


    // this could probably be done better lol
  } catch{}
}