// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import "./Event.sol";

contract Factory {
    address[] public events;

    event New_Contract(string id, address indexed addr);

    function createEvent(string memory _name, string memory _symbol) external {
        Event ev = new Event(_name, _symbol);

        events.push(address(ev));

        emit New_Contract(_symbol, address(ev));
    }

    function get_events() external view returns (address[] memory) {
        return events;
    }
}
