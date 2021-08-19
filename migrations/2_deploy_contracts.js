//const Token = artifacts.require('MergeToken.sol')
const MasterChef = artifacts.require('MasterChef.sol')

const Token = artifacts.require('./src/contracts/Token.sol');
const { deployProxy } = require ('@openzeppelin/truffle-upgrades');

module.exports = async function(deployer) {
  // Deploy Sushi Token
  //await deployProxy(Token, ['Merge', 'MERGE', '1500000000000000000000000'], { deployer, initializer: 'initialize' , kind: 'uups'})
  //await deployer.deploy(SushiToken)
  //const Token = await Token.deployed()

  // Deploy Masterchef Contract
  await deployer.deploy(
    MasterChef,
    Token.address,
    process.env.DEV_ADDRESS, // Your address where you get sushi tokens - should be a multisig
    process.env.START_BLOCK, // Block number when token mining starts
  )

  // Make Masterchef contract token owner
  const masterChef = await MasterChef.deployed()
  //await sushiToken.transferOwnership(masterChef.address)

  await masterChef.setReward(
    web3.utils.toWei(process.env.TOKENS_PER_BLOCK), // Number of tokens rewarded per block, e.g., 100
    false
  )

  // Add Liquidity pool for rewards, e.g., "ETH/DAI Pool"
  await masterChef.add(
    process.env.ALLOCATION_POINT,
    process.env.LP_TOKEN_ADDRESS,
    false
  )

  // Add more liquidity pools here upon deployment, or add them later manually
}
