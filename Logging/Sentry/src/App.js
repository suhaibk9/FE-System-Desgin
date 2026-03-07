import React, { useState } from "react";
import * as Sentry from "@sentry/react";

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

  // Add item to cart & log a Sentry breadcrumb
  const addToCart = (product) => {
    Sentry.addBreadcrumb({
      category: "cart",
      message: `Added ${product.name} to cart`,
      level: "info",
    });
    setCart((prev) => [...prev, product]);
  };

  // Remove item from cart
  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // Simulate a checkout error (captured by Sentry)
  const handleCheckout = () => {
    try {
      if (cart.length === 0) {
        throw new Error("Cannot checkout with an empty cart!");
      }
      // Capture a successful checkout message
      Sentry.captureMessage("Checkout completed", "info");
      alert("Order placed successfully!");
      setCart([]);
      setPage("products");
    } catch (err) {
      Sentry.captureException(err);
      alert(err.message);
    }
  };

  // Button to intentionally crash (to test Sentry error boundary)
  const crashApp = () => {
    throw new Error("Intentional crash to test Sentry!");
  };

  // ── Total ──
  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1>🛒 Sentry E-Commerce</h1>

      {/* Navigation */}
      <nav style={{ marginBottom: 20 }}>
        <button onClick={() => setPage("products")} style={navBtn}>Products</button>
        <button onClick={() => setPage("cart")} style={navBtn}>Cart ({cart.length})</button>
        <button onClick={crashApp} style={{ ...navBtn, color: "red" }}>💥 Crash App</button>
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
