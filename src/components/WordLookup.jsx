/**
 * Dictionnaire « au toucher » : dans les leçons, les textes et les cours importés,
 * chaque mot est cliquable. Un panneau s'ouvre en bas de l'écran avec la fiche
 * (traduction, prononciation, nature, exemple FR + KO).
 */
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useProgress } from '../store/progress'
import { lookup, naverLink } from '../lib/translate'
import { isWord, tokens } from '../lib/text'
import { useLang } from '../lib/i18n'
import { SpeakButton } from './ui'

const Ctx = createContext({ open: () => {} })

export function WordLookupProvider({ children }) {
  const [word, setWord] = useState(null)
  const open = useCallback((w) => setWord(w), [])
  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {word && <LookupSheet word={word} onClose={() => setWord(null)} />}
    </Ctx.Provider>
  )
}

export const useWordLookup = () => useContext(Ctx)

/** Texte dont chaque mot est cliquable. */
export function ClickableText({ text, className = '', as: Tag = 'p' }) {
  const { open } = useWordLookup()
  return (
    <Tag className={className}>
      {tokens(text).map((t, i) =>
        isWord(t) ? (
          <span key={i} className="word" role="button" tabIndex={0}
            onClick={() => open(t.replace(/^(l|d|j|m|t|s|n|qu|c)['’]/i, ''))}
            onKeyDown={(e) => e.key === 'Enter' && open(t)}>{t}</span>
        ) : <span key={i}>{t}</span>
      )}
    </Tag>
  )
}

function LookupSheet({ word, onClose }) {
  const { state, bumpStat } = useProgress()
  const { tr } = useLang()
  const [res, setRes] = useState(null)
  useEffect(() => {
    let alive = true
    setRes(null)
    bumpStat('lookups')
    lookup(word, state.settings).then((r) => alive && setRes(r))
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [word])
  useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" role="dialog" aria-modal="true" aria-label={`${tr('Dictionnaire', '사전')} : ${word}`}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative card w-full md:max-w-lg max-h-[75vh] overflow-y-auto rounded-b-none md:rounded-card anim-pop" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 16px)' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted">{tr('Dictionnaire · 사전', '사전 · Dictionnaire')}</span>
          <button className="btn btn-ghost !min-h-0 !p-1" onClick={onClose} aria-label={tr('Fermer', '닫기')}>✕</button>
        </div>
        {!res ? <p className="text-muted py-6 text-center">{tr(`Recherche de « ${word} »…`, `« ${word} » 검색 중…`)}</p> : <LookupResult res={res} query={word} />}
      </div>
    </div>
  )
}

const SourceBadge = ({ kind }) => {
  const { tr } = useLang()
  const map = {
    local: [tr('✅ Vérifié', '✅ 검증됨'), 'var(--good)'],
    krdict: [tr('📘 Dictionnaire officiel KRDict', '📘 한국어기초사전 (국립국어원)'), 'var(--good)'],
    ia: [tr('🤖 IA — à vérifier', '🤖 AI — 확인 필요'), 'var(--accent)'],
    auto: [tr('⚙️ Automatique — à vérifier', '⚙️ 자동 번역 — 확인 필요'), 'var(--muted)']
  }
  const [txt, c] = map[kind] || map.auto
  return <span className="chip text-xs" style={{ color: c, border: `1px solid ${c}`, background: 'transparent' }}>{txt}</span>
}

export function EntryCard({ e, source = 'local' }) {
  const { tr } = useLang()
  return (
    <article className="py-3 border-b last:border-0" style={{ borderColor: 'var(--line)' }}>
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="h-display text-2xl font-bold">{e.fr}</h3>
        <SpeakButton text={e.fr.replace(/\s*\(.*\)/, '')} lang="fr-FR" small />
        <SourceBadge kind={source} />
        {e.level && <span className="chip text-xs">{e.level}</span>}
      </div>
      <p className="text-muted text-sm">{e.ipa} · <em>{e.pos}</em></p>
      <p lang="ko" className="ko text-xl font-bold mt-1 flex items-center gap-1">
        {e.ko} <SpeakButton text={e.ko.split(/[,;(]/)[0].replace('~', '')} lang="ko-KR" small />
      </p>
      {e.rom && <p className="text-muted text-sm">[{e.rom}]</p>}
      {e.autresSens?.length > 0 && <p lang="ko" className="ko text-sm mt-1">{tr('Autres sens', '다른 뜻')} : {e.autresSens.join(' · ')}</p>}
      {e.ex?.fr && (
        <div className="mt-2 p-3 rounded-card" style={{ background: 'var(--surface-2)' }}>
          <p className="flex items-start gap-1">« {e.ex.fr} » <SpeakButton text={e.ex.fr} small /></p>
          <p lang="ko" className="ko text-muted">{e.ex.ko}</p>
        </div>
      )}
      {e.note && <p className="text-sm mt-2">💡 {e.note}</p>}
    </article>
  )
}

const GRADE = { 초급: 'débutant', 중급: 'intermédiaire', 고급: 'avancé' }

function KrdictCard({ query, senses }) {
  const { tr } = useLang()
  return (
    <div className="py-3 border-b" style={{ borderColor: 'var(--line)' }}>
      <div className="flex flex-wrap items-center gap-2">
        <h3 lang="ko" className="ko h-display text-2xl font-bold">{query}</h3>
        <SpeakButton text={query} lang="ko-KR" small />
        <SourceBadge kind="krdict" />
      </div>
      <p className="text-sm text-muted mt-1">{tr(`${senses.length} sens trouvé${senses.length > 1 ? 's' : ''} — choisissez celui de votre phrase :`, `${senses.length}개의 뜻 — 문장에 맞는 뜻을 고르세요:`)}</p>
      <ol className="mt-2 space-y-2">
        {senses.map((s, i) => (
          <li key={i} className="p-3 rounded-card" style={{ background: 'var(--surface-2)' }}>
            <p className="flex flex-wrap items-center gap-2">
              <span className="h-display text-xl font-bold">{s.translation}</span>
              <SpeakButton text={s.translation.replace(/\(.*?\)/g, '')} lang="fr-FR" small />
              {s.pos && <span lang="ko" className="ko chip text-xs">{s.pos}</span>}
              {s.grade && s.grade !== '없음' && <span lang="ko" className="ko chip text-xs">{tr(GRADE[s.grade] || s.grade, s.grade)}</span>}
            </p>
            {s.definition && <p lang="ko" className="ko text-sm text-muted mt-1">{s.definition}</p>}
          </li>
        ))}
      </ol>
    </div>
  )
}

export function LookupResult({ res, query }) {
  const { tr } = useLang()
  if (res.source === 'vide') return null
  const local = res.entries || []
  return (
    <div>
      {res.source === 'krdict' && <KrdictCard query={query} senses={res.senses} />}
      {res.source === 'ia' && res.ai && (
        <EntryCard source="ia" e={{ fr: res.ai.fr, ko: res.ai.ko, ipa: res.ai.ipa, rom: res.ai.rom, pos: res.ai.pos, ex: { fr: res.ai.exFr, ko: res.ai.exKo }, note: res.ai.note, autresSens: res.ai.autresSens }} />
      )}
      {res.source === 'auto' && res.machine && (
        <div className="py-3 border-b" style={{ borderColor: 'var(--line)' }}>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="h-display text-2xl font-bold">{query}</h3>
            <SourceBadge kind="auto" />
          </div>
          <p className="text-sm text-muted mb-1">{tr(`Traduction ${res.machine.direction} · propositions :`, `${res.machine.direction} 번역 · 후보:`)}</p>
          <ul className="flex flex-wrap gap-2">
            {res.machine.proposals.map((p) => (
              <li key={p} lang="ko" className="ko chip text-base flex items-center">{p}<SpeakButton text={p} lang={res.machine.direction === 'fr→ko' ? 'ko-KR' : 'fr-FR'} small /></li>
            ))}
          </ul>
          <p className="text-xs text-muted mt-2">{tr('Traduction automatique : prononciation, nature et exemples complets disponibles avec l\'IA (Profil › IA).', '자동 번역입니다. 발음·품사·예문이 포함된 상세 정보는 AI 설정 후 이용할 수 있습니다 (프로필 › AI).')}</p>
        </div>
      )}
      {res.krdictError && <p className="text-xs text-muted mt-2">{res.krdictError}</p>}
      {res.aiError && <p className="text-sm mt-2" style={{ color: 'var(--bad)' }}>IA : {res.aiError}</p>}
      {res.source === 'erreur' && <p className="py-3" style={{ color: 'var(--bad)' }}>{tr(`Pas de connexion ou service indisponible (${res.error}). Le dictionnaire intégré fonctionne hors ligne.`, `인터넷 연결이 없거나 서비스를 이용할 수 없습니다 (${res.error}). 내장 사전은 오프라인에서도 작동합니다.`)}</p>}
      {local.length > 0 && (
        <div className="mt-1">
          {res.source !== 'local' && <p className="text-sm text-muted mt-3">{tr('Dans le dictionnaire intégré :', '내장 사전:')}</p>}
          {local.map((e) => <EntryCard key={e.fr} e={e} />)}
        </div>
      )}
      <a className="inline-block mt-3 text-sm underline" style={{ color: 'var(--primary)' }} href={naverLink(query)} target="_blank" rel="noreferrer">
        {tr('Vérifier dans le dictionnaire Naver 프랑스어사전 ↗', '네이버 프랑스어사전에서 확인하기 ↗')}
      </a>
    </div>
  )
}
