import React, { useState, useEffect } from 'react'
import {
  MessageSquare,
  ChevronDown,
  Smile,
  ThumbsUp,
  Heart,
  PartyPopper,
} from 'lucide-react'

const AuthImagePattern = ({ title, subtitle }) => {
  const [activeMessage, setActiveMessage] = useState(0)
  const [activeEmojis, setActiveEmojis] = useState([])
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // WhatsApp-like chat messages
  const demoMessages = [
    { text: 'Hey there! 👋', incoming: true, time: '10:30 AM', delay: 1000 },
    {
      text: "I'm using this awesome chat app!",
      incoming: false,
      time: '10:31 AM',
      delay: 2500,
    },
    {
      text: 'You should join me!',
      incoming: false,
      time: '10:31 AM',
      delay: 4000,
    },
    {
      text: 'It has end-to-end encryption 🔒',
      incoming: true,
      time: '10:32 AM',
      delay: 6000,
    },
    {
      text: "And it's completely free! 🎉",
      incoming: false,
      time: '10:33 AM',
      delay: 8000,
    },
  ]

  // Animate messages
  useEffect(() => {
    const timers = demoMessages.map((message, index) => {
      return setTimeout(() => {
        setActiveMessage(index)
      }, message.delay)
    })

    return () => timers.forEach(timer => clearTimeout(timer))
  }, [])

  const handleEmojiClick = (emoji, count = 3, color) => {
    const newEmojis = []
    for (let i = 0; i < count; i++) {
      newEmojis.push({
        id: Date.now() + Math.random(),
        emoji,
        left: `${Math.random() * 70 + 15}%`,
        animationDuration: `${Math.random() * 1.5 + 1}s`,
        delay: i * 200,
        color,
      })
    }
    setActiveEmojis(prev => [...prev, ...newEmojis])
  }

  const emojiReactions = [
    {
      icon: <Smile className="w-6 h-6 text-yellow-400" />,
      label: 'Like',
      emoji: '😊',
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/20',
      effect: () => handleEmojiClick('😊', 3, 'text-yellow-400'),
    },
    {
      icon: <ThumbsUp className="w-6 h-6 text-blue-400" fill="currentColor" />,
      label: 'Thumbs up',
      emoji: '👍',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20',
      effect: () => handleEmojiClick('👍', 5, 'text-blue-400'),
    },
    {
      icon: <Heart className="w-6 h-6 text-red-400" fill="currentColor" />,
      label: 'Love',
      emoji: '❤️',
      color: 'text-red-400',
      bgColor: 'bg-red-400/20',
      effect: () => handleEmojiClick('❤️', 3, 'text-red-400'),
    },
    {
      icon: <PartyPopper className="w-6 h-6 text-purple-400" />,
      label: 'Celebrate',
      emoji: '🎉',
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/20',
      effect: () => handleEmojiClick('🎉', 7, 'text-purple-400'),
    },
  ]

  return (
    <div className="hidden lg:flex flex-col items-center justify-center bg-[#128C7E] relative overflow-hidden min-h-screen">
      {/* Full-width background section */}
      <div className="w-full absolute top-0 left-0 h-2/3 bg-gradient-to-b from-[#075E54] to-[#128C7E] z-0"></div>

      {/* Content container */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center py-12 px-6">
        {/* Phone mockup with chat */}
        <div className="relative w-full max-w-xs mb-8 transform transition-all duration-500 hover:scale-105">
          {/* Phone frame */}
          <div className="relative mx-auto border-8 border-gray-900 rounded-[2.5rem] h-[520px] w-[260px] bg-gray-900 shadow-2xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full flex justify-center z-20">
              <div className="bg-gray-900 h-6 w-2/3 rounded-b-xl flex items-center justify-center">
                <span className="text-white text-xs font-medium">
                  {currentTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>

            {/* Screen content */}
            <div className="h-full flex flex-col bg-[#e5ddd5] bg-opacity-30 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAA+UlEQVQ4y+3UMUoDQRTG8Z8psJBUKTyAR7ATvIBgKTYW1oKtnRewsbK0sbGQNGlS2FhYCB7AC3gBC0GJxGJZJzA7u8lG0MIHwzDz5n3/mXkzO/xz1fCKd3zgDgv4wjU2sYJ5rGIXj3jBQ1RZwzr2cI5H3GMBa9jBc1TZwDZ2cYVn3GIZG9jCS1TZxD72cY0X3GEVm9jGa1TZwgEOcIM33GMN29jBW1TZxiEOcYsPPGAdO9jFe1TZxRGOcYdPPGIDe9jHR1TZxzFOcI8vPGETB9jHZ1Q5wClO8YBfPGMLhzjAd1Q5xDnO8IBfvGAbRzjCb1Q5QgXOMc9/vGKHxzjGP9R5QRXuMQd/vGKPZzjHP9R5RTXuMIN/vGKPZzjDP9R5Rw3uMA1/vGKPZzjHP9R5QKXuMAV/vGKPZzjHP9R5RrXuMIV/vGKPZzjHP9R5Ra3uMEV/vGKPZzjHP9R5R73uMMV/vGKPZzjHP9R5QEPeMQD/vGLPbziFf9Q5Q1veMc9/vGLPbzjHf9Q5QMf+MQD/vGLPbziFf9Q5Qtf+MY9/vGLPbzjHf9Q5Qc/+MUt/vGLPbziFf9Q5Q9/+MMt/vGLPbziFf9Q5R9UWcc3zrCMPwEAAAAASUVORK5CYII=')] pt-8">
              {/* WhatsApp header */}
              <div className="bg-[#128C7E] p-3 text-white flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="font-medium">WhatsApp</span>
                </div>
                <ChevronDown className="w-5 h-5" />
              </div>

              {/* Animated chat area */}
              <div className="flex-1 p-3 overflow-y-auto space-y-2">
                {demoMessages
                  .slice(0, activeMessage + 1)
                  .map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.incoming ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg relative transition-all duration-300 ${
                          message.incoming
                            ? 'bg-white rounded-tl-none'
                            : 'bg-[#DCF8C6] rounded-tr-none'
                        } ${index === activeMessage ? 'animate-message-in opacity-100' : 'opacity-100'}`}
                        style={{
                          animationDelay: `${message.delay}ms`,
                          visibility:
                            index <= activeMessage ? 'visible' : 'hidden',
                        }}
                      >
                        <p className="text-sm text-gray-800">{message.text}</p>
                        <p className="text-xs text-gray-500 text-right mt-1">
                          {message.time}
                          {!message.incoming && (
                            <span className="ml-1 text-blue-500">✓✓</span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Phone shadow */}
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 h-4 bg-black/20 rounded-full blur-md"></div>
        </div>

        {/* Title section */}
        <div className="text-center mb-12 w-full">
          <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            {title}
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Emoji reaction section */}
        <div className="w-full bg-white/10 backdrop-blur-sm rounded-2xl p-8 mt-8 overflow-hidden relative min-h-[200px]">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">
            Tap to react!
          </h3>

          <div className="flex justify-center space-x-8">
            {emojiReactions.map((reaction, index) => (
              <button
                key={index}
                className="flex flex-col items-center group cursor-pointer transform transition-all hover:scale-110 active:scale-95"
                onClick={reaction.effect}
              >
                <div
                  className={`${reaction.bgColor} rounded-full p-4 mb-2 transition-all group-hover:bg-opacity-40 shadow-md group-hover:shadow-lg`}
                >
                  <div className={reaction.color}>{reaction.icon}</div>
                </div>
                <span className="text-white text-sm">{reaction.label}</span>
              </button>
            ))}
          </div>

          {/* Active emoji pop-ups */}
          {activeEmojis.map(emojiObj => (
            <div
              key={emojiObj.id}
              className={`absolute text-4xl animate-emoji-pop pointer-events-none ${emojiObj.color} drop-shadow-lg`}
              style={{
                left: emojiObj.left,
                bottom: '20%',
                animationDuration: emojiObj.animationDuration,
                animationDelay: `${emojiObj.delay}ms`,
                transformOrigin: 'center bottom',
              }}
            >
              {emojiObj.emoji}
            </div>
          ))}
        </div>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        @keyframes message-in {
          0% {
            transform: translateY(10px) scale(0.95);
            opacity: 0;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        @keyframes emoji-pop {
          0% {
            transform: translateY(0) scale(0.5) rotate(0deg);
            opacity: 0;
            filter: blur(2px);
          }
          20% {
            transform: translateY(-30px) scale(1.3) rotate(10deg);
            opacity: 1;
            filter: blur(0);
          }
          40% {
            transform: translateY(-60px) scale(1.1) rotate(-5deg);
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120px) scale(0.8) rotate(15deg);
            opacity: 0;
          }
        }
        .animate-message-in {
          animation: message-in 0.3s ease-out forwards;
        }
        .animate-emoji-pop {
          animation: emoji-pop ease-out forwards;
          will-change: transform, opacity;
        }
      `}</style>
    </div>
  )
}

export default AuthImagePattern
