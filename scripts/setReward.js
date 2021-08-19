// Contracts
const Token = artifacts.require("Token")
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
    let newreward = web3.utils.toWei('0.022')

    // Fetch the deployed token
    const token = await Token.deployed()
    const masterchef = await MasterChef.deployed()

    let currentReward = await masterchef.mergePerBlock.call()
    let devaddress = await masterchef.devaddr.call()

    console.log('Contract Dev Address', devaddress)
    console.log('Current user', accounts[0])
    
    //let mergePerBlock = await masterchef.setReward(web3.utils.toWei(reward))
    //mergePerBlock = web3.utils.fromWei(mergePerBlock).toString()
    currentReward = web3.utils.fromWei(currentReward).toString()

    console.log('mergePerBlock', currentReward)


    let newReward = await masterchef.setReward(newreward, true )
    let newReward2 = await masterchef.mergePerBlock.call()
    newReward2 = web3.utils.fromWei(newReward2).toString()

    console.log('New Merge Per Block', newReward2)

    //console.log('MasterChef fetched', reciever)
    //console.log('Dev', owner)
    //console.log('Dev2', msg.sender)
    //console.log('web3', accounts[0])


  }
  catch(error) {
    console.log(error)
  }

  callback()
}