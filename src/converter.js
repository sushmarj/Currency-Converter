import React from "react";
import axios from "axios";
import "./converter.css";
class Converter extends React.Component {
  constructor(props) {
    super();
    this.state = {
      result: null,
      fromCurrency: "Select",
      toCurrency: "Select",
      amount: 0,
      currencies: []
    };
  }
  componentDidMount() {
    axios
      .get("https://api.frankfurter.app/latest")
      .then(response => {
        const currencyAr = ["Select"];
        for (const key in response.data.rates) {
          currencyAr.push(key);
        }
        this.setState({ currencies: currencyAr });
      })
      .catch(err => {
        console.log("oppps", err);
      });
  }
  convertHandler = () => {
    if (this.state.fromCurrency !== this.state.toCurrency) {
      axios
        .get(
          `https://api.frankfurter.app/latest?amount=10&from=${
            this.state.fromCurrency
          }&to=${this.state.toCurrency}`
        )
        .then(response => {
          const result =
            (this.state.amount * response.data.rates[this.state.toCurrency])* 0.1;
            
          this.setState({ result: result.toFixed(2) });
        })
        .catch(error => {
          console.log("Opps", error.message);
        });
    } else {
      this.setState({ result: "You cant convert the same currency!" });
    }
  };
  selectHandler = event => {
    if (event.target.name === "from") {
      this.setState({ fromCurrency: event.target.value });
    } else {
      if (event.target.name === "to") {
        this.setState({ toCurrency: event.target.value });
      }
    }
  };
  render() {
    return (
      <div className="Converter">
        <h2>Currency Converter</h2>
        <div className='center'>
        <h2>Input Amount</h2>
    
          <input
            name="amount"
            type="text"
            value={this.state.amount}
            onChange={event => this.setState({ amount: event.target.value })}
          />
          <select
            name="from"
            onChange={event => this.selectHandler(event)}
            value={this.state.fromCurrency}
          >
            {this.state.currencies.map(cur => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
          
          </div>
          <br/>
          <button  onClick={this.convertHandler}>Convert</button>
          <br/><br/>

          <div className='center'>

          <h2> Output Amount </h2>
          <input
            name="amount"
            type="text"
            value={this.state.result}
            onChange={event => this.setState({ result: event.target.value })}
          />
          <select
            name="to"
            onChange={event => this.selectHandler(event)}
            value={this.state.toCurrency}
          >
            {this.state.currencies.map(cur => (
              <option key={cur}>{cur}</option>
            ))}
          </select>
          </div>
        <br/>
      </div>
    );
  }
}
export default Converter;