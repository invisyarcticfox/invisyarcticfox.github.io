const ws = new WebSocket('wss://api.lanyard.rest/socket');
const discordurl = 'https://cdn.discordapp.com';
const uid = '470193291053498369';
const spotifycont = document.querySelector('.spotify')
const spotifycover = document.querySelector('.spotify .cover')
const spotifytitle = document.querySelector('.spotify .title a')
const spotifyartist = document.querySelector('.spotify .artist')


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

    if (data.d.listening_to_spotify === false) {
      spotifycont.style.display = 'none'
    } else {
      spotifycont.style.display = 'block'
    }

    if (!data.d.spotify.track_id && !data.d.spotify.album_art_url) {
      spotifytitle.href = ''
      spotifycover.src = './assets/cover.png'
    } else {
      spotifytitle.href = 'https://open.spotify.com/track/'+data.d.spotify.track_id
      spotifycover.src = data.d.spotify.album_art_url
    }
    spotifytitle.innerHTML = data.d.spotify.song ?? ''
    spotifyartist.innerHTML = data.d.spotify.artist ?? ''

  } catch{}
}