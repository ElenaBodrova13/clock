import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

import TaskList from './components/task-list'
import NewTaskForm from './components/new-task-form'
import Footer from './components/footer'

function App() {
  let maxId = 100
  const createTodoItem = (label, min, sec) => {
    let taskId = maxId
    taskId += 1
    maxId = taskId
    const delta = (min * 60 + Number(sec)) * 1000
    return {
      createDate: new Date(),
      label,
      delta,
      complited: false,
      id: taskId,
      filtered: 'all',
      cheked: false,
      edit: false,
      newLabel: '',
      min,
      sec,
      onPlay: false,
      onStop: true,
      timeOnPlay: 0,
      timeOnStop: 0,
      totalTime: 0,
      newMinut: Number(min),
      newSec: Number(sec),
      finish: false,
    }
  }

  const data = [createTodoItem('fw', '12', '25'), createTodoItem('fw', '12', '25'), createTodoItem('fw', '12', '25')]

  const [todoData, setTodoData] = useState(data)
  const [newTodo, setNewTodo] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  function tick() {
    setCurrentDate(new Date())
  }
  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000)
    return () => clearInterval(timerID)
  }, [])

  const onDelete = (id) => {
    const ind = todoData.findIndex((el) => el.id === id)
    const newArr = todoData.toSpliced(ind, 1)

    setTodoData(newArr)
  }

  const onChecked = (id) => {
    const ind = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[ind]
    const newItem = JSON.parse(JSON.stringify(oldItem))

    newItem.cheked = !oldItem.cheked

    const newArray = todoData.toSpliced(ind, 1, newItem)

    setTodoData(newArray)
  }

  const onToggleComplited = (id) => {
    const ind = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[ind]
    const newItem = JSON.parse(JSON.stringify(oldItem))
    newItem.complited = !oldItem.complited

    const newArray = todoData.toSpliced(ind, 1, newItem)

    setTodoData(newArray)
  }

  const allchosen = () => {
    const newItem = JSON.parse(JSON.stringify(todoData))

    newItem.forEach((element) => {
      element.filtered = 'all'
    })

    setTodoData(newItem)
  }

  const complit = () => {
    const newItem = JSON.parse(JSON.stringify(todoData))

    newItem.forEach((el) => {
      el.filtered = 'complited'
    })

    setTodoData(newItem)
  }

  const edition = (id) => {
    const ind = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[ind]
    const newItem = JSON.parse(JSON.stringify(oldItem))
    newItem.edit = !oldItem.edit
    newItem.label = ''

    const newArray = todoData.toSpliced(ind, 1, newItem)

    setTodoData(newArray)
  }

  const activchosen = () => {
    const newItem = JSON.parse(JSON.stringify(todoData))

    newItem.forEach((element) => {
      element.filtered = 'activ'
    })

    setTodoData(newItem)
  }

  const deletComplited = () => {
    const newTod = JSON.parse(JSON.stringify(todoData))

    const newArr = newTod.filter((el) => !el.complited)

    setTodoData(newArr)
  }

  const filter = () => {
    const newTod = JSON.parse(JSON.stringify(todoData))
    let newArr
    newTod.forEach((element) => {
      if (element.filtered === 'all') {
        newArr = todoData

        return newArr
      }
      if (element.filtered === 'complited') {
        newArr = newTod.filter((el) => el.complited)

        return newArr
      }
      if (element.filtered === 'activ') {
        newArr = newTod.filter((el) => !el.complited)
        return newArr
      }
      return newArr
    })

    setNewTodo(newArr)
  }

  const chusTodo = (a, b) => {
    if (a[0].filtered === 'all') {
      return a
    }
    return b
  }

  const editItem = (id, text) => {
    const ind = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[ind]
    const newItem = JSON.parse(JSON.stringify(oldItem))
    newItem.label = text
    newItem.edit = false

    const newArray = todoData.toSpliced(ind, 1, newItem)

    setTodoData(newArray)
  }

  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec)

    const newArr = [...todoData, newItem]

    setTodoData(newArr)
  }

  const onPlay = (id) => {
    const ind = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[ind]
    const newItem = JSON.parse(JSON.stringify(oldItem))

    if (newItem.timeOnStop !== 0 && !newItem.onPlay) {
      newItem.totalTime += newItem.timeOnStop - newItem.timeOnPlay
    }
    newItem.timeOnPlay = !newItem.onPlay ? new Date().valueOf() : newItem.timeOnPlay

    newItem.onPlay = true
    newItem.onStop = false

    const newArray = todoData.toSpliced(ind, 1, newItem)

    setTodoData(newArray)
  }

  const onStop = (id) => {
    const ind = todoData.findIndex((el) => el.id === id)
    const oldItem = todoData[ind]
    const newItem = JSON.parse(JSON.stringify(oldItem))

    newItem.timeOnStop = !newItem.onStop ? new Date().valueOf() : newItem.timeOnStop

    newItem.onStop = true
    newItem.onPlay = false

    const newArray = todoData.toSpliced(ind, 1, newItem)

    setTodoData(newArray)
  }

  function calculateTime() {
    const newTod = JSON.parse(JSON.stringify(todoData))

    const newArray = newTod.map((index) => {
      const item = { ...index }

      let diff

      if (item.onPlay) {
        diff = item.timeOnPlay + item.delta - currentDate - item.totalTime
      }
      if (item.onStop) {
        diff = item.timeOnPlay + item.delta - item.timeOnStop - item.totalTime
      }
      diff = diff > 0 ? diff : 0
      const minuta = Math.floor(diff / 1000 / 60) % 60
      const secunda = Math.floor(diff / 1000) % 60

      item.newMinut = minuta < 10 ? `0${minuta}` : minuta
      item.newSec = secunda < 10 ? `0${secunda}` : secunda

      return item
    })

    setTodoData(newArray)
  }

  useEffect(() => {
    calculateTime()
  })

  const todos = chusTodo(todoData, newTodo)

  const todoComplited = todoData.filter((el) => el.complited).length
  const activ = todoData.length - todoComplited
  return (
    <section className="todoapp">
      <NewTaskForm todos={todoData} addItem={addItem} />

      <section className="main">
        <TaskList
          currentDate={currentDate}
          todos={todos}
          onDelete={onDelete}
          onToggleComplited={onToggleComplited}
          edition={edition}
          editItem={editItem}
          onChecked={onChecked}
          onStop={onStop}
          onPlay={onPlay}
        />

        <Footer
          todoComplited={todoComplited}
          activ={activ}
          filter={filter}
          allchosen={allchosen}
          todos={todoData}
          complit={complit}
          activchosen={activchosen}
          deletComplited={deletComplited}
        />
      </section>
    </section>
  )
}
const el = <App />

const container = document.getElementById('root')
const root = createRoot(container)
root.render(el)
