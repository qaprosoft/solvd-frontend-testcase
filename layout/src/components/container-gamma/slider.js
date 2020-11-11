function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function animate({ timing, draw, duration }) {
  let start = performance.now()

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration
    if (timeFraction > 1) timeFraction = 1
    let progress = timing(timeFraction)

    draw(progress)

    if (timeFraction < 1) {
      requestAnimationFrame(animate)
    }
  })
}

;(() => {
  const options = {
    animationDuration: 250,
  }

  const ref = {
    items: document.querySelectorAll('.container-gamma__item'),
    dots: document.querySelectorAll('.container-gamma__dot'),
    btnLeft: document.getElementById('sliderLeftBtn'),
    btnRight: document.getElementById('sliderRightBtn'),
    container: document.getElementById('containerGammaItems'),
  }

  for (let refKey in ref) {
    const val = ref[refKey]

    if (!val) {
      console.error(`Can't find reference for: ${refKey}`)
      return
    }
  }

  if (ref.items.length === 0) {
    return
  }

  const makeDotActive = idx => ref.dots[idx].setAttribute('data-active', 'true')
  const makeDotInactive = idx => ref.dots[idx].setAttribute('data-active', 'false')

  ref.btnLeft.addEventListener('click', () => slide('left'))
  ref.btnRight.addEventListener('click', () => slide('right'))

  let isAnimationInProgress = false

  function slide(d) {
    if (isAnimationInProgress) {
      return
    }

    isAnimationInProgress = true

    const itemWidth = ref.items[0].clientWidth
    const currentScrollPosition = Math.round(ref.container.scrollLeft)
    const maxScrollPosition = itemWidth * (ref.items.length - 1)


    const updatedScrollPosition =
      d === 'left'
        ? currentScrollPosition - itemWidth
        : currentScrollPosition + itemWidth

    if (updatedScrollPosition < -5 || updatedScrollPosition > maxScrollPosition) {
      isAnimationInProgress = false
      return
    }

    const prevDotIdx = Math.round((currentScrollPosition + itemWidth) / itemWidth - 1)
    const nextDotIdx = d === 'left' ? prevDotIdx - 1 : prevDotIdx + 1

    makeDotInactive(prevDotIdx)
    makeDotActive(nextDotIdx)

    const changeAmount = updatedScrollPosition - currentScrollPosition

    animate({
      duration: options.animationDuration,
      timing(timeFraction) {
        return Math.pow(timeFraction, 2)
      },
      draw(progress) {
        const change = progress * changeAmount
        ref.container.scrollLeft = currentScrollPosition + change

        if (progress === 1) {
          isAnimationInProgress = false
        }
      }
    });
  }

  let lastWidth = window.innerWidth

  const resetScrollPosition = debounce(() => {
    if (lastWidth === window.innerWidth) {
      return
    }

    lastWidth = window.innerWidth

    ref.container.scrollLeft = 0
    ref.dots.forEach((_, idx) => makeDotInactive(idx))

    makeDotActive(0)
  }, 500)

  window.addEventListener('resize', resetScrollPosition)
})()
