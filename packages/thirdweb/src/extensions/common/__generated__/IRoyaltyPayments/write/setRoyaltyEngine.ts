import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import { prepareContractCall } from "../../../../../transaction/prepare-contract-call.js";
import type { Prettify } from "../../../../../utils/type-utils.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";

/**
 * Represents the parameters for the "setRoyaltyEngine" function.
 */

type SetRoyaltyEngineParamsInternal = {
  royaltyEngineAddress: AbiParameterToPrimitiveType<{
    type: "address";
    name: "_royaltyEngineAddress";
  }>;
};

export type SetRoyaltyEngineParams = Prettify<
  | SetRoyaltyEngineParamsInternal
  | {
      asyncParams: () => Promise<SetRoyaltyEngineParamsInternal>;
    }
>;
const FN_SELECTOR = "0x21ede032" as const;
const FN_INPUTS = [
  {
    type: "address",
    name: "_royaltyEngineAddress",
  },
] as const;
const FN_OUTPUTS = [] as const;

/**
 * Encodes the parameters for the "setRoyaltyEngine" function.
 * @param options - The options for the setRoyaltyEngine function.
 * @returns The encoded ABI parameters.
 * @extension COMMON
 * @example
 * ```
 * import { encodeSetRoyaltyEngineParams } "thirdweb/extensions/common";
 * const result = encodeSetRoyaltyEngineParams({
 *  royaltyEngineAddress: ...,
 * });
 * ```
 */
export function encodeSetRoyaltyEngineParams(
  options: SetRoyaltyEngineParamsInternal,
) {
  return encodeAbiParameters(FN_INPUTS, [options.royaltyEngineAddress]);
}

/**
 * Calls the "setRoyaltyEngine" function on the contract.
 * @param options - The options for the "setRoyaltyEngine" function.
 * @returns A prepared transaction object.
 * @extension COMMON
 * @example
 * ```
 * import { setRoyaltyEngine } from "thirdweb/extensions/common";
 *
 * const transaction = setRoyaltyEngine({
 *  royaltyEngineAddress: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function setRoyaltyEngine(
  options: BaseTransactionOptions<SetRoyaltyEngineParams>,
) {
  return prepareContractCall({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
    params:
      "asyncParams" in options
        ? async () => {
            const resolvedParams = await options.asyncParams();
            return [resolvedParams.royaltyEngineAddress] as const;
          }
        : [options.royaltyEngineAddress],
  });
}
