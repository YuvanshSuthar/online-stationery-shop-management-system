import { Link } from "react-router-dom";

const AuthGateway = () => {
  return (
    <div className="auth-shell">
      <div className="three-d-layer three-d-layer-one" />
      <div className="three-d-layer three-d-layer-two" />
      <div className="three-d-layer three-d-layer-three" />

      <section className="auth-landing glass-card">
        <p className="eyebrow">Welcome To</p>
        <h1>SHARMA Stationery Hub</h1>
        <p className="muted">
          Sign in to unlock products, cart and orders. New users can register here.
        </p>

        <div className="gateway-actions">
          <Link className="btn btn-primary" to="/login">
            Customer Login
          </Link>
          <Link className="btn btn-secondary" to="/register">
            Register
          </Link>
          <Link className="btn btn-dark" to="/admin-login">
            Admin Login
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AuthGateway;
