let clicks = 0;
const backendUrl = 'https://4194-147-175-186-249.ngrok-free.app'; // replace with your ngrok URL

async function fetchClicks() {
    const user_id = Telegram.WebApp.initDataUnsafe.user.id;
    const response = await fetch(`${backendUrl}/clicks/${user_id}`);
    const data = await response.json();
    clicks = data.clicks;
    document.getElementById('clicks').innerText = `Clicks: ${clicks}`;
    document.getElementById('user-id').innerText = `User ID: ${user_id}`;
}

function onButtonClick() {
    clicks += 1;
    document.getElementById('clicks').innerText = `Clicks: ${clicks}`;
    fetch(`${backendUrl}/data`, {
        method: 'POST',
        body: new URLSearchParams({ 'auth': Telegram.WebApp.initData, 'clicks': clicks }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}

window.addEventListener('load', () => {
    Telegram.WebApp.ready();
    fetchClicks();
});

Telegram.WebApp.onEvent('mainButtonClicked', () => {
    onButtonClick();
});
