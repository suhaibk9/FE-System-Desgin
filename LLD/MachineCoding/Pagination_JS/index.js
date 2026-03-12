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
    if (products.length > 0) {
      products.slice(page * 10 - 10, page * 10).forEach((product, index) => {
        const ele = document.createElement("div");
        ele.classList.add("products_single");
        ele.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}"/>
        <span>${product.title}</span>"`;
        productsContainer.append(ele);
        console.log(ele);
      });

      const pagination = document.createElement("div");
      pagination.classList.add("pagination");
      if (page > 1) {
        const prevButton = createPaginationBtn("<", () => {
          selectPageHandler(page - 1);
        });
        pagination.append(prevButton);
      }
      //Dispaly All Btns 1-10
      for (let i = 0; i < products.length / 10; i++) {
        const pageBtn = createPaginationBtn(
          i + 1,
          () => {
            selectPageHandler(i + 1);
          },
          page === i + 1,
        );
        pagination.append(pageBtn);
      }
      if (page < products.length / 10) {
        const nextBtn = createPaginationBtn(">", () => {
          selectPageHandler(page + 1);
        });
        pagination.append(nextBtn);
      }
      const app = document.querySelector(".app");
      app.innerHTML = "";
      app.append(productsContainer, pagination);
    }
  };
  const createPaginationBtn = (icon, fn, isSelected = false) => {
    const btn = document.createElement("button");
    btn.innerHTML = icon;
    btn.classList.add("pagination-btn");
    btn.addEventListener("click", fn);
    if (isSelected) {
      btn.classList.add("pagination-selected");
    }
    return btn;
  };
  const selectPageHandler = (pageNum) => {
    if (pageNum > 0 && pageNum <= products.length / 10 && page !== pageNum) {
      page = pageNum;
      render();
    }
  };
  fetchProducts();
});
// {
// id: 1,
// title: "Essence Mascara Lash Princess",
// description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
// category: "beauty",
// price: 9.99,
// discountPercentage: 10.48,
// rating: 2.56,
// stock: 99,
// tags: [
// "beauty",
// "mascara"
// ],
// brand: "Essence",
// sku: "BEA-ESS-ESS-001",
// weight: 4,
// dimensions: {
// width: 15.14,
// height: 13.08,
// depth: 22.99
// },
// warrantyInformation: "1 week warranty",
// shippingInformation: "Ships in 3-5 business days",
// availabilityStatus: "In Stock",
// reviews: [
// {
// rating: 3,
// comment: "Would not recommend!",
// date: "2025-04-30T09:41:02.053Z",
// reviewerName: "Eleanor Collins",
// reviewerEmail: "eleanor.collins@x.dummyjson.com"
// },
// {
// rating: 4,
// comment: "Very satisfied!",
// date: "2025-04-30T09:41:02.053Z",
// reviewerName: "Lucas Gordon",
// reviewerEmail: "lucas.gordon@x.dummyjson.com"
// },
// {
// rating: 5,
// comment: "Highly impressed!",
// date: "2025-04-30T09:41:02.053Z",
// reviewerName: "Eleanor Collins",
// reviewerEmail: "eleanor.collins@x.dummyjson.com"
// }
// ],
// returnPolicy: "No return policy",
// minimumOrderQuantity: 48,
// meta: {
// createdAt: "2025-04-30T09:41:02.053Z",
// updatedAt: "2025-04-30T09:41:02.053Z",
// barcode: "5784719087687",
// qrCode: "https://cdn.dummyjson.com/public/qr-code.png"
// },
// images: [
// "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
// ],
// thumbnail: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
// },
