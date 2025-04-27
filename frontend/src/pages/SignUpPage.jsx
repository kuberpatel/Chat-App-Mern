import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'
import toast from 'react-hot-toast'

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  const { signup, isSigningUp } = useAuthStore()

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error('Full name is required')
    if (!formData.email.trim()) return toast.error('Email is required')
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error('Invalid email format')
    if (!formData.password) return toast.error('Password is required')
    if (formData.password.length < 6)
      return toast.error('Password must be at least 6 characters')
    return true
  }

  const handleSubmit = e => {
    e.preventDefault()
    const success = validateForm()
    if (success === true) signup(formData)
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#f0f2f5]">
      {/* Left side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex flex-col items-center gap-3">
              <div className="size-16 rounded-full bg-[#25D366] flex items-center justify-center shadow-md">
                <MessageSquare className="size-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mt-3">
                Create Account
              </h1>
              <p className="text-gray-500 text-sm">
                Get started with your free account
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 bg-white p-8 rounded-xl shadow-sm"
          >
            <div className="space-y-4">
              <div className="form-control">
                <label className="label pl-0">
                  <span className="label-text font-medium text-gray-700">
                    Full Name
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="size-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full pl-10 bg-gray-50 border-gray-200 focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={e =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label pl-0">
                  <span className="label-text font-medium text-gray-700">
                    Email
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="size-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className="input input-bordered w-full pl-10 bg-gray-50 border-gray-200 focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={e =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label pl-0">
                  <span className="label-text font-medium text-gray-700">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="size-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input input-bordered w-full pl-10 bg-gray-50 border-gray-200 focus:border-[#25D366] focus:ring-1 focus:ring-[#25D366]"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={e =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3 rounded-lg font-medium transition-colors shadow-sm"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin mr-2" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-[#25D366] hover:text-[#128C7E] font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image/Pattern */}
      <div className="hidden lg:block bg-[#128C7E]">
        <AuthImagePattern
          title="Connect with friends"
          subtitle="Simple, secure messaging for everyone"
          textColor="text-white"
        />
      </div>
    </div>
  )
}

export default SignUpPage
