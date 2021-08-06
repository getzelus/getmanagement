import React from 'react';
import store from '../store/store';

import {Button} from '@material-ui/core';
import * as Icon from '@material-ui/icons';

export default function Test(props) {

    const formRef= React.useRef();

    // pas de bug quand on récupère un élément qui n'existe pas 
    const test = store(state => state.test);
    console.log(test);
    
    const onChangeForm = () => {
        formRef.current.elements['title'].value = 'hey';
    }

    const displayForm = () => {

        return <>
            <form ref={formRef}>
                <input type='text' name='title' />
            </form>
        </>;
    }
    
    return (
        <div>
      
            {displayForm()}
            <div>
                <Icon.Delete />
             <Button variant="contained">Hello World</Button>
                <button onClick={onChangeForm}>change form</button>
            </div>
       
        </div>
    );
}