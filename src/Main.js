import React, { Component } from 'react'
import Web3 from 'web3';
import TokenSaleContractBuild from './TokenSale.json';
import TokenContractBuild from './Token.json';

export class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TokenSaleContract: {},
            TokenContract: {},
            AccountDetails: {
                address: '',
                balance: 0
            },
            TokenDetails: {
                name: '',
                symbol: '',
                decimals: 0,
                price: 0,
                sold: 0,
                forSale: 0 //actually is remaining tokens 
            },
            requiredTokens: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.state.TokenSaleContract.methods.buyTokens(this.state.requiredTokens).send({ from: this.state.AccountDetails.address, value: this.state.requiredTokens * this.state.TokenDetails.price }).then(() => {
            window.location.reload();
        });
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
            provider.on('accountsChanged', async function (accounts) {
                this.setState(
                    {
                        AccountDetails: {
                            address: accounts[0],
                            balance: await tokencontract.methods.balanceOf(accounts[0]).call()
                        }
                    });
            }.bind(this));

            const web3 = new Web3(provider);
            const networkId = await web3.eth.net.getId();
            const tokensalecontract = new web3.eth.Contract(
                TokenSaleContractBuild.abi,
                TokenSaleContractBuild.networks[networkId].address
            );
            const tokencontract = new web3.eth.Contract(
                TokenContractBuild.abi,
                TokenContractBuild.networks[networkId].address
            );
            this.setState(
                {
                    AccountDetails: {
                        address: selectedAccount,
                        balance: await tokencontract.methods.balanceOf(selectedAccount).call()
                    },
                    TokenSaleContract: tokensalecontract,
                    TokenContract: tokencontract,
                    TokenDetails: {
                        name: await tokencontract.methods.name().call(),
                        symbol: await tokencontract.methods.symbol().call(),
                        decimals: await tokencontract.methods.decimals().call(),
                        price: await tokensalecontract.methods.tokenPrice().call(),
                        sold: await tokensalecontract.methods.tokensSold().call(),
                        forSale: await tokencontract.methods.balanceOf(tokensalecontract._address).call()
                    }
                });
        }
    }

    render() {
        const { name, symbol, decimals, price, sold, forSale } = this.state.TokenDetails;
        const priceInETH = 0.000000001 * price;
        const { address, balance } = this.state.AccountDetails;
        const requiredTokens = this.state.requiredTokens;
        const prog = parseInt((parseInt(sold) / (parseInt(forSale) + parseInt(sold))) * 100);
        return (
            <div className="App">
                <div className="d-flex justify-content-center align-items-center flex-column p-4 m-2">
                    <div className="container d-flex justify-content-center align-items-center flex-column">
                        <h1 className="p-2">{name} Initial Coin Offering Sale</h1>
                        <div className="container border-bottom primary mb-3"></div>
                        <p>Introducing <b>{name}<i> ({symbol})</i></b>! Token Price is <b>{priceInETH} eth</b>. You currently have <b>{balance} Token(s)</b></p>
                    </div>
                    <div className="container">
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-group mb-3 w-100">
                                <input type="number" className="form-control" placeholder={`Number Of ${name}`} aria-label="Recipient's username" aria-describedby="button-addon2" value={this.state.requiredTokens} onChange={(e) => this.setState({ requiredTokens: e.target.value })}></input>
                                <button className="btn btn-outline-primary" type="submit" id="button-addon2">Buy Tokens</button>
                            </div>
                            <div className="progress">
                                <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow={`${prog}`} aria-valuemin="0" aria-valuemax="100" style={{ width: `${prog}%` }}></div>
                            </div>
                            <div className="d-flex justify-content-center align-items-center flex-column">
                                <h5>{sold}/{parseInt(forSale) + parseInt(sold)} tokens sold</h5>
                                <div className="container border-bottom primary mb-3"></div>
                                <p><i>Your account:</i> <b>{address}</b></p>
                                <p><i>Your Cost:</i><b><i>{requiredTokens !== 0 ? priceInETH * requiredTokens : ''}</i> eth</b> / <b><i>{requiredTokens !== 0 ? priceInETH * requiredTokens : ''}</i> gwei</b></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main