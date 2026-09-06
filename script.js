/* =========================================
   KAG GLOBAL SCRIPT
========================================= */

const KAG = {

  /* =========================
     STORAGE
  ========================= */

  get(key, fallback = []){

    try{

      const data =
        localStorage.getItem(key);

      return data
        ? JSON.parse(data)
        : fallback;

    }catch(error){

      console.error(
        "KAG Storage Error:",
        error
      );

      return fallback;

    }

  },


  set(key, value){

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );

  },


  remove(key){

    localStorage.removeItem(key);

  },


  /* =========================
     USER
  ========================= */

  getUser(){

    return this.get(
      "kagUser",
      null
    );

  },


  isLoggedIn(){

    return !!this.getUser();

  },


  isCustomer(){

    const user =
      this.getUser();

    return (
      user &&
      user.role === "customer"
    );

  },


  isExecutor(){

    const user =
      this.getUser();

    return (
      user &&
      user.role === "executor"
    );

  },


  logout(){

    this.remove(
      "kagUser"
    );

    window.location.href =
      "index.html";

  },


  /* =========================
     CART
  ========================= */

  getCart(){

    return this.get(
      "kagCart",
      []
    );

  },


  setCart(cart){

    this.set(
      "kagCart",
      cart
    );

  },


  clearCart(){

    this.remove(
      "kagCart"
    );

  },


  cartCount(){

    return this.getCart()
      .reduce(
        (sum,item) =>
          sum +
          Number(
            item.quantity || 1
          ),
        0
      );

  },


  cartTotal(){

    return this.getCart()
      .reduce(
        (sum,item) =>
          sum +
          Number(
            item.price || 0
          ) *
          Number(
            item.quantity || 1
          ),
        0
      );

  },


  addToCart(item){

    const cart =
      this.getCart();


    const existing =
      cart.find(
        x =>
          x.service ===
          item.service &&
          x.master ===
          item.master
      );


    if(existing){

      existing.quantity =
        Number(
          existing.quantity || 1
        ) + 1;

    }else{

      cart.push({

        ...item,

        id:
          item.id ||
          "CART-" +
          Date.now(),

        quantity:
          item.quantity || 1

      });

    }


    this.setCart(cart);

    return cart;

  },


  removeFromCart(index){

    const cart =
      this.getCart();

    cart.splice(
      index,
      1
    );

    this.setCart(cart);

    return cart;

  },


  /* =========================
     TASKS
  ========================= */

  getTasks(){

    return this.get(
      "kagTasks",
      []
    );

  },


  setTasks(tasks){

    this.set(
      "kagTasks",
      tasks
    );

  },


  createTask(data){

    const tasks =
      this.getTasks();


    const task = {

      id:
        "TASK-" +
        Date.now(),

      title:
        data.title || "",

      category:
        data.category || "",

      description:
        data.description || "",

      address:
        data.address || "",

      date:
        data.date || "",

      budget:
        Number(
          data.budget || 0
        ),

      phone:
        data.phone || "",

      status:
        "Жаңы",

      offers:
        [],

      createdAt:
        new Date().toISOString()

    };


    tasks.push(task);

    this.setTasks(tasks);

    return task;

  },


  getTask(taskId){

    return this.getTasks()
      .find(
        task =>
          task.id === taskId
      );

  },


  updateTask(taskId,data){

    const tasks =
      this.getTasks();


    const index =
      tasks.findIndex(
        task =>
          task.id === taskId
      );


    if(index === -1){

      return null;

    }


    tasks[index] = {

      ...tasks[index],

      ...data

    };


    this.setTasks(tasks);

    return tasks[index];

  },


  /* =========================
     OFFERS
  ========================= */

  getOffers(){

    return this.get(
      "kagMyOffers",
      []
    );

  },


  setOffers(offers){

    this.set(
      "kagMyOffers",
      offers
    );

  },


  createOffer(data){

    const offers =
      this.getOffers();


    const offer = {

      id:
        "OFFER-" +
        Date.now(),

      taskId:
        data.taskId,

      master:
        data.master || "Мастер",

      rating:
        Number(
          data.rating || 5
        ),

      reviews:
        Number(
          data.reviews || 0
        ),

      price:
        Number(
          data.price || 0
        ),

      time:
        data.time ||
        "Макулдашуу боюнча",

      message:
        data.message || "",

      status:
        "Жөнөтүлдү",

      createdAt:
        new Date().toISOString()

    };


    offers.push(offer);

    this.setOffers(offers);


    /*
     * Offer → Task
     */

    const task =
      this.getTask(
        data.taskId
      );


    if(task){

      if(
        !Array.isArray(
          task.offers
        )
      ){

        task.offers = [];

      }


      task.offers.push(
        offer
      );


      this.updateTask(
        task.id,
        {
          offers:
            task.offers
        }
      );

    }


    return offer;

  },


  /* =========================
     ORDERS
  ========================= */

  getOrders(){

    return this.get(
      "kagOrders",
      []
    );

  },


  setOrders(orders){

    this.set(
      "kagOrders",
      orders
    );

  },


  createOrder(data){

    const orders =
      this.getOrders();


    const order = {

      id:
        "KAG-" +
        Date.now(),

      items:
        data.items || [],

      customerName:
        data.customerName || "",

      customerPhone:
        data.customerPhone || "",

      paymentMethod:
        data.paymentMethod || "",

      total:
        Number(
          data.total || 0
        ),

      status:
        "Жаңы заказ",

      createdAt:
        new Date().toISOString()

    };


    orders.push(order);

    this.setOrders(orders);

    return order;

  },


  getOrder(orderId){

    return this.getOrders()
      .find(
        order =>
          order.id === orderId
      );

  },


  updateOrder(orderId,data){

    const orders =
      this.getOrders();


    const index =
      orders.findIndex(
        order =>
          order.id === orderId
      );


    if(index === -1){

      return null;

    }


    orders[index] = {

      ...orders[index],

      ...data

    };


    this.setOrders(orders);

    return orders[index];

  },


  /* =========================
     SEARCH
  ========================= */

  search(query){

    const q =
      String(
        query || ""
      )
      .toLowerCase()
      .trim();


    if(!q){

      return [];

    }


    const tasks =
      this.getTasks();


    return tasks.filter(
      task =>
        String(
          task.title
        )
        .toLowerCase()
        .includes(q)

        ||

        String(
          task.category
        )
        .toLowerCase()
        .includes(q)

        ||

        String(
          task.description
        )
        .toLowerCase()
        .includes(q)
    );

  },


  /* =========================
     ID
  ========================= */

  id(prefix){

    return (
      prefix +
      "-" +
      Date.now() +
      "-" +
      Math.random()
        .toString(36)
        .substring(2,7)
    );

  },


  /* =========================
     MONEY
  ========================= */

  money(amount){

    return Number(
      amount || 0
    ).toLocaleString(
      "ky-KG"
    ) + " сом";

  },


  /* =========================
     DATE
  ========================= */

  date(date){

    if(!date){

      return "—";

    }


    return new Date(date)
      .toLocaleDateString(
        "ky-KG"
      );

  },


  /* =========================
     HTML SECURITY
  ========================= */

  escape(value){

    return String(
      value ?? ""
    )
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

  }

};


/* =========================================
   GLOBAL CART COUNTER
========================================= */

function updateKagCartCount(){

  const count =
    KAG.cartCount();


  document
    .querySelectorAll(
      "[data-kag-cart-count]"
    )
    .forEach(element => {

      element.textContent =
        count;

    });

}


/* =========================================
   GLOBAL USER
========================================= */

function updateKagUser(){

  const user =
    KAG.getUser();


  document
    .querySelectorAll(
      "[data-kag-user]"
    )
    .forEach(element => {

      element.textContent =
        user
          ? (
              user.name ||
              user.login ||
              "Колдонуучу"
            )
          : "Кирүү";

    });

}


/* =========================================
   INIT
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    updateKagCartCount();

    updateKagUser();

  }
);
