const gallery = document.getElementById('gallery');

// PCの場合のみホイールスクロールを横スクロールに割り当てる
if (!('ontouchstart' in window)) {
  let isScrolling = false;

  gallery.addEventListener('wheel', (e) => {
    e.preventDefault(); // デフォルトのスクロールを無効化

    if (!isScrolling) {
      isScrolling = true;
      const scrollAmount = e.deltaY > 0 ? 1 : -1;
      const currentScroll = gallery.scrollLeft;
      const scrollWidth = gallery.scrollWidth;
      const galleryWidth = gallery.clientWidth;

      let newScrollPosition = currentScroll + (scrollAmount * galleryWidth);

      if (newScrollPosition < 0) newScrollPosition = 0;
      if (newScrollPosition > scrollWidth - galleryWidth) {
        newScrollPosition = scrollWidth - galleryWidth;
      }

      gallery.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });

      setTimeout(() => {
        isScrolling = false;
      }, 150);
    }
  }, { passive: false });
}
