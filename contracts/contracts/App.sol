// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

struct Ticket {
    uint id;
    uint total;
    uint price;
    uint[] tokens;
    uint event_id;
}

struct Event {
    uint id;
    address owner;
}

struct Token {
    uint id;
    bool used;
    address owner;
    uint ticket_id;
}

contract App is ERC721, Ownable(msg.sender) {
    uint private _token_id;

    mapping(uint => Event) public events;
    mapping(uint => Token) public tokens;
    mapping(uint => Ticket) public tickets;
    mapping(address => Token[]) public owned;

    constructor() ERC721("APP", "AP") {}

    function create_event(uint id) external onlyOwner {
        events[id] = Event({id: id, owner: msg.sender});
    }

    function add_ticket(
        uint event_id,
        uint id,
        uint total,
        uint price
    ) external onlyOwner {
        require(events[event_id].owner != address(0), "Event does not exist");

        Event storage ev = events[event_id];

        require(ev.owner == msg.sender, "You are not the event owner");

        tickets[id] = Ticket({
            id: id,
            total: total,
            price: price,
            event_id: event_id,
            tokens: new uint[](0)
        });
    }

    function buy_ticket(uint ticket_id, uint amount) external onlyOwner {
        Ticket storage ticket = tickets[ticket_id];

        require(
            ticket.total - ticket.tokens.length >= amount,
            "Not enough tickets"
        );

        for (uint i = 0; i < amount; i++) {
            _token_id++;

            tokens[_token_id] = Token({
                id: _token_id,
                used: false,
                owner: msg.sender,
                ticket_id: ticket.id
            });

            ticket.tokens.push(_token_id);
            owned[msg.sender].push(tokens[_token_id]);
        }
    }

    function use_ticket(uint event_id, uint token_id) external onlyOwner {
        Event storage ev = events[event_id];
        Token storage token = tokens[token_id];

        require(ev.owner == msg.sender, "You are not the event owner");
        require(!token.used, "Ticket already used");

        token.used = true;
    }

    function resale_ticket(
        uint event_id,
        uint token_id,
        uint price,
        address to
    ) external onlyOwner {
        require(events[event_id].owner != address(0), "Event does not exist");

        Token storage token = tokens[token_id];

        require(price > 0, "Price must be greater than 0");
        require(token.owner == msg.sender, "You are not the ticket owner");

        token.owner = to;
    }

    function get_owned_tickets() external view returns (Token[] memory) {
        return owned[msg.sender];
    }

    function get_token_info(
        uint token_id
    ) external view returns (Token memory) {
        return tokens[token_id];
    }
}
