// Liste des thèmes visuels. Les couleurs et polices sont dans src/index.css.
export const THEMES = [
  { id: 'clair', label: 'Clair', ko: '라이트', swatch: ['#f6f1e7', '#2343c7', '#e0483e'] },
  { id: 'sombre', label: 'Sombre', ko: '다크', swatch: ['#0f1222', '#7b93ff', '#ff7a6e'] },
  { id: 'bd', label: 'Bande dessinée', ko: '만화', swatch: ['#fff3c4', '#e8262b', '#1e6fe8'] },
  { id: 'cyber', label: 'Cyberpunk Paris', ko: '사이버펑크 파리', swatch: ['#07060f', '#ff2bd6', '#18f0ff'] }
]

export function applyTheme(id) {
  document.documentElement.setAttribute('data-theme', id)
  document.body.setAttribute('data-theme', id)
  const meta = document.querySelector('meta[name="theme-color"]')
  const t = THEMES.find((x) => x.id === id)
  if (meta && t) meta.setAttribute('content', t.swatch[0])
}
