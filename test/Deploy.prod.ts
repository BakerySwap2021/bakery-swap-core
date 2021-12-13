import chai from 'chai'
import * as ethers from 'ethers'
import {deployContract, solidity} from 'ethereum-waffle'

import BakerySwapFactory from '../build/BakerySwapFactory.json'

chai.use(solidity)

describe('BakerySwapFactoryDeployProd', () => {
  const feeToSetterAddress = '0xf9e89b5aCA2e6061d22EA98CBCc2d826E3f9E4b1'

  const provider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.binance.org:8545')
  // bsc main
  // const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/')
  const privateKey = '0x5031dcf9fba831e699cc5e01df38836a285c885d7b33336795db7800ab6713f9'

  const wallet = new ethers.Wallet(privateKey, provider)
  let overrides = {
    gasLimit: 9999999
  }

  beforeEach(async () => {
    let gasPrice = await provider.getGasPrice()
    console.log(`current gas Price ${gasPrice}`)
    gasPrice = gasPrice.mul(3).div(2)
    console.log(`new gas Price ${gasPrice}`)
    overrides = Object.assign(overrides, {gasPrice: gasPrice.toNumber()})
  })

  it('deploy', async () => {
    console.log(`start deployContract swapFactory`)
    const args = [feeToSetterAddress]
    const constructorArgumentsABIEncoded = ethers.utils.defaultAbiCoder.encode(
      new ethers.utils.Interface(BakerySwapFactory.abi).deployFunction.inputs,
      args
    )
    console.log(`constructorArgumentsABIEncoded ` + constructorArgumentsABIEncoded)
    const swapFactory = await deployContract(wallet, BakerySwapFactory, args, overrides)
    console.log(`contract swapFactory address ${swapFactory.address}`)
    console.log(`contract swapFactory deploy transaction hash ${swapFactory.deployTransaction.hash}`)
    await swapFactory.deployed()
    console.log(`finish deployContract swapFactory`)

    /**
         * 20200912 测试
         * start deployContract swapFactory
         contract swapFactory address 0x0F3C556BEA475661071Fc9967412E5cc3E5D3289
         contract swapFactory deploy transaction hash 0xe363e7306c44ef0d9af67b2e9154cd862c1f96fb4b45028b60d0d8e4c9f3a10c
         finish deployContract swapFatory
         */
  })
})
