let clicks = 0;

async function fetchClicks() {
    const response = await fetch(`/clicks/${Telegram.WebApp.initDataUnsafe.user.id}`);
    const data = await response.json();
    clicks = data.clicks;
    document.getElementById('clicks').innerText = `Clicks: ${clicks}`;
}

function onButtonClick() {
    clicks += 1;
    document.getElementById('clicks').innerText = `Clicks: ${clicks}`;
    fetch('/data', {
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
