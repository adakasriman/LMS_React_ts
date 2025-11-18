import { useEffect } from 'react';
import { useDocumentTitle } from '@hooks/index';

interface PageMeta {
  name?: string;
  title?: string;
  middleware?: string[];
  layout?: string;
}

/**
 * Custom hook to define page metadata (like Nuxt's definePageMeta).
 * Handles document title and supports middleware/layout flags.
 */
const usePageMeta = (meta: PageMeta) => {
  const { name, title, middleware, layout } = meta;

  // 1️⃣ Set page title
  useDocumentTitle(title ?? 'LMS');

  // 2️⃣ Optional: log or handle route meta for debugging or analytics
  useEffect(() => {
    console.log('PageMeta', { name, middleware, layout });
  }, [name, middleware, layout]);

  // 3️⃣ You can extend this hook to trigger middleware or set layout dynamically
  return { name, title, middleware, layout };
};

export default usePageMeta;
