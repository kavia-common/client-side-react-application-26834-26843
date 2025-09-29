import React from 'react';

// PUBLIC_INTERFACE
export default function AboutPage(): JSX.Element {
  /** About page describing VizAI purpose, theme and stack. */
  return (
    <section className="card" aria-labelledby="about-heading">
      <h1 id="about-heading" className="text-2xl font-semibold">About VizAI</h1>
      <p className="mt-2 text-gray-700 dark:text-slate-200">
        VizAI is a wildlife-inspired analytics UI crafted with React + Tailwind CSS.
        It showcases a dashboard with charts, drag-and-drop uploads, and a YOLO analysis page
        featuring bounding boxes and metrics. The design blends the Corporate Navy palette with
        a green/blue gradient evoking natural habitats.
      </p>
      <ul className="list-disc pl-5 mt-3 space-y-1 text-gray-700 dark:text-slate-200">
        <li>React 18 + TypeScript + Vite</li>
        <li>Tailwind CSS for rapid, responsive design</li>
        <li>Recharts for dynamic visualizations</li>
        <li>React Router for client-side navigation</li>
        <li>Light/Dark mode with persistent preference</li>
      </ul>
    </section>
  );
}
