import './Calculator.css'
import './Display.css'
import React from 'react'
import {numberOfOperatorTest} from './Regex.jsx'
import {beforeEqual} from './beforeEqual'

const Display = (props) => {
  return (
    <div className="display-grid">
      <p id="input">{props.input}</p>
      <div id="display">{props.output}</div>
    </div>
  )
}

class Calculator extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      input:  0,
      output: 0,
      numberArr: [],
      operatorArr: [],
      operator: '',
      operatorSet: 0,
      result: 0,
      noPush: false,
      negativeResult: false,
    }
    
    this.handleInput = this.handleInput.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleResult = this.handleResult.bind(this);
  }
  
  handleClear(){
    this.setState({
      input:  0,
      output: 0,
      numberArr: [],
      operatorArr: [],
      operator: '',
      operatorSet: 0,
      result: 0,
      noPush: false,
      negativeResult: false,
    })
  }
  
  handleInput(e){
    if (this.state.input == 0){
      this.setState({
        input:  e.target.value, 
        output:  e.target.value, 
      })
    }
    else if (/\./g.test(this.state.output) === true && e.target.value === '.'){
      if (this.state.input.endsWith('.')){
        this.setState({
          input: this.state.input + 0,
          output: this.state.output + 0,
        })
      }
      else {
        this.setState({
          input: this.state.input,
          output: this.state.output,
        })
      }
    }
    
  else {
    if (this.state.input.includes('=') === true || this.state.input.includes('You Can\'t do that 😡') === true){
      this.state.input =  '';
      this.state.output = '';
    }
    let currentOutputValue = this.state.output + e.target.value
    if (/\.0{2,}/g.test(currentOutputValue) === true) {
      // The input (5.00) should be displayed as (5.0) and at the same time I should be able to enter numbers like (5.05).
      if (currentOutputValue.endsWith(0) === true){
          this.state.input = this.state.input.slice(0,-1)
          this.state.output =  this.state.output.slice(0,-1) 
      }
    } 
    else {
      this.setState({
       input:  this.state.input + e.target.value,
       output:  this.state.output + e.target.value,
      })
    }
  }
 }

handleOperator(operator){
 
  if (this.state.input.includes('=') === true){
    this.state.input = this.state.result;
    this.state.noPush = true;
  }

    switch(operator.target.value){
      case '+':
      this.state.operatorArr.push('+')
      break;
      case '-':
      this.state.operatorArr.push('-')
      break;
      case '*':
      this.state.operatorArr.push('*')
      break;
      case '/':
      this.state.operatorArr.push('/')
      break;
  }

  let input = this.state.input + ' ' + operator.target.value + ' ';
 
  if(numberOfOperatorTest.test(input) === true){
    console.error('TRUE ?')
    
    console.log(this.state.operatorArr)
     for (let i = 0; i < this.state.operatorArr.length; i++){
       this.state.operatorArr.splice(this.state.operatorArr.length - 2 , 1)
     }
    
  }

    //When entering the (-) operator after an operator (+*/-) the output will be empty and this IF statement will trigger to change the overall result at the end by Making the result negative.
    if (this.state.output === ''){
      this.state.negativeResult = true;
    }

    else if (this.state.noPush === false){
      this.state.numberArr.push(Number(this.state.output))
    }
    

    this.setState({
      input:  this.state.input + ' ' + operator.target.value + ' ',
      output: '',
      operator: operator.target.value,
    })
    this.state.noPush = false;
  }
      handleResult(){
        if (this.state.input == 0 || this.state.operator === '' || this.state.operatorArr === [] || this.state.numberArr === [] || this.state.input.includes('=') == true) {
          return (
            this.setState({
              input:  0,
              output: 0,
              numberArr: [],
              operatorArr: [],
              operator: '',
              operatorSet: 0,
              result: 0,
              noPush: false,
              negativeResult: false,
            })
            )
        }

        // This variable is used in the IF statement below to check if theres is an equal sign (=) immediately after an operator (=-*/)
        let checkInput = this.state.input + '='

        this.state.numberArr.push(Number(this.state.output))
        let length = this.state.operatorArr.length;
        for (let i = 0; i < length; i++){
          if (this.state.operatorArr[0] === '+'){
            this.state.result = this.state.numberArr[0] + this.state.numberArr[1]
          }
          else if (this.state.operatorArr[0] === '-'){
            //Checking if there is (-) Sign in the last operation to negate the result.
            if (this.state.negativeResult === true){
              this.state.result = -this.state.numberArr[0];
            }
            else {
              this.state.result = this.state.numberArr[0] - this.state.numberArr[1]
            }
            this.state.negativeResult = false;
          }
          else if (this.state.operatorArr[0] === '*'){
           this.state.result = this.state.numberArr[0] * this.state.numberArr[1]

          }
          else if (this.state.operatorArr[0] === '/'){
            this.state.result = this.state.numberArr[0] / this.state.numberArr[1]
          }

          console.log(this.state.result , this.state.operatorArr, this.state.numberArr)
          this.state.numberArr.shift()
          this.state.numberArr.shift()
          this.state.operatorArr.shift()
          this.state.numberArr.unshift(this.state.result)  
        }
        
        this.setState({
          output: this.state.result,
          input: this.state.input + ' ' + '=' + ' ' + this.state.result,
        })
        // This IF statement is to check if there is an equal sign (=) immediately after an operator sign (+-/*)
        if(beforeEqual.test(checkInput) === true){
          this.setState({
            input:  0,
            output: 0,
            numberArr: [],
            operatorArr: [],
            operator: '',
            operatorSet: 0,
            result: 0,
            noPush: false,
            negativeResult: false,
          })
          this.state.input = 0;
        }
      }


  render() {
    return (
      <div>
        <div className="calculator-grid">
          <Display input = {this.state.input} output = {this.state.output} />
          
          <button id="equals" onClick={this.handleResult} value={"="}>
            =
          </button>

          <button id="zero" onClick={this.handleInput} value={0}>
            0
          </button>
          <button id="one" onClick={this.handleInput} value={1}>
            1
          </button>
          <button id="two" onClick={this.handleInput} value={2}>
            2
          </button>
          <button id="three" onClick={this.handleInput} value={3}>
            3
          </button>
          <button id="four" onClick={this.handleInput} value={4}>
            4
          </button>
          <button id="five" onClick={this.handleInput} value={5}>
            5
          </button>
          <button id="six" onClick={this.handleInput} value={6}>
            6
          </button>
          <button id="seven" onClick={this.handleInput} value={7}>
            7
          </button>
          <button id="eight" onClick={this.handleInput} value={8}>
            8
          </button>
          <button id="nine" onClick={this.handleInput} value={9}>
            9
          </button>
          <button id="decimal" onClick={this.handleInput} value={"."}>
            .
          </button>

          <button id="add" onClick={this.handleOperator} value={"+"}>
            +
          </button>
          <button id="subtract" onClick={this.handleOperator} value={"-"}>
            -
          </button>
          <button id="divide" onClick={this.handleOperator} value={"/"}>
            /
          </button>
          <button id="multiply" onClick={this.handleOperator} value={"*"}>
            *
          </button>

          <button id="clear" onClick={this.handleClear}>
            AC
          </button>
        </div>
      </div>
    );
  }
}

export {Calculator}