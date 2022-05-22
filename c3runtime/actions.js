'use strict'
{
    C3.Plugins.InstantGamesBridge.Acts = {

        // common
        Initialize() {
            if (this.isInitialized)
                return Promise.resolve()

            return new Promise(resolve => {
                window.instantGamesBridge.initialize()
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
        AuthorizePlayer(yandexScopes) {
            this.isLastAuthorizePlayerAuthorizedSuccessfully = false

            let authorizationOptions = {
                yandex: {
                    scopes: yandexScopes
                }
            }

            return new Promise(resolve => {
                window.instantGamesBridge.player.authorize(authorizationOptions)
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
        SetMinimumDelayBetweenInterstitial(vk, yandex, mock) {
            let delayOptions = { vk, yandex, mock }
            window.instantGamesBridge.advertisement.setMinimumDelayBetweenInterstitial(delayOptions)
        },
        ShowInterstitial(vk, yandex, mock) {
            this.isLastShowInterstitialShownSuccessfully = false

            let interstitialOptions = { vk, yandex, mock }
            return new Promise(resolve => {
                window.instantGamesBridge.advertisement.showInterstitial(interstitialOptions)
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
        Share(vkLink) {
            this.isLastShareSharedSuccessfully = false

            let shareOptions = {
                vk: {
                    link: vkLink
                }
            }

            return new Promise(resolve => {
                window.instantGamesBridge.social.share(shareOptions)
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
        JoinCommunity(vkGroupId) {
            this.isLastJoinCommunityJoinedSuccessfully = false

            let joinCommunityOptions = {
                vk: {
                    groupId: vkGroupId
                }
            }

            return new Promise(resolve => {
                window.instantGamesBridge.social.joinCommunity(joinCommunityOptions)
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
        CreatePost(vkMessage, vkAttachments) {
            this.isLastCreatePostCreatedSuccessfully = false

            let createPostOptions = {
                vk: {
                    message: vkMessage,
                    attachments: vkAttachments
                }
            }

            return new Promise(resolve => {
                window.instantGamesBridge.social.createPost(createPostOptions)
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
        },
        Rate() {
            this.isLastRateRatedSuccessfully = false

            return new Promise(resolve => {
                window.instantGamesBridge.social.rate()
                    .then(() => {
                        this.isLastRateRatedSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnRateCompleted)
                        resolve()
                    })
            })
        },


        LeaderboardSetScore(yandexLeaderboardName, yandexScore) {
            this.isLastLeaderboardSetScoreSetSuccessfully = false

            let options = {
                yandex: {
                    leaderboardName: yandexLeaderboardName,
                    score: yandexScore
                }
            }

            return new Promise(resolve => {
                window.instantGamesBridge.leaderboard.setScore(options)
                    .then(() => {
                        this.isLastLeaderboardSetScoreSetSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnLeaderboardSetScoreCompleted)
                        resolve()
                    })
            })
        },
        LeaderboardGetScore(yandexLeaderboardName) {
            this.leaderboardPlayerScore = null
            this.isLastLeaderboardGetScoreGotSuccessfully = false

            let options = {
                yandex: {
                    leaderboardName: yandexLeaderboardName
                }
            }

            return new Promise(resolve => {
                window.instantGamesBridge.leaderboard.getScore(options)
                    .then(score => {
                        this.leaderboardPlayerScore = score
                        this.isLastLeaderboardGetScoreGotSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnLeaderboardGetScoreCompleted)
                        resolve()
                    })
            })
        },
        LeaderboardGetEntries(yandexLeaderboardName, yandexIncludeUser, yandexQuantityAround, yandexQuantityTop) {
            this.leaderboardEntries = null
            this.isLastLeaderboardGetEntriesGotSuccessfully = false

            let options = {
                yandex: {
                    leaderboardName: yandexLeaderboardName,
                    includeUser: yandexIncludeUser,
                    quantityAround: yandexQuantityAround,
                    quantityTop: yandexQuantityTop
                }
            }

            return new Promise(resolve => {
                window.instantGamesBridge.leaderboard.getEntries(options)
                    .then(entries => {
                        this.leaderboardEntries = entries
                        this.isLastLeaderboardGetEntriesGotSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnLeaderboardGetEntriesCompleted)
                        resolve()
                    })
            })
        },
        LeaderboardShowNativePopup(vkUserResult, vkGlobal) {
            this.isLastShowNativePopupShownSuccessfully = false

            let showNativePopupOptions = {
                vk: {
                    userResult: vkUserResult,
                    global: vkGlobal
                }
            }

            return new Promise(resolve => {
                window.instantGamesBridge.leaderboard.showNativePopup(showNativePopupOptions)
                    .then(() => {
                        this.isLastShowNativePopupShownSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnShowNativePopupCompleted)
                        resolve()
                    })
            })
        }
    }
}