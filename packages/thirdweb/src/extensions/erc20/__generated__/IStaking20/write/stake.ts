import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import { prepareContractCall } from "../../../../../transaction/prepare-contract-call.js";
import type { Prettify } from "../../../../../utils/type-utils.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";

/**
 * Represents the parameters for the "stake" function.
 */

type StakeParamsInternal = {
  amount: AbiParameterToPrimitiveType<{ type: "uint256"; name: "amount" }>;
};

export type StakeParams = Prettify<
  | StakeParamsInternal
  | {
      asyncParams: () => Promise<StakeParamsInternal>;
    }
>;
const FN_SELECTOR = "0xa694fc3a" as const;
const FN_INPUTS = [
  {
    type: "uint256",
    name: "amount",
  },
] as const;
const FN_OUTPUTS = [] as const;

/**
 * Encodes the parameters for the "stake" function.
 * @param options - The options for the stake function.
 * @returns The encoded ABI parameters.
 * @extension ERC20
 * @example
 * ```
 * import { encodeStakeParams } "thirdweb/extensions/erc20";
 * const result = encodeStakeParams({
 *  amount: ...,
 * });
 * ```
 */
export function encodeStakeParams(options: StakeParamsInternal) {
  return encodeAbiParameters(FN_INPUTS, [options.amount]);
}

/**
 * Calls the "stake" function on the contract.
 * @param options - The options for the "stake" function.
 * @returns A prepared transaction object.
 * @extension ERC20
 * @example
 * ```
 * import { stake } from "thirdweb/extensions/erc20";
 *
 * const transaction = stake({
 *  amount: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function stake(options: BaseTransactionOptions<StakeParams>) {
  return prepareContractCall({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
    params:
      "asyncParams" in options
        ? async () => {
            const resolvedParams = await options.asyncParams();
            return [resolvedParams.amount] as const;
          }
        : [options.amount],
  });
}
