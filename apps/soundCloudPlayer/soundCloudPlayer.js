function createCard_scPlayer(){
    const card = document.createElement("article");
    card.classList.add("card");
    card.classList.add("active");
    card.id = "scPlayer";
    card.innerHTML = `
    <div class="card-controllers">
        <span class="card-title">Sound Cloud</span>
        <a class="card-controller btn minimize"></a>
        <a class="card-controller btn restore"></a>
        <a class="card-controller btn close"></a>
    </div>
    <div class="card-body">
        <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay; encrypted-media"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%253Aplaylists%253A1227053503&color=%235e6054&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
    </div>
`;
    return card;
}