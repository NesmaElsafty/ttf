(function(){
  const root = document.querySelector('.ttf-skin');
  if(!root) return;

  const buttons = root.querySelectorAll('.v-item-btn');
  const cards = root.querySelectorAll('.ghl-v-card');

  function setActive(idx){
    buttons.forEach(b=>b.classList.remove('ttf-active'));
    if(buttons[idx]) buttons[idx].classList.add('ttf-active');
  }

  // click buttons → scroll to card
  buttons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const idx = parseInt(btn.getAttribute('data-index'),10);
      const target = root.querySelector(`.ghl-v-card[data-index="${idx}"]`);
      if(target){
        target.scrollIntoView({behavior:'smooth', block:'center'});
        setActive(idx);
      }
    });
  });

  // hover card → highlight
  cards.forEach(card=>{
    const idx = parseInt(card.getAttribute('data-index'),10);
    card.addEventListener('mouseenter', ()=> setActive(idx));
  });

  // click thumbnail → replace with <video>
  const thumbs = root.querySelectorAll('.thumbnail');
  thumbs.forEach(thumb=>{
    thumb.addEventListener('click', ()=>{
      const videoUrl = thumb.getAttribute('data-video');
      const video = document.createElement('video');
      video.src = videoUrl;
      video.controls = true;
      video.autoplay = true;
      video.setAttribute('playsinline','true');
      thumb.replaceWith(video);
    });
  });
})();