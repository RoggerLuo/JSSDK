

export const addItem = (key, val) => {
  if(typeof val === 'object'){
    val = JSON.stringify(val);
  }
  localStorage.setItem(key, val);
};

export const getItem = (key) => {
  try{
    return JSON.parse(localStorage.getItem(key));
  }catch(err){
    return localStorage.getItem(key) || "";
  }
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};

export const clear = () => {
  localStorage.clear();
};
