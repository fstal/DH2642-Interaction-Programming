
const httpOptions = {
 headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};

const DinnerModel = function () {

  let numberOfGuests = 0;
  let observers = [];
  let activeDish = "";
  let storedTotPrice = 0
  let searchInputObject = {
    query: "",
    type: ""
  }
  let defaultSearchObject = {
    query: "",
    type: ""
  }
  let url = ""
  let dishMenu = [];


  const setLocalStorage = function (num){
    localStorage.setItem('menu', JSON.stringify(dishMenu));
    localStorage.setItem('num', num);

    dishMenu = getLocalStorageMenu();
    numberOfGuests = getLocalStorageNum();
  }

  this.getLocalStorage = function(){
    let retrievedMenu = localStorage.getItem('menu');
    let storedMenu = JSON.parse(retrievedMenu);
    let retrievedNum = localStorage.getItem('num');
    let storedNum = JSON.parse(retrievedNum);
    if (storedMenu == null){
      dishMenu = []
    }
    else{
      dishMenu = storedMenu;
    }
    numberOfGuests = storedNum;

  }

  const getLocalStorageMenu = function(){
    let retrievedMenu = localStorage.getItem('menu');
    let storedMenu = JSON.parse(retrievedMenu);

    return storedMenu;
  }

  const getLocalStorageNum = function(){
    let retrievedNum = localStorage.getItem('num');
    let storedNum = JSON.parse(retrievedNum);

    return storedNum;
  }

  this.clearLocalStorage = function(){
    localStorage.clear();
    dishMenu = [];
    numberOfGuests = 0;
    notifyObservers();
  }

  this.setNumberOfGuests = function (num) {
    numberOfGuests = num;
    setLocalStorage(num);
    notifyObservers();
  };

  this.getNumberOfGuests = function () {
    return numberOfGuests;
  };

  this.setActiveDish = function (dishId) {
      activeDish = dishId;
      notifyObservers();
  }

  this.getActiveDish = function() {
    return activeDish;
  }

  this.addDishToMenu = function(dish) {
    let status = false;

    for(var i = 0; i < dishMenu.length; i++)
    {
      if(dishMenu[i].id === dish.id)
      {
        status = true;
      }
    }
    if (status == true) {
      notifyObservers();
    }
    else {
      dishMenu.push(dish);
      setLocalStorage(numberOfGuests);
      notifyObservers();
    }
  }

  this.getMenu = function(){
    return dishMenu;
  }

  this.setSearchQuery = function (dishNameInput, dishTypeInput) {
    searchInputObject = {
      query: dishNameInput,
      type: dishTypeInput
    }
    notifyObservers();
  }

  this.getSearchQuery = function (searchInputObj) {
    return searchInputObject
  }


  this.getTotIngredPrice = function(dish) {
    //param contains a list of igredients, where the ingredients are objects
    var totPrice = 0
    totPrice = dish.pricePerServing;
    totPrice = Math.round((10 * totPrice))/1000;
    storedTotPrice = totPrice;
    return totPrice * this.getNumberOfGuests()
  }

  this.getTotMenuPrice = function() {
    let menuPrice = 0;
  
    if(dishMenu == null){
      return menuPrice
    }
    else{
      for(var i = 0; i < dishMenu.length; i++){
      menuPrice = menuPrice + (dishMenu[i].pricePerServing * numberOfGuests)
      }
      menuPrice = Math.round((10 * menuPrice))/1000;
      return menuPrice;
    }
  }
  // API Calls


  this.getAllDishes = function(param) {

    if (param == 'defaultSearch') {
      var url = processSearchInput(defaultSearchObject)
    }
    else {
      var url = processSearchInput(searchInputObject);
    }
    
    var a = fetch(url, httpOptions).then(processResponse).catch(handleError)
    return a
  }

  this.getDishDetails = function(DishId) {
    var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + DishId + "/information";
    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }

  // API Helper methods

  const processSearchInput = function(searchInputObj) {
    var defaultURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=12"; 

    if ((searchInputObj === "defaultSearch") || (searchInputObj === undefined)) {
      return defaultURL;
    }
    if ((searchInputObj.query === "") && (searchInputObj.type === "")) {
      return defaultURL;
    }
    if (searchInputObj.query === "") {
      return defaultURL + "&type=" + searchInputObj.type;
    }
    if (searchInputObj.type === "") {
      return defaultURL + "&query=" + searchInputObj.query;
    }    
    else {
      return defaultURL + "&query=" + searchInputObj.query + "&type=" + searchInputObj.type;
    }
  }

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }
  
  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllDishes() API Error:', error.message || error)
      })
    } else {
      console.error('getAllDishes() API Error:', error.message || error)
    }
  }

  // Observer pattern

  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };
};

export const modelInstance = new DinnerModel();

