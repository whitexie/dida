import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { useGoto } from '../theHeader'

function useSetup(setup: () => void) {
  const Comp = {
    setup,
  }
  const wrapper = mount(Comp)
  return {
    wrapper,
    router: wrapper.router,
  }
}

describe('the header', () => {
  it('should goToHome', () => {
    const { wrapper } = useSetup(() => {
      const { goToHome } = useGoto()
      goToHome()
    })
    expect(wrapper.router.push).toBeCalledWith({ name: 'Home' })
  })

  it('should goToSettings', () => {
    const { wrapper } = useSetup(() => {
      const { goToSettings } = useGoto()
      goToSettings()
    })
    expect(wrapper.router.push).toBeCalledWith({ name: 'Settings' })
  })
})
