import { ThirdwebSDK } from "@3rdweb/sdk";
import ethers from "ethers";

// Importing and configuring our .env file that we use to securely store our environment variables 
import dotenv from "dotenv";
dotenv.config();

// Some quick checke to make sure our .env is working.
if (!process.env.PRIVATE_KEY || process.env.PRIVATE_KEY == "") {
    console.log("🛑 Private key not found.")
} 

if (!process.env.ALCHEMY_API_URL || process.env.ALCHEMY_API_URL == "") {
    console.log("🛑 Alchemy APT URL not found.")
}

if (!process.env.WALLET_ADDRESS || process.env.WALLET_ADDRESS == "") {
    console.log("🛑 Wallet Address is not found.")
}

const sdk =  new ThirdwebSDK(
    new ethers.Wallet(
        // Your wallet private key. Always keep this private, do not share with anyone, add it to you .env file 
        process.env.PRIVATE_KEY, 
        // RPC URL well use our Alchemy API from our .env file. 
        ethers.getDefaultProvider(process.env.ALCHEMY_API_URL),
    )
);

(async () => {
    try {
        const apps = await sdk.getApps();
        console.log("Your app address is :", apps[0].address);
    } catch (err) {
        console.error("Failed to get apps from the sdk", err);
        process.exit(1);
    }
})()

// Were exporting the initialized thirdweb SDK so that we can use it in our other scripts 
export default sdk;