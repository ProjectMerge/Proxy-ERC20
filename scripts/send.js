// Contracts
const Token = artifacts.require("SushiToken")
const MasterChef = artifacts.require("MasterChef")

// Utils
const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000' // Ether token deposit address
const ether = (n) => {
  return new web3.utils.BN(
    web3.utils.toWei(n.toString(), 'ether')
  )
}
const tokens = (n) => ether(n)

const wait = (seconds) => {
  const milliseconds = seconds * 1000
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

module.exports = async function(callback) {
  try {
    // Fetch accounts from wallet - these are unlocked
    const accounts = await web3.eth.getAccounts()

    // Fetch the deployed token
    const token = await Token.deployed()
    const masterchef = await MasterChef.deployed()

    let owner = await masterchef.devaddr()
    console.log('Account Address', accounts)
    console.log('Token fetched', token.address)
    // Mint tokens to account[0]
    let balanceOf0 = await token.balanceOf(accounts[0])
    let balanceOf1 = await token.balanceOf(accounts[1])
    console.log('Before Transfer')
    console.log('Account ', accounts[0] ,web3.utils.fromWei(balanceOf0), 'Sushi Tokens')
    console.log('Account ', accounts[2] ,web3.utils.fromWei(balanceOf2), 'Sushi Tokens')
    console.log('MasterChef owner', owner)
    //console.log(balanceOf1.toString())
    //let amount = web3.utils.toWei('100', 'ether') // 10,000 tokens
    const transfer = await token.transfer(accounts[2], ether(10), { from: accounts[0]})
    console.log('After Transfer')
    console.log('Account ', accounts[0] ,web3.utils.fromWei(balanceOf0), 'Sushi Tokens')
    console.log('Account ', accounts[2] ,web3.utils.fromWei(balanceOf2), 'Sushi Tokens')
    //balanceOf = await token.balanceOf(accounts[0])
    //console.log(balanceOf.toString())


    // 
    //console.log(`Minted ${amount} tokens `)


  }
  catch(error) {
    console.log(error)
  }

  callback()
}
