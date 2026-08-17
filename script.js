const kgBtn = document.getElementById("kgBtn");
const ruBtn = document.getElementById("ruBtn");

function changeLanguage(language) {
    document.documentElement.lang = language;

    // Обычный текст
    document.querySelectorAll("[data-kg][data-ru]").forEach(el => {
        el.textContent = language === "kg"
            ? el.getAttribute("data-kg")
            : el.getAttribute("data-ru");
    });

    // Placeholder'ы
    document.querySelectorAll("[data-kg-placeholder][data-ru-placeholder]").forEach(el => {
        el.placeholder = language === "kg"
            ? el.getAttribute("data-kg-placeholder")
            : el.getAttribute("data-ru-placeholder");
    });

    // Кнопки языка
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

    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html";

    if (titles[page]) {
        document.title = titles[page][language];
    }

    localStorage.setItem("KAG_language", language);

    // Событие для других скриптов (marketplace и т.д.)
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: language }));
}

// Слушатели кнопок
if (kgBtn) {
    kgBtn.addEventListener("click", () => changeLanguage("kg"));
}
if (ruBtn) {
    ruBtn.addEventListener("click", () => changeLanguage("ru"));
}

// При загрузке страницы
const savedLanguage = localStorage.getItem("KAG_language");
changeLanguage(savedLanguage === "ru" ? "ru" : "kg");
