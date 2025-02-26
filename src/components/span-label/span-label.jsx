import React from 'react'
import PropTypes from 'prop-types'

function SpanLabel(props) {
  const { onToggleComplited, label, min, sec, onStop, onPlay } = props

  return (
    <>
      <span className="title" role="presentation" onClick={onToggleComplited}>
        {label}
      </span>

      <span className="description">
        <button className="icon icon-play" type="button" aria-label="icon-play" onClick={onPlay} />
        <button className="icon icon-pause" type="button" aria-label="icon-pause" onClick={onStop} />
        {min}:{sec}
      </span>
    </>
  )
}

export default SpanLabel

SpanLabel.defaultProps = {
  min: '0',
  sec: '0',
}

SpanLabel.propTypes = {
  min: PropTypes.string,
  sec: PropTypes.string,
}
