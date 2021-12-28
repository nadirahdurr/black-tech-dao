import { ethers } from 'ethers';
import sdk from "./1-initialize-sdk.js";

// This is the address of our ERC contract printed out in the step before 
const tokenModule = sdk.getTokenModule("0x938d63eFb26E7475035596030c55D6FCF52aB1b2");

(async () => {
    try { 
        // Whats the max supply you want to set 1,000,00 is a nice number 
        const amount = 1_000_000;
        // We use the util function from "ethers" to convert the amount
        // to have 18 decimals (which is the standard for ERC20 token).
        const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
        // Interact with youe deployed ERC-20 contract and mint the tokens!
        await tokenModule.mint(amountWith18Decimals);
        const totalSupply = await tokenModule.totalSupply();
    
        // Print out how many of our token's are out there now!
        console.log(
            "✅ There now is",
            ethers.utils.formatUnits(totalSupply, 18),
            "BLACKTECH in circulation",
        );
    } catch (error) {
        console.error("Failed to print money", error);
    }
})();