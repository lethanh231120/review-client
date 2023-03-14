
export const mapScamReason = (input) => {
  const SCAM_REASON = {
    'scam or dead project': 'Scam or Dead Project, Total LP on DEX smaller than 300$. High Slippage alert!',
    'execution reverted: TransferHelper: TRANSFER_FROM_FAILED': 'TransferHelper: TRANSFER_FROM_FAILED. This means that you\'re unable to swap the token. In most cases, the token is a scam, and you won\'t be able to get your money back!',
    'execution reverted: Pancake: INSUFFICIENT_LIQUIDITY_MINTED': 'INSUFFICIENT_LIQUIDITY_MINTED. This means on DEX there aren\'t enough buyers or sellers at the given price. This can result from a new product or asset having a very low trading volume!',
    'execution reverted: Pancake: TRANSFER_FAILED': 'TRANSFER_FAILED. The exact reason for the transfer failure may vary depending on the specific system or service used, but some possible causes include insufficient account balance, incorrect or incomplete recipient information, transaction limit exceeded, network or system connection errors, long processing times, and system errors.',
    'execution reverted: UniswapV2Library: INSUFFICIENT_LIQUIDITY': 'INSUFFICIENT_LIQUIDITY. On trading platforms, insufficient liquidity is a message that means there aren\'t enough buyers or sellers at the given price. This can result from a new product or asset having a very low trading volume.',
    'execution reverted: PancakeLibrary: INSUFFICIENT_LIQUIDITY': 'INSUFFICIENT_LIQUIDITY. On trading platforms, insufficient liquidity is a message that means there aren\'t enough buyers or sellers at the given price. This can result from a new product or asset having a very low trading volume.',
    'execution reverted: ERC721: owner query for nonexistent token': 'ERC721: owner query for nonexistent token. This  indicates that the user is attempting to query the ownership of a token that does not exist on the blockchain, either because it has not yet been minted, has been burned, or has an invalid token ID.'
  }

  let msg = input
  input && Object.keys(SCAM_REASON)?.forEach(key =>{
    if (key === input) {
      msg = SCAM_REASON[key]
    }
  })
  return msg
}
