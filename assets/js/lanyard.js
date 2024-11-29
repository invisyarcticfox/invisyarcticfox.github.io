const ws = new WebSocket('wss://api.lanyard.rest/socket');
const elem = {
  statustxt: document.querySelector('#head span b'),
  actspotify: document.querySelector('.actcont .spotify'),
  spotifyimg: document.querySelector('.spotify img'),
  spotifysong: document.querySelector('.spotify .song'),
  spotifyalbum: document.querySelector('.spotify .album'),
  spotifyartist: document.querySelector('.spotify .artist'),
  spotifyurl: document.querySelector('.spotify a.spoturl'),
  spotifylfmurl: document.querySelector('.spotify a.lfmurl')
}


function updateDiscordStatus(status) {
  const statusColors = {
    online: '#23A55A',
    idle: '#F0B232',
    dnd: '#F23F43',
    offline: '#80848E'
  }
  elem.statustxt.innerHTML = status || 'offline';
  elem.statustxt.style.color = statusColors[status] || '#80848E';
}

function updateSpotifyDetails(spotifyData) {
  if (spotifyData) {
    elem.spotifyimg.src = spotifyData.album_art_url || './assets/img/cover.png';
    elem.spotifyurl.href = spotifyData.track_id
      ? `https://open.spotify.com/track/${spotifyData.track_id}`
      : 'https://open.spotify.com/track/';
    elem.spotifysong.innerHTML = `<b>${spotifyData.song}</b>`;
    elem.spotifyalbum.innerHTML = `<span style='color: #aaa; display: unset;'>On</span> <i>${spotifyData.album}</i>`;
    elem.spotifyartist.innerHTML = `<span style='color: #aaa; display: unset;'>By</span> <i>${spotifyData.artist}</i>`;
    elem.spotifylfmurl.href = `https://last.fm/music/${encodeURIComponent(spotifyData.artist).split('%3B')[0]}/_/${spotifyData.song}`;
                                                      // encode for a very specific artist    // split also for a very specific artist
  }
}


ws.onopen = console.log('WebSocket open!');
ws.onmessage = ({data: msg}) => {
  try {
    const data = JSON.parse(msg);
    console.log(data);
    switch (data.op) {
      case 1:
        ws.send(JSON.stringify({
          op: 2,
          d: {
            subscribe_to_id: '470193291053498369',
          },
        }));
        setInterval(() => {
          ws.send(JSON.stringify({
            op: 3
          }));
        }, data.d.heartbeat_interval);
        break;
    };

    updateDiscordStatus(data.d.discord_status);

    if (data.d.listening_to_spotify) {
      elem.actspotify.style.display = 'block';
      updateSpotifyDetails(data.d.spotify);
    } else {
      elem.actspotify.style.display = 'none';
    }

  } catch (error) {
    console.error('Error processing WebSocket message:', error.message);
  }
}

window.addEventListener('beforeunload', () => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.close();
  }
})
