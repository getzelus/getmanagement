
import create from 'zustand';

import req from '../utils/req';


const store = create((set, get) => ({
   
    loading: false,
    ready: false,

    alert: null,
    setAlert: (o) => {
      set({ alert: o });  
    },

    models: [],

    initModels: async () => { 
         set({ loading: true });   
        let res = await req.get('model');
        // not copy
        set( state =>  ({ models: [...res]  }) );
        res.forEach( (v, i) => { 
          set({ [v.title] : []});
        });
        set({ ready: true });   
        set({ loading: false });  
    },
    
    createModel: async (o) => {
      let res = await req.post('model', o);
      set( state =>  ({ models: [...state.models, res]  }) );
      set({ [res.title] : []});
     // console.log( get().models);
    },
    
    updateModel : async (o) => {

      let res = await req.patch('model', o); 
      set( state =>  ({ models: [...state.models.map( e => e.id === res.id ? res : e  )]  }) );
    },
    
    deleteModel: async (o) => {
      let res = await req.deletez('model', o);
      if (res.error) { 
        console.log(res.error); 
        get().setAlert(res.error);
        return; 
      } 
      set( state =>  ({ models: [...state.models.filter(e => e.id !== res.id)]  }) );
     // set({ [res.title] : null});
    },


    readThings: async (type) => {
      let res = await req.get('thing/read/' + type);
    //  set( state =>  ({ [type]: [...state[type], ...res]  }) );
      set( state =>  ({ [type]: res }) );
    },
    createThing: async (o) => {
      let res = await req.post('thing', o);
      console.log(res);
      set( state =>  ({ [o.type]: [...state[o.type], res]  }) );
    },
    updateThing: async (o) => {
      let res = await req.patch('thing', o); 
      set( state =>  ({ [o.type]: [...state[o.type].map(e => e.id === res.id ? res : e)] }) );
    },
    deleteThing: async (o) => {
      let res = await req.deletez('thing', o);
      set( state =>  ({ [o.type]: [...state[o.type].filter(e => e.id !== res.id)]  }) );
    }

}))

export default store;


// if res.error, create alert 






/*

const store = create((set, get) => ({
    
    createThings: () => set({ things: 15 }),

    cars: {
        price: 20,
        brand: 'Ford',
        list: []
    },
    updateCars: (p) => set(state => ({ cars: {...state.cars, ...p} })),
    createCar: (type, o) => set(state => ({ cars: {...state.cars, ...state.cars[type].push(o)} })),
    
    movies: [],
    createMovie: (o) => set(state => ({ movies: [...state.movies, o] })),
    
    books: 0,  
    addBooks: (num) => set(state => ({ books: state.books + num })),
    removeBooks: () => set({ books: 0 }),
    removeThing: (type) => { get().removeBooks();}
}))

export default store;

*/


