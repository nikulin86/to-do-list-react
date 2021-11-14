import React, { useState } from 'react'
import axios from 'axios'

import plusSvg from '../../../assets/img/plus.svg'


import './Tasks.scss'

const AddTaskForm = ({ list, onAddTask }) => {

    const [visibleForm, setFormVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [isLoading, setIsLoading] = useState('')

    const toggleFormVisible = () => {
        setFormVisible(!visibleForm)
        setInputValue('')
    }

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        }
        if(!inputValue) {
            alert('Введите название задачи');
            return;
        }
        setIsLoading(true)
        axios.post('http://localhost:3001/tasks/', obj).then(({ data }) => {
            onAddTask(list.id, data)
            toggleFormVisible()
        }).catch(() => {
            alert('Ошибка при добавлении задачи')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <div>
            <div className="tasks__form">
                {!visibleForm ? <div onClick={toggleFormVisible} className="tasks__form-new">
                    <img className="tasks__form-img" src={plusSvg} alt="plus" />
                    <span>Новая задача</span>
                </div> :
                    <div className="tasks__form-block">
                        <input value={inputValue} onChange={e => setInputValue(e.target.value)} className="field" type="text" placeholder="Текст задачи" />
                        <div className="button">
                            <button disabled={isLoading} onClick={addTask} className="btn">{isLoading ? 'Добавление..' : 'Добавить задачу'}</button>
                            <button onClick={toggleFormVisible} className="btn btn--grey">Отмена</button>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default AddTaskForm