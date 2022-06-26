//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.1;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Main is Ownable{
    struct Account {
        string name;
        mapping (address => bool) friends;
        address [] sents;
        address [] inbox;
    }

    mapping(address => Account) public accounts;
    uint public counterAccount;

    function Send(address _destination, string memory _message) public{
        address newMessage = address(new Message(msg.sender, _destination, _message));
        accounts[msg.sender].sents.push(newMessage);
        accounts[_destination].inbox.push(newMessage);
    }

    function Read(address message) public view returns(address, address, string memory, uint, bool){
        return Message(message).Read(msg.sender);
    }

    function SetRead(address message) public{
        Message(message).SetRead(msg.sender);
    }

    function ShowSents()public view returns (uint) {
        return accounts[msg.sender].sents.length;
    }

    function ReturnSentMessage(uint _num) public view returns (address) {
        return accounts[msg.sender].sents[_num];
    }

    function ShowInbox()public view returns (uint) {
        return accounts[msg.sender].inbox.length;
    }

    function ReturnInboxMessage(uint _num) public view returns (address) {
        return accounts[msg.sender].inbox[_num];
    }

    function SetUsername(string memory _username) public {
        accounts[msg.sender].name=_username;
    }
}
contract Message {
    address sender;
    address destination;
    string message;
    uint timestamp;
    bool read;

    constructor (address _sender,address _destination, string memory _message) {
        require(_sender != _destination, "You can't text yourself!");
        sender=_sender;
        destination=_destination;
        message=_message;
        read=false;
        timestamp=block.timestamp; 
    }

    function Read(address _requiring) public view returns(address, address, string memory, uint, bool){
        require(_requiring == sender || _requiring == destination, "This is a private message!");
        return(
            sender,
            destination,
            message,
            timestamp,
            read
        );
    }

    function SetRead(address _requiring) public{
        require(_requiring == destination , "Only receiver can do this action!");
        read=true;
    }
}
