const ws = new WebSocket('wss://api.lanyard.rest/socket');
const discordurl = 'https://cdn.discordapp.com';
const uid = '470193291053498369';
const pfp = document.querySelector('#avatar #pfp');
const spotifylink = document.querySelector('.spotifylink');
const spotifytt = document.querySelector('.tooltip');
const spotifytxt = document.querySelector('.tooltip .txt');


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

    
    pfp.title = data.d.discord_status
    pfp.src = discordurl+'/avatars/'+uid+'/'+data.d.discord_user.avatar+'?size=512';

    if(data.d.listening_to_spotify === true){
      const artistsplit = data.d.spotify.artist.split(';')

      spotifylink.style.display = 'block';
      spotifytt.style = ''
      spotifytxt.innerHTML = data.d.spotify.song+' - '+artistsplit[0]

      if(data.d.spotify.track_id !== null) {
        spotifylink.href = 'https://open.spotify.com/track/'+data.d.spotify.track_id
      } else {
        spotifylink.removeAttribute('href')
      }
    } else {
      spotifylink.style.display = 'none';
      spotifytt.style.display = 'none'
      spotifytxt.innerHTML = ''
      spotifylink.removeAttribute('href')
    }

  } catch{}
}