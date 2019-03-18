import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Welcome from './Welcome/Welcome';
import { modelInstance } from './data/DinnerModel';
import SelectDish from "./SelectDish/SelectDish";
import DishDetails from "./DishDetails/DishDetails";
import Summary from "./Summary/Summary"
import Print from "./Print/Print"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: 'Dinner Planner',
    }

  }

  componentDidMount() {
    modelInstance.getLocalStorage();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="jumbotron w-100">
            <h1 className="App-title">{this.state.title}</h1>
          </div>
          {/* We rended diffrent component based on the path */}
          <Route exact path="/welcome" component={Welcome}/>
          <div className="d-flex flex-row w-100 flex-wrap">
            <Route path='/search' render={() => <SelectDish model={modelInstance}/>}/>
              <Route path="/details" render={() => <DishDetails model={modelInstance}/>}/>
          </div>
          <Route path='/summary' render={() => <Summary model={modelInstance}/>}/>
          <Route path='/print' render={() => <Print model={modelInstance}/>}/>
        </header>
      </div>
    );
  }
}


export default App;
