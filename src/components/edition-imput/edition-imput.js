import React, { Component } from 'react'

import './edition-imput.css'

class EditionImput extends Component {
  state = {
    label: '',
  }

  onEnter = (e) => {
    const { todos, editItem } = this.props
    const { label } = this.state
    if (e.key === 'Enter') {
      const ind = todos.find((el) => el.edit)
      const idEl = ind.id

      editItem(idEl, label)

      this.setState({
        label: '1',
      })
    }
  }

  onLabelCange = (e) => {
    this.setState({
      label: e.target.value,
      // eslint-disable-next-line react/no-unused-state
    })
  }

  render() {
    const { label } = this.state

    return (
      <input
        placeholder="What needs to be change?"
        className="edit-todo"
        onKeyUp={this.onEnter}
        onChange={this.onLabelCange}
        value={label}
      />
    )
  }
}

export default EditionImput
