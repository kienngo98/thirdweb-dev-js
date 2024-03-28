import type { Address } from "abitype";
import type { BaseTransactionOptions } from "../../../../transaction/types.js";
import { prepareContractCall } from "../../../../transaction/prepare-contract-call.js";
import { getActiveClaimCondition } from "../read/getActiveClaimCondition.js";
import { padHex } from "../../../../utils/encoding/hex.js";
/**
 * Represents the parameters for claiming an ERC721 token.
 */
export type ClaimToParams = {
  to: Address;
  quantity: bigint;
};

/**
 * Claim ERC721 NFTs to a specified address
 * @param options - The options for the transaction
 * @extension ERC721
 * @example
 * ```ts
 * import { claimTo } from "thirdweb/extensions/erc721";
 * const tx = await claimTo({
 *   contract,
 *   to: "0x...",
 *   quantity: 1n,
 * });
 * ```
 * @throws If no claim condition is set
 * @returns A promise that resolves with the submitted transaction hash.
 */
export function claimTo(options: BaseTransactionOptions<ClaimToParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      "0x84bb1e42",
      [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "quantity",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "currency",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "pricePerToken",
          type: "uint256",
        },
        {
          components: [
            {
              internalType: "bytes32[]",
              name: "proof",
              type: "bytes32[]",
            },
            {
              internalType: "uint256",
              name: "quantityLimitPerWallet",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "pricePerToken",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "currency",
              type: "address",
            },
          ],
          internalType: "struct IDrop.AllowlistProof",
          name: "allowlistProof",
          type: "tuple",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      [],
    ],
    params: async () => {
      const cc = await getActiveClaimCondition({
        contract: options.contract,
      });
      // TODO implement fetching merkle data
      if (cc.merkleRoot !== padHex("0x", { size: 32 })) {
        throw new Error("Allowlisted claims not implemented yet");
      }
      return [
        options.to, //receiver
        options.quantity, //quantity
        cc.currency, //currency
        cc.pricePerToken, //pricePerToken
        // proof
        {
          currency: cc.currency,
          proof: [],
          quantityLimitPerWallet: cc.quantityLimitPerWallet,
          pricePerToken: cc.pricePerToken,
        },
        // end proof
        "0x", //data
      ] as const;
    },
    value: async () => {
      // TODO this should not be refetched
      const cc = await getActiveClaimCondition({
        contract: options.contract,
      });
      return cc.pricePerToken * BigInt(options.quantity);
    },
  });
}
