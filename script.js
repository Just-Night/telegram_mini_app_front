let clicks = 0;
const backendUrl = 'https://9c1f-147-175-186-249.ngrok-free.app'; // replace with your ngrok URL

async function fetchClicks() {
    try {
        const user_id = Telegram.WebApp.initDataUnsafe.user.id;
        console.log('User ID:', user_id);
        const response = await fetch(`${backendUrl}/clicks/${user_id}`);
        const data = await response.json();
        clicks = data.clicks;
        document.getElementById('clicks').innerText = `Clicks: ${clicks}`;
        document.getElementById('user-id').innerText = `User ID: ${user_id}`;
    } catch (error) {
        console.error('Error fetching clicks:', error);
    }
}

function onButtonClick() {
    try {
        clicks += 1;
        document.getElementById('clicks').innerText = `Clicks: ${clicks}`;
        fetch(`${backendUrl}/data`, {
            method: 'POST',
            body: new URLSearchParams({ 'auth': Telegram.WebApp.initData, 'clicks': clicks }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(response => response.json())
          .then(data => console.log('Response from backend:', data))
          .catch(error => console.error('Error sending click data:', error));
    } catch (error) {
        console.error('Error on button click:', error);
    }
}

window.addEventListener('load', () => {
    try {
        Telegram.WebApp.ready();
        console.log('Telegram WebApp is ready');
        fetchClicks();
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

Telegram.WebApp.onEvent('mainButtonClicked', () => {
    onButtonClick();
});

