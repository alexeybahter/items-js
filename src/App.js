import React, {useState} from 'react';
import {
  CssBaseline,
  AppBar,
  Grid,
  Toolbar,
  Paper,
  Typography,
  CircularProgress
} from '@material-ui/core';

import {addItem, deleteItem} from "./store/items/actions";
import { useAsync } from "./api/axios";
import { getPosts } from './api/items';
import {Copyright, Alert} from "./ui";
import {Form} from "./components/Form";
import {Item} from "./components/Item";

import {useStyles} from './styles';

function App() {
  const [alert, setAlert] = useState({open: false, type: '', message: ''});
  const { pending: isLoading, value: items } = useAsync(getPosts, true);
  const classes = useStyles();

  return (
    <>
      <div className={classes.app}>
        <CssBaseline/>
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Test
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Create Item
            </Typography>
            <Form addItem={addItem} showAlert={(alert) => setAlert( {...alert, open: true})}/>
          </Paper>
        </main>
        <Typography component="h1" variant="h4" align="center">
          Items
        </Typography>
        <Grid className={classes.items} container spacing={2} direction="row"
              justify="flex-start">
          {isLoading &&
            (<CircularProgress className={classes.center}/>)
          }
          {items && items.map((item, index) => (
            <Item
              key={index}
              index={index}
              item={item}
              deleteItem={deleteItem}
            />
          ))}
        </Grid>
          {items && !items.length && (
              <Typography className={classes.noItems} component="h4" variant="h6" align="center">
                No items.
              </Typography>
          )}
        <Alert alert={alert} setAlert={setAlert}/>
      </div>
      <Copyright/>
    </>
  );
}

export default App;
