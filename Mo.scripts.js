/* ───────────  Menu toggle ─────────── */
function toggleMenu(forceClose = false){
  const submenu = document.getElementById('submenu');
  if(forceClose){ submenu.classList.remove('open'); submenu.style.display='none'; return; }
  submenu.classList.toggle('open');
  submenu.style.display = submenu.classList.contains('open') ? 'block' : 'none';
}

/* ───────────  Date / Time ─────────── */
function displayDateTimeLocation(){
  const el=document.getElementById('datetime-location');
  const now=new Date();
  el.textContent = now.toLocaleDateString('en-US',{
    weekday:'long',year:'numeric',month:'long',day:'numeric',
    hour:'2-digit',minute:'2-digit',second:'2-digit'
  });
}

/* ───────────  Google Maps ─────────── */
function initMap(){
  const store={lat:7.3775,lng:3.8964};
  const map=new google.maps.Map(document.getElementById('map'),{zoom:15,center:store});
  new google.maps.Marker({position:store,map});
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos=>{
      const user={lat:pos.coords.latitude,lng:pos.coords.longitude};
      new google.maps.Marker({position:user,map,label:'You are here'});
      map.setCenter(user);
    });
  }
}
function loadMapScript(){
  const script=document.createElement('script');
  script.src='https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap';
  script.async=true;script.defer=true;document.head.appendChild(script);
}

/* ───────────  Dynamic sections ─────────── */
function toggleSection(id,url){
  const section=document.getElementById(id);
  if(section.dataset.loaded==='true'){
    section.style.display = section.style.display==='none' ? '' : 'none';
    return;
  }
  fetch(url).then(r=>r.text()).then(html=>{
    section.innerHTML=html;section.dataset.loaded='true';
  });
}
function loadReady(){toggleSection('ready-section','readyTowear.html');toggleMenu(true);}
function loadCollections(){toggleSection('collections-section','collection.html');toggleMenu(true);}
function loadCustomized(){toggleSection('customized-section','customized.html');toggleMenu(true);}

/* ───────────  Spam‑safe email link ─────────── */
function buildEmail(){
  const email='mkdesignsbymo@gmail.com';
  const link=document.getElementById('email-link');
  link.href=`mailto:${email}`;link.textContent=email;
}

/* ───────────  WEAR DISPLAY gallery ─────────── */
const wearImages=[
  'image/wear1.png',
  'image/wear2.png',
  'image/wear3.png',
  'image/wear4.png'
];
let wearIndex=0;
function renderWear(){
  const target=document.getElementById('wear-display');
  target.innerHTML = wearImages.map((src,idx)=>
    `<img src="${src}" alt="Design ${idx+1}"
          class="${idx===wearIndex?'active':''}" data-idx="${idx}">`).join('');
}
function nextWear(){ wearIndex=(wearIndex+1)%wearImages.length; renderWear(); }

/* ───────────  Modal helpers ─────────── */
const modal    = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalX   = document.getElementById('modal-close');
function openModal(idx){ modalImg.src=wearImages[idx]; modal.classList.add('show'); }
function closeModal(){ modal.classList.remove('show'); }

/* ───────────  Init on load ─────────── */
window.addEventListener('load',()=>{
  displayDateTimeLocation(); buildEmail(); loadMapScript();

  /* gallery */
  renderWear();
  setInterval(nextWear,6000);
  document.getElementById('wear-display').addEventListener('click',e=>{
    if(e.target.tagName==='IMG'){
      wearIndex=Number(e.target.dataset.idx); renderWear(); openModal(wearIndex);
    }
  });

  modalX.addEventListener('click',closeModal);
  modal.addEventListener('click',e=>{ if(e.target===modal) closeModal(); });
});


