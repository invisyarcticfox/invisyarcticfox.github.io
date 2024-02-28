const ws = new WebSocket('wss://api.lanyard.rest/socket');
const discordurl = 'https://cdn.discordapp.com';
const userid = '470193291053498369';
const avatar = document.querySelector('#avatar #pfp');
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
            subscribe_to_id: userid
          }
        }));
        setInterval(() => {
          ws.send(JSON.stringify({
            op: 3
          }))
        }, data.d.heartbeat_interval);
        break
    }


    // idle: #f0b232
    // online: #23a55a
    // dnd: #f23f43
    // offline: #80848e


    avatar.src = discordurl+'/avatars/'+userid+'/'+data.d.discord_user.avatar+'?size=512';
    // i hate long urls >:(

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