"use client";

import React, { useState } from 'react';
import { showSuccess, showError } from '../utils/toast'; // Import toast utilities

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      showError('Please fill in all fields.');
      return;
    }

    // For now, just log the data and show a success toast
    console.log('Form submitted:', formData);
    showSuccess('Your message has been sent!');

    // Reset form
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mt-12 space-y-6">
      <div>
        <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg text-black"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg text-black"
          required
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg text-black"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;