import React, {Component} from 'react';
import './Print.css';
import { Link } from 'react-router-dom';


class Print extends Component {
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
    
    
    switch (this.state.status) {
      case 'EMPTY':
        dishesList = "Your menu is empty"
        break;
      case 'FILLED':
        dishesList = this.state.dishes.map((dish) =>
        
        <div className="DishSummary d-flex flex-row ml-2 border border-dark">
          <div id="dishImage" className="d-flex">
            <img className="DishImage" src={dish.image} alt="..."></img>
          </div>
          <div className="d-flex flex-column ml-4">
            <h3>
              {dish.title}
            </h3>
            <p>
              {dish.instructions}
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
        <div className="d-flex flex-column w-100">
          {dishesList}
        </div>
        <Link to="/search">
          <button className="BackButton d-flex btn btn-warning justify-content-center ">
            Go Back
          </button>
        </Link>
      </div>
    );
  }
}

export default Print;
