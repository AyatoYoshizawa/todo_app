const listApiUrl = 'https://127.0.0.1:8000/';

async function fetchData() {
    try {
        const res = await fetch(listApiUrl, {
            method: 'GET'
        });

        if (!res.ok) {
            throw new Error('res was not ok');
        }

        const data = await res.json();
        console.log(data);

    } catch (error) {
        console.error('APIテスト失敗:', error);
    }
}

fetchData();