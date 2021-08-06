import React from 'react';
import { Link} from "react-router-dom";
import store from '../store/store';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Divider from '@material-ui/core/Divider';

import * as Icon from '@material-ui/icons';





export default function Menu(props) {

    const models = store(state => state.models);

    return (<>
           <ListItem button component={Link} to={'/'}>
              <ListItemIcon>
                 <Icon.Info />
              </ListItemIcon>
              <ListItemText primary={'Info'} />
          </ListItem>
          <ListItem button component={Link} to={'/models'}>
            <ListItemIcon>
           <Icon.Description />
            </ListItemIcon>
            <ListItemText primary={'Models'} />
          </ListItem>

          <Divider />

        <List>
        {models.map((m, i) => (

          <ListItem button component={Link} to={'/things/' + m.title} key={m.id}>
            <ListItemIcon>
              <Icon.InsertDriveFile/>
            </ListItemIcon>
            <ListItemText primary={m.title + 's'} />
          </ListItem>
  
        ))}
      </List>
    </>);
}