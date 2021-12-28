import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs"; 

const bundleDrop = sdk.getBundleDropModule(
    "0x165f6F50918790316dFb0943d1D0BDa8F8Da702C",
);

(async () => {
    try {
        await bundleDrop.createBatch([
            {
                name: "BlackTechDAO Card",
                description: "This Black Tech Card will give you access to BlackTechDAO",
                image: readFileSync("scripts/assets/black-card.jpg")
            },
        ]);
        console.log("✅ Successfully created a new NFT in a drop!");
    } catch (error) {
        console.error("failed to create the NFT", error);
    }
})()