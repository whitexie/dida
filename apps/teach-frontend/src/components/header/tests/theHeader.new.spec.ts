import { describe, expect, it, vi } from 'vitest'
import { useRouter } from 'vue-router'
import { useGoto } from '../theHeader'

vi.mock('vue-router')
describe('theHeader', () => {
  it('should be go to home page', () => {
    const pushFn = vi.fn()
    vi.mocked(useRouter as () => { push: Function }).mockImplementation(() => {
      return {
        push: pushFn,
      }
    })
    const { goToHome } = useGoto()
    goToHome()
    expect(pushFn).toBeCalled()
  })
})
