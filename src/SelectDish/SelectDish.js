import React, { Component } from 'react';
import './SelectDish.css';
import Sidebar from '../Sidebar/Sidebar';
import Dishes from '../Dishes/Dishes';
import Search from '../Search/Search';

class SelectDish extends Component {

  shouldComponentUpdate() { 
    return false; // Will cause component to never re-render.
  }
  
  componentDidMount() {
    this.props.model.getLocalStorage();
  }

  render() {


    return (
      <div className="SelectDish d-flex flex-row flex-wrap flex-md-nowrap justify-content-center">
        {/* We pass the model as property to the Sidebar component */}
        <Sidebar model={this.props.model}/>
        <div className="d-flex flex-column">
          <Search model={this.props.model}/>
          <Dishes model={this.props.model}/>
        </div>
      </div>
    );
  }
}


export default SelectDish;
        