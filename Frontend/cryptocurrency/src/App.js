import React, { Component } from 'react';

export default class App extends Component {
    state = {
        price: "",
        lastUpdated: "",
        high24: "",
        low24: "",
    }

    statusBTC = e =>{
        fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=INR')
        .then(a => a.json())
        .then(result => {
            console.log(result.DISPLAY.BTC.INR)
            this.setState({
                price: result.DISPLAY.BTC.INR.PRICE,
                lastUpdated: result.DISPLAY.BTC.INR.LASTUPDATE,
                high24: result.DISPLAY.BTC.INR.HIGH24HOUR,
                low24: result.DISPLAY.BTC.INR.LOW24HOUR
            });
        });
    };

    statusETH = e =>{
        fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=INR')
        .then(a => a.json())
        .then(result => {
            console.log(result.DISPLAY.ETH.INR)
            this.setState({
                price: result.DISPLAY.ETH.INR.PRICE,
                lastUpdated: result.DISPLAY.ETH.INR.LASTUPDATE,
                high24: result.DISPLAY.ETH.INR.HIGH24HOUR,
                low24: result.DISPLAY.ETH.INR.LOW24HOUR
            });
        });
    };

    statusETC = e =>{
        fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETC&tsyms=INR')
        .then(a => a.json())
        .then(result => {
            console.log(result.DISPLAY.ETC.INR)
            this.setState({
                price: result.DISPLAY.ETC.INR.PRICE,
                lastUpdated: result.DISPLAY.ETC.INR.LASTUPDATE,
                high24: result.DISPLAY.ETC.INR.HIGH24HOUR,
                low24: result.DISPLAY.ETC.INR.LOW24HOUR
            });
        });
    };

    statusEOS = e =>{
        fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=EOS&tsyms=INR')
        .then(a => a.json())
        .then(result => {
            console.log(result.DISPLAY.EOS.INR)
            this.setState({
                price: result.DISPLAY.EOS.INR.PRICE,
                lastUpdated: result.DISPLAY.EOS.INR.LASTUPDATE,
                high24: result.DISPLAY.EOS.INR.HIGH24HOUR,
                low24: result.DISPLAY.EOS.INR.LOW24HOUR
            });
        });
    };

    statusBCH = e =>{
        fetch('https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BCH&tsyms=INR')
        .then(a => a.json())
        .then(result => {
            console.log(result.DISPLAY.BCH.INR)
            this.setState({
                price: result.DISPLAY.BCH.INR.PRICE,
                lastUpdated: result.DISPLAY.BCH.INR.LASTUPDATE,
                high24: result.DISPLAY.BCH.INR.HIGH24HOUR,
                low24: result.DISPLAY.BCH.INR.LOW24HOUR
            });
        });
    };

  render() {
    return (
      <div className="container">
          <nav className="navbar navbar-default" id="colorful-nav">
       <div >
           
           <div className="collapse navbar-collapse" id="myNavbar">
               <ul className="nav navbar-nav">
                   <li className="home"><a href="#"><span className="glyphicon glyphicon-home"></span><h5>HOME</h5></a></li>
                   <li className="about"><a href="#"><span className="glyphicon glyphicon-user"></span><h5>ABOUT US</h5></a></li>
                   <li ><a href="#"><span className="glyphicon glyphicon-stats"></span><h5>COINS</h5></a></li>
                   <li ><a href="#"><span className="glyphicon glyphicon-list-alt"></span><h5>NAME</h5></a></li>
                   <li ><a href="#"><span className="glyphicon glyphicon-info-sign"></span><h5>MY WALLET</h5></a></li>
               </ul>
           </div>
       </div>
   </nav>
   <div id="test" > 
       <h1 className="text-primary"> Top 5 </h1>
       <div styles="display: inline-block;width:25px;">
       <ul>
           <li><div><h4>BITCOIN</h4></div><div><button type="button" className="btn btn-success">BUY NOW</button>                <button type="button" className="btn btn-link" onClick={()=>this.statusBTC()}>STATUS</button> </div></li> 
           <li><div><h4>ETHEREUM</h4></div><div><button type="button" className="btn btn-success">BUY NOW</button>               <button type="button" className="btn btn-link" onClick={()=>this.statusETH()}>STATUS</button> </div></li>
           <li><div><h4>EOS</h4></div><div><button type="button" className="btn btn-success">BUY NOW</button>                    <button type="button" className="btn btn-link" onClick={()=>this.statusEOS()}>STATUS</button> </div></li>
           <li><div><h4>ETHEREUM CLASSIC</h4></div><div><button type="button" className="btn btn-success">BUY NOW</button>       <button type="button" className="btn btn-link" onClick={()=>this.statusETC()}>STATUS</button> </div></li>
           <li><div><h4>BITCOIN CASH</h4></div><div><button type="button" className="btn btn-success">BUY NOW</button>           <button type="button" className="btn btn-link" onClick={()=>this.statusBCH()}>STATUS</button> </div></li>
       </ul>
     </div>
     <div styles="display: inline-block;vertical-align:top;width:25px ">
            <ul>
                <li>{this.state.price}</li>
                <li>{this.state.lastUpdated}</li>
                <li>{this.state.high24}</li>
                <li>{this.state.low24}</li>
            </ul>
         </div>
    </div>
     </div>
    );
   
  }
}
