const Home = () => {
  return (
    <section className="page hero-page">
      <div className="hero-panel glass-card">
        <p className="eyebrow">Future Of Stationery</p>
        <h1 className="hero-title">Online Stationery Shop</h1>
        <p className="hero-subtitle">
          Premium notebooks, pens, files and study essentials with a modern shopping experience.
        </p>
      </div>

      <div className="feature-grid">
        <article className="glass-card feature-card">
          <h3>Smart Catalog</h3>
          <p>Fast search, categories and clean product cards.</p>
        </article>
        <article className="glass-card feature-card">
          <h3>Admin Power</h3>
          <p>Create, edit and manage products and orders in one place.</p>
        </article>
        <article className="glass-card feature-card">
          <h3>Quick Checkout</h3>
          <p>Simple cart flow designed for speed on desktop and mobile.</p>
        </article>
      </div>
    </section>
  );
};

export default Home;
