import React from 'react';
import store from '../store/store';
import { Link} from "react-router-dom";

import {Grid, Box, Fab, TextField, List, ListItem, ListItemButton, ListItemText, IconButton, Divider, Card } from '@material-ui/core';
import * as Icon from '@material-ui/icons';

import Fade from '@material-ui/core/Fade';
import Confirm from '../base/Confirm';

export default function Models(props) {
  
    const models = store(state => state.models);
    const createModel = store(state => state.createModel);
    const deleteModel = store(state => state.deleteModel);

    const formRef = React.createRef();

    const [itemDeleted, setItemDeleted] = React.useState();

    const [confirmDeleteOpen, setConfirmDeleteOpen] = React.useState(false);
    const [confirmDeleteObject, setConfirmDeleteObject] = React.useState();


    const onCreateModel = (e) => {
        e.preventDefault();

        let title = formRef.current.title.value;
        let newModel = {title};
         createModel(newModel);
         formRef.current.title.value = '';
    }

    const onDeleteModel = (o) => {     
        setConfirmDeleteOpen(true);
        setConfirmDeleteObject(o);
    }


    const handleClose = () => {
        setConfirmDeleteOpen(false);
    }
    
    const handleConfirm = () => {
        setConfirmDeleteOpen(false);
        setItemDeleted(confirmDeleteObject);
    }

    const animFinished = () => {
        deleteModel(itemDeleted);
        setItemDeleted();
        setConfirmDeleteObject();
    }


    const displayModels = () => {
        return (
            <List sx={{ bgcolor: 'background.paper' }}>
           {models.map((o, i) => {
                return ( <React.Fragment key={o.id}>
                    <Fade in={itemDeleted && itemDeleted.id === o.id ? false : true } timeout={500} onExited={animFinished} >
                    <ListItem   
                        secondaryAction={
                            <IconButton onClick={() => onDeleteModel(o)}>
                                <Icon.Clear />
                            </IconButton>
                        }
                    >
                        <ListItemButton component={Link} to={'/model/' + o.id}>
                            <ListItemText primary={o.title} />
                        
                        </ListItemButton>
                  
                    </ListItem>
                    </Fade>
                    { i+1 !== models.length && <Divider  /> }
                
                    </React.Fragment>
                );
            })}
            </List>
        );
    }
    
    return (
        <Grid container justifyContent='center'>
        <Grid item xs={10} lg={4} align='center'>
            <Confirm handleConfirm={handleConfirm} handleClose={handleClose} open={confirmDeleteOpen} text='You confirm to delete this model ?' />
            
            <Card sx={{padding: 2}}>

            <Box>
                <form ref={formRef} onSubmit={onCreateModel}>
                    <TextField id="modelTitle" label="New model" name='title' variant="outlined" required sx={{marginRight: 1}} />
                    <Fab type='submit' size="medium" aria-label="add" >
                        <Icon.Add />
                    </Fab>
                </form>
            </Box>
               
        
            <Box mt={4}>
                {displayModels()}
            </Box>

            </Card >
         </Grid>
        </Grid>
    );
}