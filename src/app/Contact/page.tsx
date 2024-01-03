"use client"
import { useTranslation } from 'react-i18next';


export default function Contact() {
  const { t } = useTranslation();
   return (
    <div className="min-h-screen flex items-center justify-center bg-custom-background px-6">
    <div className="max-w-md w-full flex flex-col gap-8 border border-inactive-background rounded p-6">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-main">
        {t('Contact us')}
      </h2>
      <div>
        <h3 className="text-lg font-semibold text-main">{t('Email')}</h3>
        <p className="text-secondary">custommail@mail.com</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-main">{t('Phone')}</h3>
        <p className="text-secondary">+55 (55) 1234-5678)</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-main">{t('Address')}</h3>
        <p className="text-secondary">Long Avenue, Florida, USA</p>
      </div>
    </div>
  </div>
   );
 }