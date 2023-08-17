import { useRouter } from 'vue-router'
import { RouteNames } from '@/router/const'
// import { getRouterInstance } from '@/router'

export function useGoto() {
  const router = useRouter()

  function goToHome() {
    router.push({
      name: RouteNames.HOME,
    })
  }

  function goToSettings() {
    router.push({
      name: RouteNames.SETTINGS,
    })
  }

  function goToSettingsTheme() {
    router.push({
      name: RouteNames.SETTINGS_THEME,
    })
  }

  return {
    goToHome,
    goToSettings,
    goToSettingsTheme,
  }
}

export function openGithub() {
  window.open('https://github.com/cuixueshe/dida')
}
