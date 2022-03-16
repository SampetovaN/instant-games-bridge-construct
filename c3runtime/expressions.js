'use strict'
{
	C3.Plugins.InstantGamesBridge.Exps = {
		PlatformId() {
			return this.platformId
		},
		GameData(key) {
			if (!this.gameData)
				return null

			return this.gameData[key]
		},
		HasGameData(key) {
			if (!this.gameData)
				return 0

			let value = this.gameData[key]
			return value !== null && typeof value !== 'undefined' ? 1 : 0
		},
		InterstitialState() {
			return this.interstitialState
		},
		RewardedState() {
			return this.rewardedState
		}
	}
}