import React, { useState } from 'react'

import './edition-imput.css'

function EditionImput(props) {
  const [label, setLabel] = useState('')
  function onEnter(e) {
    const { todos, editItem } = props

    if (e.key === 'Enter') {
      const ind = todos.find((el) => el.edit)
      const idEl = ind.id

      editItem(idEl, label)
      setLabel('1')
    }
  }

  function onLabelCange(e) {
    setLabel(e.target.value)
  }

  return (
    <input
      placeholder="What needs to be change?"
      className="edit-todo"
      onKeyUp={onEnter}
      onChange={onLabelCange}
      value={label}
    />
  )
}

export default EditionImput
