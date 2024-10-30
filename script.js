const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const kalan = document.getElementById("kalan");
const datee = document.getElementById("dateFull");
const day = document.getElementById("day");

const gunler = [
    "Pazar",
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi"
];

const dersSaati = 40;
const tenefus = 10;
const ogleArasi = 75;
const dersBaslangic = [8, 40]; // saat:dakika
const dersBitis = [16, 15]; // saat:dakika
const kalanText = ["Tenefüse Kalan: ", "Derse Kalan: ", "İyi Akşamlar", "Ders 8:40'ta Başlayacak.", "Öğle Arası (12:40 - 13:55)"];

// Ders ve tenefüs saatleri (saat:dakika)
const dersSaatleri = [
    { baslangic: [8, 40], bitis: [9, 20] },
    { baslangic: [9, 30], bitis: [10, 10] },
    { baslangic: [10, 20], bitis: [11, 0] },
    { baslangic: [11, 10], bitis: [11, 50] },
    { baslangic: [12, 0], bitis: [12, 40] },
    { baslangic: [13, 55], bitis: [14, 35] },
    { baslangic: [14, 45], bitis: [15, 25] },
    { baslangic: [15, 35], bitis: [16, 15] }
];

function convertToMinutes(time) {
    return time[0] * 60 + time[1];
}

function timeDifference(currentTime, targetTime) {
    return targetTime - currentTime;
}

function formatTime(minutes) {
    const dakika = Math.floor(minutes / 1); // Dakika
    const saniye = Math.floor((minutes - dakika) * 60); // Saniye
    return `${dakika}:${saniye < 10 ? "0" + saniye : saniye}`; // dakika:saniye
}

setInterval(() => {
    let tarih = new Date();
    let saat = tarih.getHours();
    let dakika = tarih.getMinutes();
    let saniye = tarih.getSeconds();
    let gun = tarih.getDay();
    let fullTarihTurkce = tarih.toLocaleDateString("tr-TR", { year: 'numeric', month: 'long', day: 'numeric' });


    let currentTimeInMinutes = convertToMinutes([saat, dakika]);

    let kalanSure = "";
    for (let i = 0; i < dersSaatleri.length; i++) {
        let dersBaslama = convertToMinutes(dersSaatleri[i].baslangic);
        let dersBitis = convertToMinutes(dersSaatleri[i].bitis);

        if (currentTimeInMinutes < dersBaslama) {
            let fark = timeDifference(currentTimeInMinutes, dersBaslama);
            kalanSure = `(${i + 1}. Ders) ${kalanText[1]} ${fark} dakika.`;
            break;
        } else if (currentTimeInMinutes < dersBitis) {
            let fark = timeDifference(currentTimeInMinutes, dersBitis);
            kalanSure = `(${i + 1}. Ders) ${kalanText[0]} ${fark} dakika.`;
            break;
        } else if (currentTimeInMinutes < (dersBitis + tenefus) && i < dersSaatleri.length - 1) {
            let fark = timeDifference(currentTimeInMinutes, dersBitis + tenefus);
            kalanSure = `${kalanText[1]} ${formatTime(fark)}`; // Burayı güncelledik
            break;
        }
    }

    if (currentTimeInMinutes >= convertToMinutes([12, 40]) && currentTimeInMinutes < convertToMinutes([13, 55])) {
        kalanSure = kalanText[4]; // İyi Öğlenler mesajını göster
    }

    if (kalanSure === "" && currentTimeInMinutes >= convertToMinutes(dersSaatleri[dersSaatleri.length - 1].bitis)) {
        kalanSure = kalanText[2]; // İyi Akşamlar
    }
    hours.innerHTML = saat < 10 ? "0" + saat : saat;
    minutes.innerHTML = dakika < 10 ? "0" + dakika : dakika;
    seconds.innerHTML = saniye < 10 ? "0" + saniye : saniye;
    day.innerHTML = gunler[gun];
    datee.innerHTML = fullTarihTurkce;
    kalan.innerHTML = kalanSure;

}, 1000);
