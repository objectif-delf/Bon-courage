// Lecture des fichiers importés dans « Mon Espace Cours » (PDF, TXT, MD).
// pdf.js n'est chargé qu'au moment où l'on importe un PDF (application plus légère).

export async function readCourseFile(file) {
  const name = file.name.toLowerCase()
  if (name.endsWith('.pdf') || file.type === 'application/pdf') return readPdf(file)
  if (/\.(txt|md|text|csv)$/.test(name) || file.type.startsWith('text/')) return file.text()
  throw new Error('Format non pris en charge : utilisez un PDF ou un fichier texte (.txt). Pour un Word, faites « Enregistrer sous › PDF ».')
}

async function readPdf(file) {
  const pdfjs = await import('pdfjs-dist')
  const worker = await import('pdfjs-dist/build/pdf.worker.min.mjs?url')
  pdfjs.GlobalWorkerOptions.workerSrc = worker.default
  const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise
  let out = ''
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p)
    const content = await page.getTextContent()
    let line = ''
    let lastY = null
    for (const item of content.items) {
      const y = item.transform?.[5]
      if (lastY !== null && Math.abs(y - lastY) > 4) { out += line.trim() + '\n'; line = '' }
      line += item.str + (item.hasEOL ? '\n' : ' ')
      lastY = y
    }
    out += line.trim() + '\n\n'
  }
  const text = out.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim()
  if (text.length < 20) throw new Error("Ce PDF ne contient pas de texte lisible (c'est sans doute une image scannée). Copiez-collez le texte à la place.")
  return text
}
