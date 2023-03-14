
export const mapScamReason = (input) => {
  const SCAM_REASON = {
    'TRANSFER_FROM_FAILED': 'Report Ad. The “TRANSFER_FROM_FAILED” error on PancakeSwap means that you\'re unable to swap the token. In most cases, the token is a scam, and you won\'t be able to get your money back',
    'INSUFFICIENT_LIQUIDITY': 'On trading platforms, insufficient liquidity is a message that means there aren\'t enough buyers or sellers at the given price. This can result from a new product or asset having a very low trading volume.',
    'owner query for nonexistent token': 'The "owner query for nonexistent token" error in ERC721 indicates that the user is attempting to query the ownership of a token that does not exist on the blockchain, either because it has not yet been minted, has been burned, or has an invalid token ID.',
    'TRANSFER_FAILED': 'The exact reason for the transfer failure may vary depending on the specific system or service used, but some possible causes include insufficient account balance, incorrect or incomplete recipient information, transaction limit exceeded, network or system connection errors, long processing times, and system errors.',
    'approve from the zero address': '"approve from the zero address" refers to an error that occurs when a user attempts to execute the approve function from the zero address The zero address is an invalid address that should not be used as a valid Ethereum address, as it has no owner and cannot initiate transactions or interact with smart contracts. Therefore, attempting to execute the approve function from the zero address is not allowed and will result in an error.',
    'approve to the zero address': 'It indicates that an attempt has been made to grant approval for token transfer to the zero address. The zero address is a reserved Ethereum address that cannot receive tokens or participate in any transactions. Therefore, granting approval to the zero address effectively nullifies the approval, as there is no valid recipient address to receive the approved tokens.',
    'NOT_AUTHORIZED': 'a transaction or operation failed to execute because the user or entity attempting to execute it did not have the necessary authorization or permission to do so.',
    'ERC721: invalid token ID ': 'error occurs when a user attempts to perform an operation on a non-existent or invalid token ID in an ERC721 contract',
    'STBX: not whitelisted address': '"STBX: not whitelisted address" is associated with the STBOX token and usually occurs when a user tries to transfer or interact with the token using an address that is not whitelisted or approved by the token contract.',
    'Unimplemented': ' "Unimplemented" error message may occur when a user or application attempts to perform a transaction or operation that is not yet supported by the blockchain network or cryptocurrency protocol they are using.',
    'INSUFFICIENT_OUTPUT_AMOUNT': 'It indicates that the output amount specified for a swap or trade is insufficient to complete the transaction.This error may occur due to various reasons, such as insufficient liquidity in the trading pair, incorrect pricing or slippage settings, or a programming error in the smart contract code. ',
    'INSUFFICIENT_INPUT_AMOUNT': 'It indicates that the input amount specified for a swap or trade is insufficient to complete the transaction. This error may occur due to various reasons, such as insufficient balance in the user\'s wallet, incorrect token allowances or approvals, or a programming error in the smart contract code.',
    'ds-math-sub-underflow': 'error messages that can occur in Ethereum-based smart contracts that use the DSMath library to perform mathematical calculations. "ds-math-sub-underflow" indicates that a subtraction operation has resulted in an underflow, which occurs when the result of the subtraction is less than zero. This can occur when the result of an arithmetic operation is smaller than the minimum value that can be represented by the data type being used.',
    'ds-math-mul-overflow': 'error messages that can occur in Ethereum-based smart contracts that use the DSMath library to perform mathematical calculations. "ds-math-mul-overflow" indicates that a multiplication operation has resulted in an overflow, which occurs when the result of the multiplication is larger than the maximum value that can be represented by the data type being used. This can occur when the result of an arithmetic operation is larger than the maximum value that can be represented by the data type being used.',
    'OVERFLOW': 'The "OVERFLOW" error message typically occurs when a transaction or operation has exceeded the maximum value that can be represented by a given data type. This can happen when performing mathematical calculations or when working with large numbers.',
    'APPROVAL_NOT_SUPPORTED': 'This error message indicates that the particular token being used does not support the "approve" function,',
    'ERC20: token must be unlocked before approve': 'The "ERC20: token must be unlocked before approve" error message typically occurs when a user or smart contract attempts to approve a transfer of tokens before the tokens have been unlocked or made available for transfer.',
    'APPROVE MODIFIES BALANCE': 'The "APPROVE MODIFIES BALANCE" error typically occurs when a user or smart contract attempts to call the approve function on an ERC20 token contract in a way that modifies the token balance of the approving address.',
    'WMCOIN_DividendTracker: method not implemented': 'The "WMCOIN_DividendTracker: method not implemented" error typically occurs when a method or function in the WMCOIN_DividendTracker smart contract is called, but the method has not been implemented or is missing from the contract code.',
    'approve caller is not owner nor approved for all': 'This error message typically occurs when a smart contract function is attempting to perform an action that requires the caller to have approval from the owner or be approved for all.',
    'EnumerableMap: nonexistent key': 'The "EnumerableMap: nonexistent key" error typically occurs when a smart contract function tries to access a key that does not exist in an EnumerableMap.'
  }

  let msg = input
  input && Object.keys(SCAM_REASON)?.forEach(key =>{
    if (input?.includes(key)) {
      msg = `${key}` + ' : ' + `${SCAM_REASON[key]}`
    }
  })
  return msg
}
