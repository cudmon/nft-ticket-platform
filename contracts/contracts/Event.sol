// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

struct Ticket {
    uint id;
    uint sold;
    uint total;
    bool resalable;
}

contract Event is ERC721, Ownable(msg.sender) {
    mapping(uint => Ticket) public tickets;

    uint public token_counter;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    event Ticket_Added(uint id, uint total, bool resalable);
    event Ticket_Bought(uint id, uint amount, address to);
    event Ticket_Resold(uint token_id, address from, address to);

    function add_ticket(
        uint _id,
        uint _total,
        bool resalable
    ) public onlyOwner {
        tickets[_id] = Ticket(_id, 0, _total, resalable);

        emit Ticket_Added(_id, _total, resalable);
    }

    function buy_ticket(uint _id, uint _amount, address _to) public onlyOwner {
        Ticket storage ticket = tickets[_id];

        require(ticket.total >= ticket.sold + _amount, "Not enough tickets");

        for (uint i = 0; i < _amount; i++) {
            _mint(_to, token_counter++);
        }

        ticket.sold += _amount;

        emit Ticket_Bought(_id, _amount, _to);
    }

    function resell_ticket(
        uint _token_id,
        address _from,
        address _to
    ) public onlyOwner {
        _transfer(_from, _to, _token_id);

        emit Ticket_Resold(_token_id, _from, _to);
    }
}
