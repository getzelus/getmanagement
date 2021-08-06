import React from 'react';
import store from '../store/store';
import {useParams, useHistory } from "react-router-dom";

import {Grid, Box, TextField, Button, Card, IconButton } from '@material-ui/core';
import {TableContainer, Table, TableHead, TableCell, TableBody, TableRow} from '@material-ui/core';
import * as Icon from '@material-ui/icons';

import {formatDate} from '../utils/globalFunctions';

export default function Thing(props) {


    const history = useHistory();
    const thingId = useParams().thingId;
    const modelName = useParams().modelName;

    const formRef = React.useRef();
  
    const model = store(state => state.models.find(e => e.title === modelName));
    const createThing = store(state => state.createThing);
    const updateThing = store(state => state.updateThing);
    const readThings = store(state => state.readThings);
  

    let thing;
    if (thingId !== 'new') {
        thing = store(state => state[modelName].find(e => e.id === thingId));
    }

    const [action, setAction] = React.useState();
    const [updatedThing, setUpdatedThing] = React.useState();

    React.useEffect(() => {
       
        if (thingId === 'new') {
            setAction('create');
        }else{
            setAction('show');
            if (!thing) readThings(modelName);
             // use function store readone thing if not here
             // this function will read all
        } 
    }, [thingId, thing, modelName, readThings]);

    const onSubmitCreate = (e) => {
        e.preventDefault();
        let body = {};
        for ( var i = 0; i < formRef.current.elements.length-1; i++ ) {
            let f = formRef.current.elements[i];
             body[f.name] = f.value;
        }
        body.type = modelName;
        //console.log(body);
        createThing(body);
        history.goBack();
    }

    /*
     au lieu d'utiliser state, onChange et value={} sur les fields,
     on aurait pu utiliser formRef.current.elements[label].value
     j'aurai pu aussi mettre la valeur de old thing dans placeholder 
     */


    const onUpdate = (e) => {
        e.preventDefault();
        updateThing(updatedThing);
        setAction('show');
    }

    const onChangeField = (e) => {
        setUpdatedThing( state => ({...state, [e.target.name] : e.target.value}) );
      //  setDataAction( prevState  => ( { ...prevState,   description : data.description })); 
        
      /*
      let newThing = {...updatedThing};
        newThing[e.target.name] = e.target.value;
        setUpdatedThing(newThing);
        */
    }

    const goUpdate = () => {
        setAction('update')
        let copiedThing = {...thing};
        setUpdatedThing(copiedThing);
    }

    const cancelUpdate = () => {
        setAction('show');
    }


    const displayThingCreate = () => {
        let fields = model.fields.map( e => 
            <Box key={e.label} mb={2}>
                <TextField type={e.type} placeholder={e.label} name={e.label} variant='outlined'/>
            </Box>
        );

        let res = <form ref={formRef} onSubmit={onSubmitCreate}>
           <Box mb={2}> <TextField type='text' name='title' placeholder='title' /></Box>
            {fields}
            <Button type='submit' name='button' variant='contained'>Create</Button>
        </form>;

        return res;
    }


    const displayThingShow = () => {

        if (!thing) return 'loading';
        
        return (            
                 <TableContainer>
                 <Table  aria-label="simple table">
                 <TableHead>
                <TableRow>
                    <TableCell >Label</TableCell>
                    <TableCell >Value
                        <IconButton onClick={goUpdate} size='small' sx={{marginLeft: 4}}>
                            <Icon.Edit />
                        </IconButton>
                    </TableCell>
                </TableRow>
             </TableHead>
            <TableBody>
            <TableRow>
                <TableCell component="th" scope="row" >Title </TableCell>
                <TableCell >{thing.title}</TableCell>
            </TableRow>
            {model.fields.map((e) => (
                <TableRow key={e.label}>
                <TableCell component="th" scope="row" >{e.label} </TableCell>
                <TableCell >{thing[e.label]}</TableCell>
                </TableRow>
             ))}

            <TableRow>  
                <TableCell component="th" scope="row" >Date creation </TableCell>
                <TableCell >{formatDate(thing.createdAt)}</TableCell>
            </TableRow>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>  
                <TableCell component="th" scope="row" >Date modification </TableCell>
                <TableCell >{formatDate(thing.updatedAt)}</TableCell>
            </TableRow>
            </TableBody>
             </Table>
             </TableContainer>
    
        );
   
        
    }


    const displayThingUpdate = () => {

        return (            
            <TableContainer>
            <Table  aria-label="simple table">
            <TableHead>
           <TableRow>
               <TableCell >Label</TableCell>
               <TableCell >Value
                   <IconButton onClick={onUpdate} size='small' sx={{marginLeft: 4}}>
                       <Icon.Check />
                   </IconButton>
                   <IconButton onClick={cancelUpdate} size='small' sx={{marginLeft: 2}}>
                       <Icon.Cancel />
                   </IconButton>
               </TableCell>
           </TableRow>
        </TableHead>
       <TableBody>
       <TableRow>
           <TableCell component="th" scope="row" >Title </TableCell>
           <TableCell >
               <TextField type='text' placeholder='title' name='title' value={updatedThing['title']} onChange={onChangeField} /></TableCell>
       </TableRow>
       {model.fields.map((e) => (
           <TableRow key={e.label}>
           <TableCell component="th" scope="row" >{e.label} </TableCell>
           <TableCell >
               <TextField type={e.type} variant='outlined' name={e.label} value={ updatedThing[e.label] || ''} onChange={onChangeField} />
            </TableCell>
           </TableRow>
        ))}

       </TableBody>
        </Table>
        </TableContainer>

        );
    }


    return (
         <Grid container justifyContent='center'>
        <Grid item xs={10} lg={6} align='center'>
        <Card sx={{padding: 2}}>
   
                { action === 'create' ? displayThingCreate() :
                    action === 'show' ? displayThingShow() :
                    action === 'update' ? displayThingUpdate() : null
                }
          
       </Card>
       </Grid>
       </Grid>
    );
       
}