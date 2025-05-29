document.getElementById("scroll-up").addEventListener("click", function (e) {
    console.log(document.body.scrollTop);
    scrollToTop(2000);

});

function scrollToTop(duration = 1000) {
  const start = window.pageYOffset;
  const startTime = performance.now();

  function scrollStep(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, start * (1 - ease));

    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  }

  requestAnimationFrame(scrollStep);
}