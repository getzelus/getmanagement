import React from 'react';
import {useParams } from "react-router-dom";
import store from '../store/store';

import {Grid, Typography as Ty, Box, TextField, Fab, Card, FormControl, InputLabel, Select, MenuItem, IconButton } from '@material-ui/core';
import {TableContainer, Table, TableHead, TableCell, TableBody, TableRow} from '@material-ui/core';
import * as Icon from '@material-ui/icons';


export default function Model(props) {
  
    let { modelId } = useParams();
    const formRef = React.useRef();
    const [typeSelect, setTypeSelect] = React.useState('');

    let model = store(state => state.models.find(e => e.id === modelId));
    let updateModel = store(state => state.updateModel);

    console.log(model);

    const onChangeType = (e) => {
        //console.log(e.target.value);
        setTypeSelect(e.target.value);
    }

    const onCreateField = (e) => {
        e.preventDefault();
       
        let body = {};
        for ( var i = 0; i < formRef.current.elements.length; i++ ) {
            var f = formRef.current.elements[i];
            if (f.name === 'type' || f.name === 'label') body[f.name] = f.value;
        }
        if (model.fields.some( e => e.label === body.label)) return;
   
        let newModel = {...model};
        newModel.fields.push(body);
        updateModel(newModel); 
        formRef.current.reset();    
    }

    const onDeleteField = (o) => {
        let newModel = {...model};
        newModel.fields = newModel.fields.filter( e => e.label !== o.label );
        updateModel(newModel);
    }

    const displayForm = () => {
        return (
            <form ref={formRef} onSubmit={onCreateField}>
                <TextField id="inputTitle" label="New field label" name='label' variant="outlined" required sx={{marginRight: 1}} />
                <Fab type='submit' size="medium" aria-label="add" name='submit'>
                    <Icon.Add />
                </Fab> 
                <Box sx={{ maxWidth: 120 }} mt={1} >
                    <FormControl fullWidth>
                        <InputLabel id="selectlabel">Type</InputLabel>
                        <Select labelId="selectlabel" id="simpleselect" label="Type" name='type' value={typeSelect} onChange={onChangeType} required>
                            <MenuItem value={'text'}>Text</MenuItem>
                            <MenuItem value={'number'}>Number</MenuItem>
                            <MenuItem value={'date'}>Date</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </form>
        );
    }


    const displayModel = () => {
        return (
        <TableContainer>
         <Table  aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell >Label</TableCell>
                <TableCell >Type</TableCell>
            </TableRow>
         </TableHead>
        <TableBody>
          {model.fields.map((f) => (
            <TableRow
              key={f.label}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >{f.label} </TableCell>
              <TableCell >{f.type}</TableCell>
              <TableCell >
                <IconButton onClick={() => onDeleteField(f)}><Icon.Clear /></IconButton>
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
            <Ty variant='h4'>{model.title}</Ty>

            <Box mt={4} >
                {displayForm()}
            </Box>

            <Box mt={2} ml={8} >
                {displayModel()}
            </Box>

        </Card>
        </Grid>
        </Grid>

    );
}