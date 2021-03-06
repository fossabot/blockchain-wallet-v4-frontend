import { concat, curry, filter, map, sequence, reduce } from 'ramda'
import { Remote } from 'blockchain-wallet-v4/src'
import { selectors } from 'data'

export const getData = (state, ownProps) => {
  const { exclude = [], excludeImported, excludeLockbox } = ownProps
  const excluded = filter(x => !exclude.includes(x.label))
  const toDropdown = map(x => ({ label: x.label, value: x }))
  const toGroup = curry((label, options) => [{ label, options }])

  const getAddressesData = () => {
    return sequence(Remote.of, [
      selectors.core.common.btc
        .getActiveAccountsBalances(state)
        .map(excluded)
        .map(toDropdown)
        .map(toGroup('Wallet')),
      excludeImported
        ? Remote.of([])
        : selectors.core.common.btc
            .getAddressesBalances(state)
            .map(toDropdown)
            .map(toGroup('Imported Addresses')),
      excludeLockbox
        ? Remote.of([])
        : selectors.core.common.btc
            .getLockboxBtcBalances(state)
            .map(excluded)
            .map(toDropdown)
            .map(toGroup('Lockbox'))
    ]).map(([b1, b2, b3]) => ({ data: reduce(concat, [], [b1, b2, b3]) }))
  }
  return getAddressesData()
}
