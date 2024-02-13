const saveToLocalStorage = (name) => {
    // favorites will get the current values in local storage
    // aka saves the array in favorites
    let nameArr = getLocalStorage();

    // if the name is already included in the local storages, we will not push into favorites (no repeats)
    if(!nameArr.includes(name)){
        nameArr.push(name);
    }

    // JSON.stringify insures whatever we save into local storage is a string
    localStorage.setItem("nameArr", JSON.stringify(nameArr));
};

const getLocalStorage = () => {
    // getting our values from local storage
    let localStorageData = localStorage.getItem("nameArr");

    // we check if that data is null, is so we return an empty array
    if(localStorageData == null){
        return [];
    }

    // we return an array of local storage
    return JSON.parse(localStorageData);
};

const removeFromLocalStorage = (name) => {
    // we're saving local storage data into favorites variable
    let nameArr = getLocalStorage();

    // finding the index of our parameter (name)
    let namedIndex = nameArr.indexOf(name);

    // remove the name from the array using the .splice method
    nameArr.splice(namedIndex, 1);

    // we set our new mutated favorites array inside our local storage
    localStorage.setItem("nameArr", JSON.stringify(nameArr));
};

export { saveToLocalStorage, getLocalStorage, removeFromLocalStorage };