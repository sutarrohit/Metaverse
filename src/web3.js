import abi from "./abi/abi.json" assert {type : "json"};

//Create promise

const Polygon = new Promise((res,rej) =>{

    async function meta(){
        if(typeof window.ethereum == "undefined"){
            rej("You should install metamask")
        }

        //Create instance of Web3.
        let web3 = new Web3(window.ethereum)

        //create object of the contract 
        const contractAddress = "0xb885193ff6ba9af85b049eec236650dd8240b98c"
        const contract = new web3.eth.Contract(abi, contractAddress)

        //Get all accounts details.
        let accounts = await web3.eth.requestAccounts()
        console.log(`Accounts detail ${accounts[0]}`)

        //Get total Supply of the contract 
        let totalSupply = await contract.methods.getSupply().call({from: accounts[0]})
        console.log(`Total Supply ${totalSupply}`)

        let maxSupply = await contract.methods.maxSupply().call({from: accounts[0]})
        console.log(`Max Supply ${maxSupply}`)

        let objects = await contract.methods.getOwnerNFTS().call({from: accounts[0]})
        console.log(`Get objects ${objects}`)   



        //Promises 

        web3.eth.requestAccounts().then((accounts) =>{
            contract.methods.getSupply().call({from: accounts[0]}).then((supply)=>{
                contract.methods.getObject().call({from:accounts[0]}).then((data)=>{
                    res({supply:supply,nft:data})
                })
            })
        })
    }

    meta()

})

export default Polygon