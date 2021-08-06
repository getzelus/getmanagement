import React from 'react';
import store from '../store/store';
import {useParams } from "react-router-dom";

import MyTable from './MyTable';

export default function Things(props) {
  
    const modelName = useParams().modelName;
    const things = store(state => state[modelName]);
    const readThings = store(state => state.readThings);
    const deleteThing = store(state => state.deleteThing);
    const model = store(state => state.models.find(e => e.title === modelName));

    //console.log(things);

    React.useEffect(() => {
        if (things.length > 0) return;
        readThings(modelName);
        console.log('Things use effect');
      }, [things.length, readThings, modelName]);


    const onDeleteThing = (arrayId) => {
       arrayId.forEach( id => {
           let thingFound =  things.find(t => t.id === id);
            if (thingFound)  deleteThing(thingFound);
       });
    }


    return (
      
            <MyTable 
                title={modelName + 's'} 
                model={model} things={things} 
                onDelete={onDeleteThing} 
            />
    );
}