import React from 'react';

const Input = ({ icon: Icon, type, placeholder, value, onChange }) => {
  return (
    <div className="relative flex items-center">
      {Icon && <Icon className="absolute left-3 text-gray-400" />}
      <input
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default Input;