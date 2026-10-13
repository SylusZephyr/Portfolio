import { content, DEFAULT_LANG } from './portfolio.js'
import { useStore, getState } from '../store.js'

/** The whole content tree for the active language. */
export function useContent() {
  const lang = useStore((s) => s.lang)
  return content[lang] || content[DEFAULT_LANG]
}

/** Just the UI string table — the most common need. */
export function useUi() {
  return useContent().ui
}

/** Non-reactive read, for code outside React (input handlers, the camera rig). */
export function getContent() {
  return content[getState().lang] || content[DEFAULT_LANG]
}
