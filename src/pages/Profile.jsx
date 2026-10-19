import { useEffect, useRef, useState } from 'react'
import { levelFromXp, useProgress } from '../store/progress'
import { THEMES } from '../lib/themes'
import { BADGES } from '../data/badges'
import { askGeminiJSON } from '../lib/ai'
import { krdict } from '../lib/translate'
import { CONFIG } from '../config'
import { useLang } from '../lib/i18n'
import { PageHeader, ProgressBar } from '../components/ui'
import { LevelPicker } from './Home'

const selected = { background: 'var(--primary)', color: 'var(--primary-ink)', borderColor: 'var(--primary)' }

export default function Profile() {
  const p = useProgress()
  const { state, set, setSetting } = p
  const { tr, lang, setLang } = useLang()
  const lv = levelFromXp(state.xp)
  const [key, setKey] = useState(state.settings.aiKey)
  const [test, setTest] = useState('')
  const [kd, setKd] = useState({ url: state.settings.krdictUrl, key: state.settings.krdictKey })
  const [kdTest, setKdTest] = useState('')
  const fileRef = useRef()
  const [installEvt, setInstallEvt] = useState(null)

  useEffect(() => {
    const h = (e) => { e.preventDefault(); setInstallEvt(e) }
    window.addEventListener('beforeinstallprompt', h)
    return () => window.removeEventListener('beforeinstallprompt', h)
  }, [])

  const download = () => {
    const blob = new Blob([p.exportData()], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `bon-courage-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
  }
  const restore = async (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    try { p.importData(await f.text()); alert(tr('Progression restaurée ✔', '진도를 복원했습니다 ✔')) } catch (er) { alert(tr('Impossible de lire ce fichier : ', '파일을 읽을 수 없습니다: ') + er.message) }
    e.target.value = ''
  }
  const testKey = async () => {
    setSetting('aiKey', key.trim())
    setTest(tr('Test en cours…', '확인 중…'))
    try {
      await askGeminiJSON({ key: key.trim(), model: state.settings.aiModel, prompt: 'Réponds {"ok": true}' })
      setTest(tr('✔ La clé fonctionne.', '✔ 키가 작동합니다.'))
    } catch (er) { setTest('✘ ' + er.message) }
  }
  const testKrdict = async () => {
    const settings = { krdictUrl: kd.url.trim(), krdictKey: kd.key.trim() }
    setSetting('krdictUrl', settings.krdictUrl)
    setSetting('krdictKey', settings.krdictKey)
    setKdTest(tr('Test avec « 새 »…', '« 새 »로 확인 중…'))
    try {
      const senses = await krdict('새', settings)
      if (senses === null) setKdTest(tr('✘ La fonction répond, mais la clé KRDict n\'est pas configurée sur Supabase.', '✘ 함수는 응답하지만 Supabase에 KRDict 키가 설정되지 않았습니다.'))
      else setKdTest(`✔ ${senses.map((s) => s.translation).join(' · ') || tr('aucun sens', '뜻 없음')}`)
    } catch (er) { setKdTest('✘ ' + er.message) }
  }
  const builtIn = Boolean(CONFIG.krdictUrl)

  return (
    <div className="space-y-5">
      <PageHeader title="Profil" ko="프로필" />

      <section className="card">
        <div className="flex items-center gap-4">
          <div className="h-display text-5xl font-extrabold" style={{ color: 'var(--primary)' }}>{lv.level}</div>
          <div className="flex-1">
            <input className="input !min-h-0 !py-1 font-bold text-lg" value={state.name} onChange={(e) => set('name', e.target.value)} placeholder={tr('Votre prénom', '이름')} aria-label={tr('Prénom', '이름')} />
            <p className="text-sm text-muted mt-1">{tr(`${state.xp} points · encore ${lv.toNext} pour le niveau ${lv.level + 1}`, `${state.xp}점 · 레벨 ${lv.level + 1}까지 ${lv.toNext}점`)}</p>
            <ProgressBar value={lv.pct} label={tr('Progression vers le niveau suivant', '다음 레벨까지 진행도')} />
          </div>
        </div>
      </section>

      <section className="card">
        <h2 className="font-bold mb-3">🎯 {tr('Mon niveau', '내 단계')}</h2>
        <LevelPicker />
        <p className="text-sm text-muted mt-2">{tr('L\'accueil, le défi du jour, les tests et les jeux s\'adaptent à ce niveau. Toutes les leçons restent accessibles.', '홈, 오늘의 도전, 테스트, 게임이 이 단계에 맞춰집니다. 모든 수업은 계속 이용할 수 있습니다.')}</p>
      </section>

      <section className="card">
        <h2 className="font-bold mb-3">🌐 {tr('Langue de l\'interface', '화면 언어')}</h2>
        <div className="flex gap-2 flex-wrap">
          <button className="btn" style={lang === 'ko' ? selected : undefined} onClick={() => setLang('ko')}>🇰🇷 한국어</button>
          <button className="btn" style={lang === 'fr' ? selected : undefined} onClick={() => setLang('fr')}>🇫🇷 Français</button>
        </div>
        <p className="text-sm text-muted mt-2">{tr('Les phrases à apprendre restent en français ; seuls les menus, consignes et explications changent.', '배울 문장은 프랑스어 그대로이고, 메뉴·지시문·설명만 바뀝니다.')}</p>
        <label className="flex items-center gap-2 mt-3">
          <input type="checkbox" className="w-5 h-5" checked={state.showKo} onChange={(e) => set('showKo', e.target.checked)} />
          {tr('Afficher les traductions coréennes des exemples (en interface française)', '예문의 한국어 번역 보기 (프랑스어 화면에서)')}
        </label>
      </section>

      <section className="card">
        <h2 className="font-bold mb-3">🎨 {tr('Thème visuel', '테마')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {THEMES.map((t) => (
            <button key={t.id} onClick={() => set('theme', t.id)} className="rounded-card p-3 text-left"
              style={{ background: t.swatch[0], color: ['sombre', 'cyber'].includes(t.id) ? '#fff' : '#111', border: state.theme === t.id ? `3px solid ${t.swatch[1]}` : '1px solid #8884' }}
              aria-pressed={state.theme === t.id}>
              <span className="flex gap-1 mb-2">{t.swatch.slice(1).map((c) => <span key={c} className="w-5 h-5 rounded-full" style={{ background: c }} />)}</span>
              <span className="font-bold block">{tr(t.label, t.ko)}</span>
              <span className="text-xs opacity-70">{lang === 'ko' ? t.label : t.ko}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="card">
        <h2 className="font-bold mb-3">🏅 {tr('Badges', '배지')} ({state.badges.length}/{BADGES.length})</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {BADGES.map((b) => {
            const got = state.badges.includes(b.id)
            return (
              <li key={b.id} className="flex items-center gap-3 p-2 rounded-card" style={{ background: got ? 'color-mix(in srgb, var(--accent) 12%, transparent)' : 'var(--surface-2)', opacity: got ? 1 : 0.6 }}>
                <span className="text-3xl" style={{ filter: got ? 'none' : 'grayscale(1)' }}>{b.icon}</span>
                <span><span className="font-bold block">{tr(b.label, b.ko)}</span><span className="text-sm text-muted">{tr(b.desc, b.descKo)}</span></span>
              </li>
            )
          })}
        </ul>
      </section>

      {state.adminMode && (
        <div className="space-y-5 p-3 rounded-card" style={{ border: '2px dashed var(--accent)' }}>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className="font-bold">🔧 {tr('Mode réglages (invisible pour l\'élève)', '설정 모드 (학생에게는 보이지 않음)')}</p>
            <button className="btn text-sm" onClick={() => set('adminMode', false)}>{tr('Quitter le mode réglages', '설정 모드 끝내기')}</button>
          </div>
        <section className="card">
          <h2 className="font-bold">📘 {tr('Dictionnaire officiel coréen (KRDict)', '한국어기초사전 (KRDict)')}</h2>
          <p className="text-sm text-muted mt-1">{tr(
            'Pour un mot coréen, donne la traduction française de chaque sens (homonymes séparés), depuis le dictionnaire de l\'Institut national de la langue coréenne. Fonctionne via une fonction Supabase « krdict-lookup ».',
            '한국어 단어를 검색하면 국립국어원 한국어기초사전에서 뜻별 프랑스어 번역을 가져옵니다 (동음이의어 구분). Supabase 함수 « krdict-lookup »을 통해 작동합니다.')}</p>
          {builtIn && <p className="text-sm mt-2" style={{ color: 'var(--good)' }}>✔ {tr('Déjà configuré dans l\'application.', '앱에 이미 설정되어 있습니다.')}</p>}
          <details className="mt-2" open={!builtIn && !state.settings.krdictUrl}>
            <summary className="text-sm cursor-pointer font-bold">{builtIn ? tr('Remplacer la configuration', '설정 변경') : tr('Configurer', '설정하기')}</summary>
            <label className="block text-sm mt-2">{tr('Adresse de la fonction', '함수 주소')}
              <input className="input mt-1" value={kd.url} onChange={(e) => setKd({ ...kd, url: e.target.value })} placeholder="https://xxxx.supabase.co/functions/v1/krdict-lookup" autoComplete="off" />
            </label>
            <label className="block text-sm mt-2">{tr('Clé publique « anon » du projet Supabase', 'Supabase 프로젝트의 공개 « anon » 키')}
              <input className="input mt-1" value={kd.key} onChange={(e) => setKd({ ...kd, key: e.target.value })} placeholder="eyJhbGciOi…" autoComplete="off" />
            </label>
            <button className="btn btn-primary mt-2" onClick={testKrdict} disabled={!kd.url.trim() && !builtIn}>{tr('Enregistrer et tester', '저장하고 확인')}</button>
          </details>
          {kdTest && <p lang="ko" className="text-sm mt-2">{kdTest}</p>}
        </section>

        <section className="card">
          <h2 className="font-bold">🤖 {tr('IA facultative (gratuite)', 'AI (선택, 무료)')}</h2>
          <p className="text-sm text-muted mt-1">{lang === 'ko'
            ? <>키가 없어도 모든 기능이 작동합니다. <strong>Google AI Studio</strong> 무료 키를 추가하면: 어떤 단어든 상세 사전 항목, 수업 자료로 만든 심화 문제, 작문 피드백을 받을 수 있습니다. 키는 이 기기에만 저장됩니다.</>
            : <>Sans clé, tout fonctionne. Avec une clé <strong>Google AI Studio</strong> (palier gratuit), vous obtenez : fiches de dictionnaire complètes pour n'importe quel mot, exercices avancés à partir de vos cours, commentaire de vos productions écrites. La clé reste uniquement sur cet appareil.</>}</p>
          <details className="text-sm mt-2">
            <summary className="cursor-pointer font-bold">{tr('Comment obtenir une clé gratuite ?', '무료 키는 어떻게 받나요?')}</summary>
            <ol className="list-decimal pl-5 mt-2 space-y-1">
              <li>{tr('Allez sur', '접속:')} <a className="underline" href="https://aistudio.google.com/apikey" target="_blank" rel="noreferrer">aistudio.google.com/apikey</a> {tr('et connectez-vous avec un compte Google.', '— 구글 계정으로 로그인하세요.')}</li>
              <li>{tr('Cliquez sur « Create API key » (pas besoin de carte bancaire pour le palier gratuit).', '« Create API key »를 누르세요 (무료 등급은 카드가 필요 없습니다).')}</li>
              <li>{tr('Par sécurité, restreignez la clé à l\'API « Generative Language API » dans la console Google Cloud.', '보안을 위해 Google Cloud 콘솔에서 키를 « Generative Language API »로 제한하세요.')}</li>
              <li>{tr('Collez la clé ci-dessous et testez-la.', '아래에 키를 붙여 넣고 확인하세요.')}</li>
            </ol>
            <p className="mt-2 text-muted">{tr('Le palier gratuit est limité en nombre de requêtes ; Google peut utiliser les requêtes gratuites pour améliorer ses produits : n\'y mettez pas d\'informations personnelles.', '무료 등급은 요청 수가 제한되며, 구글이 무료 요청을 제품 개선에 사용할 수 있습니다. 개인 정보는 넣지 마세요.')}</p>
          </details>
          <div className="flex gap-2 mt-3">
            <input className="input" type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder={tr('Clé API (AIza…)', 'API 키 (AIza…)')} aria-label={tr('Clé API', 'API 키')} autoComplete="off" />
            <button className="btn btn-primary" onClick={testKey} disabled={!key.trim()}>{tr('Tester', '확인')}</button>
          </div>
          <div className="flex gap-2 mt-2 items-center flex-wrap">
            <label className="text-sm">{tr('Modèle', '모델')} :</label>
            <input className="input !w-56 !min-h-0 !py-1 text-sm" value={state.settings.aiModel} onChange={(e) => setSetting('aiModel', e.target.value)} aria-label={tr('Modèle', '모델')} />
            {state.settings.aiKey && <button className="btn btn-ghost text-sm" onClick={() => { setKey(''); setSetting('aiKey', ''); setTest(tr('Clé supprimée.', '키를 삭제했습니다.')) }}>{tr('Supprimer la clé', '키 삭제')}</button>}
          </div>
          {test && <p className="text-sm mt-2">{test}</p>}
          <label className="block mt-4 text-sm">
            {tr('E-mail pour la traduction automatique (facultatif, augmente la limite gratuite de MyMemory)', '자동 번역용 이메일 (선택, MyMemory 무료 한도를 늘려 줍니다)')}
            <input className="input mt-1" type="email" value={state.settings.mmEmail} onChange={(e) => setSetting('mmEmail', e.target.value)} placeholder="vous@exemple.com" />
          </label>
        </section>
        </div>
      )}

      <section className="card">
        <h2 className="font-bold">📱 {tr('Installer l\'application', '앱 설치')}</h2>
        {installEvt ? (
          <button className="btn btn-primary mt-2" onClick={() => installEvt.prompt()}>{tr('Installer sur cet appareil', '이 기기에 설치')}</button>
        ) : (
          <ul className="text-sm list-disc pl-5 mt-2 space-y-1">
            <li><strong>iPhone / iPad (Safari)</strong> : {tr('bouton Partager → « Sur l\'écran d\'accueil ».', '공유 버튼 → « 홈 화면에 추가 ».')}</li>
            <li><strong>Android (Chrome)</strong> : {tr('menu ⋮ → « Installer l\'application » ou « Ajouter à l\'écran d\'accueil ».', '⋮ 메뉴 → « 앱 설치 » 또는 « 홈 화면에 추가 ».')}</li>
          </ul>
        )}
      </section>

      <section className="card">
        <h2 className="font-bold">💾 {tr('Sauvegarde', '백업')}</h2>
        <p className="text-sm text-muted mt-1">{tr('La progression est enregistrée dans ce navigateur. Pour changer d\'appareil, exportez puis importez le fichier.', '진도는 이 브라우저에 저장됩니다. 기기를 바꿀 때는 파일로 내보낸 뒤 가져오세요.')}</p>
        <div className="flex gap-2 flex-wrap mt-3">
          <button className="btn" onClick={download}>⬇ {tr('Exporter ma progression', '진도 내보내기')}</button>
          <button className="btn" onClick={() => fileRef.current.click()}>⬆ {tr('Importer', '가져오기')}</button>
          <input ref={fileRef} type="file" accept="application/json,.json" className="hidden" onChange={restore} />
          <button className="btn" style={{ color: 'var(--bad)' }} onClick={() => confirm(tr('Tout effacer (points, badges, cours importés) ? Action définitive.', '모든 기록(점수, 배지, 가져온 수업)을 지울까요? 되돌릴 수 없습니다.')) && p.reset()}>{tr('Tout réinitialiser', '전체 초기화')}</button>
        </div>
      </section>
    </div>
  )
}
