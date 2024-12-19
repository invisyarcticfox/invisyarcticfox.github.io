import {
  updateDiscordStatus,
  updateDiscordDecoration,
  updateSpotifyDetails
} from './functions.js';

const ws = new WebSocket('wss://api.lanyard.rest/socket');
const spotifycont = document.querySelector('.actcont .spotify')


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
    updateDiscordDecoration(data.d.discord_user?.avatar_decoration_data)

    switch (data.d.listening_to_spotify) {
      case true:
        spotifycont.style.visibility = 'visible';
        spotifycont.style.opacity = '1';
        updateSpotifyDetails(data.d.spotify);
        break;
      case false:
        spotifycont.style.opacity = '0';
        break;
      default:
        spotifycont.style.visibility = 'hidden';
        spotifycont.style.opacity = '0';
        break;
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
