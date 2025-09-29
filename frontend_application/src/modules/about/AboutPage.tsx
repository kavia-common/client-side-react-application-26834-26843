import React from 'react';

// PUBLIC_INTERFACE
export default function AboutPage(): JSX.Element {
  /** About page describing the application purpose and stack. */
  return (
    <section className="card" aria-labelledby="about-heading">
      <h1 id="about-heading" style={{ marginTop: 0 }}>About</h1>
      <p>
        This application demonstrates a clean, modern React frontend using a classic layout with a Corporate Navy theme.
        It includes client-side routing, responsive design, and dynamic content.
      </p>
      <ul>
        <li>React 18 + TypeScript</li>
        <li>Vite for fast development and builds</li>
        <li>ESLint for linting and code quality</li>
      </ul>
    </section>
  );
}
