/* =========================================
   KAG PLATFORM
   Marketplace Interaction
========================================= */
/* =========================================
   GLOBAL DATA
========================================= */
const executors = [
    {
        name: "Азамат С.",
        service: "Сантехник",
        rating: 4.9,
        orders: 127,
        price: 1500,
        location: "Бишкек",
        response: "5 мүнөттө жооп берет"
    },
    {
        name: "Бекзат К.",
        service: "Электрик",
        rating: 4.8,
        orders: 94,
        price: 1000,
        location: "Бишкек",
        response: "10 мүнөттө жооп берет"
    },
    {
        name: "Нурбек Т.",
        service: "Үй тазалоо",
        rating: 5.0,
        orders: 63,
        price: 800,
        location: "Бишкек",
        response: "3 мүнөттө жооп берет"
    }
];
/* =========================================
   SEARCH
========================================= */
function searchServices() {
    const input = document.getElementById("serviceSearch");
    if (!input) return;
    const query = input.value.trim();
    if (!query) {
        alert("Кандай кызмат керек экенин жазыңыз.");
        input.focus();
        return;
    }
    localStorage.setItem("kag_search", query);
    alert(
        `KAG издөө:\n\n"${query}"\n\n` +
        `Сиздин сурооңуз боюнча аткаруучулар изделүүдө.`
    );
}
/* ENTER → SEARCH */
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("serviceSearch");
    if (!input) return;
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            searchServices();
        }
    });
});
/* =========================================
   CATEGORY
========================================= */
function selectCategory(category) {
    localStorage.setItem("kag_category", category);
    const search = document.getElementById("serviceSearch");
    if (search) {
        search.value = category;
        search.focus();
    }
    alert(
        `KAG категориясы тандалды:\n\n${category}\n\n` +
        `Эми керектүү кызматты издей аласыз.`
    );
}
/* =========================================
   ALL CATEGORIES
========================================= */
function showAllCategories() {
    alert(
        "KAG категориялары:\n\n" +
        "🔧 Ремонт\n" +
        "🧹 Тазалоо\n" +
        "🏗️ Курулуш\n" +
        "🚚 Жеткирүү\n" +
        "🏠 Үй кызматтары\n" +
        "🚗 Авто\n" +
        "💻 IT & Digital\n" +
        "🎨 Дизайн\n" +
        "📸 Фото/Видео\n" +
        "📚 Окутуу\n" +
        "💼 Консультация"
    );
}
/* =========================================
   CREATE TASK
========================================= */
function createTask() {
    const task = {
        id: Date.now(),
        status: "new",
        createdAt: new Date().toISOString()
    };
    localStorage.setItem(
        "kag_current_task",
        JSON.stringify(task)
    );
    /*
       Эгер add-service.html эмес,
       task түзүү үчүн өзүнчө task.html
       жасасаң, ушул жерди task.html кыл.
    */
    window.location.href = "add-service.html";
}
/* =========================================
   VIEW EXECUTOR
========================================= */
function viewExecutor(name) {
    const executor = executors.find(
        item => item.name === name
    );
    if (!executor) {
        alert("Аткаруучу табылган жок.");
        return;
    }
    localStorage.setItem(
        "kag_selected_executor",
        JSON.stringify(executor)
    );
    alert(
        `${executor.name}\n\n` +
        `${executor.service}\n` +
        `⭐ ${executor.rating}\n` +
        `${executor.orders} заказ\n` +
        `${executor.price.toLocaleString()} сомдон\n` +
        `📍 ${executor.location}\n\n` +
        `${executor.response}`
    );
}
/* =========================================
   ORDER EXECUTOR
========================================= */
function orderExecutor(name) {
    const executor = executors.find(
        item => item.name === name
    );
    if (!executor) {
        alert("Аткаруучу табылган жок.");
        return;
    }
    localStorage.setItem(
        "kag_selected_executor",
        JSON.stringify(executor)
    );
    const order = {
        id: "KAG-" + Date.now(),
        executor: executor.name,
        service: executor.service,
        price: executor.price,
        status: "pending",
        createdAt: new Date().toISOString()
    };
    localStorage.setItem(
        "kag_current_order",
        JSON.stringify(order)
    );
    /*
       Азырынча checkout'ка жөнөтөбүз.
       Кийин чыныгы checkout flow кошобуз.
    */
    window.location.href = "checkout.html";
}
/* =========================================
   BECOME EXECUTOR
========================================= */
function becomeExecutor() {
    localStorage.setItem(
        "kag_executor_mode",
        "true"
    );
    window.location.href = "add-service.html";
}
/* =========================================
   GET CURRENT ORDER
========================================= */
function getCurrentOrder() {
    const order = localStorage.getItem(
        "kag_current_order"
    );
    if (!order) return null;
    try {
        return JSON.parse(order);
    } catch (error) {
        console.error(
            "KAG order error:",
            error
        );
        return null;
    }
}
/* =========================================
   GET SELECTED EXECUTOR
========================================= */
function getSelectedExecutor() {
    const executor = localStorage.getItem(
        "kag_selected_executor"
    );
    if (!executor) return null;
    try {
        return JSON.parse(executor);
    } catch (error) {
        console.error(
            "KAG executor error:",
            error
        );
        return null;
    }
}
/* =========================================
   CREATE DEMO OFFER
========================================= */
function createOffer() {
    const executor = getSelectedExecutor();
    if (!executor) {
        alert(
            "Алгач аткаруучуну тандаңыз."
        );
        return;
    }
    const offer = {
        id: "OFFER-" + Date.now(),
        executor: executor.name,
        service: executor.service,
        price: executor.price,
        rating: executor.rating,
        orders: executor.orders,
        status: "waiting"
    };
    localStorage.setItem(
        "kag_offer",
        JSON.stringify(offer)
    );
    alert(
        `Сунуш түзүлдү.\n\n` +
        `${executor.name}\n` +
        `${executor.price.toLocaleString()} сом`
    );
}
/* =========================================
   ACCEPT OFFER
========================================= */
function acceptOffer() {
    const offer = localStorage.getItem(
        "kag_offer"
    );
    if (!offer) {
        alert(
            "Азырынча сунуш жок."
        );
        return;
    }
    const parsedOffer = JSON.parse(offer);
    parsedOffer.status = "accepted";
    localStorage.setItem(
        "kag_offer",
        JSON.stringify(parsedOffer)
    );
    alert(
        "Сунуш кабыл алынды!\n\n" +
        `${parsedOffer.executor} аткаруучу болуп тандалды.`
    );
}
/* =========================================
   COMPLETE ORDER
========================================= */
function completeOrder() {
    const order = getCurrentOrder();
    if (!order) {
        alert(
            "Активдүү заказ жок."
        );
        return;
    }
    order.status = "completed";
    order.completedAt =
        new Date().toISOString();
    localStorage.setItem(
        "kag_current_order",
        JSON.stringify(order)
    );
    alert(
        "Заказ ийгиликтүү аяктады!"
    );
}
/* =========================================
   CANCEL ORDER
========================================= */
function cancelOrder() {
    const order = getCurrentOrder();
    if (!order) {
        alert(
            "Активдүү заказ жок."
        );
        return;
    }
    order.status = "cancelled";
    localStorage.setItem(
        "kag_current_order",
        JSON.stringify(order)
    );
    alert(
        "Заказ жокко чыгарылды."
    );
}
/* =========================================
   FAVORITE
========================================= */
function toggleFavorite(name) {
    let favorites =
        JSON.parse(
            localStorage.getItem(
                "kag_favorites"
            )
        ) || [];
    if (favorites.includes(name)) {
        favorites =
            favorites.filter(
                item => item !== name
            );
        alert(
            `${name} избранный тизмеден өчүрүлдү.`
        );
    } else {
        favorites.push(name);
        alert(
            `${name} избранный тизмеге кошулду.`
        );
    }
    localStorage.setItem(
        "kag_favorites",
        JSON.stringify(favorites)
    );
}
/* =========================================
   KAG NOTIFICATION
========================================= */
function kagNotification(message) {
    const notification =
        document.createElement("div");
    notification.textContent = message;
    notification.style.position = "fixed";
    notification.style.top = "90px";
    notification.style.right = "20px";
    notification.style.zIndex = "9999";
    notification.style.padding = "15px 20px";
    notification.style.background =
        "#D4AF37";
    notification.style.color =
        "#06251B";
    notification.style.borderRadius =
        "12px";
    notification.style.fontWeight =
        "700";
    notification.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.3)";
    document.body.appendChild(
        notification
    );
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
/* =========================================
   PAGE LOAD
========================================= */
document.addEventListener(
    "DOMContentLoaded",
    () => {
        const savedSearch =
            localStorage.getItem(
                "kag_search"
            );
        const input =
            document.getElementById(
                "serviceSearch"
            );
        if (
            input &&
            savedSearch
        ) {
            input.value =
                savedSearch;
        }
    }
);
