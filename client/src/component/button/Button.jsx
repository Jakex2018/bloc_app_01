/* eslint-disable react/prop-types */
const Button = ({label,styles,icon,type,onClick}) => {
  return (
    <button
      onClick={onClick}
      type={type|| 'button'}
      className={`flex items-center justify-center text-base  ${styles}`}
    >
        {label}
        {icon && <div className="ml-2">{icon}</div>}
    </button>
  )
}

export default Button