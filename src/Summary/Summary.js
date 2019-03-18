import React, {Component} from 'react';
import './Summary.css';
import { Link } from 'react-router-dom';
// Alternative to passing the moderl as the component property, 
// we can import the model instance directly
//import {modelInstance} from '../data/DinnerModel';


class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "EMPTY"
    }
  }

  componentDidMount = () => {
    let currentMenu = this.props.model.getMenu();
    console.log(currentMenu.length)
    if(currentMenu.length !== 0){
      this.setState({
        status: "FILLED",
        dishes: this.props.model.getMenu()
      })
    } 
    

  }

  render() {
    let dishesList = null;
    let totMenuPrice = this.props.model.getTotMenuPrice();
    
    switch (this.state.status) {
      case 'EMPTY':
        dishesList = "Your menu is empty"
        break;
      case 'FILLED':
        dishesList = this.state.dishes.map((dish) =>
        
        <div className="DishSummary d-flex flex-row ml-2 border border-dark align-items-center">
          <div className="DishBox d-flex flex-column align-items-center p-2">
            <img className="DishImage" src={dish.image} alt="..." height="50"></img>
            <p>
              {dish.title}
            </p>
            <br/>
            <p>
              {this.props.model.getTotIngredPrice(dish)} USD
            </p>
          </div>
        </div>
        ) 
        break;
      default:
        dishesList = <b>Failed to load data, please try again</b>
        break;
    }

    return (
      <div className="Dishes d-flex w-100 flex-column align-items-center">
        <div className="d-flex flex-row w-100 flex-wrap justify-content-center">
          {dishesList}
        </div>
        <div className="d-flex mt-2 justify-content-center">
          Total Price: {totMenuPrice} USD
        </div>

        <Link to="/search">
          <button className="BackButton d-flex btn btn-warning mt-2 justify-content-center">
            Go Back
          </button>
        </Link>
        <Link to="/Print">
          <button className="PrintButton d-flex btn btn-warning justify-content-center mt-2">
            Go to Print
          </button>
        </Link>
      </div>
    );
  }
}

export default Summary;
