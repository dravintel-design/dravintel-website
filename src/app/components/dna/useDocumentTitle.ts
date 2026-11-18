import { useEffect } from 'react';

/** Unique, descriptive page title per route (WCAG 2.4.2). */
export function useDocumentTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Dravintel Design` : 'Dravintel Design — UX-led digital design studio, Chennai';
  }, [title]);
}
