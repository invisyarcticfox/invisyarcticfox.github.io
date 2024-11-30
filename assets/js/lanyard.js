const ws = new WebSocket('wss://api.lanyard.rest/socket');
const discordurl = 'https://cdn.discordapp.com'
const statustxt = document.querySelector('#head span b');
const avtpfp = document.querySelector('.imgs .avt');
const avtdecor = document.querySelector('.imgs .decor');

const spotify = {
  container: document.querySelector('.actcont .spotify'),
  albumcover: document.querySelector('.spotify img'),
  songtitle: document.querySelector('.spotify .song'),
  albumtitle: document.querySelector('.spotify .album'),
  artisttitle: document.querySelector('.spotify .artist'),
  spoturl: document.querySelector('.spotify a.spoturl'),
  lastfmurl: document.querySelector('.spotify a.lfmurl'),
  progressbar: document.querySelector('.spotify .progbar')
}
const game = {
  container: document.querySelector('.actcont .game'),
  image: document.querySelector('.game img'),
  name: document.querySelector('.game .name'),
  details: document.querySelector('.game .details'),
  state: document.querySelector('.game .state'),
  timer: document.querySelector('.game .timer')
}


function updateDiscordStatus(status) {
  const statusColors = {
    online: '#23A55A',
    idle: '#F0B232',
    dnd: '#F23F43',
    offline: '#80848E'
  }
  statustxt.innerHTML = status || 'offline';
  statustxt.style.color = statusColors[status] || '#80848E';
}

function updateDiscordDecoration(decorData) {
  if (decorData?.asset) {
    avtpfp.style.borderRadius = '50%';
    avtdecor.src = `${discordurl}/avatar-decoration-presets/${decorData.asset}?passthrough=true`
    avtdecor.style.opacity = '1'
  } else {
    avtpfp.style.borderRadius = '0';
    avtdecor.src = ''
    avtdecor.style.opacity = '0'
  }
}

function updateSpotifyDetails(spotifyData) {
  if (spotifyData) {
    spotify.albumcover.src = spotifyData.album_art_url || './assets/img/cover.png';
    spotify.spoturl.href = spotifyData.track_id ? `https://open.spotify.com/track/${spotifyData.track_id}` : 'https://open.spotify.com/track/';
    spotify.songtitle.innerHTML = `<b>${spotifyData.song}</b>`;
    spotify.albumtitle.innerHTML = `<span style='color: #aaa; display: unset;'>On</span> <i>${spotifyData.album}</i>`;
    spotify.artisttitle.innerHTML = `<span style='color: #aaa; display: unset;'>By</span> <i>${spotifyData.artist}</i>`;
    spotify.lastfmurl.href = `https://last.fm/music/${encodeURIComponent(spotifyData.artist).split('%3B')[0]}/_/${spotifyData.song}`;
                                                      // encode for a very specific artist    // split also for a very specific artist
    
    const duration = spotifyData.timestamps.end - spotifyData.timestamps.start
    function updateProgBar() {
      const curTime = Date.now()
      const elapTime = curTime - spotifyData.timestamps.start
        spotify.progressbar.style.transitionDuration = ''
      if (elapTime >= 0 && elapTime <= duration) {
        const progBarPerc = (elapTime / duration) * 100
        spotify.progressbar.style.width = `${progBarPerc}%`
      } else if (elapTime > duration) {
        clearInterval(intervalId)
        spotify.progressbar.style.width = '0'
        spotify.progressbar.style.transitionDuration = '500ms'
      }
    }
    const intervalId = setInterval(updateProgBar, 1000)
  }
}

let startTime = null
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    hours.toString().padStart(2, '0'),
    minutes.toString().padStart(2, '0'),
    seconds.toString().padStart(2, '0')
  ].join(':');
}
function updateTimer() {
  if (!startTime) return;

  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;
  game.timer.textContent = formatTime(elapsedTime);
}
setInterval(updateTimer, 1000)

function updateGameDetails(gameData) {
  if (gameData) {
    game.container.style.visibility = 'visible'
    game.container.style.opacity = '1'
    game.name.innerHTML = `<b>${gameData.name}</b>` ? `<b>${gameData.name}</b>` : '.';
    game.details.innerHTML = gameData.details ? gameData.details : '.';
    game.state.innerHTML = gameData.state ? gameData.state : '.';
    if (!gameData.assets.large_image) {
      game.image.src = './assets/img/cover.png'
    } else {
      game.image.src = `${discordurl}/app-assets/${gameData.application_id}/${gameData.assets.large_image}`
    }
  } else {
    game.container.style.visibility = 'hidden'
    game.container.style.opacity = '0'
  }
}
// for some reason the activity doesnt disappear when its stopped. too bad!
// i dont know shit from fuck
// tbh its fine anyway the timer still increases so it looks like im still playing whatever until you refresh


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
    const fuckingfilter = data.d.activities?.filter(m => m.type == 0)?.shift()

    updateDiscordStatus(data.d.discord_status);
    updateDiscordDecoration(data.d.discord_user?.avatar_decoration_data)

    switch (data.d.listening_to_spotify) {
      case true:
        spotify.container.style.visibility = 'visible';
        spotify.container.style.opacity = '1';
        updateSpotifyDetails(data.d.spotify);
        break;
      case false:
        spotify.container.style.opacity = '0';
        break;
      default:
        spotify.container.style.visibility = 'hidden';
        spotify.container.style.opacity = '0';
        break;
    }

    // if (fuckingfilter) {
    //   startTime = fuckingfilter?.timestamps.start
    //   updateGameDetails(fuckingfilter)
    //   updateTimer()
    // }

  } catch (error) {
    console.error('Error processing WebSocket message:', error.message);
  }
}

window.addEventListener('beforeunload', () => {
  if (ws.readyState === WebSocket.OPEN) {
    ws.close();
  }
})
