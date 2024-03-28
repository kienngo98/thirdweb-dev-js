import type { AbiParameterToPrimitiveType } from "abitype";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import { prepareContractCall } from "../../../../../transaction/prepare-contract-call.js";
import type { Prettify } from "../../../../../utils/type-utils.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";

/**
 * Represents the parameters for the "createRuleMultiplicative" function.
 */

type CreateRuleMultiplicativeParamsInternal = {
  rule: AbiParameterToPrimitiveType<{
    type: "tuple";
    name: "rule";
    components: [
      { type: "address"; name: "token" },
      { type: "uint8"; name: "tokenType" },
      { type: "uint256"; name: "tokenId" },
      { type: "uint256"; name: "scorePerOwnedToken" },
    ];
  }>;
};

export type CreateRuleMultiplicativeParams = Prettify<
  | CreateRuleMultiplicativeParamsInternal
  | {
      asyncParams: () => Promise<CreateRuleMultiplicativeParamsInternal>;
    }
>;
const FN_SELECTOR = "0x1e2e9cb5" as const;
const FN_INPUTS = [
  {
    type: "tuple",
    name: "rule",
    components: [
      {
        type: "address",
        name: "token",
      },
      {
        type: "uint8",
        name: "tokenType",
      },
      {
        type: "uint256",
        name: "tokenId",
      },
      {
        type: "uint256",
        name: "scorePerOwnedToken",
      },
    ],
  },
] as const;
const FN_OUTPUTS = [
  {
    type: "bytes32",
    name: "ruleId",
  },
] as const;

/**
 * Encodes the parameters for the "createRuleMultiplicative" function.
 * @param options - The options for the createRuleMultiplicative function.
 * @returns The encoded ABI parameters.
 * @extension THIRDWEB
 * @example
 * ```
 * import { encodeCreateRuleMultiplicativeParams } "thirdweb/extensions/thirdweb";
 * const result = encodeCreateRuleMultiplicativeParams({
 *  rule: ...,
 * });
 * ```
 */
export function encodeCreateRuleMultiplicativeParams(
  options: CreateRuleMultiplicativeParamsInternal,
) {
  return encodeAbiParameters(FN_INPUTS, [options.rule]);
}

/**
 * Calls the "createRuleMultiplicative" function on the contract.
 * @param options - The options for the "createRuleMultiplicative" function.
 * @returns A prepared transaction object.
 * @extension THIRDWEB
 * @example
 * ```
 * import { createRuleMultiplicative } from "thirdweb/extensions/thirdweb";
 *
 * const transaction = createRuleMultiplicative({
 *  rule: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function createRuleMultiplicative(
  options: BaseTransactionOptions<CreateRuleMultiplicativeParams>,
) {
  return prepareContractCall({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
    params:
      "asyncParams" in options
        ? async () => {
            const resolvedParams = await options.asyncParams();
            return [resolvedParams.rule] as const;
          }
        : [options.rule],
  });
}
