//SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0 <= 0.9.0;

import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/utils/Counters.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";

contract Metaverse is ERC721, Ownable {

    constructor() ERC721("META", "MT"){}

   //Use of Counters library
    using Counters for Counters.Counter;
   
    //Create supply variable of Counter type
    Counters.Counter private supply;
   
    //Set max supply
    uint public maxSupply = 100;
 
    //Set cost for minting NFT 
    uint public cost = 10 wei;

    //NFT have a below parameters, stores these into struct.
    struct Object {
        string name;
        int8 hight;
        int8 width;
        int8 depth; 
        int8 xAxis;
        int8 yAxis;
        int8 zAxis;
    }

 //Create mapping for struct object to mapp address to Object
   mapping(address => Object[]) NFTOwner;
   //Create object of struct Object
   Object[] public objects;


//This funciton return all objects store in Object struct
function getObject() public view returns(Object[] memory){
    return objects;
}

//This function return current supply of NFTS using Counters librabry current function
function getSupply()public view returns(uint){
    return supply.current();
}

//This function actually mint NFT, we have passed two all information related to NFT 
function mintNFT(string memory _objectName, int8 _width ,int8 _hight, int8 _depth, int8 _xAixs , int8 _yAxis, int8 _zAxis )
public payable {

//Chack supply of NFTS is exceeds or not 
require(supply.current()<= maxSupply, "NFT supply exceeds");
require(msg.value >= cost, "We have to pay 0.1 ether to mint NFT");
supply.increment();

_safeMint(msg.sender,supply.current());

//Store all information of a NFT to in Struct 
Object memory _newObject = Object(_objectName, _width, _hight, _depth, _xAixs , _yAxis, _zAxis);

//Push that info into Object type array
objects.push(_newObject);

//Mapping owner address to the NFT details
NFTOwner[msg.sender].push(_newObject);

}

//Create withdraw function to withdraw eth, Onwer of the cotract can widthdraw all eth.
function widthdraw() external payable onlyOwner {
address payable _owner = payable(owner());
_owner.transfer(address(this).balance);
}

//This will return all NFTS have the address.

function getOwnerNFTS() public view returns(Object[] memory){
return NFTOwner[msg.sender];
}

}

//COntractaddress : 0x983033fbce23688a78f88706aad6cb9f20a55d82