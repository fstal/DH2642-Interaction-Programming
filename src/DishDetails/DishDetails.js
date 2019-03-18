import React, { Component } from 'react';
import './DishDetails.css';
import { Link } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import {modelInstance} from '../data/DinnerModel';


class DishDetails extends Component {
  constructor(props){
    super(props)

    this.state = {
      activeDish: this.props.model.getActiveDish(),
      numberOfGuests: this.props.model.getNumberOfGuests(),
      status: 'INITIAL',
      dish: ""
    }
  }


  componentDidMount = () => {
    let dishId = "";
    dishId = this.state.activeDish;
    this.props.model.addObserver(this)
    console.log("dish id är :" + dishId);
    this.getDishInfo(dishId)
  }


  getDishInfo(DishId) {
    this.props.model.getDishDetails(DishId).then(dish => {
      this.setState({
        status: 'LOADED',
        dish: dish
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }

  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      currentDish: this.props.model.getActiveDish()
    })
  }

  catchAddDishClick(dish, e) {
    modelInstance.addDishToMenu(dish);

  }



  render() {
    let instructions = null;
    let totPrice = null;
    let ingredients = null;
    let dishObject= null;

    switch (this.state.status) {
      case 'INITIAL':
      instructions = <em> Loading...</em>

        break;
      case 'LOADED':
      dishObject = this.state.dish
      instructions = this.state.dish.instructions
      totPrice = this.props.model.getTotIngredPrice(this.state.dish)
      ingredients = this.state.dish.extendedIngredients.map( (ingredient) =>
        <tr>
            {/* Varning, vill ha th */}
            <td scope="row"> {this.state.numberOfGuests * ingredient.amount} </td>  
            <td> {ingredient.unit} </td>
            <td> {ingredient.name} </td>
        </tr>
      )

        break;
      default:
      instructions = <b> Failed to load data...</b>
        break;
    }
    return (
    <div className="d-flex flex-row flex-wrap flex-md-nowrap">
      <Sidebar model={this.props.model}/>
      <div id='dishDetails-main'>
        <div id="mealView" className="d-flex border border-dark flex-row flex-wrap flex-md-nowrap">
          <div id="mealDesc" className="d-flex border-bottom border-dark p-4 flex-column">
            <h2 id="mealName" className="d-flex">
            {this.state.dish.title}
            </h2>
            <div id="mealImg">
              <img className="mealImage" src={this.state.dish.image} alt="..."></img>
            </div>
            <div id="currMealDesc">
              {instructions}
            </div>
            <Link to="/search">
              <button id="backToSearch" className="btn btn-warning mt-2">
                Back to search
              </button>
            </Link>
          </div>
          <div id="mealIngred" className="d-flex flex-column bg-warning border border-dark w-100">
            <h5 id="amountOfPeople" className="align-self-center">    
              Ingredients for {this.state.numberOfGuests} people
            </h5>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    Amount
                  </th>
                  <th scope="col">
                    Unit
                  </th>
                  <th scope="col">
                    Ingredient
                  </th>
                </tr>
              </thead>
              <tbody id="tableBody">
              {ingredients}
              </tbody>
            </table>
            <div id="bottomRow" className="d-flex flex-row align-self-center">
              <button id="buttonAdd" onClick={this.catchAddDishClick.bind(this, dishObject)} className="btn btn-warning border border-dark mt-2">Add to menu</button>              
              <div id="sekRow" className="align-self-center ml-4">USD</div>
              <div id="totPrice" className="align-self-center ml-4">
              {totPrice}  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    );
  }
}

export default DishDetails;
