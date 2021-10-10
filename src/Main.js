import React, { Component } from 'react'
import Web3 from 'web3';
import TokenSaleContractBuild from 'contracts/TokenSale.json';
import TokenContractBuild from 'contracts/Token.json';

export class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TokenSaleContract: {},
            TokenContract: {},
            Account: ''
        }
    }
    async componentDidMount() {
        let provider = window.ethereum;
        let selectedAccount;
        if (typeof provider !== 'undefined') {
            provider.request({ method: 'eth_requestAccounts' })
                .then((accounts) => {
                    selectedAccount = accounts[0];
                })
                .catch((error) => {
                    console.log(error);
                })
            provider.on('accountsChanged', function (accounts) {
                selectedAccount = accounts[0];
            })
        }

        const web3 = new Web3(provider);

        const networkId = await web3.eth.net.getId();
        const tokensalecontract = await new web3.eth.Contract(
            TokenSaleContractBuild.abi,
            TokenSaleContractBuild.networks[networkId].address
        );
        const tokencontract = await new web3.eth.Contract(
            TokenContractBuild.abi,
            TokenContractBuild.networks[networkId].address
        );
        this.setState({Account: selectedAccount,TokenSaleContract: tokensalecontract, TokenContract: tokencontract});
        const tokenPrice = await this.state.TokenSaleContract.methods.tokenPrice.call();
        console.log(tokenPrice);
    }
    render() {
        return (
            <div className="App">
                <div className="d-flex justify-content-center align-items-center flex-column p-4 m-2">
                    <h1 className="p-2">CC TOKEN ICO SALE</h1>
                    <p>Introducing $TOKEN_NAME! Token Price is $TOKEN_PRICE eth. You currently have $BALANCE_OF_ACCOUNT Token(s)</p>
                    <div className="container">
                        <form>
                            <div className="input-group mb-3 w-100">
                                <input type="number" className="form-control" placeholder="Number Of CC Tokens" aria-label="Recipient's username" aria-describedby="button-addon2"></input>
                                <button className="btn btn-outline-secondary" type="button" id="button-addon2">Buy Tokens</button>
                            </div>
                            <div className="progress">
                                <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div className="d-flex justify-content-center align-items-center flex-column">
                                <p>$NUMBER_OF_TOKENS_SOLD/$TOTAL_TOKENS_FOR_SALE tokens</p>
                                <p>Your account: {this.state.Account}</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main
