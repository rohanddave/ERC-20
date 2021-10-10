var Token = artifacts.require('./Token.sol');

contract('Token' , function(accounts){
    var tokenInstance;
    // it('initializes contract with correct parameters', function(){
    //     return Token.deployed().then(function(instance){
    //         tokenInstance = instance;
    //         return tokenInstance.name();
    //     }).then(function(name){
    //         assert.equal(name, 'DApp Token', 'has the incorrect name');
    //         return tokenInstance.symbol();
    //     }).then(function(symbol){
    //         assert.equal(symbol,'DApp', 'has the incorrect symbol');
    //         return tokenInstance.standard();
    //     }).then(function(standard){
    //         assert.equal(standard, 'ERC-20' , 'has the incorrect standard');
    //         return tokenInstance.decimals();
    //     }).then(function(decimals){
    //         assert.equal(decimals.toNumber(), 18, 'has the incorrect decimals');
    //         return tokenInstance;
    //     })
    // });
    // // it('allocates the inital supply upon deployment', function(){
    // //     return Token.deployed().then(function(instance){
    // //         tokenInstance = instance;
    // //         return tokenInstance.totalSupply();
    // //     }).then(function(totalSupply){
    // //         assert.equal(totalSupply.toNumber(), 1000000, 'should set the total supply to 1000000');
    // //         return tokenInstance.balanceOf(accounts[0]);
    // //     }).then(function(adminBalance){
    // //         assert.equal(adminBalance.toNumber(), 1000000, 'should allocate initial supply to admin');
    // //     });
    // // });

    // // it('transfers ownership', function(){
    // //     return Token.deployed().then(function(instance){
    // //         tokenInstance = instance;
    // //         return tokenInstance.transfer(accounts[1], 250000, {from: accounts[0]});
    // //     }).then(function(receipt){
            
    // //         return tokenInstance.balanceOf(accounts[1]);
    // //     }).then(function(balance){
    // //         assert.equal(balance.toNumber(), 250000, 'adds amount to receiving account');
    // //         return tokenInstance.balanceOf(accounts[0]);
    // //     }).then(function(balance){
    // //         assert.equal(balance, 750000, 'deducts amount from sending account'); 
    // //     })
    // // })
});