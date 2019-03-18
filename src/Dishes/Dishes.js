import React, {Component} from 'react';
import './Dishes.css';
import {modelInstance} from '../data/DinnerModel';
import { Link } from 'react-router-dom';



class Dishes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'INITIAL'
    }
  }

  componentDidMount() {
    modelInstance.addObserver(this)
    this.dishDisplay("defaultSearch");
  }

  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }

  dishDisplay(param) {
    modelInstance.getAllDishes(param).then(dishes => {
      this.setState({
        status: 'LOADED',
        dishes: dishes.results
      })
    })
    .catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }

  update() {
    this.dishDisplay("userSearch")

  }

catchBoxClick(dishId, e){
    modelInstance.setActiveDish(dishId);
}

render() {
  let dishesList = null;
  switch (this.state.status) {
    case 'INITIAL':
      dishesList = <em>Loading...</em>
      break;
    case 'LOADED':
      dishesList = this.state.dishes.map((dish) =>
      
      <div id={dish.id} key={dish.id} className='DishBox d-flex'>
        <Link to={"/details"}>
          <div className='' id={dish.id} onClick={this.catchBoxClick.bind(this, dish.id)}>
            <img src={'https://spoonacular.com/recipeImages/'+dish.id+'-240x150.jpg'} alt="..."></img>
            <div id ="boxText" className="">
              <p>
                {dish.title}
              </p>
            </div>
          </div>
        </Link>
      </div>
      )
      break;

    default:
      /*change to error */
      dishesList = <b>Failed to load data, please try again</b>
      break;
  }
    return (
      <div className="Dishes">
        <div className="d-flex flex-wrap justify-content-center">
          {dishesList}
        </div>
      </div>
    );
  }
}

export default Dishes;
