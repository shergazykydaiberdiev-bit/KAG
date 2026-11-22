
const SUPABASE_URL =
    "https://kyudeeqjbksjczqidagc.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_AdyXuaFhp9LaJBKAXm2_IQ_JsGPsp6Y";

let supabaseClient = null;
let services = [];
let currentCategory = "all";

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

async function loadServices() {
    const container = document.getElementById("services");

    container.innerHTML = `
        <div class="message">
            <h3>Кызматтар жүктөлүүдө...</h3>
        </div>
    `;

    try {
        if (!window.supabase) {
            throw new Error("Supabase китепканасы жүктөлгөн жок.");
        }

        if (!supabaseClient) {
            supabaseClient = window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_PUBLISHABLE_KEY
            );
        }

        const { data, error } = await supabaseClient
            .from("services")
            .select("id,name,category,description,icon,base_price,is_active")
            .eq("is_active", true)
            .order("id", { ascending: true });

        if (error) throw error;

        services = data || [];

        createCategories();
        showServices();

    } catch (error) {
        console.error("KAG SERVICES ERROR:", error);

        container.innerHTML = `
            <div class="message error">
                <h3>Кызматтарды жүктөөдө ката кетти</h3>
                <p>${escapeHtml(error.message)}</p>
                <button onclick="loadServices()">Кайра аракет кылуу</button>
            </div>
        `;
    }
}

function createCategories() {
    const box = document.getElementById("categories");
    box.innerHTML = "";

    const categories = [
        "all",
        ...new Set(services.map(s => s.category).filter(Boolean))
    ];

    categories.forEach(category => {
        const button = document.createElement("button");

        button.className =
            "category" +
            (category === currentCategory ? " active" : "");

        button.textContent =
            category === "all" ? "Баары" : category;

        button.addEventListener("click", () => {
            selectCategory(category, button);
        });

        box.appendChild(button);
    });
}

function selectCategory(category, button) {
    currentCategory = category;

    document.querySelectorAll(".category").forEach(item => {
        item.classList.remove("active");
    });

    button.classList.add("active");
    showServices();
}

function showServices() {
    const container = document.getElementById("services");

    const search = document
        .getElementById("search")
        .value.toLowerCase().trim();

    let filtered = services;

    if (currentCategory !== "all") {
        filtered = filtered.filter(
            service => service.category === currentCategory
        );
    }

    if (search) {
        filtered = filtered.filter(service => {
            const text = [
                service.name,
                service.category,
                service.description
            ].join(" ").toLowerCase();

            return text.includes(search);
        });
    }

    if (!filtered.length) {
        container.innerHTML = `
            <div class="message">
                Кызмат табылган жок.
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(service => {
        const price = service.base_price
            ? Number(service.base_price).toLocaleString("ru-RU")
            : "Баасы сүйлөшүлөт";

        return `
            <div class="card">
                <div class="icon">
                    ${escapeHtml(service.icon || "🛠️")}
                </div>

                <h3>${escapeHtml(service.name || "Кызмат")}</h3>

                <div class="cat">
                    ${escapeHtml(service.category || "")}
                </div>

                <div class="description">
                    ${escapeHtml(service.description || "Профессионалдык кызмат")}
                </div>

                <div class="price">
                    ${price} ${service.base_price ? "сомдон" : ""}
                </div>

                <a class="btn"
                   href="add-task.html?service=${encodeURIComponent(String(service.id))}">
                    Кызматка заказ берүү
                </a>
            </div>
        `;
    }).join("");
}

document.getElementById("search").addEventListener(
    "input",
    showServices
);

loadServices();
