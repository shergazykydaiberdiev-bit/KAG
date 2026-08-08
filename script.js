const kgBtn = document.getElementById("kgBtn");
const ruBtn = document.getElementById("ruBtn");
function changeLanguage(language) {
    document.documentElement.lang = language;
    const elements = document.querySelectorAll("[data-kg][data-ru]");
    elements.forEach(element => {
        element.textContent =
            language === "kg"
                ? element.getAttribute("data-kg")
                : element.getAttribute("data-ru");
    });
    if (language === "kg") {
        kgBtn.classList.add("active");
        ruBtn.classList.remove("active");
        document.title = "KAG — Кызматтар платформасы";
    } else {
        ruBtn.classList.add("active");
        kgBtn.classList.remove("active");
        document.title = "KAG — Платформа услуг";
    }
    localStorage.setItem("KAG_language", language);
}
// KG
kgBtn.addEventListener("click", function () {
    changeLanguage("kg");
});
// RU
ruBtn.addEventListener("click", function () {
    changeLanguage("ru");
});
// Сакталган тилди текшерүү
const savedLanguage = localStorage.getItem("KAG_language");
if (savedLanguage === "ru") {
    changeLanguage("ru");
} else {
    changeLanguage("kg");
}
