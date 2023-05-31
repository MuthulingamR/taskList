import {Component} from 'react'
import {v4} from 'uuid'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

const TabItem = props => {
  const {tabDetails, isActive, onClickTab} = props
  const {displayText, optionId} = tabDetails
  const activeTab = isActive ? 'active-tab' : ''

  return (
    <li>
      <button
        onClick={() => onClickTab(optionId)}
        className={`tab-btn ${activeTab}`}
        type="button"
      >
        {displayText}
      </button>
    </li>
  )
}

const TaskCard = props => {
  const {taskDetails} = props
  const {userInput, displayText} = taskDetails

  return (
    <li className="task-li-container">
      <p className="user-input">{userInput}</p>
      <p type="button" className="category">
        {displayText}
      </p>
    </li>
  )
}

class MyTasks extends Component {
  state = {
    userInput: '',
    activeTab: '',
    activeOptionId: tagsList[0].optionId,
    tasksList: [],
  }

  onChangeUserInput = event => {
    this.setState({userInput: event.target.value})
  }

  onChangeOption = event => {
    this.setState({activeOptionId: event.target.value})
  }

  onClickTab = optionId => {
    const {activeTab} = this.state
    if (activeTab === optionId) {
      this.setState({activeTab: ''})
    } else {
      this.setState({activeTab: optionId})
    }
  }

  submitForm = event => {
    const {userInput, activeOptionId} = this.state
    event.preventDefault()
    const optionDetails = tagsList.find(
      each => each.optionId === activeOptionId,
    )
    const newTask = {
      id: v4(),
      userInput,
      categoryId: optionDetails.optionId,
      displayText: optionDetails.displayText,
    }
    if (userInput !== '') {
      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newTask],
        userInput: '',
        activeOptionId: tagsList[0].optionId,
      }))
    }
  }

  render() {
    const {userInput, activeTab, tasksList, activeOptionId} = this.state

    let filteredTasksList
    if (activeTab !== '') {
      filteredTasksList = tasksList.filter(
        each => activeTab === each.categoryId,
      )
    } else {
      filteredTasksList = tasksList
    }

    return (
      <div className="app-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <h1 className="form-heading">Create a task!</h1>
          <label htmlFor="userInput">Task</label>
          <input
            className="input-area"
            placeholder="Enter the task here"
            value={userInput}
            onChange={this.onChangeUserInput}
            id="userInput"
          />
          <label htmlFor="tags">Tags</label>
          <select
            className="input-area"
            value={activeOptionId}
            onChange={this.onChangeOption}
          >
            {tagsList.map(eachOption => (
              <option key={eachOption.optionId} value={eachOption.optionId}>
                {eachOption.displayText}
              </option>
            ))}
          </select>
          <button type="submit" className="btn">
            Add Task
          </button>
        </form>
        <div className="task-container">
          <h1 className="task-heading">Tags</h1>
          <ul className="tab-ul-container">
            {tagsList.map(each => (
              <TabItem
                key={each.optionId}
                isActive={each.optionId === activeTab}
                tabDetails={each}
                onClickTab={this.onClickTab}
              />
            ))}
          </ul>
          <h1 className="task-heading">Tasks</h1>
          {tasksList.length > 0 ? (
            <ul className="task-container-ul">
              {filteredTasksList.map(eachTask => (
                <TaskCard key={eachTask.id} taskDetails={eachTask} />
              ))}
            </ul>
          ) : (
            <p className="no-task">No Tasks Added Yet</p>
          )}
        </div>
      </div>
    )
  }
}

export default MyTasks
