"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 rounded-md text-sm font-medium ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-blue-500 transition-colors`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('uk')}
        className={`px-3 py-1 rounded-md text-sm font-medium ${i18n.language === 'uk' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'} hover:bg-blue-500 transition-colors`}
      >
        UK
      </button>
    </div>
  );
};

export default LanguageSwitcher;