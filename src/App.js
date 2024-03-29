import React from 'react';
import './App.css';
import SettingsCounter from './SettingsCounter';
import Counter from './Counter';


class App extends React.Component {

  componentDidMount() {
    this.restorestate()
  };

  btns = { reset: "reset", inc: "inc", set: "set" }
  state = {
    maxValue: 0,
    minValue: 0,
    counter: "Enter value and press 'Set'",
    isButtonInc: false,
    numberNewColor: false,
    errorMax: false,
    errorMin: false,
    isButtonSet: true,
    isButtonReset: false
  };
  //при клике на set значение выбранного мин значения перебрасывается на screen

  onSet = () => {
    let newMinValue = this.state.minValue
    this.setState({
      counter: newMinValue, isButtonInc: false, isButtonReset: false, isButtonSet: true
    }, () => {this.saveState()} )
  };

  //при достижении макс знач-я кнопка inc блокируется
  onInc = () => {
    this.setState({ counter: ++this.state.counter }, () => {
      if (this.state.counter === this.state.maxValue) {
        this.setState({ isButtonInc: true, numberNewColor: true }, () => {this.saveState()})
      }
    })
  };

  //сбрасывает при достижении макс значения 
  onReset = () => {
    this.setState({ counter: this.state.minValue, isButtonInc: false, numberNewColor: false }, () => {this.saveState()})
  };

  //событие с мин и макс значениями
  onMinValue = (e) => {
    this.setState({
      minValue: Number(e.target.value)
    }, () => {this.saveState()});

  };
  onMaxValue = (e) => {
    this.setState({
      maxValue: Number(e.target.value)
    }, () => {this.saveState()});
  };

  //меняется значение сетчика, в том числе при некорректном вводе. Так же блокируются кновки inc,reset
  onClickCounterValue = () => {
     this.setState({
      counter: "Enter value and press 'Set'", errorMax: false, errorMin: false, isButtonSet: false, isButtonInc: true, isButtonReset: true
    }, () => {this.saveState()});
    if (this.state.maxValue <= -1) {
      this.setState({
        counter: "Incorrect Value!", errorMax: true, errorMin: false, isButtonSet: true
      }, () => {this.saveState()});
    };
    if (this.state.minValue <= -1) {
      this.setState({
        counter: "Incorrect Value!", errorMin: true, errorMax: false, isButtonSet: true
      }, () => {this.saveState()});
    };
    if (this.state.minValue >= this.state.maxValue) {
      this.setState({
        counter: "Incorrect Value!", errorMax: true, errorMin: true, isButtonSet: true
      }, () => {this.saveState()});
    }
  };

saveState=() => {
  let stateAsString=JSON.stringify(this.state);
  localStorage.setItem('my-state',stateAsString)

};
restorestate=() => {
  let state=this.state
  let stateAsString=localStorage.getItem('my-state');
  if(stateAsString != null)
{  state=JSON.parse(stateAsString)
}
  this.setState(state)
};

  render = () => {
    return (
      <div className="App">
        <SettingsCounter set={this.btns.set}
          onSet={this.onSet}
          minValue={this.state.minValue}
          onMinValue={this.onMinValue}
          maxValue={this.state.maxValue}
          onMaxValue={this.onMaxValue}
          onClickCounterValue={this.onClickCounterValue}
          errorMax={this.state.errorMax}
          errorMin={this.state.errorMin}
          emptyValue={this.emptyValue}
          isButtonSet={this.state.isButtonSet}
        />
        <Counter counter={this.state.counter}
          reset={this.btns.reset}
          inc={this.btns.inc}
          onInc={this.onInc}
          onReset={this.onReset}
          isButtonInc={this.state.isButtonInc}
          numberNewColor={this.state.numberNewColor}
          errorMax={this.state.errorMax}
          errorMin={this.state.errorMin}
          isButtonReset={this.state.isButtonReset}
        />
      </div>
    );
  }
}
export default App;

