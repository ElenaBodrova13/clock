import React from 'react'
import PropTypes from 'prop-types'

export default function TaskFilter(props) {
  function all() {
    const { allchosen, filter } = props
    allchosen()
    filter()
  }

  function compliting() {
    const { complit, filter } = props
    complit()
    filter()
  }

  function active() {
    const { activchosen, filter } = props
    activchosen()
    filter()
  }

  const { filtered } = props

  let clasName = ''

  if (filtered === 'all') {
    clasName = 'selected'
  } else {
    clasName = ''
  }
  return (
    <ul className="filters">
      <li>
        <button type="button" className={clasName} onClick={all}>
          All
        </button>
      </li>
      <li>
        <button type="button" onClick={active}>
          Active
        </button>
      </li>
      <li>
        <button type="button" onClick={compliting}>
          Completed
        </button>
      </li>
    </ul>
  )
}
TaskFilter.defaultProps = {
  filtered: '',
  filter: () => {},
}

TaskFilter.propTypes = {
  filtered: PropTypes.string,
  filter: PropTypes.func,
}
