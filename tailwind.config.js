/** Les couleurs pointent vers des variables CSS : chaque thème (clair, sombre,
 *  BD, Cyberpunk Paris) redéfinit ces variables dans src/index.css. */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        surface2: 'var(--surface-2)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        line: 'var(--line)',
        primary: 'var(--primary)',
        'primary-ink': 'var(--primary-ink)',
        accent: 'var(--accent)',
        good: 'var(--good)',
        bad: 'var(--bad)'
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-body)'
      },
      borderRadius: { card: 'var(--radius)' },
      boxShadow: { card: 'var(--shadow)' }
    }
  },
  plugins: []
}
