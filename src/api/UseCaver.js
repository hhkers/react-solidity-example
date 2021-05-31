import Caver from 'caver-js';
import CounterABI from '../abi/CounterABI.json';
import {ACCESS_KEY_ID, SECRET_ACCESS_KEY, COUNT_CONTRACT_ADDRESS, CHAIN_ID, WALLET_PRIVATE_KEY} from '../constants';

const option = {
    headers: [
      {
        name: "Authorization",
        value: "Basic " + Buffer.from(ACCESS_KEY_ID + ":" + SECRET_ACCESS_KEY).toString('base64')
      },
      {
        name: "x-chain-id",
        value: CHAIN_ID
      }
    ]
}
const caver = new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
const countContract = new caver.contract(CounterABI, COUNT_CONTRACT_ADDRESS);

export const readCount = async () => {
    const _count = await countContract.methods.count().call();
    console.log(_count);
}

export const getBalance = (address) => {
    return caver.rpc.klay.getBalance(address).then((response) => {
        const balance = caver.utils.convertFromPeb(caver.utils.hexToNumberString(response));
        console.log(`BALANCE : ${balance}`);
        return balance;
    })
}

export const setCount = async (newCount) => {
    try {
        // 사용할 account 설정
        const deployer = caver.wallet.keyring.createFromPrivateKey(WALLET_PRIVATE_KEY);
        caver.wallet.add(deployer);

        // 스마트 컨트랙트 실행, 트랜잭션 보내기
        // 결과 확인
        const receipt = await countContract.methods.setCount(newCount).send({
            from: deployer.address,
            gas: '0x4bfd200'
        });
        console.log(receipt);
    } catch(e) {
        console.log(`[ERROR_SET_COUNT] ${e}`);
    }
}