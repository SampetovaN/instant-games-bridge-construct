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


        // device
        DeviceType() {
            return window.instantGamesBridge.device.type
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
        },


        // leaderboard
        LeaderboardPlayerScore() {
            if (typeof this.leaderboardPlayerScore !== 'number')
                return 0

            return this.leaderboardPlayerScore
        },
        LeaderboardEntriesCount() {
            if (!this.leaderboardEntries)
                return 0

            return this.leaderboardEntries.length
        },
        LeaderboardEntryPlayerId(entryIndex) {
            if (!this.leaderboardEntries)
                return ''

            return this.leaderboardEntries[entryIndex].id
        },
        LeaderboardEntryPlayerName(entryIndex) {
            if (!this.leaderboardEntries)
                return ''

            return this.leaderboardEntries[entryIndex].name
        },
        LeaderboardEntryPlayerScore(entryIndex) {
            if (!this.leaderboardEntries)
                return 0

            return this.leaderboardEntries[entryIndex].score
        },
        LeaderboardEntryPlayerRank(entryIndex) {
            if (!this.leaderboardEntries)
                return 0

            return this.leaderboardEntries[entryIndex].rank
        },
        LeaderboardEntryPlayerPhotosCount(entryIndex) {
            if (!this.leaderboardEntries)
                return ''

            return this.leaderboardEntries[entryIndex].photos.length
        },
        LeaderboardEntryPlayerPhoto(entryIndex, photoIndex) {
            if (!this.leaderboardEntries)
                return ''

            return this.leaderboardEntries[entryIndex].photos[photoIndex]
        },
    }
}