// Minimal translations and language switcher for product-only site
window.translations = {
  de: {
    title: 'Frisches Barbari-Brot',
    price: 'Preis',
    quantity: 'Anzahl', pieces: 'Stück', unitPrice: 'Einzelpreis', totalPrice: 'Gesamt',
    confirm: 'Bestellung bestätigen',
    availableToday: 'Heute verfügbar',
    phoneTitle: 'Telefonnummer eingeben',
    phoneDesc: 'Wir rufen Sie zur Bestätigung an.',
    phonePlaceholder: 'z.B. +49 123 456',
    submitPhone: 'Bestellung absenden',
    successMsg: 'Ihre Bestellung wurde registriert. Wir rufen Sie bald an.'
  },
  en: {
    title: 'Fresh Barbari Bread',
    price: 'Price',
    quantity: 'Quantity', pieces: 'Pieces', unitPrice: 'Unit Price', totalPrice: 'Total',
    confirm: 'Confirm Order',
    availableToday: 'Available today',
    phoneTitle: 'Enter phone number',
    phoneDesc: 'We will call you to confirm.',
    phonePlaceholder: 'e.g. +49 123 456',
    submitPhone: 'Submit order',
    successMsg: 'Your order is registered. We will call you soon.'
  },
  tr: {
    title: 'Taze Barbari Ekmeği',
    price: 'Fiyat',
    quantity: 'Miktar', pieces: 'Adet', unitPrice: 'Birim Fiyat', totalPrice: 'Toplam',
    confirm: 'Siparişi Onayla',
    availableToday: 'Bugün mevcut',
    phoneTitle: 'Telefon numarası girin',
    phoneDesc: 'Onay için sizi arayacağız.',
    phonePlaceholder: 'ör. +49 123 456',
    submitPhone: 'Siparişi gönder',
    successMsg: 'Siparişiniz alındı. Yakında sizi arayacağız.'
  },
  fa: {
    title: 'نان بربری تازه',
    price: 'قیمت',
    quantity: 'تعداد', pieces: 'عدد', unitPrice: 'قیمت واحد', totalPrice: 'مجموع',
    confirm: 'تأیید سفارش',
    availableToday: 'امروز موجود',
    phoneTitle: 'شماره تلفن را وارد کنید',
    phoneDesc: 'برای تأیید با شما تماس می‌گیریم.',
    phonePlaceholder: 'مثلاً +49 123 456',
    submitPhone: 'ثبت سفارش',
    successMsg: 'سفارش شما ثبت شد. به‌زودی تماس می‌گیریم.'
  }
};

function applyLanguage(lang){
  const t = (window.translations && window.translations[lang]) || window.translations.de;
  // Title
  const pageTitle = document.querySelector('.page-title');
  if (pageTitle) pageTitle.textContent = t.title;
  // Price label
  const priceLabel = document.querySelector('.product-price-large');
  if (priceLabel) priceLabel.textContent = `${t.price}: 3,50 €`;
  // Stock / available chip
  const stockChip = document.querySelector('.stock-chip');
  if (stockChip) stockChip.innerHTML = `<i class="fas fa-check"></i> ${t.availableToday || ''}`;
  // Quantity label
  const qLabel = document.querySelector('.quantity-label-large');
  if (qLabel) qLabel.textContent = `${t.quantity}:`;
  // Confirm button
  const confirmBtn = document.querySelector('.order-btn-large');
  if (confirmBtn) confirmBtn.innerHTML = `<i class="fas fa-check-circle"></i> ${t.confirm}`;
  // Modal texts
  const phoneTitle = document.querySelector('#phoneModal .success-title');
  if (phoneTitle) phoneTitle.textContent = t.phoneTitle;
  const phoneDesc = document.querySelector('#phoneModal p');
  if (phoneDesc) phoneDesc.textContent = t.phoneDesc;
  const phoneInput = document.getElementById('phoneInput');
  if (phoneInput) phoneInput.placeholder = t.phonePlaceholder;
  const submitPhoneBtn = document.querySelector('#phoneModal .order-btn-large');
  if (submitPhoneBtn) submitPhoneBtn.innerHTML = `<i class="fas fa-check"></i> ${t.submitPhone}`;
}

function switchLanguage(lang){
  try{
    localStorage.setItem('selectedLanguage', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang==='fa') ? 'rtl' : 'ltr';
    // active button
    document.querySelectorAll('.lang-btn').forEach(b=>{
      b.classList.toggle('active', b.getAttribute('data-lang')===lang);
    });
    applyLanguage(lang);
  }catch(_){applyLanguage('de');}
}

document.addEventListener('DOMContentLoaded', function(){
  const saved = localStorage.getItem('selectedLanguage') || 'de';
  applyLanguage(saved);
  document.querySelectorAll('.lang-btn').forEach(btn=>{
    btn.addEventListener('click', function(){ switchLanguage(this.getAttribute('data-lang')); });
  });
});

window.switchLanguage = switchLanguage;
window.applyLanguage = applyLanguage;

