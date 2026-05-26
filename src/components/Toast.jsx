import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'

export default function Toast({ type, message }) {
  const isSuccess = type === 'success'

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg text-white ${
          isSuccess ? 'bg-green-600' : 'bg-red-600'
        }`}
      >
        {isSuccess ? (
          <FaCheckCircle className="w-5 h-5" />
        ) : (
          <FaExclamationCircle className="w-5 h-5" />
        )}
        <p className="font-medium">{message}</p>
      </div>
    </div>
  )
}
