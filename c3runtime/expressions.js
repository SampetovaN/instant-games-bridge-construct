'use strict'
{
    C3.Plugins.InstantGamesBridge.Exps = {
        PlatformId() {
            return window.instantGamesBridge.platform.id
        },
        PlatformLanguage() {
            return window.instantGamesBridge.platform.language
        },
        PlatformPayload() {
            return window.instantGamesBridge.platform.payload
        },
        GameData(key) {
            if (!this.gameData)
                return null

            return this.gameData[key]
        },
        InterstitialState() {
            return this.interstitialState
        },
        RewardedState() {
            return this.rewardedState
        }
    }
}