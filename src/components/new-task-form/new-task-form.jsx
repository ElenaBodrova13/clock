import React, { useState } from 'react'

import AppHeader from '../app-header'

function NewTaskForm(props) {
  const [label, setLabel] = useState('')
  const [initialMin, setInitialMin] = useState('')
  const [initialSec, setInitialSec] = useState('')

  function onEnter(e) {
    const { addItem } = props

    if (!label) {
      return
    }
    if (e.key === 'Enter') {
      addItem(label, initialMin, initialSec)
      setLabel('')
      setInitialMin('')
      setInitialSec('')
    }
  }

  function onLabelCange(e) {
    if (e.target.dataset.action === 'tasca') {
      setLabel(e.target.value)
    }
    if (e.target.dataset.action === 'min') {
      setInitialMin(e.target.value)
    }

    if (e.target.dataset.action === 'sec') {
      setInitialSec(e.target.value)
    }
  }

  return (
    <header className="header">
      <AppHeader />
      <div className="new-todo-form">
        <input
          placeholder="What needs to be done?"
          className="new-todo"
          onKeyUp={onEnter}
          onChange={onLabelCange}
          value={label}
          data-action="tasca"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          onKeyUp={onEnter}
          onChange={onLabelCange}
          value={initialMin}
          data-action="min"
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          onKeyUp={onEnter}
          onChange={onLabelCange}
          value={initialSec}
          data-action="sec"
        />
      </div>
    </header>
  )
}

export default NewTaskForm
