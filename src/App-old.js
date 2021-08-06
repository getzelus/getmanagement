import React from 'react'
import store from './store/store';

import Things from './pages/Things';
import Models from './pages/Models';
import Fields from './pages/Fields';
import Menu from './pages/Menu';


function App() {

  const initModels = store(state => state.initModels);
  const ready = store(state => state.ready);
  const models = store(state => state.models);


  React.useEffect(() => {
    initModels();
    console.log('app use effect');
  }, [initModels]);

  const displayAllThings = () => {
    let res = models.map((e) => {
       return <Things key={e.id} model={e.title} />;
    });
    return res;
  }

  //console.log(ready);

  return (
    <div className='app'>
    { ready && 
    <>
      <Menu />
      <Fields />
      <Models />
      {displayAllThings()}

   
     </>
    }   

  </div> );
}

export default App;

