import { useState } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'

function App() {
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id'
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id'
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key'

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [step, setStep] = useState('email') 
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('') 
  const [isSignedIn, setIsSignedIn] = useState(false)

  const showMessage = (text, type) => {
    setMessage(text)
    setMessageType(type)
  }

  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }


  const sendOtp = async () => {
    if (!email || !email.includes('@')) {
      showMessage('Please enter a valid email address', 'error')
      return
    }

    setLoading(true)
    setMessage('')

    const currentOtp = generateOtp()
    setGeneratedOtp(currentOtp)

    const templateParams = {
      to_email: email,
      otp_code: currentOtp
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      )
      
      setStep('otp')
      showMessage('OTP sent! Please check your inbox.', 'success')
    } catch (error) {
      console.error(error)
      showMessage('Failed to send OTP. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  // Validate OTP
  const validateOtp = () => {
    if (!otp || otp.length !== 6) {
      showMessage('Please enter a 6-digit OTP', 'error')
      return
    }

    if (otp === generatedOtp) {
      setIsSignedIn(true)
      showMessage('Successfully signed in!', 'success')
    } else {
      showMessage('Invalid OTP. Please try again.', 'error')
    }
  }

  const resetForm = () => {
    setEmail('')
    setOtp('')
    setGeneratedOtp('')
    setStep('email')
    setMessage('')
    setIsSignedIn(false)
  }

  if (isSignedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-violet-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
            <p className="text-gray-600">You have successfully signed in with {email}</p>
          </div>
          <button
            onClick={resetForm}
            className="w-full bg-gray-600 hover:cursor-pointer hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Click Here to Sign Out
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-violet-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 m-2">Sign In</h1>
          <p className="text-gray-600">
            
            {step === 'email' ? 'Enter your email' : 'Enter OTP sent to your email'}
          </p>
        </div>

        {step === 'email' ? (
          <div className="space-y-6">
            <div>
              <div htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">
                Email Address
              </div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-blue-600 hover:cursor-pointer hover:bg-blue-700 disabled:bg-blue-200 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              {loading ? 'Sending OTP to your mail...' : 'Send OTP'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </div>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter your 6-digit OTP"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg"
                maxLength={6}
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep('email')}
                className="flex-1 bg-gray-600 hover:cursor-pointer hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Back
              </button>
              <button
                onClick={validateOtp}
                className="flex-1 bg-blue-600 hover:cursor-pointer hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Verify OTP
              </button>
            </div>

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-green-600 hover:cursor-pointer hover:bg-green-700 disabled:bg-green-300 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              {loading ? 'Resending...' : 'Resend OTP'}
            </button>
          </div>
        )}

        {message && (
          <div className={`mt-4 p-3 rounded-lg text-sm ${
            messageType === 'success'
              ? 'bg-green-100 text-green-700 border border-green-300' 
              : 'bg-red-100 text-red-700 border border-red-300'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
