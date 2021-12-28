import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule("0x938d63eFb26E7475035596030c55D6FCF52aB1b2");

(async () => {
    try {
        console.log("👀 Roles that exist right now:", await tokenModule.getAllRoleMembers());
        
        // Revoke all the superpowers your wallet had over the ERC-20 contract. 
        await tokenModule.revokeAllRolesFromAddress(process.env.WALLET_ADDRESS);
        console.log("🎉 Roles after revoking ourselves", await tokenModule.getAllRoleMembers());
        console.log("✅ Successfully revoked our superpowers from the ERC-20 contract"); 

    } catch (error) {
        console.error("Failed to revoke ourselves from the DAO treasury", error);
    }
})();