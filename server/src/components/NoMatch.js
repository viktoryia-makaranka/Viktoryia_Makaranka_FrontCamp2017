import React from 'react'
import { Link } from 'react-router-dom'

const NoMatch = () => (
  <div>
    <Link to="/">Home</Link>
    <div className="not-found">
      404
    </div>
  </div>
)

export default NoMatch