// import Web3 from 'web3';
// import TokenSaleContractBuild from 'contracts/TokenSale.json';

// let selectedAccount; 
// let TokenSaleContract;

// export const init = async () => {
//     let provider = window.ethereum;
//     if(typeof provider !== 'undefined'){
//       provider.request({method:'eth_requestAccounts'})
//       .then((accounts)=>{
//         selectedAccount = accounts[0];
//         // console.log(`Selected account is ${selectedAccount}`);
//       })
//       .catch((error)=>{
//         console.log(error);
//       })
//       window.ethereum.on('accountChanged',function(accounts){
//         selectedAccount = accounts[0];
//         console.log(accounts);
//       })
//     }

//     const web3 = new Web3(provider);

//     const networkId = await web3.eth.net.getId();
//     console.log(networkId)
//     const TokenSaleContract = await new web3.eth.Contract(
//         TokenSaleContractBuild.abi,
//         TokenSaleContractBuild.networks[networkId].address
//     );
//     return selectedAccount;
// }

// export const buyTokens = () => {

// }