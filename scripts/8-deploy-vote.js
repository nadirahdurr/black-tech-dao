import sdk from "./1-initialize-sdk.js";

// Grab the app module address. 
const appModule = sdk.getAppModule("0x6264656F1eD720E9ca928572B702096b7042E4E2");

(async () => {
    try {
        const voteModule = await appModule.deployVoteModule({
            // Give your governance contract a name. 
            name: "BlackTechDAO's Proposals",

            // This is the location of our governance token, our ERC-20 contract!
            votingTokenAddress: "0x938d63eFb26E7475035596030c55D6FCF52aB1b2",

            // After a proposal is created, when can members start voting? 
            // For now, we set this to immediately.
            proposalStartWaitTimeInSeconds: 0, 

            // How long do members have to vote on a proposal when its created? 
            // Here, we set it to 24 hours (86400 seconds)
            proposalVotingTimeInSeconds: 24 * 60 * 60,
            
            // Let’s say a member creates a proposal and the other 199 DAO members are on vacation at Disney World and aren’t online. 
            // Well, in this case, if that one DAO member creates the proposal and votes “YES” on their own proposal — that means 100% of the votes said “YES” 
            // (since there was only one vote) and the proposal would pass once proposalVotingTimeInSeconds is up! 
            // To avoid this, we use a quorum which says “In order for a proposal to pass, a minimum x % of token must be used in the vote”.
            votingQuorumFraction: 0, 

            // Whats the minimum # of tokens a user needs to be allowed to create a proposal? 
            // I set it to 0. Meaning no tokens are required for a user to be allowed to create a proposal. 
            minimumNumberOfTokensNeededToPropose: "1",
        })

        console.log(
            "✅ Successfully deployed vote module, address:",
            voteModule.address,
        );
    } catch (err) {
        console.error("Failed to deploy vote module", err);
    }
})();