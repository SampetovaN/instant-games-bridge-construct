'use strict'
{
    C3.Plugins.InstantGamesBridge.Cnds = {
        // common
        OnInitializationCompleted() {
            return true
        },
        IsInitialized() {
            return this.isInitialized
        },


        // player
        IsPlayerAuthorizationSupported() {
            return window.instantGamesBridge.player.isAuthorizationSupported
        },
        IsAuthorized() {
            return window.instantGamesBridge.player.isAuthorized
        },
        OnAuthorizePlayerCompleted() {
            return true
        },
        IsLastAuthorizePlayerAuthorizedSuccessfully() {
            return this.isLastAuthorizePlayerAuthorizedSuccessfully
        },
        DoesPlayerHaveName() {
            return typeof window.instantGamesBridge.player.name === 'string'
        },
        DoesPlayerHavePhoto(index) {
            return window.instantGamesBridge.player.photos.length > index
        },


        // game
        OnGetGameDataCompleted() {
            return true
        },
        IsLastGetGameDataGotSuccessfully() {
            return this.isLastGetGameDataGotSuccessfully
        },
        OnSetGameDataCompleted() {
            return true
        },
        IsLastSetGameDataSetSuccessfully() {
            return this.isLastSetGameDataSetSuccessfully
        },
        OnDeleteGameDataCompleted() {
            return true
        },
        IsLastDeleteGameDataDeletedSuccessfully() {
            return this.isLastDeleteGameDataDeletedSuccessfully
        },
        HasGameData(key) {
            if (!this.gameData)
                return 0

            let value = this.gameData[key]
            return value !== null && typeof value !== 'undefined'
        },


        // advertisement
        OnShowInterstitialCompleted() {
            return true
        },
        IsLastShowInterstitialShownSuccessfully() {
            return this.isLastShowInterstitialShownSuccessfully
        },
        OnInterstitialStateChanged() {
            return true
        },

        OnShowRewardedCompleted() {
            return true
        },
        IsLastShowRewardedShownSuccessfully() {
            return this.isLastShowRewardedShownSuccessfully
        },
        OnRewardedStateChanged() {
            return true
        },


        // social
        IsShareSupported() {
            return window.instantGamesBridge.social.isShareSupported
        },
        OnShareCompleted() {
            return true
        },
        IsLastShareSharedSuccessfully() {
            return this.isLastShareSharedSuccessfully
        },

        IsInviteFriendsSupported() {
            return window.instantGamesBridge.social.isInviteFriendsSupported
        },
        OnInviteFriendsCompleted() {
            return true
        },
        IsLastInviteFriendsInvitedSuccessfully() {
            return this.isLastInviteFriendsInvitedSuccessfully
        },

        IsJoinCommunitySupported() {
            return window.instantGamesBridge.social.isJoinCommunitySupported
        },
        OnJoinCommunityCompleted() {
            return true
        },
        IsLastJoinCommunityJoinedSuccessfully() {
            return this.isLastJoinCommunityJoinedSuccessfully
        },

        IsCreatePostSupported() {
            return window.instantGamesBridge.social.isCreatePostSupported
        },
        OnCreatePostCompleted() {
            return true
        },
        IsLastCreatePostCreatedSuccessfully() {
            return this.isLastCreatePostCreatedSuccessfully
        },

        IsAddToHomeScreenSupported() {
            return window.instantGamesBridge.social.isAddToHomeScreenSupported
        },
        OnAddToHomeScreenCompleted() {
            return true
        },
        IsLastAddToHomeScreenAddedSuccessfully() {
            return this.isLastAddToHomeScreenAddedSuccessfully
        },

        IsAddToFavoritesSupported() {
            return window.instantGamesBridge.social.isAddToFavoritesSupported
        },
        OnAddToFavoritesCompleted() {
            return true
        },
        IsLastAddToFavoritesAddedSuccessfully() {
            return this.isLastAddToFavoritesAddedSuccessfully
        },

        IsRateSupported() {
            return window.instantGamesBridge.social.isRateSupported
        },
        OnRateCompleted() {
            return true
        },
        IsLastRateRatedSuccessfully() {
            return this.isLastRateRatedSuccessfully
        },


        // leaderboard
        IsLeaderboardSupported() {
            return window.instantGamesBridge.leaderboard.isSupported
        },
        IsLeaderboardNativePopupSupported() {
            return window.instantGamesBridge.leaderboard.isNativePopupSupported
        },
        IsLeaderboardMultipleBoardsSupported() {
            return window.instantGamesBridge.leaderboard.isMultipleBoardsSupported
        },
        IsLeaderboardSetScoreSupported() {
            return window.instantGamesBridge.leaderboard.isSetScoreSupported
        },
        IsLeaderboardGetScoreSupported() {
            return window.instantGamesBridge.leaderboard.isGetScoreSupported
        },
        IsLeaderboardGetEntriesSupported() {
            return window.instantGamesBridge.leaderboard.isGetEntriesSupported
        },

        OnLeaderboardSetScoreCompleted() {
            return true
        },
        OnLeaderboardGetScoreCompleted() {
            return true
        },
        OnLeaderboardGetEntriesCompleted() {
            return true
        },
        OnLeaderboardShowNativePopupCompleted() {
            return true
        },

        IsLastLeaderboardSetScoreSetSuccessfully() {
            return this.isLastLeaderboardSetScoreSetSuccessfully
        },
        IsLastLeaderboardGetScoreGotSuccessfully() {
            return this.isLastLeaderboardGetScoreGotSuccessfully
        },
        IsLastLeaderboardGetEntriesGotSuccessfully() {
            return this.isLastLeaderboardGetEntriesGotSuccessfully
        },
        IsLastLeaderboardShowNativePopupShownSuccessfully() {
            return this.isLastLeaderboardShowNativePopupShownSuccessfully
        },

        DoesLeaderboardEntryPlayerHaveName(entryIndex) {
            if (this.leaderboardEntries === null)
                return false

            let entry = this.leaderboardEntries[entryIndex]
            if (entry === undefined)
                return false

            return typeof entry.name === 'string'
        },
        DoesLeaderboardEntryPlayerHavePhoto(entryIndex, photoIndex) {
            if (this.leaderboardEntries === null)
                return false

            let entry = this.leaderboardEntries[entryIndex]
            if (entry === undefined)
                return false

            return entry.photos.length > photoIndex
        },
    }
}