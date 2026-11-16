export const NAVIGATION_EVENT = 'win-amateur:navigation'

export function navigateTo(path: string) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new Event(NAVIGATION_EVENT))
}
