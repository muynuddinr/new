'use client';

import { useState, useEffect } from 'react';

export default function EarlyBirdPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Calculate time until November 1st
    const calculateTimeLeft = () => {
      const now = new Date();
      const novemberFirst = new Date(now.getFullYear(), 10, 1); // Month is 0-indexed (10 = November)
      if (now > novemberFirst) {
        novemberFirst.setFullYear(novemberFirst.getFullYear() + 1);
      }
      
      const diffTime = novemberFirst.getTime() - now.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
      
      setDaysLeft(diffDays);
      setHoursLeft(diffHours);
      setMinutesLeft(diffMinutes);
    };

    calculateTimeLeft();
    
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    // Update time every minute
    const interval = setInterval(calculateTimeLeft, 60000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const res = await fetch('/api/early-bird', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || 'Failed to signup');
      setIsSubmitted(true);
      setEmail('');
    } catch (err: any) {
      setError(err?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-500">
      <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-1 shadow-2xl transition-all duration-500 animate-scale-in">
        <div className="rounded-2xl bg-white p-6 sm:p-8">
          {/* Close Button */}
          <button
            onClick={closePopup}
            className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Close popup"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Content */}
          <div className="text-center">
            {/* Logo */}
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
              <img 
                src="/logo.png" 
                alt="Flascar Logo" 
                className="h-10 w-10 object-contain" 
              />
            </div>

            <h2 className="mb-2 text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
              Early Bird Discount
            </h2>
            
            {/* Discount Badge */}
            <div className="mx-auto mb-4 sm:mb-6 inline-flex items-center rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 shadow-md">
              <span className="text-lg sm:text-xl font-bold text-purple-800">30% OFF</span>
            </div>

            <p className="mb-4 text-sm sm:text-base text-gray-600">
              Be the first to experience Flascar! Join our exclusive launch list.
            </p>

            {/* Countdown Timer */}
            <div className="mb-4 sm:mb-6 rounded-lg bg-gray-50 p-3 shadow-inner">
              <p className="text-xs sm:text-sm text-gray-600 mb-2">Offer ends in:</p>
              <div className="flex justify-center space-x-2 sm:space-x-4">
                <div className="flex flex-col items-center">
                  <span className="text-xl sm:text-2xl font-bold text-purple-700">{daysLeft}</span>
                  <span className="text-xs text-gray-500">Days</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl sm:text-2xl font-bold text-purple-700">{hoursLeft.toString().padStart(2, '0')}</span>
                  <span className="text-xs text-gray-500">Hours</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xl sm:text-2xl font-bold text-purple-700">{minutesLeft.toString().padStart(2, '0')}</span>
                  <span className="text-xs text-gray-500">Minutes</span>
                </div>
              </div>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="rounded-md border border-red-200 bg-red-50 text-red-800 px-3 py-2 text-sm">{error}</div>
                )}
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm sm:text-base focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 py-3 text-sm sm:text-base font-medium text-white shadow-lg transition-all hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-60"
                >
                  {loading ? 'Submitting…' : 'SIGN UP →'}
                </button>
              </form>
            ) : (
              <div className="py-4">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">You're on the list!</h3>
                <p className="mt-2 text-sm sm:text-base text-gray-600">
                  Check your email for next steps. Thanks for joining Flascar!
                </p>
              </div>
            )}

            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
              <button
                onClick={closePopup}
                className="text-sm text-gray-500 transition-colors hover:text-gray-700"
              >
                No thanks
              </button>
              <p className="text-xs text-gray-500">
                www.fielduo.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}