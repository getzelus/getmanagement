import React from 'react'
import store from './store/store';
import { BrowserRouter as Router} from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './utils/theme';



import Layout from './base/Layout';
import Loading from './base/Loading';
import Alert from './base/Alert';


function App() {

  const initModels = store(state => state.initModels);
  const ready = store(state => state.ready);

  React.useEffect(() => {
    initModels();
    console.log('app use effect');
  }, [initModels]);

  return (
      <>
      { ready && 
        <Router>
          <ThemeProvider theme={theme}>
            <Layout />

            <Loading />
            <Alert/>
          </ThemeProvider>
        </Router>
     }  
  </>);
}

export default App;

