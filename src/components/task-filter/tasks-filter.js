import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class TaskFilter extends Component {
  all = () => {
    const { allchosen, filter } = this.props
    allchosen()
    filter()
  }

  compliting = () => {
    const { complit, filter } = this.props
    complit()
    filter()
  }

  active = () => {
    const { activchosen, filter } = this.props
    activchosen()
    filter()
  }

  render() {
    const { filtered } = this.props

    let clasName = ''

    if (filtered === 'all') {
      clasName = 'selected'
    } else {
      clasName = ''
    }
    return (
      <ul className="filters">
        <li>
          <button type="button" className={clasName} onClick={this.all}>
            All
          </button>
        </li>
        <li>
          <button type="button" onClick={this.active}>
            Active
          </button>
        </li>
        <li>
          <button type="button" onClick={this.compliting}>
            Completed
          </button>
        </li>
      </ul>
    )
  }
}
TaskFilter.defaultProps = {
  filtered: '',
  filter: () => {},
}

TaskFilter.propTypes = {
  filtered: PropTypes.string,
  filter: PropTypes.func,
  /* (props, propsName, componentName) => {
    const value = props[propsName];
    if (typeof value === "number" && !isNaN(value)) {
      return null;
    } else {
      return new TypeError(
        `${componentName}:${propsName} должен быть числом`
      );
    }
  }, */
}
