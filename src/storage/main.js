import { createStore } from 'vuex'

const store = createStore({
  state: {
    baseCurrency : ["AED",0],
    actions:[
      
    ],
    orgnActions:[
      
    ],
    currencies : [
        {id:"AED",value:1.0},
        {id:"AFN",value:0.8},
        {id:"ALL",value:0.1},
        {id:"AMD",value:0.2},
        {id:"ANG",value:0.12},
        {id:"AOA",value:1.2},
        {id:"ARS",value:-1.1},
        {id:"AUD",value:1.6},
        {id:"AWG",value:1.08},
        {id:"AZN",value:-0.6},
        {id:"BAM",value:0.5},
        {id:"BBD",value:-0.38},
        {id:"BDT",value:0.16},
        {id:"BGN",value:0.15},
        {id:"BHD",value:0.124},
        {id:"BIF",value:-1.113},
        {id:"BMD",value:1.3472},
        {id:"BND",value:-0.2156},
        {id:"BOB",value:-0.9},
    ]
  },
  getters:{
    getBaseCurrency(state){
        return state.baseCurrency
    },
    getCurrenciesValueAsList(state){
        return state.currencies.map(curr => curr.value);
    },
    getCurrenciesIdAsList(state){
      return state.currencies.map(curr => curr.id);
    },
    getActions(state){
      return state.actions
    },
    
  },
  
  mutations:{
    getSelectedCurrencies(state,currencyFilteredName){
        for (let i in state.currencies) {
            if(state.currencies[i].id == currencyFilteredName){
                for (let j in state.currencies) { 
                  if(state.currencies[j].id == state.baseCurrency[0]){ //Ana para biriminin katsayısını alıyoruz
                    state.baseCurrency[1] =  state.baseCurrency[1] /= state.currencies[j].value //Ana para biriminin katsayısını baseCurrency[1]'den çıkarıyoruz        
                  }
                }
                state.baseCurrency[0] = state.currencies[i].id //Yeni para birimini tanımlıyoruz
                state.baseCurrency[1] *= state.currencies[i].value //Yeni parabiriminin katsayısını BaseCurrency[1]'e ekliyoruz
            }
        } 
        
    },
    addNewBalanceToBaseCurrency(state,payload){
      let currency;
      for (let i in state.currencies) {
        if(state.currencies[i].id == payload.currency){
            currency = state.currencies[i].value
        }
      }
      currency *= payload.amount;

      for (let j in state.currencies) { 
        if(state.currencies[j].id == state.baseCurrency[0]){ //Ana para biriminin katsayısını alıyoruz
          currency /= state.currencies[j].value 
        }
      }

      if(payload.type == "Income"){
        state.baseCurrency[1] += currency
      } else if(payload.type == "Expense"){
        state.baseCurrency[1] -= currency
      }
    },
    addNewAction(state,action){
      state.actions.push(action)
    },
    getFilteredCurrencyName(state,payload){
      state.actions = [...state.actions.filter(item => item.currency === payload)];
    },
    getFilteredCurrencyType(state,payload){
      state.actions = [...state.actions.filter(item => item.type === payload)];
    },
    setOriginalActions(state,payload){
      state.actions = [...payload]
      
    },
    setOriginalActionsToOrgnActions(state,payload){
      state.orgnActions = [...payload]
    },
    deleteActionByID(state,payload){
      state.actions = state.actions.filter(action => action.id !== payload);
    },
    editActionByID(state,payload){
      state.actions = state.actions.map(action => {
        if (action.id === payload.id) { // BIF id'li öğeyi bul
          return {...payload} // "value" özelliğini güncelle ve yeniden oluştur
        }
        return action; // güncelleme yapmayan diğer öğeleri aynen bırak
      });
    }
  }
})

export {store}