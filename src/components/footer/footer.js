import React from 'react'

import TaskFilter from '../task-filter'

function Footer(props) {
  function allDeletedChus() {
    const { deletComplited } = props
    deletComplited()
  }

  const { activ, filter, complit, allchosen, activchosen, todoData } = props
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
      <button type="button" className="clear-completed" onClick={allDeletedChus}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
