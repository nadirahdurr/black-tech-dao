import sdk from "./1-initialize-sdk.js";

const bundleDrop = sdk.getBundleDropModule(
    "0x165f6F50918790316dFb0943d1D0BDa8F8Da702C",
);

(async () => {
    try {
        const claimedConditionFactory = bundleDrop.getClaimConditionFactory();
        //Specify Conditions
        claimedConditionFactory.newClaimPhase({
            startTime: new Date(),
            maxQuantity: 10_000,
            maxQuantityPerTransaction: 1,
        });
         
        await bundleDrop.setClaimCondition(0, claimedConditionFactory); 
        console.log("✅ Successfully set claim condition on bundle drop:", bundleDrop.address);
        } catch (error) {
       console.error("Failed to set claim conditon", error)
        }
})()