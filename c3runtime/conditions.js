'use strict'
{
    C3.Plugins.InstantGamesBridge.Cnds = {
        // common
        OnInitializationCompleted() {
            return true
        },
        IsInitialized() {
            return window.bridge.isInitialized
        },


        // player
        IsPlayerAuthorizationSupported() {
            return window.bridge.player.isAuthorizationSupported
        },
        IsAuthorized() {
            return window.bridge.player.isAuthorized
        },
        OnAuthorizePlayerCompleted() {
            return true
        },
        IsLastAuthorizePlayerAuthorizedSuccessfully() {
            return this.isLastAuthorizePlayerAuthorizedSuccessfully
        },
        DoesPlayerHaveName() {
            return typeof window.bridge.player.name === 'string'
        },
        DoesPlayerHavePhoto(index) {
            return window.bridge.player.photos.length > index
        },


        // game
        OnVisibilityStateChanged() {
            return true
        },


        // storage
        OnGetStorageDataCompleted() {
            return true
        },
        IsLastGetStorageDataGotSuccessfully() {
            return this.isLastGetStorageDataGotSuccessfully
        },
        OnSetStorageDataCompleted() {
            return true
        },
        IsLastSetStorageDataSetSuccessfully() {
            return this.isLastSetStorageDataSetSuccessfully
        },
        OnDeleteStorageDataCompleted() {
            return true
        },
        IsLastDeleteStorageDataDeletedSuccessfully() {
            return this.isLastDeleteStorageDataDeletedSuccessfully
        },
        HasStorageData(key) {
            if (!this.storageData)
                return 0

            let value = this.storageData[key]
            return value !== null && typeof value !== 'undefined'
        },
        IsStorageSupported(storageType) {
            switch (storageType) {
                case 0:
                    storageType = "local_storage"
                    break
                case 1:
                    storageType = "platform_internal"
                    break
            }

            return window.bridge.storage.isSupported(storageType)
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
            return window.bridge.social.isShareSupported
        },
        OnShareCompleted() {
            return true
        },
        IsLastShareSharedSuccessfully() {
            return this.isLastShareSharedSuccessfully
        },

        IsInviteFriendsSupported() {
            return window.bridge.social.isInviteFriendsSupported
        },
        OnInviteFriendsCompleted() {
            return true
        },
        IsLastInviteFriendsInvitedSuccessfully() {
            return this.isLastInviteFriendsInvitedSuccessfully
        },

        IsJoinCommunitySupported() {
            return window.bridge.social.isJoinCommunitySupported
        },
        OnJoinCommunityCompleted() {
            return true
        },
        IsLastJoinCommunityJoinedSuccessfully() {
            return this.isLastJoinCommunityJoinedSuccessfully
        },

        IsCreatePostSupported() {
            return window.bridge.social.isCreatePostSupported
        },
        OnCreatePostCompleted() {
            return true
        },
        IsLastCreatePostCreatedSuccessfully() {
            return this.isLastCreatePostCreatedSuccessfully
        },

        IsAddToHomeScreenSupported() {
            return window.bridge.social.isAddToHomeScreenSupported
        },
        OnAddToHomeScreenCompleted() {
            return true
        },
        IsLastAddToHomeScreenAddedSuccessfully() {
            return this.isLastAddToHomeScreenAddedSuccessfully
        },

        IsAddToFavoritesSupported() {
            return window.bridge.social.isAddToFavoritesSupported
        },
        OnAddToFavoritesCompleted() {
            return true
        },
        IsLastAddToFavoritesAddedSuccessfully() {
            return this.isLastAddToFavoritesAddedSuccessfully
        },

        IsRateSupported() {
            return window.bridge.social.isRateSupported
        },
        OnRateCompleted() {
            return true
        },
        IsLastRateRatedSuccessfully() {
            return this.isLastRateRatedSuccessfully
        },


        // leaderboard
        IsLeaderboardSupported() {
            return window.bridge.leaderboard.isSupported
        },
        IsLeaderboardNativePopupSupported() {
            return window.bridge.leaderboard.isNativePopupSupported
        },
        IsLeaderboardMultipleBoardsSupported() {
            return window.bridge.leaderboard.isMultipleBoardsSupported
        },
        IsLeaderboardSetScoreSupported() {
            return window.bridge.leaderboard.isSetScoreSupported
        },
        IsLeaderboardGetScoreSupported() {
            return window.bridge.leaderboard.isGetScoreSupported
        },
        IsLeaderboardGetEntriesSupported() {
            return window.bridge.leaderboard.isGetEntriesSupported
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