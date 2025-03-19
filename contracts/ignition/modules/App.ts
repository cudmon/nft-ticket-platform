import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("App", (m) => {
  const c = m.contract("App", []);

  return { c };
});
