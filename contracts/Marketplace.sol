// Marketplace for FORESTART
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./FORESTART.sol";

contract Marketplace is IERC721Receiver {
    
    uint256 public price; // price per nft
    address public owner; // owner
    address forestart_addr; // FORESTART contract

    constructor(address _forestart) {
        price = 0.25 ether;
        owner = msg.sender;
        forestart_addr = _forestart;
    }
    
    
    // buy nft from contract, pay price
    function buy(uint256 _id) external payable {
        
        require(msg.value >= price, "error: not enough funds");
        
        FORESTART forestart = FORESTART(forestart_addr);
        
        require(forestart.ownerOf(_id) == address(this));
        
        // approve
        forestart.approve(msg.sender, _id);
        
        // safeTransferFrom
        forestart.safeTransferFrom(address(this), msg.sender, _id);
    }
    
    
    
    // for now the owner can withdraw the funds
    // later only the charity organisation should be able to withdraw their funds
    // withdraw _amount
    function withdrawFunds(uint256 _amount) public onlyOwner {
        require(
            address(this).balance >= _amount,
            "Not enough money in contract!"
        );
        
        address payable receiver = payable(msg.sender);
        receiver.transfer(_amount);
    }
    
    // for now the owner can withdraw the funds
    // later only the charity organisation should be able to withdraw their funds
    // withdraw all funds
    function withdrawAllFunds() public onlyOwner {
        address payable receiver = payable(msg.sender);
        receiver.transfer(address(this).balance);
    }
        
        
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) public override returns (bytes4) {
        return 0x150b7a02;
    } 
    
    // helper-functions
    function adjustPrice(uint256 _price) public onlyOwner {
        price = _price;
    }
    
    function changeOwner(address _owner) external onlyOwner {
        owner = _owner;
    }
    
    // return balance of contract
    function getBalance() public view onlyOwner returns (uint256 balance) {
        return address(this).balance;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

}