const API_URL = 'https://api.lanyard.rest/v1';
const USERID = '470193291053498369';
const pfp = document.getElementById('pfp');
async function fetchResponse(USERID) {
    try {
        const res = await fetch(`${API_URL}/users/${USERID}`);
        return await res.json();
    } catch (err) {
        console.error(err);
    }
}
async function setAvatar() {
    const {
        data: {
            discord_user: {
                avatar
            }
        }
    } = await fetchResponse(USERID);
    const fullUrl = `https://cdn.discordapp.com/avatars/${USERID}/${avatar}`;
    pfp.src = fullUrl;
}

function invoke() {
    setInterval(() => {
        presenceInvoke();
        statusInvoke();
    }, 1000);
    setAvatar();
    setUsername();
}

invoke();


// definitely not js stolen from another site because i dont understand api stuff :)))