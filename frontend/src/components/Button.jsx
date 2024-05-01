

export default function Button(props) {
  const {label, onClick} = props
  return (
    <>
    <button className="bg-black text-white font-bold py-2 px-4 rounded w-full my-10" onClick={onClick} >
      {label}
    </button>
    </>

  )
}
