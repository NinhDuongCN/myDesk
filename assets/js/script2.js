// share
(() => {
    const b = document.getElementById("btnShare");
    if (!b) return;
    b.onclick = (e) => {
        e.preventDefault();
        const l = window.location.origin + window.location.pathname;
        try {
            navigator.share({
                title: "Nguyenhx",
                url: l
            });
        }
        catch {
            const copied = copyToClipboard(l);
            const lang = localStorage.getItem('nguyenhx_lang') === "VI" ? "vi" : "en";
            if (copied) {
                showPopup(lang === "vi"
                    ? "Link đã được sao chép vào clipboard."
                    : "Link has been copied to clipboard."
                );
            }
            else {
                showPopup("Link: <br>" + l);
                console.warn("Web Share API is not supported or failed, and copying to clipboard also failed. Showing link in popup as fallback.", l);
            }
        }

    }
})();

const copyToClipboard = (content) => {
    try {
        if (!navigator.clipboard) {
            const textarea = document.createElement("textarea");
            textarea.value = content;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
        }
        navigator.clipboard.writeText(content);
        return true;
    }
    catch (ex) {
        return false;
    }

}


//showImage
(() => {
    document.querySelectorAll(".btnShowImage").forEach(b => {
        b.onclick = (e) => {
            e.preventDefault();
            const l = b.getAttribute("href") ?? "";
            const t = b.getAttribute("data-title") ?? "";
            let d = b.getAttribute("data-desc") ?? "";
            if (!d) {
                d = b.getAttribute("data-desc-lang") ?? "";
                const lg = localStorage.getItem('nguyenhx_lang') === "VI" ? "vi" : "en";
                d = swPage(getPage())[lg][d] ?? "";
            }

            showPopup(d, t, l);
        }
    });
})();

function showPopup(content, title = "", img = "") {
    const closeBtnText = localStorage.getItem("nguyenhx_lang") === "VI" ? "Đóng" : "Close";
    const o = document.createElement("article");
    o.classList.add("popup");
    Object.assign(o.style, {
        position: "fixed", top: 0, left: 0,
        height: "100vh", width: "100vw",
        backgroundColor: "#0005",
        display: "flex", justifyContent: "center",
        alignItems: "center", zIndex: 999
    });
    let h = `<div id="frm" style="padding: 1rem 0 0 0; border-radius: 1rem; background-color: var(--card); color: var(--text); border: 1px solid var(--text); box-shadow: var(--card_box-shadow); text-align: center; height: fit-content; max-width: min(80%, 480px); width: fit-content; min-width: 300px;">`;
    if (title != "") h += `<h2 style=" margin-bottom: 1rem; padding: 0 1rem;">${title}</h2>`;
    if (img != "") h += `<img src="${img}" style="max-width: calc(100% - 2rem); width: 256px; height: auto; border-radius: 1rem; ">`;
    h += `<p style="font-size: small; margin: 1rem 0; padding: 0 1rem;">${content}</p>
                    <hr style="color: inherit; opacity: .6">
                    <button id="btnClose" style="display: block; margin: auto; padding: .5rem 2ch; border-radius: 0; border: none; background-color: transparent; color: inherit; cursor: pointer; width:100%;">${closeBtnText}</button>
                </div>`;

    o.innerHTML = h;

    document.body.appendChild(o);
    o.onclick = (e) => {
        e.preventDefault();
        if (e.target.classList.contains("popup"))
            o.remove();
    }
    o.querySelector("#btnClose").onclick = () => o.remove();
}

//language
function switchLang(p = null) {
    if (!p) p = getPage();
    const sw = document.getElementById("switch-lang");
    if (!sw)
        return;
    const KEY = 'nguyenhx_lang';
    sw.checked = localStorage.getItem(KEY) !== 'VI';
    sw.onchange = () => {
        const l = sw.checked ? 'EN' : 'VI';
        localStorage.setItem(KEY, l);
        languageChanged(swPage(p)[l.toLowerCase()]);
    }
    sw.onchange();
}

// form submit
(() => {
    document.querySelector("form")?.addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn = e.submitter;
        if (!btn) return;
        btn.disabled = true;
        let data = new FormData(e.target);
        data.append("fp", await gfp());
        data.append(e.currentTarget.action.name, e.currentTarget.action.value);

        const l = localStorage.getItem('nguyenhx_lang') === "VI" ? "vi" : "en";
        const errmsg = {
            'en': "Something went wrong while sending your message. Please try again later.",
            'vi': "Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau."
        };
        const url = e.target.getAttribute("action") ?? "";
        const btnText = btn.textContent;
        btn.textContent = l === "vi" ? "Đang gửi..." : "Sending...";
        fetch(url, {
            method: "POST",
            body: data
        }).then(res => {
            if (!res.ok) {
                throw new Error("Server responded with status " + res.status);
            }
            return res.json();
        }).then(data => {

            btn.textContent = btnText;
            btn.disabled = false;
            showPopup(data.message[l] ?? "Error");

            if (data.isSuccess) {
                e.target.reset();
            }

        }).catch(err => {
            btn.textContent = btnText;
            btn.disabled = false;
            showPopup(errmsg[l] + "<br><br><i>" + (err.message ?? "") + "</i>");
        });
    });
})();


// show random image
// div#picsum-img
(() => {
    const el = document.getElementById("picsum-img");
    if (!el) return;

    let intervalID;
    function startInterval() {
        intervalID = setInterval(randomizeImage, 22000);
    }
    function resetInterval() {
        if (intervalID) clearInterval(intervalID);
        startInterval();
    }
    function randomizeImage() {
        const w = el.getAttribute("data-width") ?? 900;
        const h = el.getAttribute("data-height") ?? 300;
        const preImg = new Image();
        preImg.src = `https://picsum.photos/${w}/${h}?random=${Date.now()}`;
        preImg.onload = () => {
            el.style.backgroundImage = `url(${preImg.src})`;
        }
        resetInterval();
    }
    // randomizeImage();
    startInterval();
    el.onclick = randomizeImage;

    // el.style.backgroundImage = `url(https://picsum.photos/${w}/${h}?random=${Math.random()})`;
})();
