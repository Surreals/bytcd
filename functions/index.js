const functions = require('firebase-functions');
const admin = require('firebase-admin');
const validator = require('validator'); // For email validation

admin.initializeApp();
const db = admin.firestore();

exports.submitContactForm = functions.https.onCall(async (data, context) => {
  // Optional: Check if the user is authenticated if you want to restrict form submissions
  // if (!context.auth) {
  //   throw new functions.https.HttpsError('unauthenticated', 'Only authenticated users can submit the form.');
  // }

  const { name, email, message } = data;

  // 1. Server-side Validation
  if (!name || !email || !message) {
    throw new functions.https.HttpsError('invalid-argument', 'All fields (name, email, message) are required.');
  }

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    throw new functions.https.HttpsError('invalid-argument', 'Name, email, and message must be strings.');
  }

  if (!validator.isEmail(email)) {
    throw new functions.https.HttpsError('invalid-argument', 'Invalid email format.');
  }

  if (name.length > 100) {
    throw new functions.https.HttpsError('invalid-argument', 'Name cannot exceed 100 characters.');
  }

  if (message.length > 1000) {
    throw new functions.https.HttpsError('invalid-argument', 'Message cannot exceed 1000 characters.');
  }

  // 2. Sanitize data (basic example, more robust sanitization might be needed depending on use case)
  const sanitizedName = validator.escape(name.trim());
  const sanitizedEmail = validator.normalizeEmail(email.trim());
  const sanitizedMessage = validator.escape(message.trim());

  try {
    // 3. Write to Firestore
    await db.collection('messages').add({
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      timestamp: admin.firestore.FieldValue.serverTimestamp(), // Use server timestamp for accuracy
    });

    return { success: true, message: 'Your message has been sent successfully!' };
  } catch (error) {
    console.error('Error writing message to Firestore:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send message. Please try again later.');
  }
});