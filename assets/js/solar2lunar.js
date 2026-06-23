// =========================
//  HÀM CƠ SỞ
// =========================

function INT(d) {
    return d < 0 ? Math.floor(d) - 1 : Math.floor(d);
}

function dateToJDN(day, month, year) {
    let a = INT((14 - month) / 12);
    let y = year + 4800 - a;
    let m = month + 12 * a - 3;

    let jd = day + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - INT(y / 100) + INT(y / 400) - 32045;

    if (jd < 2299161) {
        jd = day + INT((153 * m + 2) / 5) + 365 * y + INT(y / 4) - 32083;
    }
    return jd;
}

function jdnToDate(jd) {
    let a, b, c, d, e, m;

    if (jd > 2299160) {
        a = jd + 32044;
        b = INT((4 * a + 3) / 146097);
        c = a - INT((b * 146097) / 4);
    } else {
        b = 0;
        c = jd + 32082;
    }

    d = INT((4 * c + 3) / 1461);
    e = c - INT((1461 * d) / 4);
    m = INT((5 * e + 2) / 153);

    let day = e - INT((153 * m + 2) / 5) + 1;
    let month = m + 3 - 12 * INT(m / 10);
    let year = b * 100 + d - 4800 + INT(m / 10);

    return { day, month, year };
}

// =========================
//  SÓC (NEW MOON)
// =========================

function getNewMoonDay(k, timeZone) {
    let T = k / 1236.85;
    let T2 = T * T;
    let T3 = T2 * T;
    let dr = Math.PI / 180;

    let Jd1 = 2415020.75933
        + 29.53058868 * k
        + 0.0001178 * T2
        - 0.000000155 * T3
        + 0.00033 * Math.sin((166.56 + 132.87 * T - 0.009173 * T2) * dr);

    let M = 359.2242 + 29.10535608 * k - 0.0000333 * T2 - 0.00000347 * T3;
    let Mpr = 306.0253 + 385.81691806 * k + 0.0107306 * T2 + 0.00001236 * T3;
    let F = 21.2964 + 390.67050646 * k - 0.0016528 * T2 - 0.00000239 * T3;

    let C1 =
        (0.1734 - 0.000393 * T) * Math.sin(M * dr)
        + 0.0021 * Math.sin(2 * M * dr)
        - 0.4068 * Math.sin(Mpr * dr)
        + 0.0161 * Math.sin(2 * Mpr * dr)
        - 0.0004 * Math.sin(3 * Mpr * dr)
        + 0.0104 * Math.sin(2 * F * dr)
        - 0.0051 * Math.sin((M + Mpr) * dr)
        - 0.0074 * Math.sin((M - Mpr) * dr)
        + 0.0004 * Math.sin((2 * F + M) * dr)
        - 0.0004 * Math.sin((2 * F - M) * dr)
        - 0.0006 * Math.sin((2 * F + Mpr) * dr)
        + 0.0010 * Math.sin((2 * F - Mpr) * dr)
        + 0.0005 * Math.sin((2 * Mpr + M) * dr);

    let deltaT =
        T < -11
            ? 0.001 + 0.000839 * T + 0.0002261 * T2 - 0.00000845 * T3 - 0.000000081 * T * T3
            : -0.000278 + 0.000265 * T + 0.000262 * T2;

    let JdNew = Jd1 + C1 - deltaT;

    return INT(JdNew + 0.5 + timeZone / 24);
}

// =========================
//  TRUNG KHÍ
// =========================

function getSunLongitude(jdn, timeZone) {
    let T = (jdn - 2451545.5 - timeZone / 24) / 36525;
    let T2 = T * T;
    let dr = Math.PI / 180;

    let M = 357.52910 + 35999.05030 * T - 0.0001559 * T2 - 0.00000048 * T * T2;
    let L0 = 280.46645 + 36000.76983 * T + 0.0003032 * T2;

    let DL =
        (1.914600 - 0.004817 * T - 0.000014 * T2) * Math.sin(dr * M)
        + (0.019993 - 0.000101 * T) * Math.sin(dr * 2 * M)
        + 0.000290 * Math.sin(dr * 3 * M);

    let L = (L0 + DL) * dr;
    L = L - Math.PI * 2 * INT(L / (Math.PI * 2));

    return INT(L / Math.PI * 6);
}

// =========================
//  THÁNG 11 ÂM LỊCH
// =========================

function getLunarMonth11(year, timeZone) {
    let jdn = dateToJDN(31, 12, year) - 2415021;
    let k = INT(jdn / 29.530588853);

    let newMoon = getNewMoonDay(k, timeZone);
    let sunLong = getSunLongitude(newMoon, timeZone);

    if (sunLong >= 9) {
        newMoon = getNewMoonDay(k - 1, timeZone);
    }
    return newMoon;
}

