import React, { Component } from 'react'

class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = { gap: this.calculateTime(), t: 0 }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentDidUpdate(prevProps, prevState) {
    const { gap: newResult } = this.state
    const { gap: oldResult } = prevState
    if (newResult !== oldResult) {
      this.timerStop()
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  timerStop = () => {
    const { stoped, timeToStop, timerDate, timePause } = this.props

    const distanseToStop = timerDate - timeToStop + timePause

    if (stoped) {
      this.setState({
        t: distanseToStop,
      })
    }
  }

  tick() {
    this.setState({
      gap: this.calculateTime(),
    })
  }

  calculateTime() {
    const { timerDate, timePause } = this.props
    const now = new Date().valueOf()
    const gap = timerDate + timePause - now
    return gap > 0 ? gap : 0
  }

  render() {
    const { gap, t } = this.state
    const { stoped, play } = this.props

    let x
    if (stoped && !play) {
      x = t
    }
    if (play) {
      x = gap
    }

    const minuta = Math.floor(x / 1000 / 60) % 60
    const secunda = Math.floor(x / 1000) % 60

    return (
      <div>
        <p>
          {minuta}:{secunda}
        </p>
      </div>
    )
  }
}

export default Timer
