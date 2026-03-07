import React, { useState } from "react";
import { trace } from "@opentelemetry/api";

// Get a named tracer — all spans created from this tracer
// will be grouped under "ecommerce-app" in your tracing dashboard
const tracer = trace.getTracer("ecommerce-app");

// ──────────────────────────────────────────────
// Sample Products
// ──────────────────────────────────────────────
const PRODUCTS = [
  { id: 1, name: "Wireless Headphones", price: 59.99 },
  { id: 2, name: "USB-C Hub",           price: 29.99 },
  { id: 3, name: "Mechanical Keyboard", price: 89.99 },
  { id: 4, name: "Mouse Pad XL",        price: 14.99 },
];

// ──────────────────────────────────────────────
// App Component
// ──────────────────────────────────────────────
export default function App() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("products"); // products | cart | checkout

  // Add item to cart & create an OpenTelemetry span
  const addToCart = (product) => {
    const span = tracer.startSpan("addToCart");
    span.setAttribute("product.id", product.id);
    span.setAttribute("product.name", product.name);
    span.setAttribute("product.price", product.price);

    setCart((prev) => [...prev, product]);

    console.log(`[OTel Span] addToCart: ${product.name}`);
    span.end(); // Always end spans!
  };

  // Remove item from cart with span
  const removeFromCart = (index) => {
    const span = tracer.startSpan("removeFromCart");
    span.setAttribute("product.name", cart[index].name);

    setCart((prev) => prev.filter((_, i) => i !== index));

    span.end();
  };

  // Handle checkout with span
  const handleCheckout = () => {
    const span = tracer.startSpan("checkout");
    span.setAttribute("cart.itemCount", cart.length);
    span.setAttribute("cart.total", parseFloat(total));

    if (cart.length === 0) {
      span.setStatus({ code: 2, message: "Empty cart checkout attempt" }); // code 2 = ERROR
      span.end();
      alert("Cart is empty!");
      return;
    }

    span.setStatus({ code: 1 }); // code 1 = OK
    span.end();

    alert("Order placed successfully!");
    setCart([]);
    setPage("products");
  };

  // Simulate an error and record it on a span
  const triggerError = () => {
    const span = tracer.startSpan("simulatedError");
    try {
      throw new Error("Intentional error to test OpenTelemetry!");
    } catch (err) {
      span.recordException(err);                                  // Attach exception to the span
      span.setStatus({ code: 2, message: err.message });          // Mark span as errored
      console.error("[OTel] Recorded exception on span:", err.message);
      alert("Error recorded as an OpenTelemetry span! Check the console.");
    } finally {
      span.end();
    }
  };

  // ── Total ──
  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1>🛒 OpenTelemetry E-Commerce</h1>

      {/* Navigation */}
      <nav style={{ marginBottom: 20 }}>
        <button onClick={() => setPage("products")} style={navBtn}>Products</button>
        <button onClick={() => setPage("cart")} style={navBtn}>Cart ({cart.length})</button>
        <button onClick={triggerError} style={{ ...navBtn, color: "red" }}>💥 Trigger Error</button>
      </nav>

      {/* ── Products Page ── */}
      {page === "products" && (
        <div>
          <h2>Products</h2>
          {PRODUCTS.map((p) => (
            <div key={p.id} style={cardStyle}>
              <span>{p.name} — ${p.price}</span>
              <button onClick={() => addToCart(p)} style={addBtn}>Add to Cart</button>
            </div>
          ))}
        </div>
      )}

      {/* ── Cart Page ── */}
      {page === "cart" && (
        <div>
          <h2>Your Cart</h2>
          {cart.length === 0 && <p>Cart is empty.</p>}
          {cart.map((item, i) => (
            <div key={i} style={cardStyle}>
              <span>{item.name} — ${item.price}</span>
              <button onClick={() => removeFromCart(i)} style={removeBtn}>Remove</button>
            </div>
          ))}
          {cart.length > 0 && (
            <>
              <h3>Total: ${total}</h3>
              <button onClick={() => setPage("checkout")} style={checkoutBtn}>Proceed to Checkout</button>
            </>
          )}
        </div>
      )}

      {/* ── Checkout Page ── */}
      {page === "checkout" && (
        <div>
          <h2>Checkout</h2>
          <p>Items: {cart.length}</p>
          <p>Total: ${total}</p>
          <button onClick={handleCheckout} style={checkoutBtn}>Place Order</button>
          <button onClick={() => setPage("cart")} style={navBtn}>Back to Cart</button>
        </div>
      )}
    </div>
  );
}

// ── Inline Styles ──
const navBtn = { marginRight: 10, padding: "8px 16px", cursor: "pointer" };
const cardStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, borderBottom: "1px solid #eee" };
const addBtn = { padding: "6px 14px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" };
const removeBtn = { padding: "6px 14px", backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" };
const checkoutBtn = { padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", fontSize: 16 };
