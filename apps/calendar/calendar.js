
document.addEventListener("DOMContentLoaded", () => {
  const mSel = document.getElementById("mSel");
  const ySel = document.getElementById("ySel");
  const calDays = document.getElementById("calDays");

  if(!mSel || !ySel || !calDays) return;

  // ====== TẠO SELECT ======
  for (let m = 1; m <= 12; m++) {
    mSel.innerHTML += `<option value="${m}">Tháng ${m}</option>`;
  }

  const cy = ySel.value > 100 ? ySel.value : new Date().getFullYear();
  for (let y = cy - 100; y <= cy + 100; y++) {
    ySel.innerHTML += `<option value="${y}">năm ${y}</option>`;
  }

  mSel.value = new Date().getMonth() + 1;
  ySel.value = new Date().getFullYear();
  drawCal();

  // ====== VẼ LỊCH ======
  function drawCal() {
    const m = +mSel.value;
    const y = +ySel.value;

    calDays.innerHTML = "";

    const first = new Date(y, m - 1, 1);
    const last = new Date(y, m, 0).getDate();

    let start = first.getDay();
    if (start === 0) start = 7;

    const prevLast = new Date(y, m - 1, 0).getDate();
    const today = new Date();

    // ngày tháng trước
    for (let i = start - 1; i > 0; i--) {
      addDay(prevLast - i + 1, m - 1, y, true);
    }

    // ngày tháng này
    for (let d = 1; d <= last; d++) {
      addDay(d, m, y, false);
    }

    // ngày tháng sau
    const total = (start - 1) + last;
    for (let d = 1; d <= 42 - total; d++) {
      addDay(d, m + 1, y, true);
    }

  }

  function addDay(d, m, y, other) {
    if (m === 0) { m = 12; y--; }
    if (m === 13) { m = 1; y++; }

    const div = document.createElement("div");
    div.className = "day";
    if (other) div.classList.add("other");

    const t = new Date();
    if (!other && d === t.getDate() && m === t.getMonth() + 1 && y === t.getFullYear()) {
      div.classList.add("today");
    }

    const lunar = solarToLunar(d, m, y);
    let lunarTxt = lunar.lunarDay;
    if (lunar.lunarDay === 1) lunarTxt = `1/${lunar.lunarMonth}`;

    div.innerHTML = `${d}<span class="lunar">${lunarTxt}</span>`;
    calDays.appendChild(div);
  }

  // ====== NÚT CHUYỂN THÁNG ======
  document.getElementById("prevM").onclick = () => {
    let m = +mSel.value, y = +ySel.value;
    m--; if (m === 0) { m = 12; y--; }
    mSel.value = m; ySel.value = y;
    drawCal();
  };

  document.getElementById("nextM").onclick = () => {
    let m = +mSel.value, y = +ySel.value;
    m++; if (m === 13) { m = 1; y++; }
    mSel.value = m; ySel.value = y;
    drawCal();
  };

  mSel.onchange = drawCal;
  ySel.onchange = drawCal;
});

// ====== GEN UI ======
function createCard_calendar() {
  const card = document.createElement("article");
  card.classList.add("card");
  card.classList.add("active");
  card.id = "calendar";
  card.innerHTML = `
    <div class="card-controllers">
        <span class="card-title">Lịch</span>
        <a class="card-controller btn minimize"></a>
        <a class="card-controller btn restore"></a>
        <a class="card-controller btn close"></a>
    </div>
    <div class="card-body">
        <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay; encrypted-media"
            src="./apps/calendar/"></iframe>
    </div>
`;
  return card;
}