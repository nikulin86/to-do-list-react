import React, {useState, useEffect} from 'react'
import axios from 'axios'

import List from '../Index'
import Badge from '../Badge/Badge'
import closeSvg from '../../../assets/img/close.svg'

import './AddListButton.scss'
import '../List.scss'




const AddButtonList = ({colors, onAddList}) => {
    // eslint-disable-next-line
    const [visiblePopup, setVisiblePopup] = useState(false)
    const [selectedColor, setSelectedColor] = useState(3)
    const [isLoading, setIsLoading] = useState(false)
    const [inputValue, setinputValue] = useState('')  

    useEffect(() => {
        if (Array.isArray(colors)) { 
            setSelectedColor(colors[0].id);
        }
      }, [colors]);

    const onClose = () => {
        setVisiblePopup(false);
        setinputValue('');
        setSelectedColor(colors[0].id)
    }

    const addList = () => {
        if(!inputValue) {
            alert('Введите название списка');
            return;
        }

        setIsLoading(true);
        
        axios
          .post('http://localhost:3001/lists', {
            name: inputValue,
            colorId: selectedColor
          })
          .then(({ data }) => {
            console.log(data)
            const color = colors.filter(c => c.id === selectedColor)[0];
            const listObj = { ...data, color, tasks: []};
            onAddList(listObj);
            onClose();
          })
          .catch(() => {
            alert('Ошибка при добавлении списка!');
          })
          .finally(() => {
            setIsLoading(false);
          });
    }


    return (
        <div className="add-list">
            <List
              onClick={() => setVisiblePopup(!visiblePopup)}
             items={[
              
                {
                    className: 'list__add-button',
                    icon: <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 1V11" stroke="#868686" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1 6H11" stroke="#868686" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>,
                    name: 'Добавить список'
                }
            ]}
            />
            {visiblePopup && <div className="add-list__popup">
            <img onClick={onClose} src={closeSvg} alt="close button" className="add-list__popup-close-btn" />
                <input value={inputValue} onChange={e => setinputValue(e.target.value)} className="field" type="text" placeholder="Название списка" />
                <div className="add-list__popup-colors">    
                    {colors.map(color => (<Badge className={selectedColor === color.id && 'active' } onClick={() => setSelectedColor(color.id)} key={color.id} color={color.name}/>))}
                </div>
                <button onClick={ addList} className="btn">{isLoading ? 'Добавление...' : 'Добавить'}</button>
            </div>}
        </div>
    )


}

export default AddButtonList;


