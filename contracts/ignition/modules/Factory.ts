import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Factory", (m) => {
  const c = m.contract("Factory", []);

  return { c };
});
