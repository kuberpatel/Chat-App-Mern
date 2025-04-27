import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })

  res.cookie('jwt', token, {
    httpOnly: true, // Protects from XSS attacks
    secure: process.env.NODE_ENV !== 'development', // Use HTTPS in production
    sameSite: 'strict', // Protects from CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })

  return token
}
