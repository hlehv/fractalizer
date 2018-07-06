import React, { Component } from 'react';
import './App.css';
import Fractalizer from './Fractalizer.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        red: '',
        green: '',
        blue: '',
        size: 400,
    }
    this.handleRedChange = this.handleRedChange.bind(this);
    this.handleGreenChange = this.handleGreenChange.bind(this);
    this.handleBlueChange = this.handleBlueChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
}

handleRedChange(event){
  if (!this.state.red){
    this.setState({red: event.target.value})
  }
  else{
    this.setState({red: ''})
  }
}

handleGreenChange(event){
  if (!this.state.green){
    this.setState({green: event.target.value})
  }
  else{
    this.setState({green: ''})
  }
}

handleBlueChange(event){
  if (!this.state.blue){
    this.setState({blue: event.target.value})
  }
  else{
    this.setState({blue: ''})
  }
}

handleSizeChange(event){
  this.setState({size: event.target.value});
}

  getColor() {
      if (this.state.red &&this.state.blue && this.state.green){
          return {color: 'brown'};
      }
      else if (this.state.red&&this.state.blue&&!this.state.green){
          return {color: 'purple'};
      }
      else if (!this.state.red&&this.state.blue&&this.state.green){
          return {color: '#259286'};
      }
      else if (this.state.red&&!this.state.blue&&this.state.green){
          return {color: 'brown'};
      }
      else if (this.state.red&&!this.state.blue&&!this.state.green){
          return {color: 'red'};
      }
      else if (!this.state.red&&this.state.blue&&!this.state.green){
          return {color: 'blue',};
      }
      else if(!this.state.red&&!this.state.blue&&this.state.green){
        return {color: 'green',};
      }
  }

  render() {
    return (
      <div className="App" style={this.getColor()}>
            <div className ="color-select">
                <h3> Add Color </h3> 
                <form>
                    <input type = "checkbox" name="red" value="red" onChange={this.handleRedChange}/> Red <br/>
                        {/*<Square color="red"/>*/}
                    <input type = "checkbox" name="green" value="green" onChange={this.handleGreenChange}/> Green <br/>
                    <input type = "checkbox" name="blue" value="blue" onChange={this.handleBlueChange}/> Blue <br/>
                </form>
            </div>
            <div className = "imagesize">
              <h3> Select Size </h3>
              <form>
                <input type="text" defaultValue={this.state.size} onChange={this.handleSizeChange}/>
              </form>
              <p> Note: the larger the size, the longer the fractal will take to render.<br />Size corresponds to the length of a side of the square in pixels. </p>
              <p> Click to zoom in </p>
            </div>
        <Fractalizer 
          red={this.state.red}
          green={this.state.green}
          blue={this.state.blue}
          size={this.state.size}
        />
      </div>
    );
  }
}

export default App;
