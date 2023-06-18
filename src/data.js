export const slingshotABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

export const votingEscrowABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'locked',
    outputs: [
      {
        internalType: 'int128',
        name: 'amount',
        type: 'int128',
      },
      {
        internalType: 'uint256',
        name: 'end',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]

export const userAddress = '0x2b86a55603541b22f941ba278b443710ff780cb2'
export const slingshotAddress = '0x50a8d3dC9fdC3A86d67e4E7C8220C290Eb8e35De'
export const votingEscrowAddress = '0x7194F9cE45B3CbfbB6e658Da98078D15D3f4e3a0'
export const jsonRpcProviderUrl = 'https://rpc.ankr.com/polygon_mumbai'
