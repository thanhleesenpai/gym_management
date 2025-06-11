import React from 'react';

const FaqComponent = ({question, answer}) => {
  return (
    <details className="bg-white rounded-md shadow-md mb-4">
    <summary className="cursor-pointer bg-gray-200 p-4 rounded-t-md transition hover:bg-gray-300">
      <span className="font-semibold">{question}</span>
    </summary>
    <div className="p-4">
      <p>{answer}</p>
    </div>
  </details>
  )
}

export default FaqComponent;