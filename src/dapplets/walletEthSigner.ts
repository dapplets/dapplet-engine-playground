import { EthSigner } from "@dapplets/dapplet-engine-ts/src/extensions/ethereum/ethSigner"
import { EthData, EthTxState, EthTxStateMsg } from "@dapplets/dapplet-engine-ts/src/extensions/ethereum/ethTxBuilder";
//import * as ethers from "ethers"

export class WalletEthSigner implements EthSigner {
    public static TARGET_TXBUILDER_GLOBAL_NAME = "http://types.dapplets.org/ethereum/txbuilders/solidity/1.0"
    async signAndSend(payload: EthData, listener: (state: EthTxState, msg: EthTxStateMsg) => void): Promise<void> {
        // const provider = ethers.getDefaultProvider('rinkeby')
        // let privateKey = '0x0123456789012345678901234567890123456789012345678901234567890123'
        // let wallet = new ethers.Wallet(privateKey, provider)
        // let tx = await wallet.sendTransaction(transaction)
        // console.log(tx)
    }
}