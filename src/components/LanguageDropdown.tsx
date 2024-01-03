import { useTranslation } from "react-i18next";

export default function LanguageDropdown() {
  const { i18n, ready, t } = useTranslation();
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    
  };
  return (
    <>
      {ready && (
        <div className="flex items-center">
          <span className="me-2 text-sm text-nowrap hidden lg:block">{t('Select your language')}</span>
          <select
            id="countries"
            className="bg-inactive-background border border-inactive text-gray-900 text-sm rounded-lg block w-full p-1 focus:outline-none focus:ring-0"
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="pt-BR">pt-BR</option>
            <option value="en-US">en-US</option>
          </select>
        </div>
      )}
    </>
  );
}
