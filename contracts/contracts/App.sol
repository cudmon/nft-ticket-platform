// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

struct Ticket {
    uint total;
    uint[] tokens;
    bool resalable;
}

struct Token {
    uint id;
    bool used;
    address owner;
    uint ticket_id;
}

contract App is ERC721, Ownable(msg.sender) {
    uint private _token_id;

    mapping(uint => Token) public tokens;
    mapping(uint => Ticket) public tickets;

    constructor() ERC721("APP", "AP") {}

    function createTicket(
        uint _id,
        uint _total,
        bool resalable
    ) external onlyOwner {
        tickets[_id] = Ticket({
            total: _total,
            resalable: resalable,
            tokens: new uint[](0)
        });
    }

    function buyTicket(
        uint ticket_id,
        uint amount,
        address buyer
    ) external onlyOwner {
        Ticket storage ticket = tickets[ticket_id];

        require(ticket.total > 0, "Ticket does not exist");
        require(
            ticket.tokens.length + amount <= ticket.total,
            "Not enough tickets available"
        );

        for (uint i = 0; i < amount; i++) {
            _mint(buyer, _token_id);

            ticket.tokens.push(_token_id);

            tokens[_token_id] = Token({
                id: _token_id,
                used: false,
                owner: buyer,
                ticket_id: ticket_id
            });

            _token_id++;
        }
    }
}
