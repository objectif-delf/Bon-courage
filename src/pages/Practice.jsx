import { Link } from 'react-router-dom'
import { useProgress } from '../store/progress'
import { useLang } from '../lib/i18n'
import { PageHeader } from '../components/ui'

export default function Practice() {
  const { state } = useProgress()
  const { tr } = useLang()
  const items = [
    { to: '/examen', icon: '📝', label: tr('Examens blancs DELF B2', 'DELF B2 모의고사'), desc: tr('Les 4 épreuves, chronométrées, avec note sur 100.', '4개 영역, 시간 제한, 100점 만점 채점.'), highlight: true },
    { to: '/tests', icon: '🧪', label: tr('Tests de compétences', '실력 테스트'), desc: tr('Grammaire, vocabulaire, compréhension — par niveau.', '문법, 어휘, 독해 — 단계별.') },
    { to: '/jeux', icon: '🃏', label: tr('Mini-jeux', '미니 게임'), desc: tr('Cartes mémoire, textes à trous, quiz de rapidité.', '단어 카드, 빈칸 채우기, 스피드 퀴즈.') },
    { to: '/erreurs', icon: '🩹', label: tr('Revoir mes erreurs', '오답 노트'), desc: tr(`${state.mistakes.length} question(s) à retravailler.`, `다시 풀어야 할 문제 ${state.mistakes.length}개.`) },
    { to: '/mon-espace', icon: '🧑‍🏫', label: tr('Exercices de mes cours', '내 수업 연습'), desc: tr('À partir des cours de votre professeur.', '선생님 수업 자료로 만든 문제.') }
  ]
  return (
    <div>
      <PageHeader title="S'entraîner" ko="연습하기" subtitle="Choisissez votre type d'entraînement, à tout moment." subtitleKo="원하는 연습을 언제든지 고르세요." />
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((it) => (
          <Link key={it.to} to={it.to} className="card flex gap-3 items-start hover:opacity-95"
            style={it.highlight ? { background: 'var(--primary)', color: 'var(--primary-ink)', borderColor: 'var(--primary)' } : undefined}>
            <span className="text-3xl" aria-hidden>{it.icon}</span>
            <span>
              <span className="block font-bold text-lg">{it.label}</span>
              <span className="block text-sm mt-1 opacity-90">{it.desc}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
