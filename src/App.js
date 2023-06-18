import { useEffect, useState } from 'react'
import {
  slingshotABI,
  votingEscrowABI,
  userAddress,
  slingshotAddress,
  votingEscrowAddress,
  jsonRpcProviderUrl,
} from './data'
import { formatNumber, getDayMonthYear, truncateString } from './utils'

const ethers = require('ethers')

function App() {
  const [unlockedSlingTokens, setUnlockedSlingTokens] = useState(null)
  const [lockedTokens, setLockedTokens] = useState(null)
  const [votingPower, setVotingPower] = useState(null)
  const [unlockDate, setUnlockDate] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getContractBalances = async () => {
      try {
        setIsLoading(true)

        //Provider
        const provider = new ethers.providers.JsonRpcProvider(
          jsonRpcProviderUrl
        )

        //Contracts
        const slingshotContract = new ethers.Contract(
          slingshotAddress,
          slingshotABI,
          provider
        )
        const votingEscrowContract = new ethers.Contract(
          votingEscrowAddress,
          votingEscrowABI,
          provider
        )

        //Unlocked Sling Tokens
        const unlockedSlingTokensBigNumber = await slingshotContract.balanceOf(
          userAddress
        )
        const unlockedSlingTokensFormatted = ethers.utils.formatEther(
          unlockedSlingTokensBigNumber
        )
        setUnlockedSlingTokens(formatNumber(unlockedSlingTokensFormatted))

        //Locked Values
        const lockedTokensArray = await votingEscrowContract.locked(userAddress)

        //Locked Tokens
        const lockedTokensBigNumber = lockedTokensArray['amount']
        const lockedTokensFormatted = ethers.utils.formatEther(
          lockedTokensBigNumber
        )
        setLockedTokens(formatNumber(lockedTokensFormatted))

        //Unlock Date
        const dayMonthYear = getDayMonthYear(
          new Date(lockedTokensArray['end'].toNumber() * 1000)
        )
        setUnlockDate(dayMonthYear)

        //Voting Power
        const votingPowerBigNumber = await votingEscrowContract[
          'balanceOf(address)'
        ](userAddress)
        const votingPowerFormatted =
          ethers.utils.formatEther(votingPowerBigNumber)
        setVotingPower(formatNumber(votingPowerFormatted))
      } catch (error) {
        throw new Error(error)
      } finally {
        setIsLoading(false)
      }
    }

    getContractBalances()
  }, [])

  return (
    <div className="bg-gray-100 h-screen center">
      <header>
        <link href="/dist/output.css" rel="stylesheet"></link>
      </header>
      {isLoading ? (
        <p className="text-4xl font-extrabold text-blue-900">Loading....</p>
      ) : (
        <div className="stack gap-3 sm:gap-10 w-[600px] p-3">
          <p className="text-3xl sm:text-6xl font-extrabold text-blue-900 text-center">
            Your Wallet.
          </p>
          <p className="flex-wrap hidden sm:block text-gray-500">
            {userAddress}
          </p>
          <p className="flex-wrap sm:hidden block text-gray-500">
            {truncateString(userAddress)}
          </p>
          <div className="stack w-full gap-3 flex-col sm:flex-row">
            <div className="bg-gray-100 w-full h-full rounded-lg shadow-lg p-4 gap-2 flex flex-col">
              <p>Unlocked $SLING Tokens</p>
              <p className="text-3xl sm:text-5xl font-extrabold text-blue-900">
                {unlockedSlingTokens}
              </p>
            </div>
            <div className="bg-gray-100 w-full h-full rounded-lg shadow-lg p-4 gap-2 flex flex-col">
              <p>Locked Tokens</p>
              <p className="text-3xl sm:text-5xl font-extrabold text-blue-900">
                {lockedTokens}
              </p>
            </div>
          </div>
          <div className="bg-gray-100 w-full h-full rounded-lg shadow-lg flex flex-col p-4 gap-2">
            <p>Voting Power</p>
            <p className="text-3xl sm:text-5xl font-extrabold text-blue-900">
              {votingPower}
            </p>
            <hr className="w-full" />
            <div className="flex flex-col text-xs">
              <p className="text-gray-500">Unlock Date</p>
              {unlockDate && (
                <p>{`${unlockDate.day} ${unlockDate.month} ${unlockDate.year}`}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
