import React from 'react'
import { formatDistanceToNow } from 'date-fns'

import Task from '../task'

function TaskList(props) {
  const { todos, onDelete, onToggleComplited, editItem, edition, onChecked, currentDate, onStop, onPlay } = props

  const elements = todos.map((item) => (
    <Task
      min={item.newMinut}
      sec={item.newSec}
      timerDate={item.timerDate}
      todos={todos}
      edit={item.edit}
      label={item.label}
      createDate={item.createDate}
      currentDate={currentDate}
      time={formatDistanceToNow(item.createDate)}
      key={item.id}
      complited={item.complited}
      cheked={item.cheked}
      onDelete={() => {
        onDelete(item.id)
      }}
      editItem={editItem}
      edition={() => {
        edition(item.id)
      }}
      onToggleComplited={() => {
        onToggleComplited(item.id)
      }}
      onChecked={() => {
        onChecked(item.id)
      }}
      onPlay={() => {
        onPlay(item.id)
      }}
      onStop={() => {
        onStop(item.id)
      }}
    />
  ))

  return <ul className="todo-list">{elements} </ul>
}

export default TaskList
