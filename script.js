/* =========================================
   KAG — MAIN SCRIPT
   ========================================= */

const KAG = {

    getUser() {
        return JSON.parse(
            localStorage.getItem("kagUser")
        );
    },

    setUser(user) {
        localStorage.setItem(
            "kagUser",
            JSON.stringify(user)
        );
    },

    logout() {
        localStorage.removeItem("kagUser");
        window.location.href = "login.html";
    },


    getOrders() {
        return JSON.parse(
            localStorage.getItem("kagOrders")
        ) || [];
    },

    saveOrders(orders) {
        localStorage.setItem(
            "kagOrders",
            JSON.stringify(orders)
        );
    },


    createOrder(order) {

        const orders = this.getOrders();

        const newOrder = {

            id: "KAG-" +
                Math.floor(
                    100000 +
                    Math.random() * 900000
                ),

            status: "Заказ түзүлдү",

            createdAt:
                new Date().toISOString(),

            ...order

        };

        orders.unshift(newOrder);

        this.saveOrders(orders);

        return newOrder;

    },


    updateOrderStatus(id, status) {

        const orders = this.getOrders();

        const order =
            orders.find(
                o => String(o.id) === String(id)
            );

        if (!order) return false;

        order.status = status;

        order.updatedAt =
            new Date().toISOString();

        this.saveOrders(orders);

        return true;

    },


    getOrder(id) {

        const orders = this.getOrders();

        return orders.find(
            o => String(o.id) === String(id)
        );

    },


    addService(service) {

        const services =
            JSON.parse(
                localStorage.getItem("kagServices")
            ) || [];

        service.id =
            service.id ||
            "service_" + Date.now();

        service.createdAt =
            new Date().toISOString();

        services.unshift(service);

        localStorage.setItem(
            "kagServices",
            JSON.stringify(services)
        );

        return service;

    },


    getServices() {

        return JSON.parse(
            localStorage.getItem("kagServices")
        ) || [];

    },


    isLoggedIn() {

        return !!this.getUser();

    },


    requireLogin() {

        if (!this.isLoggedIn()) {

            window.location.href =
                "login.html";

            return false;

        }

        return true;

    }

};


/* =========================================
   HEADER USER
   ========================================= */

function updateKAGHeader() {

    const user = KAG.getUser();

    const loginButtons =
        document.querySelectorAll(
            "[data-kag-login]"
        );

    loginButtons.forEach(button => {

        if (user) {

            button.textContent =
                user.name || "Профиль";

            button.href =
                "profile.html";

        } else {

            button.textContent =
                "Кирүү";

            button.href =
                "login.html";

        }

    });

}


/* =========================================
   LOGOUT BUTTON
   ========================================= */

document.addEventListener(
    "click",
    function(event) {

        const logoutButton =
            event.target.closest(
                "[data-kag-logout]"
            );

        if (!logoutButton) return;

        event.preventDefault();

        KAG.logout();

    }
);


/* =========================================
   INITIALIZE
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateKAGHeader();

    }
);
