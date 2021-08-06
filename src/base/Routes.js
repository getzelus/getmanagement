import React from 'react';
import {Switch, Route } from "react-router-dom";

import Models from '../pages/Models';
import Model from '../pages/Model';
import Things from '../pages/Things';
import Thing from '../pages/Thing';
import Info from '../pages/Info';

import TestStyle from '../tests/TestStyle';


export default function Routes(props) {

    return (
    <Switch>
        <Route exact path="/">
          <Info />
        </Route>
        <Route exact path="/models">
          <Models />
        </Route>
        <Route exact path="/model/:modelId">
          <Model />
        </Route>
        <Route exact path="/things/:modelName">
          <Things />
        </Route>
        <Route exact path="/thing/:modelName/:thingId">
          <Thing />
        </Route>
      
   
        <Route exact path="/teststyle">
          <TestStyle />
        </Route>
      </Switch>
    );
}