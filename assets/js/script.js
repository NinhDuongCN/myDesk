
//=======================================
//              BACKGROUND
//=======================================
let changeBackgroundInterval = 22000;
(() => {
    const el = document.getElementById("background");
    if (!el) return;

    let intervalID;
    const startInterval = () => {
        intervalID = setInterval(randomizeImage, changeBackgroundInterval);
    },
        resetInterval = () => {
            if (intervalID) clearInterval(intervalID);
            startInterval();
        },
        randomizeImage = () => {
            console.log("2");
            const w = el.getAttribute("data-width") ?? 1920;
            const h = el.getAttribute("data-height") ?? 1080;
            let preImg = new Image();
            preImg.src = `https://picsum.photos/${w}/${h}?random=${Date.now()}`;
            preImg.onload = () => {
                el.style.backgroundImage = ` url(${preImg.src})`;
                preImg = null;
            }
            resetInterval();
        }
    startInterval();
    el.ondblclick = (e) => {
        e.preventDefault();
        randomizeImage();
    }
    el.oncontextmenu = (e) => {
        e.preventDefault();
        randomizeImage();
    }
    //double tap on mobile
    let lastPos = { X: 0, Y: 0 };
    document.ontouchstart = (e) => {
        lastPos = { X: e.changedTouches[0].screenX, Y: e.changedTouches[0].screenY };
    }
    const distanceChanged = (curPos) => {
        let v = { X: curPos.X - lastPos.X, Y: curPos.Y - lastPos.Y };
        return Math.sqrt(v.X * v.X + v.Y * v.Y);
    }
    let lastTap = 0;
    document.ontouchend = (e) => {
        e.position
        const curTap = new Date().getTime();
        const tapLength = curTap - lastTap;
        if (e.touches.length === 0 && e.changedTouches.length === 1 && distanceChanged({ X: e.changedTouches[0].screenX, Y: e.changedTouches[0].screenY }) < 5) {
            if (tapLength < 200 && tapLength > 100) {
                randomizeImage();
                lastTap = 0;
            } else {
                lastTap = curTap;
            }
        } else {
            lastTap = 0;
        }
    }
})();


//=======================================
//                CLOCK
//=======================================
const c_h = document.getElementById("hour"),
    c_m = document.getElementById("minute"),
    c_s = document.getElementById("second"),
    c_sd = document.getElementById("solar-date"),
    c_ld = document.getElementById("lunar-date"),
    dow = [
        "Chủ nhật",
        "Thứ hai",
        "Thứ ba",
        "Thứ tư",
        "Thứ năm",
        "Thứ sáu",
        "Thứ bảy"
    ];
let curDate; // cache ngày để tránh phải cập nhật lại ngày nhiều lần.
(() => {
    setInterval(() => {
        const t = new Date();
        c_h.textContent = String(t.getHours()).padStart(2, "0");
        c_m.textContent = String(t.getMinutes()).padStart(2, "0");
        c_s.textContent = String(t.getSeconds()).padStart(2, "0");
        const sd = t.getDate();
        if (sd == curDate) return;
        curDay = sd;
        const sm = t.getMonth() + 1;
        const sy = t.getFullYear();
        c_sd.textContent = `${dow[t.getDay()]}, ${sd} tháng ${sm < 3 ? "0" : ""}${sm}`;
        c_ld.textContent = solarToLunarStr(sd, sm, sy);
    }, 1000);
})();


//=======================================
//         card-controllers
//=======================================
// (() => {
//     document.querySelectorAll(".card-controller.btn.minimize")
//         .forEach((btnMinimize) => {
//             btnMinimize.onclick = () => {
//                 minimizeCard(btnMinimize.closest(".card.active"));
//             }
//         });
// })();
// (()=>{
//     document.querySelectorAll(".card-controller.btn.close")
//         .forEach((btnClose) => {
//             btnClose.onclick = () => {
//                 closeCard(btnClose.closest(".card.active"));
//             }
//         });
// })();
const cardWrapper = document.querySelector(".card-wrapper");
(() => {
    cardWrapper.onclick = (e) => {
        const btn = e.target.closest(".card-controller.btn");
        if(!btn)    return;
        const card = e.target.closest(".card");
        if(!card)   return;
        if(btn.classList.contains("minimize")){
            minimizeCard(card);
            return;
        }
        if(btn.classList.contains("restore")){
            restoreCard(card, btn);
            return;
        }
        if(btn.classList.contains("close")){
            closeCard(card);
            return;
        }
    }
})();

const minimizeCard = (card) => {
    if(!card) return;
    card.classList.remove("active");
}
const restoreCard = (card, btn) => {
    if(!card)   return;
    card.classList.toggle("maximized");
    if(!btn)    return;
    btn.classList.toggle("maximized");
}
const closeCard = (card) => {
    if(!card)   return;
    card.classList.remove("active");
    document.querySelector(".dock-item#ico-"+card.id)
            .classList.remove("active");
    card.parentElement.removeChild(card); // không ổn. nếu remove thì khi gán lại sẽ phải gán lại sự kiện cho card
}



//=======================================
//              dock-items
//=======================================
(() => {
    document.querySelector(".dock").addEventListener("click", function (e) {
        const item = e.target.closest(".dock-item");
        if(!item)   return;
        console.log(item);
        const cardID = item.id.startsWith("ico-")?item.id.slice(4):item.id;
        const card = document.querySelector(".card#"+cardID);
        if(!card){
            console.log("createCard: " + cardID);
            if(!createCard(cardID)) return;
            item.classList.add("active");
            return;
        }
        card.classList.toggle("active");
        // item.classList.toggle("active");

    });
    const createCard = (cardID) => {
        const funcName = "createCard_"+cardID.replace("-","_");
        console.log("funcName = " + funcName);
        console.log("typeof window[" + funcName + "] = " + typeof window[funcName]);
        if(typeof window[funcName] === "function"){
            const card = window[funcName]();
            console.log(card);
            if(!card)   return false;
            cardWrapper.appendChild(card);
            return true;
        }
        console.log("func not found");
        return false;
    }
})();



