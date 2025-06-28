# Sign In Page with Email OTP Verification

A React application that implements email-based OTP (One-Time Password) authentication using EmailJS.

## Features

- ✅ Email validation
- ✅ OTP generation and sending via EmailJS
- ✅ OTP verification
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Loading states and error handling
- ✅ Resend OTP functionality

## Setup Instructions

### 1. EmailJS Setup

1. Visit [EmailJS](https://www.emailjs.com/) and create a free account
2. Create a new email service (Gmail, Outlook, etc.)
3. Create an email template with the following variables:
   - `{{to_email}}` - Recipient email
   - `{{user_name}}` - User name (extracted from email)
   - `{{otp_code}}` - The 6-digit OTP code

### 2. Email Template Example

Create a template in EmailJS with this content:

```
Subject: Your OTP Code for Sign In

Hello {{user_name}},

Your One-Time Password (OTP) for signing in is: {{otp_code}}

This code will expire in 10 minutes for security reasons.

If you didn't request this code, please ignore this email.

Best regards,
Your App Team
```

### 3. Update Configuration

In `src/App.jsx`, replace the following placeholders with your EmailJS credentials:

```javascript
const result = await emailjs.send(
  'YOUR_SERVICE_ID',    // Replace with your EmailJS service ID
  'YOUR_TEMPLATE_ID',   // Replace with your EmailJS template ID
  templateParams,
  'YOUR_PUBLIC_KEY'     // Replace with your EmailJS public key
)
```

### 4. Finding Your EmailJS Credentials

- **Service ID**: Found in EmailJS dashboard under "Email Services"
- **Template ID**: Found in EmailJS dashboard under "Email Templates"
- **Public Key**: Found in EmailJS dashboard under "Account" > "API Keys"

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update EmailJS credentials in `src/App.jsx`
4. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Enter your email address
2. Click "Send OTP"
3. Check your email for the OTP code
4. Enter the 6-digit OTP
5. Click "Verify OTP"
6. You'll be signed in successfully!

## Security Features

- OTP is generated randomly for each request
- Client-side validation for email format
- OTP length validation (6 digits)
- Resend OTP functionality
- Loading states to prevent multiple requests

## Technologies Used

- React 19
- EmailJS for email delivery
- Tailwind CSS for styling
- Vite for build tooling

## Demo Flow

1. **Email Step**: User enters email → OTP is generated and sent
2. **OTP Step**: User enters OTP → Validation occurs
3. **Success**: User is signed in and sees welcome screen

## Customization

You can customize:
- OTP length (currently 6 digits)
- Email template design
- UI colors and styling
- Validation rules
- Success/error messages

## Notes

- Make sure to configure your EmailJS service properly
- The free EmailJS plan has monthly email limits
- For production use, consider implementing server-side OTP generation and validation
- Add rate limiting to prevent spam
