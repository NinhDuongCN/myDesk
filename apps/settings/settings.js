function createCard_settings() {
    const cardBody = genCardBody();
    if(cardBody == null)  
        return;
    const card = document.createElement("article");
    card.classList.add("card");
    card.classList.add("active");
    card.classList.add("maximize");
    card.id = "calendar";
    card.innerHTML = `
    <div class="card-controllers">
        <span class="card-title">Cấu hình</span>
        <a class="card-controller btn restore"></a>
        <a class="card-controller btn close"></a>
    </div>
    <div class="card-body">
        ${cardBody}
    </div>
`;
    return card;
}

function genCardBody(){
    return `<link rel="stylesheet" href="./apps/settings/settings.css">

<div class="app-settings">
    <div class="app-title">Cấu hình myDesk</div>
    <div class="app-main"></div>
    <div class="app-quick-actions">
        <ul>
            <li data-title="Lưu cấu hình">
                <svg class="act-icon" id="btnSave"></svg>
            </li>
            <li data-title="Thông tin">
                <svg class="act-icon" id="btnAbout"></svg>
            </li>
            <li data-title="Hướng dẫn">
                <svg class="act-icon" id="btnUsage"></svg>
            </li>
            <li data-title="Liên hệ">
                <svg class="act-icon" id="btnContact"></svg>
            </li>
            <li data-title="Toàn màn hình">
                <svg class="act-icon" id="btnFullScreen"></svg>
            </li>
        </ul>
    </div>
</div>`
}