import { config, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import {
  VueRouterMock,
  createRouterMock,
  injectRouterMock,
} from 'vue-router-mock'

import { useGoto } from '../theHeader'

const router = createRouterMock({
  spy: {
    create: fn => vi.fn(fn),
    reset: spy => spy.mockClear(),
  },
})

injectRouterMock(router)

config.plugins.VueWrapper.install(VueRouterMock)

describe('the header', () => {
  it('should goToHome', () => {
    const Comp = {
      setup() {
        const { goToHome } = useGoto()
        goToHome()
      },
    }

    const wrapper = mount(Comp)
    expect(wrapper.router.push).toBeCalledWith({ name: 'Home' })
  })
  it('should goToSettings', () => {
    const Comp = {
      setup() {
        const { goToSettings } = useGoto()
        goToSettings()
      },
    }
    const wrapper = mount(Comp)
    expect(wrapper.router.push).toBeCalledWith({ name: 'Settings' })
  })
})
