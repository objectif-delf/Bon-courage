import { useMemo, useState } from 'react'
import { useProgress } from '../store/progress'
import { krdictConfigured, lookup, searchLocal } from '../lib/translate'
import { DICTIONARY } from '../data/dictionary'
import { isHangul } from '../lib/text'
import { useLang } from '../lib/i18n'
import { PageHeader } from '../components/ui'
import { EntryCard, LookupResult } from '../components/WordLookup'

export default function Dictionary() {
  const { state, bumpStat } = useProgress()
  const { tr } = useLang()
  const [q, setQ] = useState('')
  const [res, setRes] = useState(null)
  const [busy, setBusy] = useState(false)
  const [level, setLevel] = useState(['A1', 'A2', 'B1', 'B2'].includes(state.targetLevel) ? state.targetLevel : 'B2')
  const live = useMemo(() => (q.trim() ? searchLocal(q, 6) : []), [q])
  const browse = DICTIONARY.filter((e) => e.level === level)
  const hasKrdict = krdictConfigured(state.settings)

  const submit = async (e) => {
    e?.preventDefault()
    if (!q.trim()) return
    setBusy(true)
    bumpStat('lookups')
    setRes(await lookup(q, state.settings))
    setBusy(false)
  }

  return (
    <div>
      <PageHeader title="Dictionnaire" ko="불한 · 한불 사전"
        subtitle="Tapez un mot en français ou en coréen : traduction, prononciation, nature grammaticale et exemple."
        subtitleKo="프랑스어나 한국어 단어를 입력하세요: 번역, 발음, 품사, 예문을 보여 줍니다." />
      <form onSubmit={submit} className="flex gap-2 sticky top-[60px] z-30 py-2" style={{ background: 'var(--bg)' }}>
        <input className="input text-lg" value={q} onChange={(e) => { setQ(e.target.value); setRes(null) }}
          placeholder={tr('ex. : néanmoins · 파업', '예: 파업 · néanmoins')} aria-label={tr('Mot à chercher', '찾을 단어')} autoCapitalize="off" autoCorrect="off" spellCheck={false} />
        <button className="btn btn-primary whitespace-nowrap" disabled={!q.trim() || busy}>{busy ? '…' : tr('Chercher', '검색')}</button>
      </form>
      {q.trim() && <p className="text-xs text-muted">{tr('Sens détecté', '검색 방향')} : {isHangul(q) ? tr('coréen → français', '한국어 → 프랑스어') : tr('français → coréen', '프랑스어 → 한국어')}{isHangul(q) && hasKrdict ? ' · 📘 KRDict' : ''}</p>}

      {res ? (
        <div className="card mt-3"><LookupResult res={res} query={q} /></div>
      ) : q.trim() ? (
        <div className="card mt-3">
          {live.length ? live.map((e) => <EntryCard key={e.fr} e={e} />) : <p className="text-muted">{tr('Pas dans le dictionnaire intégré. Appuyez sur « Chercher » pour la traduction en ligne.', '내장 사전에 없습니다. « 검색 »을 눌러 온라인에서 찾아보세요.')}</p>}
          {live.length > 0 && <button className="btn btn-ghost text-sm mt-2" onClick={submit}>{tr('Chercher aussi en ligne →', '온라인에서도 찾기 →')}</button>}
        </div>
      ) : (
        <section className="mt-4">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <h2 className="font-bold mr-2">{tr('Parcourir le vocabulaire', '단계별 단어 보기')}</h2>
            {['A1', 'A2', 'B1', 'B2'].map((l) => (
              <button key={l} className="btn !min-h-0 !py-1 text-sm" onClick={() => setLevel(l)}
                style={level === l ? { background: 'var(--primary)', color: 'var(--primary-ink)', borderColor: 'var(--primary)' } : undefined}>{l}</button>
            ))}
          </div>
          <div className="card">{browse.map((e) => <EntryCard key={e.fr} e={e} />)}</div>
        </section>
      )}

      <details className="card mt-6 text-sm">
        <summary className="font-bold cursor-pointer">{tr('Comment fonctionne la traduction ?', '번역은 어떻게 이루어지나요?')}</summary>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-muted">
          <li><strong className="text-ink">✅ {tr('Vérifié', '검증됨')}</strong> : {tr('fiches du dictionnaire intégré (hors ligne).', '내장 사전 항목 (오프라인 사용 가능).')}</li>
          <li><strong className="text-ink">📘 KRDict</strong> : {tr('pour un mot coréen, le dictionnaire officiel 한국어기초사전 (국립국어원) donne la traduction française de chaque sens, homonymes séparés.', '한국어 단어는 국립국어원 한국어기초사전에서 뜻별 프랑스어 번역을 가져옵니다 (동음이의어 구분).')}{!hasKrdict && state.adminMode && tr(' Non configuré.', ' (미설정)')}</li>
          {state.adminMode && <li><strong className="text-ink">🤖 {tr('IA', 'AI')}</strong> : {tr('si une clé gratuite est ajoutée (Profil), fiche complète générée — très bonne qualité mais à vérifier.', '무료 키를 추가하면(프로필) 상세 항목을 만들어 줍니다. 품질이 좋지만 확인이 필요합니다.')}</li>}
          <li><strong className="text-ink">⚙️ {tr('Automatique', '자동 번역')}</strong> : {tr('service gratuit MyMemory, plusieurs propositions, parfois approximatif.', '무료 서비스 MyMemory. 여러 후보를 보여 주지만 부정확할 수 있습니다.')}</li>
          <li>{tr('Aucune traduction automatique n\'est parfaite : en cas de doute, le lien Naver permet de vérifier.', '자동 번역은 완벽하지 않습니다. 확실하지 않으면 네이버 사전 링크로 확인하세요.')}</li>
        </ul>
      </details>
    </div>
  )
}
