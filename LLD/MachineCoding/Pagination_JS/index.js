// document.addEventListener("DOMContentLoaded", () => {
//   let products = [];
//   let page = 1;
//   const fetchProducts = async () => {
//     try {
//       const res = await fetch("https://dummyjson.com/products?limit=100");
//       const data = await res.json();
//       if (data && data.products) {
//         products = data.products;
//         render();
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const render = () => {
//     const productsContainer = document.createElement("div");
//     productsContainer.classList.add("products");
//     if (products.length > 0) {
//       products.slice(page * 10 - 10, page * 10).forEach((product, index) => {
//         const ele = document.createElement("div");
//         ele.classList.add("products_single");
//         ele.innerHTML = `
//         <img src="${product.thumbnail}" alt="${product.title}"/>
//         <span>${product.title}</span>"`;
//         productsContainer.append(ele);
//         console.log(ele);
//       });

//       const pagination = document.createElement("div");
//       pagination.classList.add("pagination");
//       if (page > 1) {
//         const prevButton = createPaginationBtn("<", () => {
//           selectPageHandler(page - 1);
//         });
//         pagination.append(prevButton);
//       }
//       //Dispaly All Btns 1-10
//       for (let i = 0; i < products.length / 10; i++) {
//         const pageBtn = createPaginationBtn(
//           i + 1,
//           () => {
//             selectPageHandler(i + 1);
//           },
//           page === i + 1,
//         );
//         pagination.append(pageBtn);
//       }
//       if (page < products.length / 10) {
//         const nextBtn = createPaginationBtn(">", () => {
//           selectPageHandler(page + 1);
//         });
//         pagination.append(nextBtn);
//       }
//       const app = document.querySelector(".app");
//       app.innerHTML = "";
//       app.append(productsContainer, pagination);
//     }
//   };
//   const createPaginationBtn = (icon, fn, isSelected = false) => {
//     const btn = document.createElement("button");
//     btn.innerHTML = icon;
//     btn.classList.add("pagination-btn");
//     btn.addEventListener("click", fn);
//     if (isSelected) {
//       btn.classList.add("pagination-selected");
//     }
//     return btn;
//   };
//   const selectPageHandler = (pageNum) => {
//     if (pageNum > 0 && pageNum <= products.length / 10 && page !== pageNum) {
//       page = pageNum;
//       render();
//     }
//   };
//   fetchProducts();
// });
document.addEventListener("DOMContentLoaded", () => {
  let products = [];
  let page = 1;
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=100");
      const data = await res.json();
      if (data && data.products) {
        products = data.products;
        render();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const render = () => {
    const productsContainer = document.createElement("div");
    productsContainer.classList.add("products");
    const pagination = document.createElement("div");
    pagination.classList.add("pagination");
    if (products.length > 0) {
      products.slice(page * 10 - 10, page * 10).forEach((product, index) => {
        const ele = document.createElement("div");
        ele.classList.add("products_single");
        ele.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}"/>
        <span>${product.title}</span>"`;
        productsContainer.append(ele);
      });

      if (page > 1) {
        const prevButton = createPaginationBtn("prev", "<", () => {
          selectPageHandler(page - 1);
        });
        pagination.append(prevButton);
      }
      //Dispaly All Btns 1-10
      for (let i = 0; i < products.length / 10; i++) {
        const pageBtn = createPaginationBtn(
          i + 1,
          i + 1,
          () => {
            selectPageHandler(i + 1);
          },
          page === i + 1,
        );
        pagination.append(pageBtn);
      }
      if (page < products.length / 10) {
        const nextBtn = createPaginationBtn("next", ">", () => {
          selectPageHandler(page + 1);
        });
        pagination.append(nextBtn);
      }
      const app = document.querySelector(".app");
      app.innerHTML = "";
      app.append(productsContainer, pagination);
    }
    pagination.addEventListener("click", (e) => {
      // Ignore clicks on the container itself
      if (e.target.tagName !== "BUTTON") return;

      const action = e.target.dataset.id;
      if (action === "prev") {
        selectPageHandler(page - 1);
      } else if (action === "next") {
        selectPageHandler(page + 1);
      } else {
        // If it's not prev/next, it must be a number
        selectPageHandler(Number(action));
      }
    });
  };
  const createPaginationBtn = (id, icon, fn, isSelected = false) => {
    const btn = document.createElement("button");
    btn.innerHTML = icon;
    btn.classList.add("pagination-btn");
    btn.setAttribute("data-id", id);
    if (isSelected) {
      btn.classList.add("pagination-selected");
    }
    return btn;
  };
  const selectPageHandler = (pageNum) => {
    console.log("pageNum", pageNum);
    if (pageNum > 0 && pageNum <= products.length / 10 && page !== pageNum) {
      page = pageNum;
      render();
    }
  };
  fetchProducts();
});
