import React, { Component } from 'react'

class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = { t: this.calculateTime(), stoppedT: 0 }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 500)
  }

  componentDidUpdate(prevProps, prevState) {
    const { t: newResult } = this.state
    const { t: oldResult } = prevState
    if (newResult !== oldResult) {
      this.clockStop()
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  clockStop = () => {
    const { stoped, timeToStop, createDate, timePause } = this.props

    const distanseToStop = timeToStop - createDate - timePause

    if (stoped) {
      this.setState({
        stoppedT: distanseToStop,
      })
    }
  }

  calculateTime = () => {
    const date = new Date()

    const { createDate, timePause } = this.props
    const t = date - createDate - timePause

    return t
  }

  tick() {
    this.setState({
      t: this.calculateTime(),
    })
  }

  render() {
    const { t, stoppedT } = this.state
    const { stoped, play } = this.props

    let gap
    if (stoped && !play) {
      gap = stoppedT
    }
    if (play) {
      gap = t
    }

    const minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60))
    const secund = Math.floor((gap % (1000 * 60)) / 1000)

    return (
      <div>
        <p>
          {minutes}:{secund}
        </p>
      </div>
    )
  }
}

export default Clock
