- Store personal information private on-chain, and use it to ensure compliance.
- Remain compliant with the existing compliance rules. (see assumptions)
- Bidding and transfer transactions remain private.
- Balances are secret to preserve privacy.
- Provide a decentralized and confidential market that works 24/7 across the globe. (see assumptions)

**Contracts**

Identity Registry: Acts like a whitelist lookup table for encrypted id attributes and addresses ([“Age”])
RulesERC20: Rules to be able to hold the token (Address- Age - 18)
CompliantERC20: EncryptedERC20 contract with a few modifications where in each transfer it checks the compliance to rules for the corresponding receiver.(update constructor with addresses)
Simple Bid: Hardcoded minimum bid in contract state, user sends a bid without knowing that value. If its greater receives a token with an amount of difference.
