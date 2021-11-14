import React from 'react'
import classNames from 'classnames'
import Badge from './Badge/Badge'

import axios from 'axios'

import closeSvg from '../../assets/img/close.svg'

import './Badge/Badge'


const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {

    const removeList = (item) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then((response) => {
                onRemove(item.id)
            })

        }
    }

    return (
        <ul onClick={onClick} className="list">
            {items.map((item, index) => (
                <li onClick={onClickItem ? () => onClickItem(item) : null} key={index} className={classNames(item.className, { active: item.active ? item.active : activeItem && activeItem.id === item.id})}>
                    <i>
                        {item.icon ? (item.icon) : <Badge color={item.color.name} />}
                    </i>
                    <span>
                    {item.name}
                    {item.tasks && `(${item.tasks.length})`}
                    </span>
                    {isRemovable && <img onClick={() => removeList(item)} className='list__close-icon' src={closeSvg} alt="Close icon" />}
                </li>
            ))}
        </ul>
    )
}

export default List;