'use strict'
{
    C3.Plugins.InstantGamesBridge.Cnds = {
        OnInitializationCompleted() {
            return true
        },
        IsInitialized() {
            return this.isInitialized
        },

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
        HasGameData(key) {
            if (!this.gameData)
                return 0

            let value = this.gameData[key]
            return value !== null && typeof value !== 'undefined'
        },

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

        IsCommunitySupported() {
            return window.instantGamesBridge.social.isCommunitySupported
        },
        OnJoinCommunityCompleted() {
            return true
        },
        IsLastJoinCommunityJoinedSuccessfully() {
            return this.isLastJoinCommunityJoinedSuccessfully
        }
    }
}