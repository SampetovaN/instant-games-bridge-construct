'use strict'
{
    C3.Plugins.InstantGamesBridge.Exps = {
        // platform
        PlatformId() {
            return window.instantGamesBridge.platform.id
        },
        PlatformLanguage() {
            return window.instantGamesBridge.platform.language
        },
        PlatformPayload() {
            return window.instantGamesBridge.platform.payload
        },


        // player
        PlayerId() {
            return window.instantGamesBridge.player.id
        },
        PlayerName() {
            return window.instantGamesBridge.player.name
        },
        PlayerPhotosCount() {
            return window.instantGamesBridge.player.photos.length
        },
        PlayerPhoto(index) {
            return window.instantGamesBridge.player.photos[index]
        },


        // game
        GameData(key) {
            if (!this.gameData)
                return null

            return this.gameData[key]
        },


        // advertisement
        MinimumDelayBetweenInterstitial() {
            return window.instantGamesBridge.advertisement.minimumDelayBetweenInterstitial
        },
        InterstitialState() {
            return window.instantGamesBridge.advertisement.interstitialState
        },
        RewardedState() {
            return window.instantGamesBridge.advertisement.rewardedState
        }
    }
}