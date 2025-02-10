import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Clock from '../clok'
import Timer from '../timer'

class SpanLabel extends Component {
  constructor(props) {
    super(props)
    this.state = { play: true, stoped: false, timeToStop: 0, timePause: 0 }
  }

  onPlay = () => {
    console.log('onPlay')
    const { timeToStop, timePause } = this.state

    const stoppedTime = new Date().valueOf() - timeToStop + timePause
    this.setState({
      play: true,
      stoped: false,

      timePause: stoppedTime,
    })
  }

  onStop = () => {
    console.log('onStop')
    this.setState({
      stoped: true,
      play: false,
      timeToStop: new Date().valueOf(),
    })
  }

  render() {
    const { onToggleComplited, label, min, sec, createDate, timerDate } = this.props
    const { stoped, play, timeToStop, timePause } = this.state

    let timeTable = null

    if (min !== '0' || sec !== '0') {
      timeTable = (
        <Timer timerDate={timerDate} stoped={stoped} play={play} timeToStop={timeToStop} timePause={timePause} />
      )
    }
    if (min === '0' && sec === '0') {
      timeTable = (
        <Clock createDate={createDate} stoped={stoped} play={play} timeToStop={timeToStop} timePause={timePause} />
      )
    }

    return (
      <>
        <span className="title" role="presentation" onClick={onToggleComplited}>
          {label}
        </span>

        <span className="description">
          <button
            className="icon icon-play"
            type="button"
            aria-label="icon-play"
            onClick={(e) => {
              console.log(4, e.target)

              this.onPlay()
            }}
          />
          <button className="icon icon-pause" type="button" aria-label="icon-pause" onClick={this.onStop} />
          {timeTable}
        </span>
      </>
    )
  }
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
