'use strict'
{
	C3.Plugins.InstantGamesBridge.Acts = {
		Initialize() {
			return new Promise(resolve => {
				window.instantGamesBridge.initialize()
					.then(() => {
						this.platformId = window.instantGamesBridge.platform.id

						window.instantGamesBridge.advertisement.on('interstitial_state_changed', state => {
							this.interstitialState = state
							this.Trigger(this.conditions.OnInterstitialStateChanged)
						})

						window.instantGamesBridge.advertisement.on('rewarded_state_changed', state => {
							this.rewardedState = state
							this.Trigger(this.conditions.OnRewardedStateChanged)
						})

						resolve()
					})
			})
		},
		GetGameData(key) {
			return window.instantGamesBridge.game.getData(key)
				.then(data => {
					if (!this.gameData)
						this.gameData = { }

					this.gameData[key] = data
				})
		},
		SetGameData(key, value) {
			if (!this.gameData)
				this.gameData = { }

			this.gameData[key] = value
			return window.instantGamesBridge.game.setData(key, value)
		},
		ShowInterstitial() {
			return window.instantGamesBridge.advertisement.showInterstitial()
		},
		ShowRewarded() {
			return window.instantGamesBridge.advertisement.showRewarded()
		}
	}
}