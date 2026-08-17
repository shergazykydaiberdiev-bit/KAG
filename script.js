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

    // Обновляем placeholder'ы
    document.querySelectorAll("[data-kg-placeholder][data-ru-placeholder]").forEach(el => {
        el.placeholder =
            language === "kg"
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

    // Заголовки страниц
    const titles = {
        "index.html": {
            kg: "KAG — Кызматтар платформасы",
            ru: "KAG — Платформа услуг"
        },
        "login.html": {
            kg: "KAG — Кирүү",
            ru: "KAG — Вход"
        },
        "marketplace.html": {
            kg: "KAG — Marketplace",
            ru: "KAG — Маркетплейс"
        },
        "add-service.html": {
            kg: "KAG — Кызмат кошуу",
            ru: "KAG — Добавить услугу"
        }
    };

    const page = window.location.pathname.split("/").pop() || "index.html";
    if (titles[page]) {
        document.title = titles[page][language];
    }

    localStorage.setItem("KAG_language", language);
}

// Кнопки
if (kgBtn) {
    kgBtn.addEventListener("click", () => changeLanguage("kg"));
}
if (ruBtn) {
    ruBtn.addEventListener("click", () => changeLanguage("ru"));
}

// Загружаем сохранённый язык
const savedLanguage = localStorage.getItem("KAG_language");
changeLanguage(savedLanguage === "ru" ? "ru" : "kg");
