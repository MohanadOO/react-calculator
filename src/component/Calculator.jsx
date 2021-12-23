import './Calculator.css'
import React from 'react'

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
    })
  }
  
  handleInput(e){
    if (this.state.output === 0){
      this.setState({
         input:  e.target.value, 
         output:  e.target.value, 
      })
    }

  else {
    if (this.state.input.includes('=') === true){
      this.state.input =  '';
      this.state.output = '';
    }

   this.setState({
     input:  this.state.input + e.target.value,
     output:  this.state.output + e.target.value,
   })
  }
}
  
    handleOperator(operator){
      this.state.result = Number(this.state.output)
      if (this.state.input.includes('=') === true){
        this.state.input = this.state.result;
      }

      switch(operator.target.value){
        case '+':
          // this.state.result =+ Number(this.state.output)
          this.state.numberArr.push(this.state.result)
          this.state.operatorArr.push('+')
          console.log(this.state.numberArr, this.state.operatorArr)
        
        this.setState({
          input:  this.state.input + ' ' + operator.target.value + ' ',
          output: '',
          operator: operator.target.value,
        })
        break;
        
        case '-':
        // this.state.result =- Number(this.state.output);
        this.state.numberArr.push(this.state.result)
        this.state.operatorArr.push('-')

        this.setState({
          input:  this.state.input + ' ' + operator.target.value + ' ',
          output: '',
          operator: operator.target.value,
        })

        break;
        
        case '*':
          if (this.state.result === 0){
            this.state.result = 1;
          }
        // this.state.result *= Number(this.state.output);
        this.state.numberArr.push(this.state.result)
        this.state.operatorArr.push('*')

        this.setState({
          input:  this.state.input + ' ' + operator.target.value + ' ',
          output: '',
          operator: operator.target.value,
        })
        break;
        
        case '/':
          if (this.state.result === 0){
            this.state.result = 1;
          }
        // this.state.result /= Number(this.state.output);
        this.state.numberArr.push(this.state.result)
        this.state.operatorArr.push('/')

        this.setState({
          input:  this.state.input + ' ' + operator.target.value + ' ',
          output: '',
          operator: operator.target.value,
        })
        break;
    }
      
  }
      handleResult(){
        this.state.numberArr.push(Number(this.state.output))
        this.state.operatorArr.push(this.state.operator)
        console.log(this.state.numberArr, this.state.operatorArr)

        for (let i = 0; i < this.state.numberArr.length; i++){
          if (this.state.operatorArr[i + 1] == '+'){
            this.state.result += Number(this.state.numberArr[i]);
            console.log(this.state.result)
          }
          else if (this.state.operatorArr[i + 1] == '-'){
            this.state.result -= Number(this.state.numberArr[i]);
            console.log(this.state.result)
          }
          else if (this.state.operatorArr[i + 1] == '*'){
           this.state.result *= Number(this.state.numberArr[i])
            console.log(this.state.result)
          }
          else if (this.state.operatorArr[i + 1] == '/'){
            this.state.result /= Number(this.state.numberArr[i]);
            console.log(this.state.result)
          }
        }
        
        console.log(this.state.input.includes('='))
        if (this.state.input.includes('=') === true){
          this.setState({
            result: this.state.result,
            output: this.state.result,
            input: this.state.input + ' ' + '=' + ' ' + this.state.result
          })
        }

        else {
        this.setState({
          result: this.state.result,
          output: this.state.result,
          input: this.state.input + ' ' + '=' + ' ' + this.state.result
        })
        }

        }
  
  render(){
    return (
      <div>
        <div className = 'calculator-grid'>
          
        <div id = 'display'>
          <p className = "input">{this.state.input}</p>
          <p className = "output">{this.state.output}</p>
        </div>
     
        <button id = 'equals' onClick = {this.handleResult} value ={'='}>=</button>
        
        <button id = 'zero' onClick = {this.handleInput} value ={0}>0</button>
        <button id = 'one' onClick = {this.handleInput} value ={1}>1</button>
        <button id = 'two' onClick = {this.handleInput} value ={2}>2</button>
        <button id = 'three' onClick = {this.handleInput} value ={3}>3</button>
        <button id = 'four' onClick = {this.handleInput} value = {4} >4</button>
        <button id = 'five' onClick = {this.handleInput} value ={5}>5</button>
        <button id = 'six' onClick = {this.handleInput} value ={6}>6</button>
        <button id = 'seven' onClick = {this.handleInput} value ={7}>7</button>
        <button id = 'eight' onClick = {this.handleInput} value ={8}>8</button>
        <button id = 'nine' onClick = {this.handleInput} value ={9}>9</button>
        <button id = 'decimal' onClick = {this.handleInput} value ={'.'}>.</button>
        
        <button id = 'add' onClick = {this.handleOperator} value ={'+'}>+</button>
        <button id = 'subtract' onClick = {this.handleOperator} value ={'-'}>-</button>
        <button id = 'divide' onClick = {this.handleOperator} value = {"/"}>/</button>
        <button id = 'multiply' onClick = {this.handleOperator} value = {'*'}>*</button>
        
        <button id = 'clear' onClick = {this.handleClear}>AC</button>
        </div>
     </div>
    )
  }
}

  export default Calculator