"use client";

import React, { useState } from 'react';
import { showSuccess, showError, showLoading, dismissToast } from '../utils/toast'; // Import toast utilities
import { db } from '../firebase'; // Import Firestore instance
import { collection, addDoc, Timestamp } from 'firebase/firestore'; // Import Firestore functions
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation(); // Initialize useTranslation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToastId = showLoading(t('contact_us_page.form_sending'));

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      dismissToast(loadingToastId);
      showError(t('contact_us_page.form_error_fill_all'));
      setIsSubmitting(false);
      return;
    }

    try {
      // Add a new document with a generated ID to the "messages" collection
      await addDoc(collection(db, 'messages'), {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        timestamp: Timestamp.now(), // Add a timestamp
      });

      dismissToast(loadingToastId);
      showSuccess(t('contact_us_page.form_success'));

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message: ', error);
      dismissToast(loadingToastId);
      showError(t('contact_us_page.form_error_failed_send'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-12 space-y-6">
      <div>
        <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
          {t('contact_us_page.form_name')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg text-black"
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
          {t('contact_us_page.form_email')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg text-black"
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
          {t('contact_us_page.form_message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg text-black"
          required
          disabled={isSubmitting}
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? t('contact_us_page.form_sending') : t('contact_us_page.form_send')}
      </button>
    </form>
  );
};

export default ContactForm;