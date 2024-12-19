const discordurl = 'https://cdn.discordapp.com'
const statustxt = document.querySelector('#head span b');
const avtpfp = document.querySelector('.imgs .avt');
const avtdecor = document.querySelector('.imgs .decor');

const spotify = {
  albumcover: document.querySelector('.spotify img'),
  songtitle: document.querySelector('.spotify .song'),
  albumtitle: document.querySelector('.spotify .album'),
  artisttitle: document.querySelector('.spotify .artist'),
  spoturl: document.querySelector('.spotify a.spoturl'),
  lastfmurl: document.querySelector('.spotify a.lfmurl'),
  progressbar: document.querySelector('.spotify .progbar')
}


export function updateDiscordStatus(status) {
  const statusColors = {
    online: '#23A55A',
    idle: '#F0B232',
    dnd: '#F23F43',
    offline: '#80848E'
  }
  statustxt.innerHTML = status || 'offline';
  statustxt.style.color = statusColors[status] || '#80848E';
}

export function updateDiscordDecoration(decorData) {
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

export function updateSpotifyDetails(spotifyData) {
  if (spotifyData) {
    spotify.albumcover.src = spotifyData.album_art_url || './assets/img/cover.png';
    spotify.spoturl.href = spotifyData.track_id ? `https://open.spotify.com/track/${spotifyData.track_id}` : 'https://open.spotify.com/track/';
    spotify.songtitle.innerHTML = `<b>${spotifyData.song}</b>`;
    spotify.albumtitle.innerHTML = `<span style='color: #aaa; display: unset;'>On</span> <i>${spotifyData.album}</i>`;
    spotify.artisttitle.innerHTML = `<span style='color: #aaa; display: unset;'>By</span> <i>${spotifyData.artist}</i>`;
    spotify.lastfmurl.href = `https://last.fm/music/${encodeURIComponent(spotifyData.artist).split('%3B')[0]}/_/${spotifyData.song}`;
                                                      // encode for not english artists     // split for when a song has two artists
    
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