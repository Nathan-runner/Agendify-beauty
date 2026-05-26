import { FaExclamationCircle } from 'react-icons/fa'

export default function ErrorMessage({ error, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <FaExclamationCircle className="w-12 h-12 text-red-500" />
      <div className="text-center">
        <p className="text-red-600 font-semibold">
          {error?.message || 'Ocorreu um erro ao carregar'}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Tentar Novamente
          </button>
        )}
      </div>
    </div>
  )
}
