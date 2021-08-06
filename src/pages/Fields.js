import React from 'react';
//import store from '../store/store';
import req from '../utils/req';

export default function Fields(props) {


    const onCreateField = () => {
        let newField = {
            model: '60f4bef5a16b2706c8e4eeab',
            type: 'text',
            title: 'brand',
            order: 1
        };

        req.post('field', newField)
        .then(data => console.log(data));
    }

    

    return (
        <div>
            <h2>Fields  </h2>

            <button onClick={onCreateField}>create field</button>

       
        </div>
    );
}