export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="auth-page">
      <aside className="auth-aside">
        <div className="auth-brand">
          <span>Wari</span>
          <span className="brand-dot" aria-hidden="true" />
        </div>

        <div className="auth-aside-copy">
          <h1 className="auth-aside-title">Conversations, kept.</h1>
          <p className="auth-aside-text">
            A quiet place for the people you actually want to talk to. No feed,
            no noise. Just the thread.
          </p>
        </div>

        <div className="auth-slips" aria-hidden="true">
          <div className="auth-slip auth-slip-back" />
          <div className="auth-slip auth-slip-mid" />
          <div className="auth-slip auth-slip-front">
            <span className="auth-slip-line auth-slip-line-long" />
            <span className="auth-slip-line" />
            <span className="auth-slip-line auth-slip-line-short" />
            <span className="auth-slip-dot" />
          </div>
        </div>

        <p className="auth-aside-foot">A small room for the people who matter.</p>
      </aside>

      <main className="auth-main">
        <div className="auth-form">
          <div className="auth-mobile-brand">
            <span>Wari</span>
            <span className="brand-dot" aria-hidden="true" />
          </div>

          <h2 className="auth-title">{title}</h2>
          <p className="auth-subtitle">{subtitle}</p>

          {children}

          {footer && <div className="auth-footer">{footer}</div>}
        </div>
      </main>
    </div>
  );
}
