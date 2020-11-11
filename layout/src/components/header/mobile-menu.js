;(() => {
  const ref = {
    tabletHamburger: document.getElementById('tabletHamburger'),
    mobileHamburger: document.getElementById('mobileHamburger'),
    overlay: document.getElementById('mobileMenuOverlay'),
    menu: document.getElementById('mobileMenu'),
  }

  for (let refKey in ref) {
    const val = ref[refKey]

    if (!val) {
      console.error(`Can't find reference for: ${refKey}`)
      return
    }
  }

  function toggleMenuVisibility() {
    const currentActiveState = ref.menu.dataset.visible
    const updatedState = currentActiveState === 'true' ? 'false' : 'true'

    ref.menu.setAttribute('data-visible', updatedState)
  }

  ref.tabletHamburger.addEventListener('click', toggleMenuVisibility)
  ref.mobileHamburger.addEventListener('click', toggleMenuVisibility)
  ref.overlay.addEventListener('click', toggleMenuVisibility)
})()
