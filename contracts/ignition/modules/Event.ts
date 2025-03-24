import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Event", (m) => {
  const c = m.contract("Event", []);

  return { c };
});
