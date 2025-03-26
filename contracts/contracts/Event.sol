// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

struct Ticket {
    uint id;
    uint sold;
    uint total;
    uint price;
    bool resalable;
}

struct Resale {
    uint id;
    uint price;
    address from;
    uint token_id;
}

contract Event is ERC721, Ownable(tx.origin) {
    mapping(uint => Ticket) public tickets;
    mapping(uint => Resale) public resales;

    uint public token_counter;
    uint public resale_counter;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    event Ticket_Resold(uint resale_id, address to, uint price);
    event Ticket_Bought(uint ticket_id, address to, uint amount);
    event Ticket_Minted(uint token_id, uint ticket_id, address to);
    event Ticket_Resell(
        uint resale_id,
        uint token_id,
        address from,
        uint price
    );

    function add_ticket(
        uint _id,
        uint _total,
        uint _price,
        bool _resalable
    ) public onlyOwner {
        tickets[_id] = Ticket(_id, 0, _total, _price, _resalable);
    }

    function buy_ticket(uint _id, uint _amount) public payable {
        Ticket storage ticket = tickets[_id];

        require(ticket.total >= ticket.sold + _amount, "Not enough tickets");
        require(msg.value == ticket.price * _amount, "Incorrect amount");

        for (uint i = 0; i < _amount; i++) {
            _mint(msg.sender, token_counter);

            emit Ticket_Minted(token_counter, _id, msg.sender);

            token_counter++;
        }

        ticket.sold += _amount;

        emit Ticket_Bought(_id, msg.sender, _amount);
    }

    function resell_ticket(uint _token_id, uint _price) public {
        require(ownerOf(_token_id) == msg.sender, "Not the owner");

        resales[resale_counter] = Resale(
            resale_counter,
            _price,
            msg.sender,
            _token_id
        );

        emit Ticket_Resell(resale_counter, _token_id, msg.sender, _price);

        resale_counter++;
    }

    function buy_resale(uint _resale_id) public payable {
        Resale storage resale = resales[_resale_id];

        require(msg.value == resale.price, "Incorrect amount");

        _transfer(resale.from, msg.sender, resale.token_id);

        payable(resale.from).transfer(msg.value);

        emit Ticket_Resold(_resale_id, msg.sender, resale.price);
    }
}
