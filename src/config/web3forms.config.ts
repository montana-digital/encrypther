/**
 * Web3Forms Configuration
 * 
 * This file configures the Web3Forms integration for contact forms.
 * 
 * SETUP INSTRUCTIONS:
 * ===================
 * 1. Sign up for a free account at https://web3forms.com
 * 2. Create a new form and get your Access Key from the dashboard
 * 3. Replace 'YOUR_API_KEY_HERE' below with your actual Access Key
 * 4. Test the form submission to ensure it's working
 * 
 * ADDITIONAL WEB3FORMS FEATURES (Configure on the dashboard):
 * ===========================================================
 * - Email notifications: Get notified when someone submits the form
 * - Spam protection: Enable reCAPTCHA or Cloudflare Turnstile
 * - Webhooks: Send form data to other services automatically
 * - Custom redirects: Redirect users after successful submission
 * - Email templates: Customize the email format you receive
 * - File uploads: Allow users to attach files (paid feature)
 * - Auto-responders: Send automatic confirmation emails to users
 * 
 * DOCUMENTATION:
 * ==============
 * Full documentation: https://docs.web3forms.com
 * React examples: https://docs.web3forms.com/how-to-guides/js-frameworks/react
 * 
 * SECURITY NOTE:
 * ==============
 * Your Access Key is safe to expose in client-side code. Web3Forms uses
 * the key to identify your form and apply your dashboard settings.
 * The actual email address is kept secure on Web3Forms' servers.
 */

export const web3formsConfig = {
  /**
   * Your Web3Forms Access Key
   * Get this from https://web3forms.com/dashboard
   */
  accessKey: 'YOUR_API_KEY_HERE',

  /**
   * Enable or disable the contact form
   * Set to false to temporarily disable form submissions
   */
  enabled: true,

  /**
   * Success redirect URL (optional)
   * Leave empty to show an on-page success message
   * Example: '/thank-you' or 'https://example.com/success'
   */
  redirectUrl: '',

  /**
   * Form subject line
   * This will appear as the email subject when you receive submissions
   */
  subject: 'New Contact Form Submission from EncryptHer',

  /**
   * Enable spam protection
   * Web3Forms includes built-in spam protection, but you can
   * enable additional reCAPTCHA or Turnstile on the dashboard
   */
  spamProtection: true,

  /**
   * Form field configuration
   * Add custom validation or modify field settings here
   */
  fields: {
    name: {
      required: true,
      minLength: 1,
      maxLength: 100,
    },
    email: {
      required: true,
      maxLength: 255,
    },
    subject: {
      required: true,
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 1000,
    },
  },
};

export type Web3FormsConfig = typeof web3formsConfig;

/**
 * Helper function to check if Web3Forms is properly configured
 */
export function isWeb3FormsConfigured(): boolean {
  return (
    web3formsConfig.enabled &&
    web3formsConfig.accessKey !== 'YOUR_API_KEY_HERE' &&
    web3formsConfig.accessKey.length > 0
  );
}

