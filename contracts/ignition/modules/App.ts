import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("App", (m) => {
  const c = m.contract("App", [], {
    value: 1000000000000000000n,
  });

  return { c };
});
