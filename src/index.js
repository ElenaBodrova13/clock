import React, { Component } from 'react'
import { createRoot } from 'react-dom/client'

import TaskList from './components/task-list'
import NewTaskForm from './components/new-task-form'
import Footer from './components/footer'

class App extends Component {
  maxId = 100

  state = {
    todoData: [
      this.createTodoItem('fw', '12', '25'),
      this.createTodoItem('fw', '12', '25'),
      this.createTodoItem('fw', '12', '25'),
    ],
    newTodo: [],
    currentDate: new Date(),
  }

  addItem = (text, min, sec) => {
    const newItem = this.createTodoItem(text, min, sec)
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem]
      return {
        todoData: newArr,
      }
    })
  }

  onDelete = (id) => {
    this.setState(({ todoData }) => {
      const ind = todoData.findIndex((el) => el.id === id)
      const newArr = todoData.toSpliced(ind, 1)
      return {
        todoData: newArr,
      }
    })
  }

  onChecked = (id) => {
    this.setState(({ todoData }) => {
      const ind = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[ind]
      const newItem = JSON.parse(JSON.stringify(oldItem))

      newItem.cheked = !oldItem.cheked

      const newArray = todoData.toSpliced(ind, 1, newItem)

      return {
        todoData: newArray,
      }
    })
  }

  onToggleComplited = (id) => {
    this.setState(({ todoData }) => {
      const ind = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[ind]
      const newItem = JSON.parse(JSON.stringify(oldItem))
      newItem.complited = !oldItem.complited

      const newArray = todoData.toSpliced(ind, 1, newItem)

      return {
        todoData: newArray,
      }
    })
  }

  allchosen = () => {
    this.setState(({ todoData }) => {
      const newItem = JSON.parse(JSON.stringify(todoData))

      newItem.forEach((element) => {
        element.filtered = 'all'
      })
      return { todoData: newItem }
    })
  }

  complit = () => {
    this.setState(({ todoData }) => {
      const newItem = JSON.parse(JSON.stringify(todoData))

      newItem.forEach((el) => {
        el.filtered = 'complited'
      })
      return { todoData: newItem }
    })
  }

  edition = (id) => {
    this.setState(({ todoData }) => {
      const ind = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[ind]
      const newItem = JSON.parse(JSON.stringify(oldItem))
      newItem.edit = !oldItem.edit
      newItem.label = ''

      const newArray = todoData.toSpliced(ind, 1, newItem)

      return {
        todoData: newArray,
      }
    })
  }

  activchosen = () => {
    this.setState(({ todoData }) => {
      const newItem = JSON.parse(JSON.stringify(todoData))

      newItem.forEach((element) => {
        element.filtered = 'activ'
      })
      return { todoData: newItem }
    })
  }

  deletComplited = () => {
    this.setState(({ todoData }) => {
      const newTodo = JSON.parse(JSON.stringify(todoData))

      const newArr = newTodo.filter((el) => !el.complited)
      return { todoData: newArr }
    })
  }

  filter = () => {
    this.setState(({ todoData }) => {
      const newTodo = JSON.parse(JSON.stringify(todoData))
      let newArr
      newTodo.forEach((element) => {
        if (element.filtered === 'all') {
          newArr = todoData

          return newArr
        }
        if (element.filtered === 'complited') {
          newArr = newTodo.filter((el) => el.complited)

          return newArr
        }
        if (element.filtered === 'activ') {
          newArr = newTodo.filter((el) => !el.complited)
          return newArr
        }
        return newArr
      })
      return { newTodo: newArr }
    })
  }

  chusTodo = (todoData, newTodo) => {
    if (todoData[0].filtered === 'all') {
      return todoData
    }
    return newTodo
  }

  editItem = (id, text) => {
    this.setState(({ todoData }) => {
      const ind = todoData.findIndex((el) => el.id === id)
      const oldItem = todoData[ind]
      const newItem = JSON.parse(JSON.stringify(oldItem))
      newItem.label = text
      newItem.edit = false

      const newArray = todoData.toSpliced(ind, 1, newItem)

      return {
        todoData: newArray,
      }
    })
  }

  createTodoItem(label, min, sec) {
    const createDate = new Date()
    let taskId = this.maxId
    taskId += 1
    this.maxId = taskId
    const timerDate = createDate.valueOf() + (min * 60 + Number(sec)) * 1000

    return {
      label,
      complited: false,
      id: taskId,
      filtered: 'all',
      createDate,
      cheked: false,
      edit: false,
      newLabel: '',
      min,
      sec,
      timerDate,
    }
  }

  render() {
    const { todoData, newTodo, currentDate } = this.state

    const todos = this.chusTodo(todoData, newTodo)

    const todoComplited = todoData.filter((el) => el.complited).length
    const activ = todoData.length - todoComplited
    return (
      <section className="todoapp">
        <NewTaskForm todos={todoData} addItem={this.addItem} />

        <section className="main">
          <TaskList
            currentDate={currentDate}
            todos={todos}
            onDelete={this.onDelete}
            onToggleComplited={this.onToggleComplited}
            edition={this.edition}
            editItem={this.editItem}
            onChecked={this.onChecked}
          />
        </section>

        <Footer
          todoComplited={todoComplited}
          activ={activ}
          filter={this.filter}
          allchosen={this.allchosen}
          todos={todoData}
          complit={this.complit}
          activchosen={this.activchosen}
          deletComplited={this.deletComplited}
          onAllDell={this.onAllDell}
        />
      </section>
    )
  }
}
const el = <App />

const container = document.getElementById('root')
const root = createRoot(container)
root.render(el)
