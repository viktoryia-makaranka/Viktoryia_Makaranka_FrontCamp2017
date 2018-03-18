import React from 'react'

const FilterPosts = ({ authors, filterPosts, showAll }) => {
  const emitFilterPosts = (e) => {
    if (e.target.value === 'ALL') {
      showAll()
    } else {
      filterPosts(e.target.value)
    }
  }

  const list = authors.map((author, index) =>
    <option key={ index } value={ author }>{ author }</option>
  )

  return <select className="blogs__filter" onChange={ emitFilterPosts }>
    <option value='ALL'>ALL</option>
    { list }
  </select>
}

export default FilterPosts