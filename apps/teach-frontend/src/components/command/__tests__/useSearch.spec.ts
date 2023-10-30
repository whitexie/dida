import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useSearch } from '../search'

const searchTasks = vi.fn()
const resetSearchTasks = vi.fn()
vi.mock('../searchTasks.ts', () => {
  return {
    useSearchTasks() {
      return {
        searchTasks,
        resetSearchTasks,
      }
    },
  }
})

const searchCommands = vi.fn()
const resetSearchCommands = vi.fn()
vi.mock('../searchCommands.ts', () => {
  return {
    useSearchCommands() {
      return {
        searchCommands,
        resetSearchCommands,
      }
    },
  }
})

describe('search', () => {
  beforeEach(async () => {
    vi.useFakeTimers()

    const { resetSearch } = useSearch()
    resetSearch()

    await vi.runAllTimersAsync()

    vi.clearAllMocks()
  })

  it('当search有值时，loading 为true', async () => {
    const { loading, search } = useSearch()

    search.value = 'test'

    await vi.advanceTimersToNextTimerAsync()

    expect(loading.value).toBe(true)
  })

  it('当搜索执行完时，loading为false', async () => {
    vi.useFakeTimers()
    const { loading, search } = useSearch()
    search.value = 'test'
    // await vi.advanceTimersToNextTimerAsync()
    // await vi.advanceTimersToNextTimerAsync()

    await vi.runAllTimersAsync()
    expect(loading.value).toBe(false)
  })

  it('当搜索执行完时，searching为true', async () => {
    vi.useFakeTimers()
    const { searching, search } = useSearch()
    search.value = 'test'

    await vi.runAllTimersAsync()
    expect(searching.value).toBe(true)
  })

  it('搜索任务', async () => {
    const { search } = useSearch()
    search.value = '吃饭'

    await vi.runAllTimersAsync()

    expect(searchTasks).toBeCalledWith('吃饭')
  })

  it('搜索命令', async () => {
    const { search } = useSearch()
    search.value = '>主页'

    await vi.runAllTimersAsync()
    expect(searchCommands).toBeCalledWith('主页')
  })
  it('搜索命令 末尾包含空格', async () => {
    const { search } = useSearch()
    search.value = '>主页 '

    await vi.runAllTimersAsync()
    expect(searchCommands).toBeCalledWith('主页')
  })
})
