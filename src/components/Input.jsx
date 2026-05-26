function Input({ label, type = 'text', placeholder }) {
  return (
    <div className="mt-4">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full mt-1 p-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-cyan-500"
      />
    </div>
  )
}

export default Input