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
            AccountDetails: {
                address: '',
                balance: 0
            },
            TokenDetails: {
                name: '',
                symbol: '',
                price: 0,
                sold: 0,
                forSale: 0
            },
            requiredTokens: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.requiredTokens);
        this.state.TokenSaleContract.methods.buyTokens(this.state.requiredTokens).send({from:this.state.AccountDetails.address,value: this.state.requiredTokens*this.state.TokenDetails.price});
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
            const tokensalecontract = await new web3.eth.Contract(
                TokenSaleContractBuild.abi,
                TokenSaleContractBuild.networks[networkId].address
            );
            const tokencontract = await new web3.eth.Contract(
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
                        price: await tokensalecontract.methods.tokenPrice().call(),
                        sold: await tokensalecontract.methods.tokensSold().call(),
                        forSale: await tokencontract.methods.balanceOf(tokensalecontract._address).call()
                    }
                });
        }
    }

    render() {
        const { name, symbol, price, sold, forSale } = this.state.TokenDetails;
        const priceInETH = 0.000000001 * price;
        const { address, balance } = this.state.AccountDetails;
        const requiredTokens = this.state.requiredTokens;
        return (
            <div className="App">
                <div className="d-flex justify-content-center align-items-center flex-column p-4 m-2">
                    <h1 className="p-2">{name} ICO SALE</h1>
                    <p>Introducing {name} ({symbol})! Token Price is {priceInETH} eth. You currently have {balance} Token(s)</p>
                    <div className="container">
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-group mb-3 w-100">
                                <input type="number" className="form-control" placeholder={`Number Of ${name}`} aria-label="Recipient's username" aria-describedby="button-addon2" value={this.state.requiredTokens} onChange={(e) => this.setState({ requiredTokens: e.target.value })}></input>
                                <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Buy Tokens</button>
                            </div>
                            <div className="progress">
                                <div className={`progress-bar w-${(sold / forSale) * 100}`} role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            <div className="d-flex justify-content-center align-items-center flex-column">
                                <p>{sold}/{forSale + sold} tokens sold</p>
                                <p>Your account: {address}</p>
                                <p>Your Cost in ETH: {requiredTokens !== 0 ? priceInETH * requiredTokens : ''}</p>
                                <p>Your Cost in GWEI: {requiredTokens !== 0 ? price * requiredTokens : ''}</p>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Main
