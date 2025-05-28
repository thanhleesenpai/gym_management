import React from 'react';

const PlanForm = ({}) => {
  return (
    <form className='d-flex flex-row gap-3' onSubmit={handleSubmit}>
    <input type="text" className='form-control' placeholder='create category' onChange={(e) => setInputVal(e.target.value)} value={inputVal}/>
    <button type="submit" className='btn btn-primary'>submit</button>
  </form>
  )
}

export default PlanForm;