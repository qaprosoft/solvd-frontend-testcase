function tabsFactory({ tabItemSelector, tabButtonSelector }) {
  const ref = {
    tabs: document.querySelectorAll(tabItemSelector),
    buttons: document.querySelectorAll(tabButtonSelector),
  }

  for (refKey in ref) {
    if (ref[refKey].length === 0) {
      console.error(`Can't find references for "${refKey}"`)
      return
    }
  }

  if (ref.tabs.length !== ref.buttons.length) {
    console.error(`Tabs references amount is not equal to corresponding buttons references`)
    return
  }

  const setActive = (ref, value) => ref.setAttribute('data-active', value)

  const resetActives = () => {
    ref.tabs.forEach((tab, idx) => {
      setActive(tab, 'false')
      setActive(ref.buttons[idx], 'false')
    })
  }

  ref.buttons.forEach((r, idx) => {
    r.addEventListener('click', e => {
      resetActives()
      
      setActive(e.currentTarget, true)
      setActive(ref.tabs[idx], true)
    })
  })

}

window.tabsFactory = tabsFactory
