// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Messages is Ownable{
    struct Account {
        string nickname;
        mapping (uint => Message) sents;
        uint counterSents;
        mapping (uint => Message) inbox;
        uint counterInbox;
    }

    struct Message {
        address sender;
        address destination;
        string message;
        uint timestamp;
        bool isPublic;
    }

    mapping(address => Account) public accounts;

    mapping(uint => Message) public messages;
    uint counterMessages;

    event NewMessage(Message);   

    function SendMessage(address _destination, string memory _message, bool _isPublic) public{
        require(msg.sender != _destination,"Can't text yourself!");
        Account storage sender = accounts[msg.sender];
        Account storage receiver = accounts[_destination];
        Message memory newMessage = Message(msg.sender, _destination, _message, block.timestamp, _isPublic);

        sender.sents[sender.counterSents] = newMessage;
        sender.counterSents += 1;

        receiver.inbox[receiver.counterInbox] = newMessage;
        receiver.counterInbox += 1;

        messages[counterMessages] = newMessage;
        counterMessages+=1;

        emit NewMessage(newMessage);
    }

    function SentsCounter() public view returns (uint) {
        return accounts[msg.sender].counterSents;
    }

    function ReadSent(uint _sentMessage) public view returns(Message memory){
        require(_sentMessage<accounts[msg.sender].counterSents,"The message doesn't exist!");
        return accounts[msg.sender].sents[_sentMessage];
    }

    function InboxCounter() public view returns (uint) {
        return accounts[msg.sender].counterInbox;
    }

    function ReadInbox(uint _inboxMessage) public view returns(Message memory){
        require(_inboxMessage<accounts[msg.sender].counterInbox,"The message doesn't exist!");
        return accounts[msg.sender].inbox[_inboxMessage];
    }

    function MessagesCounter() public view returns (uint) {
            return counterMessages;
    }

    function ReadMessage(uint _nMessage) public view returns (Message memory){
        Message memory message = messages[_nMessage];
        require(_nMessage < counterMessages,"The message doesn't exist!");
        require(message.isPublic,"The message is private!");
        return message;
    }

    function SetNickname(string memory _username) public {
        accounts[msg.sender].nickname=_username;
    }
}