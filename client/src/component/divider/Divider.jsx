/* eslint-disable react/prop-types */
const Divider = ({label}) => {
  return (
    <div className="flex items-center mt-4">
      <div className="border-gray-300 border-t flex-1 dark:border-gray-500"></div>
      <div className="mx-4 text-gray-400 font-semibold text-sm">{label}</div>
      <div className="border-gray-300 border-t flex-1 dark:border-gray-500"></div>
    </div>
  );
};

export default Divider;
