import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t, i18n } = useTranslation();
  const [count, setCount] = useState(1000);

  // Dapatkan tanggal, waktu, dan harga dalam format yang sesuai dengan bahasa
  const today = new Date();
  const formattedDate = new Intl.DateTimeFormat(i18n.language, {
    year: 'numeric', month: 'long', day: 'numeric'
  }).format(today);

  const formattedTime = new Intl.DateTimeFormat(i18n.language, {
    hour: 'numeric', minute: 'numeric', second: 'numeric'
  }).format(today);

  const formattedPrice = new Intl.NumberFormat(i18n.language, {
    style: 'currency', currency: i18n.language === 'ar' ? 'SAR' : (i18n.language === 'fr' ? 'EUR' : 'USD')
  }).format(5000);

  const formattedNumber = new Intl.NumberFormat(i18n.language).format(count);

  // Fungsi untuk mengganti bahasa
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  // Mengubah arah teks sesuai bahasa (LTR atau RTL)
  useEffect(() => {
    if (i18n.language === 'ar') {
      document.body.dir = 'rtl';
    } else {
      document.body.dir = 'ltr';
    }
  }, [i18n.language]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>{t('welcome')}</h1>
      <p>{t('date', { date: formattedDate })}</p>
      <p>{t('time', { time: formattedTime })}</p>
      <p>{t('currency', { price: formattedPrice })}</p>
      <p>{t('number', { count: formattedNumber })}</p>

      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('fr')}>Français</button>
      <button onClick={() => changeLanguage('ar')}>العربية</button>
    </div>
  );
};

export default App;
