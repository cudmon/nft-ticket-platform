// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

struct Ticket {
    uint sold;
    uint total;
    uint[] tokens;
}

contract App is ERC721URIStorage, Ownable(msg.sender) {
    uint private _token_id;
    uint private _ticket_id;

    mapping(uint => bool) public used;
    mapping(uint => Ticket) public tickets;
    mapping(address => uint[]) public owned;

    constructor() payable ERC721("APP", "AP") {}

    function createTicket(
        uint _total,
        string memory metadata
    ) external onlyOwner {
        tickets[_ticket_id] = Ticket({
            sold: 0,
            total: _total,
            tokens: new uint[](_total)
        });

        for (uint i = 0; i < _total; i++) {
            _mint(address(this), _token_id);
            _setTokenURI(_token_id, metadata);

            used[_token_id] = false;
            tickets[_ticket_id].tokens[i] = _token_id++;
        }

        _ticket_id++;
    }

    function buyTicket(
        uint ticket_id,
        uint amount,
        address buyer
    ) external onlyOwner {
        Ticket storage ticket = tickets[ticket_id];

        require(ticket.total > 0, "Ticket does not exist");
        require(
            ticket.sold + amount <= ticket.total,
            "Not enough tickets available"
        );

        for (uint i = 0; i < amount; i++) {
            _transfer(address(this), buyer, ticket.tokens[ticket.sold++]);

            owned[buyer].push(_token_id);
        }
    }

    function transferTicket(
        address from,
        address to,
        uint _id
    ) external onlyOwner {
        require(used[_id] == false, "Ticket already used");

        _transfer(from, to, _id);

        for (uint i = 0; i < owned[from].length; i++) {
            if (owned[from][i] == _id) {
                owned[from][i] = owned[from][owned[from].length - 1];
                owned[from].pop();

                break;
            }
        }
    }

    function verifyTicket(uint ticket_id, uint _id) external onlyOwner {
        require(tickets[ticket_id].total > 0, "Ticket does not exist");
        require(used[_id] == false, "Ticket already used");

        used[_id] = true;
    }

    function renounceOwnership() public view override onlyOwner {
        revert("Can't renounce ownership here");
    }
}
