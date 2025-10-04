// Language translations
const translations = {
    de: {
        bakery: "norbrot",
        logout: "Abmelden",
        adminPanel: "Admin Panel",

        // Registration
        registration: "Registrierung bei der Bäckerei",
        registrationSubtitle: "Registrieren Sie sich, um Barbari-Brot zu bestellen",
        personalInfo: "Persönliche Informationen",
        firstName: "Vorname",
        lastName: "Nachname",
        phone: "Telefonnummer",
        addressInfo: "Adressinformationen Deutschland",
        street: "Straßenname",
        houseNumber: "Hausnummer",
        apartment: "Wohnung/Einheit (optional)",
        postalCode: "Postleitzahl (PLZ)",
        city: "Stadt",
        state: "Bundesland",
        selectState: "Bundesland auswählen",
        registerButton: "Registrieren und Anmelden",

        // Products
        freshBread: "Frisches Barbari-Brot",
        whiteFlourBread: "Barbari-Brot mit weißem Mehl",
        blackFlourBread: "Barbari-Brot mit schwarzem Mehl und Kleie",
        price: "Preis",
        quantity: "Anzahl",
        confirmOrder: "Bestellung bestätigen",
        total: "Gesamt",

        // Features
        featureFresh: "Frisch gebacken",
        featureNatural: "Natürliche Zutaten",
        featureFast: "Schnelle Lieferung",
        featurePayment: "Bezahlung bei Lieferung",
        featureHandmade: "Handgemacht, knusprig außen – weich innen",
        featureNoAdditives: "Ohne Zusatzstoffe",
        featureAvailable: "Heute verfügbar",
        
        // Trust badges
        trustFresh: "Frisch gebacken",
        trustNatural: "Natürliche Zutaten", 
        trustFast: "Schnelle Lieferung",
        trustPayment: "Bezahlung bei Lieferung",
        
        // Product details
        priceLabel: "Preis:",
        availableToday: "Heute verfügbar",
        handmade: " Frisches, traditionelles Brot, täglich gebacken",
        bakingSchedule: " Backtage: Samstag und Sonntag (11:00-13:00 Uhr)",
        noAdditives: " Ohne Zusatzstoffe – gesund und nahrhaft für die Familie",
        ovenFresh: "Ofenfrisch am selben Tag",
        paymentOnDelivery: "Bezahlung bei Lieferung",
        
        // Additional elements
        confirmOrder: "Bestellung bestätigen",
        new: "Neu",
        total: "Gesamt:",
        quantity: "Anzahl:",
        
        // Phone modal
        phoneModalTitle: "Telefonnummer eingeben",
        phoneModalDesc: "Wir rufen Sie zur Bestätigung an.",
        phonePlaceholder: "z.B. +49 123 456",
        phoneSubmit: "Bestellung absenden",
        
        // Success message
        orderSuccess: "Ihre Bestellung wurde registriert. Wir rufen Sie bald an.",

        // Modal
        orderConfirmed: "Bestellung bestätigt!",
        product: "Produkt",
        pieces: "Stück",
        unitPrice: "Einzelpreis",
        totalPrice: "Gesamtpreis",
        paymentInfo: "Die Zahlung erfolgt bar bei der Lieferung.",
        close: "Schließen",

        // Messages
        registrationSuccess: "Registrierung erfolgreich! Sie werden angemeldet...",
        logoutSuccess: "Erfolgreich abgemeldet",
        languageChanged: "Sprache gewechselt zu: Deutsch"
    },

    fa: {
        bakery: "norbrot",
        logout: "خروج",
        adminPanel: "پنل مدیریت",

        registration: "ثبت نام در نانوایی",
        registrationSubtitle: "برای سفارش نان بربری ثبت نام کنید",
        personalInfo: "اطلاعات شخصی",
        firstName: "نام",
        lastName: "نام خانوادگی",
        phone: "شماره تلفن",
        addressInfo: "اطلاعات آدرس آلمان",
        street: "نام خیابان",
        houseNumber: "شماره خانه",
        apartment: "واحد/آپارتمان (اختیاری)",
        postalCode: "کد پستی (PLZ)",
        city: "شهر",
        state: "ایالت",
        selectState: "انتخاب ایالت",
        registerButton: "ثبت نام و ورود",

        freshBread: "نان بربری تازه",
        whiteFlourBread: "نان بربری با آرد سفید",
        blackFlourBread: "نان بربری با آرد سیاه و سبوس دار",
        price: "قیمت",
        quantity: "تعداد",
        confirmOrder: "تایید سفارش",
        total: "مجموع",

        featureFresh: "تازه پخته شده",
        featureNatural: "مواد اولیه طبیعی",
        featureFast: "تحویل سریع",
        featurePayment: "پرداخت هنگام تحویل",
        featureHandmade: " نان محلی تازه، پخت روزانه",
        featureBakingSchedule: " روزهای پخت: شنبه و یک‌شنبه (11:00-13:00)",
        featureNoAdditives: " بدون مواد افزودنی، سالم و مقوی برای خانواده",
        featureAvailable: "امروز موجود",
        
        // Trust badges
        trustFresh: "تازه پخته شده",
        trustNatural: "مواد اولیه طبیعی",
        trustFast: "تحویل سریع", 
        trustPayment: "پرداخت هنگام تحویل",
        
        // Product details
        priceLabel: "قیمت:",
        availableToday: "امروز موجود",
        handmade: " نان محلی تازه، پخت روزانه",
        bakingSchedule: " روزهای پخت: شنبه و یک‌شنبه (11:00-13:00)",
        noAdditives: " بدون مواد افزودنی، سالم و مقوی برای خانواده",
        ovenFresh: "تازه از فر در همان روز",
        paymentOnDelivery: "پرداخت هنگام تحویل",
        
        // Additional elements
        confirmOrder: "تایید سفارش",
        new: "جدید",
        total: "مجموع:",
        quantity: "تعداد:",
        
        // Phone modal
        phoneModalTitle: "شماره تلفن را وارد کنید",
        phoneModalDesc: "ما برای تایید با شما تماس می‌گیریم.",
        phonePlaceholder: "مثال: +49 123 456",
        phoneSubmit: "ارسال سفارش",
        
        // Success message
        orderSuccess: "سفارش شما ثبت شد. به زودی با شما تماس می‌گیریم.",

        orderConfirmed: "سفارش شما تایید شد!",
        product: "محصول",
        pieces: "عدد",
        unitPrice: "قیمت واحد",
        totalPrice: "مجموع",
        paymentInfo: "پرداخت به صورت نقدی در زمان تحویل انجام خواهد شد.",
        close: "بستن",

        registrationSuccess: "ثبت نام موفقیت آمیز بود! در حال ورود...",
        logoutSuccess: "خروج موفقیت آمیز بود",
        languageChanged: "زبان تغییر کرد به: فارسی"
    },

    en: {
        bakery: "norbrot",
        logout: "Logout",
        adminPanel: "Admin Panel",

        registration: "Bakery Registration",
        registrationSubtitle: "Register to order Barbari bread",
        personalInfo: "Personal Information",
        firstName: "First Name",
        lastName: "Last Name",
        phone: "Phone Number",
        addressInfo: "German Address Information",
        street: "Street Name",
        houseNumber: "House Number",
        apartment: "Apartment/Unit (optional)",
        postalCode: "Postal Code (PLZ)",
        city: "City",
        state: "State",
        selectState: "Select State",
        registerButton: "Register and Login",

        freshBread: "Fresh Barbari Bread",
        whiteFlourBread: "Barbari Bread with White Flour",
        blackFlourBread: "Barbari Bread with Black Flour and Bran",
        price: "Price",
        quantity: "Quantity",
        confirmOrder: "Confirm Order",
        total: "Total",

        featureFresh: "Freshly baked",
        featureNatural: "Natural ingredients",
        featureFast: "Fast delivery",
        featurePayment: "Payment upon delivery",
        featureHandmade: " Fresh, traditional bread – baked daily",
        featureBakingSchedule: " Baking days: Saturday and Sunday (11:00-13:00)",
        featureNoAdditives: " No additives – healthy and nutritious for the family",
        featureAvailable: "Available today",
        
        // Trust badges
        trustFresh: "Freshly baked",
        trustNatural: "Natural ingredients",
        trustFast: "Fast delivery",
        trustPayment: "Payment upon delivery",
        
        // Product details
        priceLabel: "Price:",
        availableToday: "Available today",
        handmade: "Fresh, traditional bread – baked daily",
        bakingSchedule: "Baking days: Saturday and Sunday (11:00-13:00)",
        noAdditives: "No additives – healthy and nutritious for the family",
        ovenFresh: "Oven-fresh on the same day",
        paymentOnDelivery: "Payment upon delivery",
        
        // Additional elements
        confirmOrder: "Confirm Order",
        new: "New",
        total: "Total:",
        quantity: "Quantity:",
        
        // Phone modal
        phoneModalTitle: "Enter Phone Number",
        phoneModalDesc: "We will call you for confirmation.",
        phonePlaceholder: "e.g. +49 123 456",
        phoneSubmit: "Submit Order",
        
        // Success message
        orderSuccess: "Your order has been registered. We will call you soon.",

        orderConfirmed: "Order Confirmed!",
        product: "Product",
        pieces: "Pieces",
        unitPrice: "Unit Price",
        totalPrice: "Total Price",
        paymentInfo: "Payment will be made in cash upon delivery.",
        close: "Close",

        registrationSuccess: "Registration successful! Logging in...",
        logoutSuccess: "Successfully logged out",
        languageChanged: "Language changed to: English"
    },

    tr: {
        bakery: "norbrot",
        logout: "Çıkış",
        adminPanel: "Admin Paneli",

        registration: "Fırına Kayıt",
        registrationSubtitle: "Barbari ekmeği sipariş etmek için kayıt olun",
        personalInfo: "Kişisel Bilgiler",
        firstName: "Ad",
        lastName: "Soyad",
        phone: "Telefon Numarası",
        addressInfo: "Almanya Adres Bilgileri",
        street: "Sokak Adı",
        houseNumber: "Ev Numarası",
        apartment: "Daire/Birim (isteğe bağlı)",
        postalCode: "Posta Kodu (PLZ)",
        city: "Şehir",
        state: "Eyalet",
        selectState: "Eyalet Seçin",
        registerButton: "Kayıt Ol ve Giriş Yap",

        freshBread: "Taze Barbari Ekmeği",
        whiteFlourBread: "Beyaz Unlu Barbari Ekmeği",
        blackFlourBread: "Siyah Unlu ve Kepekli Barbari Ekmeği",
        price: "Fiyat",
        quantity: "Miktar",
        confirmOrder: "Siparişi Onayla",
        total: "Toplam",

        featureFresh: "Taze pişmiş",
        featureNatural: "Doğal malzemeler",
        featureFast: "Hızlı teslimat",
        featurePayment: "Teslimatta ödeme",
        featureHandmade: " Taze, geleneksel ekmek – her gün fırından",
        featureBakingSchedule: " Pişirme günleri: Cumartesi ve Pazar (11:00-13:00)",
        featureNoAdditives: " Katkı yok – aile için sağlıklı ve besleyici",
        featureAvailable: "Bugün mevcut",
        
        // Trust badges
        trustFresh: "Taze pişmiş",
        trustNatural: "Doğal malzemeler",
        trustFast: "Hızlı teslimat",
        trustPayment: "Teslimatta ödeme",
        
        // Product details
        priceLabel: "Fiyat:",
        availableToday: "Bugün mevcut",
        handmade: "Taze, geleneksel ekmek – her gün fırından",
        bakingSchedule: "Pişirme günleri: Cumartesi ve Pazar (11:00-13:00)",
        noAdditives: "Katkı yok – aile için sağlıklı ve besleyici",
        ovenFresh: "Aynı gün fırından taze",
        paymentOnDelivery: "Teslimatta ödeme",
        
        // Additional elements
        confirmOrder: "Siparişi Onayla",
        new: "Yeni",
        total: "Toplam:",
        quantity: "Miktar:",
        
        // Phone modal
        phoneModalTitle: "Telefon Numarası Girin",
        phoneModalDesc: "Onay için sizi arayacağız.",
        phonePlaceholder: "örn. +49 123 456",
        phoneSubmit: "Siparişi Gönder",
        
        // Success message
        orderSuccess: "Siparişiniz kaydedildi. Yakında sizi arayacağız.",

        orderConfirmed: "Sipariş Onaylandı!",
        product: "Ürün",
        pieces: "Adet",
        unitPrice: "Birim Fiyat",
        totalPrice: "Toplam Fiyat",
        paymentInfo: "Ödeme teslimat sırasında nakit olarak yapılacaktır.",
        close: "Kapat",

        registrationSuccess: "Kayıt başarılı! Giriş yapılıyor...",
        logoutSuccess: "Başarıyla çıkış yapıldı",
        languageChanged: "Dil değiştirildi: Türkçe"
    }
};

