/* =========================================================
   Menu & Burger
========================================================= */
function toggleMenu(forceClose = false){
  const submenu = document.getElementById('submenu');
  if (forceClose){
    submenu.classList.remove('open');
    submenu.style.display = 'none';
    return;
  }
  submenu.classList.toggle('open');
  submenu.style.display = submenu.classList.contains('open') ? 'block' : 'none';
}

/* Toggle full main menu on ≤ 480 px */
function toggleMobileNav(){
  const menu   = document.getElementById('main-menu');
  const burger = document.querySelector('.burger');
  menu.classList.toggle('open');
  burger.classList.toggle('active');
}

/* Close menu automatically when we resize up */
window.addEventListener('resize',()=>{
  if(window.innerWidth > 480){
    document.getElementById('main-menu').classList.remove('open');
    document.querySelector('.burger').classList.remove('active');
  }
});


/* =========================================================
   Date & Time
========================================================= */
function displayDateTimeLocation(){
  const el  = document.getElementById('datetime-location');
  const now = new Date();
  el.textContent = now.toLocaleDateString('en-US',{
    weekday : 'long',  year  : 'numeric', month : 'long',  day   : 'numeric',
    hour    : '2-digit', minute: '2-digit', second: '2-digit'
  });
}

/* =========================================================
   Dynamic Sections (Ready / Collections / Customized)
========================================================= */
function hide(id){
  const s = document.getElementById(id);
  if (s) s.style.display = 'none';
}

function toggleSection(id, url){
  const section = document.getElementById(id);

  // Already fetched once → just toggle visibility
  if (section.dataset.loaded === 'true'){
    section.style.display = section.style.display === 'none' ? '' : 'none';
    return;
  }

  // First time → fetch partial, insert, mark as loaded
  fetch(url)
    .then(r => r.text())
    .then(html => {
      section.innerHTML      = html;
      section.dataset.loaded = 'true';
    });
}

function loadReady(scroll = false){
  hide('collections-section');
  hide('customized-section');

  toggleSection('ready-section', 'readyTowear.html');
  toggleMenu(true);

  if (scroll){
    setTimeout(() =>
      document.getElementById('ready-section')
              .scrollIntoView({behavior:'smooth'}), 300);
  }
}

function loadCollections(scroll = false){
  hide('ready-section');
  hide('customized-section');

  toggleSection('collections-section', 'collection.html');
  toggleMenu(true);

  if (scroll){
    setTimeout(() =>
      document.getElementById('collections-section')
              .scrollIntoView({behavior:'smooth'}), 300);
  }
}

function loadCustomized(scroll = false){
  hide('ready-section');
  hide('collections-section');

  toggleSection('customized-section', 'customized.html');
  toggleMenu(true);

  if (scroll){
    setTimeout(() =>
      document.getElementById('customized-section')
              .scrollIntoView({behavior:'smooth'}), 300);
  }
}

/* =========================================================
   Spam‑safe Email Link
========================================================= */
function buildEmail(){
  const email = 'mkdesignsbymo@gmail.com';
  const link  = document.getElementById('email-link');
  link.href        = `mailto:${email}`;
  link.textContent = email;
}

/* =========================================================
   Wear‑display Gallery & Modal
========================================================= */
const wearImages = [
  'image/wear1.png',
  'image/wear2.png',
  'image/wear3.png',
  'image/wear4.png'
];

let wearIndex = 0;

function renderWear(){
  const target = document.getElementById('wear-display');
  target.innerHTML = wearImages.map((src, idx) =>
    `<img src="${src}" alt="Design ${idx+1}"
          class="${idx === wearIndex ? 'active' : ''}"
          data-idx="${idx}">`).join('');
}

function nextWear(){
  wearIndex = (wearIndex + 1) % wearImages.length;
  renderWear();
}

/* ---- Modal helpers ---- */
const modal    = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalX   = document.getElementById('modal-close');

function openModal(idx){
  modalImg.src = wearImages[idx];
  modal.classList.add('show');
}

function closeModal(){
  modal.classList.remove('show');
}

/* =========================================================
   Init on Load
========================================================= */
window.addEventListener('load', () => {
  displayDateTimeLocation();
  buildEmail();

  // Gallery
  renderWear();
  setInterval(nextWear, 6000);

  document.getElementById('wear-display')
          .addEventListener('click', e => {
            if (e.target.tagName === 'IMG'){
              wearIndex = Number(e.target.dataset.idx);
              renderWear();
              openModal(wearIndex);
            }
          });

  modalX.addEventListener('click', closeModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
});



