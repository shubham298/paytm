export default function InputLabel({ label, placeHolder, onInput }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        onInput={onInput}
        placeholder={placeHolder}
      ></input>
    </div>
  );
}