// Switch language function (بدون تغییر)
function switchLanguage(lang) {
    localStorage.setItem('selectedLanguage', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    updatePageText(lang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    showNotification(translations[lang].languageChanged);
}

function updatePageText(lang) {
    const t = translations[lang];

    // Features
    document.querySelectorAll('.feature-fresh').forEach(el => el.textContent = t.featureFresh);
    document.querySelectorAll('.feature-natural').forEach(el => el.textContent = t.featureNatural);
    document.querySelectorAll('.feature-fast').forEach(el => el.textContent = t.featureFast);
    document.querySelectorAll('.feature-payment').forEach(el => el.textContent = t.featurePayment);
    document.querySelectorAll('.feature-handmade').forEach(el => el.textContent = t.featureHandmade);
    document.querySelectorAll('.feature-noadditives').forEach(el => el.textContent = t.featureNoAdditives);
    document.querySelectorAll('.feature-available').forEach(el => el.textContent = t.featureAvailable);

    // Trust badges
    document.querySelectorAll('.trust-fresh').forEach(el => el.textContent = t.trustFresh);
    document.querySelectorAll('.trust-natural').forEach(el => el.textContent = t.trustNatural);
    document.querySelectorAll('.trust-fast').forEach(el => el.textContent = t.trustFast);
    document.querySelectorAll('.trust-payment').forEach(el => el.textContent = t.trustPayment);

    // Product details
    document.querySelectorAll('.price-label').forEach(el => el.textContent = t.priceLabel);
    document.querySelectorAll('.available-today').forEach(el => el.textContent = t.availableToday);
    document.querySelectorAll('.handmade').forEach(el => el.textContent = t.handmade);
    document.querySelectorAll('.baking-schedule').forEach(el => el.textContent = t.bakingSchedule);
    document.querySelectorAll('.no-additives').forEach(el => el.textContent = t.noAdditives);
    document.querySelectorAll('.oven-fresh').forEach(el => el.textContent = t.ovenFresh);
    document.querySelectorAll('.payment-on-delivery').forEach(el => el.textContent = t.paymentOnDelivery);

    // Additional elements
    document.querySelectorAll('.confirm-order').forEach(el => el.textContent = t.confirmOrder);
    document.querySelectorAll('.new').forEach(el => el.textContent = t.new);
    document.querySelectorAll('.total').forEach(el => el.textContent = t.total);
    document.querySelectorAll('.quantity').forEach(el => el.textContent = t.quantity);

    // Product titles
    document.querySelectorAll('.whiteFlourBread').forEach(el => el.textContent = t.whiteFlourBread);
    document.querySelectorAll('.blackFlourBread').forEach(el => el.textContent = t.blackFlourBread);

    // Phone modal
    document.querySelectorAll('.phone-modal-title').forEach(el => el.textContent = t.phoneModalTitle);
    document.querySelectorAll('.phone-modal-desc').forEach(el => el.textContent = t.phoneModalDesc);
    document.querySelectorAll('.phone-input').forEach(el => el.placeholder = t.phonePlaceholder);
    document.querySelectorAll('.phone-submit').forEach(el => el.textContent = t.phoneSubmit);

    // Success message
    window.orderSuccessMessage = t.orderSuccess;

    // سایر بخش‌ها مثل قبل (title, price, order button …)
}
