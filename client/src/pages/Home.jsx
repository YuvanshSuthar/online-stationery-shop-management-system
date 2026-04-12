const Home = () => {
  return (
    <section className="page hero-page">
      <div className="hero-panel glass-card">
        <p className="eyebrow">Bright. Clean. Professional.</p>
        <h1 className="hero-title">SHARMA Stationery Hub</h1>
        <p className="hero-subtitle">
          Explore premium stationery essentials designed for students, offices and creators.
        </p>
      </div>

      <div className="feature-grid">
        <article className="glass-card feature-card">
          <h3>Simple Shopping</h3>
          <p>Customer view stays clean with only essential product details.</p>
        </article>
        <article className="glass-card feature-card">
          <h3>Admin Control</h3>
          <p>Manage stock, categories, products, orders and login records.</p>
        </article>
        <article className="glass-card feature-card">
          <h3>Fast Workflow</h3>
          <p>Left-side navigation keeps every section one click away.</p>
        </article>
      </div>
    </section>
  );
};

export default Home;
