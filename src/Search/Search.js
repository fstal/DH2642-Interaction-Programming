import React, {Component} from 'react';
import './Search.css';


class Search extends Component {
  constructor(props){
    super(props)
      this.state = {
      }
  }

  static defaultProps = {
    types:  [ 
              ["Any", ""],
              ["Main Course", "main course"],
              ["Side Dish", "side dish"],
              ["Dessert", "desert"],
              ["Appetizer", "appetizer"],
              ["Salad", "salad"],
              ["Bread", "bread"],
              ["Breakfast", "breakfast"],
              ["Soup", "soup"],
              ["Beverage", "beverage"],
              ["Sauce", "sauce"],
              ["Drink", "drink"]
            ]
  }


  shouldComponentUpdate() { 
    return false; // Will cause component to never re-render.
  }

  catchSearch() { 
    console.log(this.refs.dishName.value + ", " + this.refs.dishType.value)
    this.props.model.setSearchQuery(this.refs.dishName.value, this.refs.dishType.value)

  }

  render() {
    let dishTypeOptions = this.props.types.map(type => {
      return <option key={type[1]} value={type[1]}> {type[0]} </option>  
    });
    return (
      <div id="top" className="d-flex border border-dark p-4 flex-column">
        <p id="topText" className="d-flex">
          FIND A DISH
        </p>
        <form>
          <div id="inputBoxes" className="d-flex flex-row flex-wrap">
            <label className="pt-1 mr-1"> Dish Name </label>
            <input type ="text" className="mr-2" ref="dishName" />
            <label className="mr-1 pt-1"> Dish Type </label>
            <select ref="dishType" className="mr-2">
              {dishTypeOptions}
            </select>
            <div id="buttonsForSearch" className="d-flex">
              <input type="button" value="Search" className="btn btn-warning mr-2" onClick={this.catchSearch.bind(this)}/>
              <button id="resetBtn" className="btn btn-warning">Reset</button>
            </div>
          </div>
        </form>
      </div>
    ) 
    
  }
}

export default Search;
