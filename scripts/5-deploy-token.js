import sdk  from "./1-initialize-sdk.js";

// In order to deploy the new contract we need our old friend the app module again. 
const app = sdk.getAppModule("0x6264656F1eD720E9ca928572B702096b7042E4E2");

(async () => {
    try {
      // Deploy a standard ERC-20 contract.
      const tokenModule = await app.deployTokenModule({
        // What's your token's name? Ex. "Ethereum"
        name: "BlackTechDAO Governance Token",
        // What's your token's symbol? Ex. "ETH"
        symbol: "BLACKTECH",
    });
      console.log(
        "✅ Successfully deployed token module, address:",
        tokenModule.address,
      );
    } catch (error) {
      console.error("failed to deploy token module", error);
    }
  })();

