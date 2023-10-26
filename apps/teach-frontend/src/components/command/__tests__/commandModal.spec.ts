import { beforeEach, describe, expect, it, vi } from 'vitest'
import { computed } from 'vue'
import { useCommandModal } from '../commandModal'
import { fireEvent, useSetup } from '@/tests/helper'
import * as misc from '@/composables/misc'

describe('command Modal', () => {
  beforeEach(() => {
    const { closeCommandModal } = useCommandModal()
    closeCommandModal()
  })
  it('should be open command modal', () => {
    const { openCommandModal, showCommandModal } = useCommandModal()

    openCommandModal()
    expect(showCommandModal.value).toBe(true)
  })

  it('should be close command modal', () => {
    const { showCommandModal, closeCommandModal } = useCommandModal()
    closeCommandModal()

    expect(showCommandModal.value).toBe(false)
  })

  it('should be open comand modal when press cmd+k on Mac', () => {
    vi.spyOn(misc, 'useIsMac').mockReturnValue(computed(() => true))
    const { showCommandModal, registerKeyboardShortcut } = useCommandModal()

    const { wrapper } = useSetup(() => {
      registerKeyboardShortcut()
    })

    fireEvent.keyDown({
      key: 'k',
      metaKey: true,
    })

    expect(showCommandModal.value).toBe(true)
    wrapper.unmount()
  })

  it('should be open command modal when press ctrl+k on Window', () => {
    vi.spyOn(misc, 'useIsMac').mockReturnValue(computed(() => false))
    const { showCommandModal, registerKeyboardShortcut } = useCommandModal()

    const { wrapper } = useSetup(() => {
      registerKeyboardShortcut()
    })

    fireEvent.keyDown({
      key: 'k',
      ctrlKey: true,
    })

    expect(showCommandModal.value).toBe(true)
    wrapper.unmount()
  })
})
