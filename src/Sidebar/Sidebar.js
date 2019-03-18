import React, { Component } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
class Sidebar extends Component {

  constructor(props) {
    super(props)
    
    // we put on state the properties we want to use and modify in the component
    this.state = {
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getMenu()
    }
  }

  // this methods is called by React lifecycle when the 
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    this.props.model.addObserver(this)
  }
  

  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      menu: this.props.model.getMenu()
    })
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = (e) => {
    this.props.model.setNumberOfGuests(+e.target.value)
  }

  render() {
    let printMenu = null;
    let totMenuPrice = this.props.model.getTotMenuPrice();

    printMenu = this.state.menu.map((dish) =>
      
      <div className="d-flex flex-column">
        <div className="d-flex flex-row">
          <p className="mr-auto">
            {dish.title}
          </p>
          <p>
            {this.props.model.getTotIngredPrice(dish)}
          </p>
        </div>
      </div>

      )

    return (
      <div className="Sidebar d-flex">
        <div id="sideBar-main" className="d-flex col-md-4 col-lg-3">
          <div className="bootstrap-vertical-nav border border-dark">
            <button className="btn btn-warning hidden-md-up m-2" type="button" data-toggle="collapse" data-target="#collapseWrapper" aria-expanded="false" aria-controls="collapseExample">
              <span className="">Menu</span>
            </button>
            <div className="" id="collapseWrapper">
              <div className="nav flex-column" id="exCollapsingNavbar3">
                <div id="people" className="d-flex flex-row">
                  <p>
                    People: <input value={this.state.numberOfGuests} onChange={this.onNumberOfGuestsChanged}/>
                    <br/>
                    Total number of guests: {this.state.numberOfGuests}
                  </p>
                </div>
                <div id="infoBar" className="d-flex flex-row bg-secondary border-top border-bottom border-dark">
                  <p className="mr-auto m-2">
                    Dish Name
                  </p>
                  <p className="m-2">
                    Cost
                  </p>
                </div>
                <div id="sideMenu" className="d-flex flex-column">
                  {printMenu}
                  {/* HÄR LÄGGER VI TILL SAKER I MENYN i SIDEBAREN */}
                  
                </div>
                <div id="sekText" className="d-flex justify-content-end m-2 align-content-center">
                  {totMenuPrice}
                </div>
                <div className="d-flex justify-content-center m-2 flex-column">
                  <Link to={"/summary"}>
                    <button id="confirmDinnerBtn" className="btn btn-warning">Confirm Dinner</button>
                  </Link>
                  <button id="confirmDinnerBtn" onClick={() => {this.props.model.clearLocalStorage()}} className="btn btn-warning mt-2 ">Clear Menu</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
