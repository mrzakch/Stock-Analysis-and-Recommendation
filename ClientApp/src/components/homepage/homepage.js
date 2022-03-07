﻿import React, {Component} from "react";
import {Button, Card, CardTitle, Input, Alert, Table} from "reactstrap";
import "./homepage.css";


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tickerInput: "",
            retrievedStock: "None",
            price: 0,
            high: 0,
            low: 0,
            watchlistStocks: [
                //{ticker: "IBM", price: 0.00, high: 0.00},
                {ticker:"None", price:0, high:0},
                {ticker:"None", price:0, high:0},
                {ticker:"None", price:0, high:0}
            ]
        };
    }


    tickerInput(e) {
        this.setState({
            tickerInput: e.target.value,
        })
    }

    async tickerButton() {
        const input = this.state.tickerInput
        const requestOptions = {
            method: 'GET'
        }
        let response = await fetch(`api/dailystocks/getByTicker?ticker=${input}`, requestOptions)
        if (response.status===200) {
            response = await response.json();
            response= await JSON.parse(response);
            const oldSearch={ticker: input, price: parseFloat(response[response.length-1].fields.close,2), high: parseFloat(response[response.length-1].fields.high,2)};
            let oldWatchlist=this.state.watchlistStocks;
            oldWatchlist.splice(0,0,oldSearch);
            oldWatchlist.splice(3,1);
            console.log(response[response.length-1]);
            this.setState({
                retrievedStock: input,
                watchlistStocks: oldWatchlist,
            })
        }
    }

    render() {
        return (
            <div className="outerContainer2">
                <div className="innerContainer2">
                    <div className="loginContainer2">
                        <Card color={`secondary`} inverse className="loginCard2 innerContainerItem2">
                            <CardTitle>
                                <b>Enter stock ticker</b>
                                <Input className="firstone" placeholder={``} onChange={this.tickerInput.bind(this)}
                                       value={this.state.tickerInput}> </Input>
                                <button className="tickerbutton" onClick={this.tickerButton.bind(this)}>Enter</button>
                                
                               
                            </CardTitle>
                        </Card>
                        <Card color={`secondary`} inverse className="loginCard2 innerContainerItem2">
                            <CardTitle>
                                <b>Stock Market Management</b>

                                {/* <div className="card-body d-flex flex-wrap">
                                    <h2 className="card-title p-2">Stock ticker: <p><b>{this.state.retrievedStock}</b></p>
                                    </h2>
                                </div>
   
                                <ul className="lists">
                                    <li className="listitems"><strong>Current share price: </strong> <span
                                        className="text-black">{this.state.price}</span></li>
                                    <li className="listitems"><strong>52 week high: </strong> <span
                                        className="text-black">{this.state.high}</span></li>
                                    <li className="listitems"><strong>52 week low: </strong> <span
                                        className="text-black">{this.state.low}</span></li>
                                </ul> */}


                            </CardTitle>
                            
                            <Table className="text-light"
>
  <thead>
    <tr>
      <th>
        #
      </th>
      <th>
        Stock Ticker
      </th>
      <th>
        Price
      </th>
      <th>
        Weekly High
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">
        1
      </th>
      <td>
      {this.state.watchlistStocks[0].ticker}
      </td>
      <td>
      {this.state.watchlistStocks[0].price}
      </td>
      <td>
      {this.state.watchlistStocks[0].high}
      </td>
    </tr>
    <tr>
      <th scope="row">
        2
      </th>
      <td>
      {this.state.watchlistStocks[1].ticker}
      </td>
      <td>
      {this.state.watchlistStocks[1].price}
      </td>
      <td>
      {this.state.watchlistStocks[1].high}
      </td>
    </tr>
    <tr>
      <th scope="row">
        3
      </th>
      <td>
      {this.state.watchlistStocks[2].ticker}
      </td>
      <td>
      {this.state.watchlistStocks[2].price}
      </td>
      <td>
      {this.state.watchlistStocks[2].high}
      </td>
    </tr>
  </tbody>
</Table>
                        </Card>
                        
                    </div>
                    <Card color={`secondary`} inverse className="newcard">Insert chart here
                    <img className="img1" src="https://media.ycharts.com/charts/c511f80ec356858029d034295d969d3d.png" title="Title of image" alt="alt text here"/>

                    </Card>
                </div>
            </div>


        );


    }

}