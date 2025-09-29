import React from 'react';

/** PUBLIC_INTERFACE */
export function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  /** Minimal moon icon */
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/** PUBLIC_INTERFACE */
export function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  /** Minimal sun icon */
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.8 1.42-1.42zM1 13h3v-2H1v2zm10 10h2v-3h-2v3zM4.96 19.2l1.41 1.41 1.8-1.79-1.42-1.42-1.79 1.8zM20 11V9h-3v2h3zm-2.95-6.95l-1.41 1.41 1.79 1.8 1.42-1.42-1.8-1.79zM12 7a5 5 0 100 10 5 5 0 000-10zm7.04 12.2l-1.8-1.79-1.42 1.42 1.8 1.79 1.41-1.41z" />
    </svg>
  );
}

/** PUBLIC_INTERFACE */
export function VideoCameraIcon(props: React.SVGProps<SVGSVGElement>) {
  /** Minimal camera icon */
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17 10.5V7a2 2 0 0 0-2-2H3A2 2 0 0 0 1 7v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3.5l5 3.5V7l-5 3.5z" />
    </svg>
  );
}
