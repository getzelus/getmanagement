import React from 'react';

import {Grid, Card, Typography as Ty } from '@material-ui/core';

export default function Info(props) {
    return (
        <Grid container justifyContent='center'>
        <Grid item xs={11} lg={8} >
        <Card sx={{padding: 4}}>
            <Ty variant='h6' sx={{marginBottom: 2}}>Welcome on Get Management</Ty>
            <Ty>This is a solution for businesses or individuals who want to manage their datas.</Ty>
            <Ty>In the menu section Models, you can create your own model and design it with your input fields.</Ty>
            <Ty>Then you will see in the menu that a new type (with the name of your model) of things has appeared. </Ty>
            <Ty>You can browse them with a data table grid, delete, look details and update it. </Ty>
            <Ty sx={{marginTop: 2, fontWeight: 600}} >Next to come : </Ty>
            <Ty>New types of input : boolean, color, select, dependancy.  </Ty>
            <Ty>Treasury with expense and benefit linked to some fields.  </Ty>
            <Ty>Agenda with colored zones. </Ty>
            <Ty>Controlled access for different types of user. </Ty>

        </Card>
        </Grid>
        </Grid>
    );  
}