// =========================
//  THÁNG NHUẬN
// =========================

function getLeapMonthOffset(a11, timeZone) {
    let k = INT((a11 - 2415021.076998695) / 29.530588853 + 0.5);
    let last = 0;
    let i = 1;

    let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);

    do {
        last = arc;
        i++;
        arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    } while (arc !== last && i < 14);

    return i - 1;
}

// =========================
//  SOLAR → LUNAR
// =========================

function solarToLunar(day, month, year, timeZone = 7) {
    let dayNumber = dateToJDN(day, month, year);
    let k = INT((dayNumber - 2415021.076998695) / 29.530588853);

    let monthStart = getNewMoonDay(k + 1, timeZone);
    if (monthStart > dayNumber) {
        monthStart = getNewMoonDay(k, timeZone);
    }

    let a11 = getLunarMonth11(year, timeZone);
    let b11;
    let lunarYear;

    if (a11 >= monthStart) {
        b11 = a11;
        lunarYear = year;
        a11 = getLunarMonth11(year - 1, timeZone);
    } else {
        lunarYear = year + 1;
        b11 = getLunarMonth11(lunarYear, timeZone);
    }

    let lunarDay = dayNumber - monthStart + 1;
    let diff = INT((monthStart - a11) / 29);

    let lunarMonth = diff + 11;
    let lunarLeap = false;

    if (b11 - a11 > 365) {
        let leapDiff = getLeapMonthOffset(a11, timeZone);
        if (diff >= leapDiff) {
            lunarMonth--;
            if (diff === leapDiff) lunarLeap = true;
        }
    }

    if (lunarMonth > 12) lunarMonth -= 12;
    if (lunarMonth >= 11 && diff < 4) lunarYear--;

    if (lunarYear === 0) lunarYear = -1;

    let canchiNgay = canChiDay(dayNumber);
    let canchiThang = canChiMonth(lunarMonth, lunarYear);
    let canchiNam = canChiYear(lunarYear);

    return { lunarDay, lunarMonth, lunarYear, lunarLeap, canchiNgay, canchiThang, canchiNam };
}

// =========================
//  LUNAR → SOLAR
// =========================

function lunarToSolar(lunarDay, lunarMonth, lunarYear, lunarLeap, timeZone = 7) {
    let a11, b11;

    if (lunarMonth < 11) {
        a11 = getLunarMonth11(lunarYear - 1, timeZone);
        b11 = getLunarMonth11(lunarYear, timeZone);
    } else {
        a11 = getLunarMonth11(lunarYear, timeZone);
        b11 = getLunarMonth11(lunarYear + 1, timeZone);
    }

    let off = lunarMonth < 11 ? lunarMonth + 1 : lunarMonth - 11;

    if (b11 - a11 > 365) {
        let leapOff = getLeapMonthOffset(a11, timeZone);
        let leapMonth = leapOff < 2 ? leapOff + 10 : leapOff - 2;

        if (lunarLeap && lunarMonth !== leapMonth) return null;
        if (lunarLeap || off >= leapOff) off++;
    }

    let k = INT(0.5 + (a11 - 2415021.076998695) / 29.530588853);
    let monthStart = getNewMoonDay(k + off, timeZone);

    return jdnToDate(monthStart + lunarDay - 1);
}

// =========================
//  CAN – CHI
// =========================

const CAN = ["Giáp","Ất","Bính","Đinh","Mậu","Kỷ","Canh","Tân","Nhâm","Quý"];
const CHI = ["Tý","Sửu","Dần","Mão","Thìn","Tỵ","Ngọ","Mùi","Thân","Dậu","Tuất","Hợi"];

function canChiYear(year) {
    return CAN[(year + 6) % 10] + " " + CHI[(year + 8) % 12];
}

function canChiMonth(lunarMonth, lunarYear) {
    return CAN[((lunarYear * 12) + lunarMonth + 3) % 10] + " " + CHI[(lunarMonth + 1) % 12];
}

function canChiDay(jdn) {
    return CAN[(jdn + 9) % 10] + " " + CHI[(jdn + 1) % 12];
}

function solarToLunarStr(day, month, year, timeZone = 7, format = ""){
    const ld = solarToLunar(day, month, year, timeZone);
    const THANG = ["tháng Giêng", "tháng Hai", "tháng Ba", "tháng Tư", "tháng Năm", "tháng Sáu", "tháng Bảy", "tháng Tám", "tháng Chín", "tháng Mười", "tháng Mười Một", "tháng Chạp"];
    return `${String(ld.lunarDay).padStart(2,"0")} ${THANG[ld.lunarMonth - 1]}${ld.lunarLeap?" (nhuận)":""}, ${ld.canchiNam}`;
}



// console.log(solarToLunarStr(24,11,2024));