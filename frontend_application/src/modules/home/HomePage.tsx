import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function HomePage(): JSX.Element {
  /** Home page showing a welcome message and a simple interactive counter card. */
  const [count, setCount] = useState<number>(0);

  return (
    <section className="card" aria-labelledby="home-heading">
      <h1 id="home-heading" style={{ marginTop: 0 }}>Welcome</h1>
      <p>This is a client-side React app with a classic corporate look.</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
        <button className="button" onClick={() => setCount(c => c + 1)} aria-label="Increment counter">
          Clicked {count} times
        </button>
        <button className="button" style={{ background: 'var(--secondary)' }} onClick={() => setCount(0)} aria-label="Reset counter">
          Reset
        </button>
      </div>
    </section>
  );
}
