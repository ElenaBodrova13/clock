import React, { Component } from 'react'
import PropTypes from 'prop-types'

import EditionImput from '../edition-imput'
import './task.css'
import SpanLabel from '../span-label'

class Task extends Component {
  changeClass = (complited, cheked) => {
    let clasName = ''

    if (complited === true || cheked === true) {
      clasName = 'completed'
    }
    return clasName
  }

  render() {
    const {
      todos,
      label,
      time,
      id,
      onDelete,
      onToggleComplited,
      complited,
      cheked,
      edit,
      edition,
      editItem,
      onChecked,
      min,
      sec,
      timerDate,
      createDate,
      currentDate,
      onStop,
      onPlay,
    } = this.props

    const imp = edit ? <EditionImput todos={todos} editItem={editItem} /> : null
    const lab = !edit ? (
      <SpanLabel
        onToggleComplited={onToggleComplited}
        label={label}
        min={min}
        sec={sec}
        createDate={createDate}
        timerDate={timerDate}
        currentDate={currentDate}
        onStop={onStop}
        onPlay={onPlay}
      />
    ) : null

    return (
      <li key={id} className={this.changeClass(complited, cheked)}>
        <div className="view">
          <input className="toggle" type="checkbox" id={id} checked={cheked} onChange={onChecked} />
          <label htmlFor={id} className="taska">
            {imp}
            {lab}

            <span className="description">{time}</span>
          </label>
          <button type="button" className="icon icon-edit" aria-label="icon-edit" onClick={edition} />
          <button type="button" className="icon icon-destroy" aria-label="icon-destroy" onClick={onDelete} />
        </div>
      </li>
    )
  }
}
Task.defaultProps = {
  label: 'New task',
  complited: false,
  min: '0',
  sec: '0',
}

Task.propTypes = {
  label: PropTypes.string,
  complited: PropTypes.bool,
  min: PropTypes.string,
  sec: PropTypes.string,

  onDelete: PropTypes.func.isRequired,
}
export default Task

/* <span style={style}> {lable}</span> */
