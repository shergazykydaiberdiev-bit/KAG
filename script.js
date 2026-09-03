const kgBtn = document.getElementById("kgBtn");
const ruBtn = document.getElementById("ruBtn");

function changeLanguage(language) {
    document.documentElement.lang = language;

    document.querySelectorAll("[data-kg][data-ru]").forEach(el => {
        el.textContent = language === "kg"
            ? el.getAttribute("data-kg")
            : el.getAttribute("data-ru");
    });

    document.querySelectorAll("[data-kg-placeholder][data-ru-placeholder]").forEach(el => {
        el.placeholder = language === "kg"
            ? el.getAttribute("data-kg-placeholder")
            : el.getAttribute("data-ru-placeholder");
    });

    if (kgBtn && ruBtn) {
        if (language === "kg") {
            kgBtn.classList.add("active");
            ruBtn.classList.remove("active");
        } else {
            ruBtn.classList.add("active");
            kgBtn.classList.remove("active");
        }
    }

    const titles = {
        "index.html": { kg: "KAG — Кызматтар платформасы", ru: "KAG — Платформа услуг" },
        "login.html": { kg: "KAG — Кирүү", ru: "KAG — Вход" },
        "marketplace.html": { kg: "KAG — Marketplace", ru: "KAG — Маркетплейс" },
        "add-service.html": { kg: "KAG — Кызмат кошуу", ru: "KAG — Добавить услугу" }
    };

    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html";
    if (titles[page]) document.title = titles[page][language];

    localStorage.setItem("KAG_language", language);
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: language }));
}

if (kgBtn) kgBtn.addEventListener("click", () => changeLanguage("kg"));
if (ruBtn) ruBtn.addEventListener("click", () => changeLanguage("ru"));

const savedLanguage = localStorage.getItem("KAG_language");
changeLanguage(savedLanguage === "ru" ? "ru" : "kg");

const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");

if (burger && mobileMenu) {
    burger.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");
        burger.classList.toggle("open");
    });
    mobileMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            mobileMenu.classList.remove("active");
            burger.classList.remove("open");
        });
    });
}
