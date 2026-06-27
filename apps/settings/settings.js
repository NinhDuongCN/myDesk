function createCard_settings() {
    const cardBody = genCardBody();
    if (cardBody == null)
        return;
    const card = document.createElement("article");
    card.classList.add("card");
    card.classList.add("active");
    card.classList.add("maximize");
    card.id = "settings";
    card.innerHTML = `
    <div class="card-controllers">
        <span class="card-title">Cấu hình</span>
        <a class="card-controller btn minimize"></a>
        <a class="card-controller btn close"></a>
    </div>
    <div class="card-body">
        ${cardBody}
    </div>
`;
    addEvents(card);
    return card;
}

function genCardBody() {
    return `<link rel="stylesheet" href="./apps/settings/settings.css">

<div class="app-settings">
    <div class="app-title">Cấu hình myDesk</div>
    <div class="app-main"></div>
    <div class="app-quick-actions">
        <ul>
            <li data-title="Lưu cấu hình">
                <svg class="act-icon" id="btnSave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"
                    fill="currentColor">
                    <path
                        d="M34.15,11.83l-8.3-6.72c-.89-.72-2-1.11-3.14-1.11h-.71v7c0,.55-.45,1-1,1h-10c-.55,0-1-.45-1-1v-7h-1c-2.76,0-5,2.24-5,5v22c0,2.76,2.24,5,5,5h22c2.76,0,5-2.24,5-5v-15.29c0-1.51-.68-2.94-1.85-3.88ZM30,30c0,.55-.45,1-1,1H11c-.55,0-1-.45-1-1v-8c0-.55.45-1,1-1h18c.55,0,1,.45,1,1v8Z" />
                    <path d="M27,24c0,.55-.45,1-1,1h-12c-.55,0-1-.45-1-1s.45-1,1-1h12c.55,0,1,.45,1,1Z" />
                    <path d="M27,28c0,.55-.45,1-1,1h-12c-.55,0-1-.45-1-1s.45-1,1-1h12c.55,0,1,.45,1,1Z" />
                </svg>
            </li>
            <li data-title="Thông tin">
                <svg class="act-icon" id="btnAbout" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"
                    fill="currentColor">
                    <path
                        d="M31.32,8.68c-2.9-2.89-6.9-4.68-11.32-4.68s-8.42,1.79-11.32,4.68c-2.89,2.9-4.68,6.9-4.68,11.32,0,8.84,7.16,16,16,16,4.42,0,8.42-1.79,11.32-4.68,2.89-2.9,4.68-6.9,4.68-11.32s-1.79-8.42-4.68-11.32ZM20.68,26.6c.16.15.43.23.82.23.31,0,.58-.06.83-.16-.07.87-.38,1.53-.93,1.99-.54.46-1.19.69-1.93.69-.83,0-1.51-.26-2.02-.78-.51-.52-.76-1.3-.76-2.34,0-.44.06-1,.2-1.69l1.77-8.35h3.75l-1.88,8.84c-.07.26-.1.54-.1.83,0,.35.08.6.25.74ZM22.7,14.19c-.4.4-.89.6-1.47.6s-1.05-.2-1.45-.6-.6-.89-.6-1.46.2-1.06.6-1.47c.4-.4.88-.61,1.45-.61s1.07.21,1.47.61.61.9.61,1.47-.2,1.06-.61,1.46Z" />
                </svg>
            </li>
            <li data-title="Hướng dẫn">
                <svg class="act-icon" id="btnUsage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"
                    fill="currentColor">
                    <path
                        d="M31.32,8.68c-2.9-2.89-6.9-4.68-11.32-4.68s-8.42,1.79-11.32,4.68c-2.89,2.9-4.68,6.9-4.68,11.32,0,8.84,7.16,16,16,16,4.42,0,8.42-1.79,11.32-4.68,2.89-2.9,4.68-6.9,4.68-11.32s-1.79-8.42-4.68-11.32ZM21.36,29.29c-.45.47-1.02.71-1.7.71s-1.28-.24-1.73-.71c-.45-.47-.68-1.05-.68-1.73s.23-1.29.68-1.75c.45-.45,1.03-.68,1.73-.68s1.25.23,1.7.68c.46.46.68,1.04.68,1.75s-.22,1.26-.68,1.73ZM25.04,16.78c-.3.56-.68,1.08-1.12,1.56-.45.48-.89.96-1.31,1.43-.43.48-.78.99-1.04,1.55s-.35,1.2-.26,1.93h-3.35c-.13-.83-.08-1.57.14-2.21.22-.64.53-1.22.93-1.74.4-.51.81-1,1.23-1.46.42-.45.78-.9,1.08-1.34.29-.44.44-.91.44-1.4,0-.42-.09-.79-.27-1.1-.19-.32-.44-.56-.76-.73-.33-.16-.72-.25-1.19-.25-.58,0-1.11.13-1.58.39-.47.27-.91.62-1.33,1.06l-2.15-1.91c.68-.76,1.49-1.38,2.42-1.85.94-.47,1.97-.71,3.11-.71,1.04,0,1.98.18,2.81.53.83.36,1.48.9,1.95,1.61.47.72.71,1.63.71,2.71,0,.73-.15,1.37-.46,1.93Z" />
                </svg>
            </li>
            <li data-title="Liên hệ">
                <svg class="act-icon" id="btnContact" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"
                    fill="currentColor">
                    <path
                        d="M36,21V5c0-.55-.45-1-1-1H10c-.55,0-1,.45-1,1v6.57c0,.55.45,1,1,1h22v11.57l4,2.29-2.26-4.43h1.26c.55,0,1-.45,1-1ZM33,9H12c-.55,0-1-.45-1-1s.45-1,1-1h21c.55,0,1,.45,1,1s-.45,1-1,1Z" />
                    <path
                        d="M30,13.57H5c-.55,0-1,.45-1,1v16c0,.55.45,1,1,1h1.26l-2.26,4.43,7.74-4.43h18.26c.55,0,1-.45,1-1V14.57c0-.55-.45-1-1-1ZM28,28.43H7c-.55,0-1-.45-1-1s.45-1,1-1h21c.55,0,1,.45,1,1s-.45,1-1,1ZM28,23.58H7c-.55,0-1-.44-1-1s.45-1,1-1h21c.55,0,1,.45,1,1s-.45,1-1,1ZM28,18.74H7c-.55,0-1-.45-1-1s.45-1,1-1h21c.55,0,1,.45,1,1s-.45,1-1,1Z" />
                </svg>
            </li>
            <li data-title="Toàn màn hình" data-alt-title="Thoát toàn màn hình">
                <svg class="act-icon ${!document.fullscreenElement?'':'efs'}" id="btnFullScreen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"
                    fill="currentColor">
                    <path id="tl" d="M6,16h-2V6c0-1.1.9-2,2-2h10v2H6v10Z" />
                    <path id="bl" d="M6,34h10v2H6c-1.1,0-2-.9-2-2v-10h2v10Z" />
                    <path id="tr" d="M36,6v10h-2V6h-10v-2h10c1.1,0,2,.9,2,2Z" />
                    <path id="br" d="M34,24h2v10c0,1.1-.9,2-2,2h-10v-2h10v-10Z" />
                    <rect id="center" x="18" y="18" width="4" height="4" rx="1" ry="1" />
                </svg>
            </li>
        </ul>
    </div>
</div>`;
}

