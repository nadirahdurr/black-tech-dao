import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is the address to our ERC-1155 membership NFT contract.
const bundleDropModule = sdk.getBundleDropModule("0x165f6F50918790316dFb0943d1D0BDa8F8Da702C");

// This is the address to our ERC-20 token contract
const tokenModule = sdk.getTokenModule("0x938d63eFb26E7475035596030c55D6FCF52aB1b2");

(async () => {
    try {
        // Grab all the addressed of people who own our membership NFT, which hs a tokenId of 0. 
        const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");

        if (walletAddresses.length === 0) {
            console.log("No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!");
            process.exit(0); 
        }

        // Loop through the array of addresses. 
        const airdropTargets = walletAddresses.map((address) => {
            // Pick a random # betweem 1000 and 10000.
            const randomAmount = Math.floor(Math.random() * (1000 - 100 + 1) + 1000); 
            console.log("✅ Going to airdrop", randomAmount, "tokens to", address);

            // Set up the target 
            const airdropTargets = {
                address,
                // Remember, we need 18 decimal places!
                amount: ethers.utils.parseUnits(randomAmount.toString(), 18),
            };
            
            return airdropTargets;
        }); 

        // Call transferBatch on all our airdrop targets.
        console.log("🌈 Starting airdrop...")
        await tokenModule.transferBatch(airdropTargets);
        console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
    } catch (err) {
        console.error("Failed to airdrop tokens", err);
    }
})();