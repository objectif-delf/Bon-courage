// Routes de l'application. HashRouter (#/...) : indispensable sur GitHub Pages,
// qui ne sait pas rediriger les URL inconnues vers index.html.
import { useEffect } from 'react'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProgressProvider, useProgress } from './store/progress'
import { WordLookupProvider } from './components/WordLookup'
import { applyTheme } from './lib/themes'
import { LangSync } from './lib/i18n'
import Layout from './components/Layout'
import Home from './pages/Home'
import Lessons from './pages/Lessons'
import Lesson from './pages/Lesson'
import MyCourses from './pages/MyCourses'
import Dictionary from './pages/Dictionary'
import Practice from './pages/Practice'
import Tests from './pages/Tests'
import Exam from './pages/Exam'
import Games from './pages/Games'
import Mistakes from './pages/Mistakes'
import Profile from './pages/Profile'

function ThemeSync() {
  const { state } = useProgress()
  useEffect(() => applyTheme(state.theme), [state.theme])
  return null
}

export default function App() {
  return (
    <ProgressProvider>
      <ThemeSync />
      <LangSync />
      <WordLookupProvider>
        <HashRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="lecons" element={<Lessons />} />
              <Route path="lecons/:id" element={<Lesson />} />
              <Route path="mon-espace" element={<MyCourses />} />
              <Route path="dictionnaire" element={<Dictionary />} />
              <Route path="entrainement" element={<Practice />} />
              <Route path="tests" element={<Tests />} />
              <Route path="examen" element={<Exam />} />
              <Route path="jeux" element={<Games />} />
              <Route path="erreurs" element={<Mistakes />} />
              <Route path="profil" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </HashRouter>
      </WordLookupProvider>
    </ProgressProvider>
  )
}
