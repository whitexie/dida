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

  function goToGithub() {
    window.open('https://github.com/cuixueshe/dida')
  }

  return {
    goToHome,
    goToSettings,
    goToSettingsTheme,
    goToGithub,
  }
}
