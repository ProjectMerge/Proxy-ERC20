// Contracts
const Token = artifacts.require("Token")

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
    console.log('Token fetched', token.address)

    // Destroy tokens to account[0]
    let balanceOf = await token.balanceOf(accounts[0])
    console.log(balanceOf.toString())
    let amount = web3.utils.toWei('0.00000999', 'ether') // 10,000 tokens
    const destroy = await token.burn(amount, { from: accounts[0]})

    balanceOf = await token.balanceOf(accounts[0])
    console.log(balanceOf.toString())

    // 
    console.log(`Destroyed ${amount} tokens `)

  }
  catch(error) {
    console.log(error)
  }

  callback()
}