const addEvents = (card) => {
    const btnFullScreen = card.querySelector("#btnFullScreen");
    btnFullScreen.onclick = () => {
        if (btnFullScreen.classList.contains("efs")) {
            document.exitFullscreen();
        }
        else{
            document.documentElement.requestFullscreen();
        }
    }
};

const fullScreenChanged = () => {
    if (!document.fullscreenElement) {
        btnFullScreen.classList.remove("efs");
        releaseWakeLock();
        unlockOrientation();
    } else {
        btnFullScreen.classList.add("efs");
        requestWakeLock();
        lockOrientationLandscape();
    }

};

async function requestWakeLock() {
    if ('wakeLock' in navigator) {
        try {
            wakeLock = await navigator.wakeLock.request('screen');
        } catch (err) {
            console.error('Không thể kích hoạt Wake Lock:', err);
        }
    }
}

async function releaseWakeLock() {
    if (wakeLock) {
        await wakeLock.release();
        wakeLock = null;
    }
}

async function lockOrientationLandscape() {
    if (screen.orientation && screen.orientation.lock) {
        try {
            await screen.orientation.lock('landscape');
        } catch (err) {
            console.warn('Không thể khóa hướng màn hình:', err);
        }
    }
}

async function unlockOrientation() {
    if (screen.orientation && screen.orientation.unlock) {
        try {
            screen.orientation.unlock();
        } catch (err) {
            console.warn('Không thể mở khóa hướng màn hình:', err);
        }
    }
}
