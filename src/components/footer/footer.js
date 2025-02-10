import React, { Component } from 'react'

import TaskFilter from '../task-filter'

class Footer extends Component {
  allDeletedChus = () => {
    const { deletComplited } = this.props
    deletComplited()
  }

  render() {
    const { activ, filter, complit, allchosen, activchosen, todoData } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{activ} items left</span>
        <TaskFilter
          filter={() => {
            filter()
          }}
          complit={() => {
            complit()
          }}
          allchosen={() => {
            allchosen()
          }}
          activchosen={() => {
            activchosen()
          }}
          todoData={todoData}
        />
        <button type="button" className="clear-completed" onClick={this.allDeletedChus}>
          Clear completed
        </button>
      </footer>
    )
  }
}

export default Footer
