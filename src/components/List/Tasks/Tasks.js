import React from 'react';
import penSvg from '../../../assets/img/pen.svg'

import axios from 'axios'
import { Link } from 'react-router-dom'

import AddTaskForm from './addTaskForm'

import './Tasks.scss'
import TasksItem from './TasksItem';

const Tasks = ({ list, onEditTitle, onAddTask, withoutEmpty, onRemoveTask, onEditTask, onCompleteTask }) => {

    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name);
        if (newTitle) {
            onEditTitle(list.id, newTitle);
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            }).catch(() => {
                alert('не удалось обновить название списка')
            })
        }
    }

    return (
        <div className="tasks">
            <Link to={`/lists/${list.id}`}>
                <h2 style={{ color: list.color.hex }} className="tasks__title">
                    {list.name}
                    <img className="tasks__title-img" onClick={editTitle} src={penSvg} alt="pen svg" />
                </h2>
            </Link>

            <div className="tasks__items">
                {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутсвуют!</h2>}
                {list.tasks && list.tasks.map(task => (
                    <TasksItem key={task.id} list={list} {...task} onRemoveTask={onRemoveTask} onEdit={onEditTask} onComplete={onCompleteTask} />
                ))}
                <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
            </div>
        </div>
    )
}



export default Tasks