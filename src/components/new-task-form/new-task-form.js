import React, { Component } from 'react'

import AppHeader from '../app-header'

class NewTaskForm extends Component {
  state = {
    label: '',

    initialMin: '',
    initialSec: '',
  }

  onEnter = (e) => {
    const { addItem } = this.props
    const { label, initialMin, initialSec } = this.state
    if (!label) {
      return
    }
    if (e.key === 'Enter') {
      addItem(label, initialMin, initialSec)

      this.setState({
        label: '',
        initialMin: '',
        initialSec: '',
      })
    }
  }

  onLabelCange = (e) => {
    if (e.target.dataset.action === 'tasca') {
      this.setState({
        label: e.target.value,
        // eslint-disable-next-line react/no-unused-state
      })
    }
    if (e.target.dataset.action === 'min') {
      this.setState({
        initialMin: e.target.value,
      })
    }

    if (e.target.dataset.action === 'sec') {
      this.setState({
        initialSec: e.target.value,
      })
    }
  }

  render() {
    const { label, initialMin, initialSec } = this.state
    return (
      <header className="header">
        <AppHeader />
        <form className="new-todo-form">
          <input
            placeholder="What needs to be done?"
            className="new-todo"
            onKeyUp={this.onEnter}
            onChange={this.onLabelCange}
            value={label}
            data-action="tasca"
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            onKeyUp={this.onEnter}
            onChange={this.onLabelCange}
            value={initialMin}
            data-action="min"
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            onKeyUp={this.onEnter}
            onChange={this.onLabelCange}
            value={initialSec}
            data-action="sec"
          />
        </form>
      </header>
    )
  }
}

export default NewTaskForm
