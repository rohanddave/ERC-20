import './App.css';
import Main from './Main';
// import { useEffect,useState} from 'react';
// import Web3 from 'web3';
// import TokenSaleContractBuild from 'contracts/TokenSale.json';
// import TokenContractBuild from 'contracts/Token.json';

function App() {
  // // eslint-disable-next-line
  // const providerUrl = process.env.PROVIDER_URL || "http://localhost:8545";
  // const [Account,setAccount] = useState();
  // const [TokenSaleContract,setTokenSaleCountract] = useState();
  // const [TokenContract, setTokenContract] = useState();

  // const init = async () => {
  //   let provider = window.ethereum;
  //   if(typeof provider !== 'undefined'){
  //     provider.request({method:'eth_requestAccounts'})
  //     .then((accounts)=>{
  //       setAccount(accounts[0]);
  //     })
  //     .catch((error)=>{
  //       console.log(error);
  //     })
  //     provider.on('accountsChanged',function(accounts){
  //       setAccount(accounts[0]);
  //     })
  //   }

  //   const web3 = new Web3(provider);

  //   const networkId = await web3.eth.net.getId();
  //   const tokensalecontract = await new web3.eth.Contract(
  //       TokenSaleContractBuild.abi,
  //       TokenSaleContractBuild.networks[networkId].address
  //   );
  //   const tokencontract = await new web3.eth.Contract(
  //     TokenContractBuild.abi,
  //     TokenContractBuild.networks[networkId].address
  //   );
  //   setTokenSaleCountract(tokensalecontract);
  //   setTokenContract(tokencontract);
  // }//init function 

  // useEffect(()=>{
  //   init();
  // }, []);

  // const getTokenDetails = () => {
  //   console.log(Account);
  //   console.log(TokenSaleContract);
  //   console.log(TokenContract);
  // }
  // getTokenDetails()

  return (
    <Main/>
    // <div className="App">
    //   <div className="d-flex justify-content-center align-items-center flex-column p-4 m-2"> 
    //     <h1 className="p-2">CC TOKEN ICO SALE</h1>
    //     <p>Introducing ! Token Price is $TOKEN_PRICE eth. You currently have $BALANCE_OF_ACCOUNT Token</p>
    //     <div className="container">
    //       <form>
    //         <div className="input-group mb-3 w-100">
    //           <input type="number" className="form-control" placeholder="Number Of CC Tokens" aria-label="Recipient's username" aria-describedby="button-addon2"></input>
    //           <button className="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
    //         </div>
    //         <div className="progress">
    //           <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
    //         </div>
    //       </form>
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
