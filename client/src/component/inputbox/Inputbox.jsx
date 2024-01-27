/* eslint-disable react/prop-types */
const Inputbox = ({
  type,
  label,
  name,
  value,
  isRequired = false,
  placeholder,
  onChange,
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor="email" className="text-slate-900 dark:text-gray-500">
        {label}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={isRequired}
        className="dark:bg-transparent rounded-[13px] appearance-none block w-full 2xl:py-3 placeholder-gray-300 text-gray-900 dark:text-white dark:placeholder-gray-700 border border-gray-300 dark:border-gray-600 px-3 py-2.5 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 text-base"
      />
    </div>
  );
};

export default Inputbox;
