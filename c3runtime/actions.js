'use strict'
{
    C3.Plugins.InstantGamesBridge.Acts = {

        // common
        Initialize() {
            if (this.isInitialized)
                return Promise.resolve()

            return new Promise(resolve => {
                if (!window.instantGamesBridge) {
                    resolve()
                    return
                }

                window.instantGamesBridge.initialize(this.instantGamesBridgeOptions ? this.instantGamesBridgeOptions : { })
                    .then(() => {
                        window.instantGamesBridge.advertisement.on('interstitial_state_changed', state => {
                            this.interstitialState = state
                            this.Trigger(this.conditions.OnInterstitialStateChanged)
                        })

                        window.instantGamesBridge.advertisement.on('rewarded_state_changed', state => {
                            this.rewardedState = state
                            this.Trigger(this.conditions.OnRewardedStateChanged)
                        })

                        this.isInitialized = true
                    })
                    .finally(() => {
                        this.Trigger(this.conditions.OnInitializationCompleted)
                        resolve()
                    })
            })
        },


        // player
        AuthorizePlayer() {
            this.isLastAuthorizePlayerAuthorizedSuccessfully = false

            return new Promise(resolve => {
                window.instantGamesBridge.player.authorize()
                    .then(() => {
                        this.isLastAuthorizePlayerAuthorizedSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnAuthorizePlayerCompleted)
                        resolve()
                    })
            })
        },


        // game
        GetGameData(key) {
            this.isLastGetGameDataGotSuccessfully = false

            return new Promise(resolve => {
                window.instantGamesBridge.game.getData(key)
                    .then(data => {
                        if (!this.gameData)
                            this.gameData = {}

                        this.gameData[key] = data
                        this.isLastGetGameDataGotSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnGetGameDataCompleted)
                        resolve()
                    })
            })
        },
        SetGameData(key, value) {
            this.isLastSetGameDataSetSuccessfully = false

            if (!this.gameData)
                this.gameData = { }

            this.gameData[key] = value
            return new Promise(resolve => {
                window.instantGamesBridge.game.setData(key, value)
                    .then(() => {
                        this.isLastSetGameDataSetSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnSetGameDataCompleted)
                        resolve()
                    })
            })
        },
        DeleteGameData(key) {
            this.isLastDeleteGameDataDeletedSuccessfully = false

            return new Promise(resolve => {
                window.instantGamesBridge.game.deleteData(key)
                    .then(() => {
                        if (this.gameData)
                            delete this.gameData[key]

                        this.isLastDeleteGameDataDeletedSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnDeleteGameDataCompleted)
                        resolve()
                    })
            })
        },


        // advertisement
        SetMinimumDelayBetweenInterstitial(value) {
            window.instantGamesBridge.advertisement.setMinimumDelayBetweenInterstitial(value)
        },
        ShowInterstitial(ignoreDelay) {
            this.isLastShowInterstitialShownSuccessfully = false

            let options = { ignoreDelay }
            return new Promise(resolve => {
                window.instantGamesBridge.advertisement.showInterstitial(options)
                    .then(() => {
                        this.isLastShowInterstitialShownSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnShowInterstitialCompleted)
                        resolve()
                    })
            })
        },
        ShowRewarded() {
            this.isLastShowRewardedShownSuccessfully = false

            return new Promise(resolve => {
                window.instantGamesBridge.advertisement.showRewarded()
                    .then(() => {
                        this.isLastShowRewardedShownSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnShowRewardedCompleted)
                        resolve()
                    })
            })
        },


        // social
        Share() {
            this.isLastShareSharedSuccessfully = false

            return new Promise(resolve => {
                window.instantGamesBridge.social.share()
                    .then(() => {
                        this.isLastShareSharedSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnShareCompleted)
                        resolve()
                    })
            })
        },
        InviteFriends() {
            this.isLastInviteFriendsInvitedSuccessfully = false

            return new Promise(resolve => {
                window.instantGamesBridge.social.inviteFriends()
                    .then(() => {
                        this.isLastInviteFriendsInvitedSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnInviteFriendsCompleted)
                        resolve()
                    })
            })
        },
        JoinCommunity() {
            this.isLastJoinCommunityJoinedSuccessfully = false

            return new Promise(resolve => {
                window.instantGamesBridge.social.joinCommunity()
                    .then(() => {
                        this.isLastJoinCommunityJoinedSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnJoinCommunityCompleted)
                        resolve()
                    })
            })
        },
        CreatePost(text) {
            this.isLastCreatePostCreatedSuccessfully = false

            return new Promise(resolve => {
                window.instantGamesBridge.social.createPost(text)
                    .then(() => {
                        this.isLastCreatePostCreatedSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnCreatePostCompleted)
                        resolve()
                    })
            })
        },
        AddToHomeScreen() {
            this.isLastAddToHomeScreenAddedSuccessfully = false

            return new Promise(resolve => {
                window.instantGamesBridge.social.addToHomeScreen()
                    .then(() => {
                        this.isLastAddToHomeScreenAddedSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnAddToHomeScreenCompleted)
                        resolve()
                    })
            })
        },
        AddToFavorites() {
            this.isLastAddToFavoritesAddedSuccessfully = false

            return new Promise(resolve => {
                window.instantGamesBridge.social.addToFavorites()
                    .then(() => {
                        this.isLastAddToFavoritesAddedSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnAddToFavoritesCompleted)
                        resolve()
                    })
            })
        }
    }
}