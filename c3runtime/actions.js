'use strict'
{
    C3.Plugins.InstantGamesBridge.Acts = {

        // common
        Initialize() {
            if (this.isInitialized) {
                return Promise.resolve()
            }

            return new Promise(resolve => {
                window.bridge.initialize()
                    .then(() => {
                        window.bridge.advertisement.on('banner_state_changed', state => {
                            this.Trigger(this.conditions.OnBannerStateChanged)

                            switch (state) {
                                case window.bridge.BANNER_STATE.LOADING:
                                    this.Trigger(this.conditions.OnBannerLoading)
                                    break
                                case window.bridge.BANNER_STATE.SHOWN:
                                    this.Trigger(this.conditions.OnBannerShown)
                                    break
                                case window.bridge.BANNER_STATE.HIDDEN:
                                    this.Trigger(this.conditions.OnBannerHidden)
                                    break
                                case window.bridge.BANNER_STATE.FAILED:
                                    this.Trigger(this.conditions.OnBannerFailed)
                                    break
                            }
                        })

                        window.bridge.advertisement.on('interstitial_state_changed', state => {
                            this.Trigger(this.conditions.OnInterstitialStateChanged)

                            switch (state) {
                                case window.bridge.INTERSTITIAL_STATE.LOADING:
                                    this.Trigger(this.conditions.OnInterstitialLoading)
                                    break
                                case window.bridge.INTERSTITIAL_STATE.OPENED:
                                    this.Trigger(this.conditions.OnInterstitialOpened)
                                    break
                                case window.bridge.INTERSTITIAL_STATE.CLOSED:
                                    this.Trigger(this.conditions.OnInterstitialClosed)
                                    break
                                case window.bridge.INTERSTITIAL_STATE.FAILED:
                                    this.Trigger(this.conditions.OnInterstitialFailed)
                                    break
                            }
                        })

                        window.bridge.advertisement.on('rewarded_state_changed', state => {
                            this.Trigger(this.conditions.OnRewardedStateChanged)

                            switch (state) {
                                case window.bridge.REWARDED_STATE.LOADING:
                                    this.Trigger(this.conditions.OnRewardedLoading)
                                    break
                                case window.bridge.REWARDED_STATE.OPENED:
                                    this.Trigger(this.conditions.OnRewardedOpened)
                                    break
                                case window.bridge.REWARDED_STATE.REWARDED:
                                    this.Trigger(this.conditions.OnRewardedRewarded)
                                    break
                                case window.bridge.REWARDED_STATE.CLOSED:
                                    this.Trigger(this.conditions.OnRewardedClosed)
                                    break
                                case window.bridge.REWARDED_STATE.FAILED:
                                    this.Trigger(this.conditions.OnRewardedFailed)
                                    break
                            }
                        })

                        window.bridge.game.on('visibility_state_changed', state => {
                            this.Trigger(this.conditions.OnVisibilityStateChanged)
                        })
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
                window.bridge.player.authorize(authorizationOptions)
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


        // storage
        GetStorageData(key, storageType) {
            this.isLastGetStorageDataGotSuccessfully = false

            switch (storageType) {
                case 0:
                    storageType = null
                    break
                case 1:
                    storageType = "local_storage"
                    break
                case 2:
                    storageType = "platform_internal"
                    break
            }

            return new Promise(resolve => {
                window.bridge.storage.get(key, storageType)
                    .then(data => {
                        if (!this.storageData) {
                            this.storageData = {}
                        }

                        this.storageData[key] = data
                        this.isLastGetStorageDataGotSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnGetStorageDataCompleted)
                        resolve()
                    })
            })
        },
        SetStorageData(key, value, storageType) {
            this.isLastSetStorageDataSetSuccessfully = false

            switch (storageType) {
                case 0:
                    storageType = null
                    break
                case 1:
                    storageType = "local_storage"
                    break
                case 2:
                    storageType = "platform_internal"
                    break
            }

            if (!this.storageData) {
                this.storageData = {}
            }

            this.storageData[key] = value
            return new Promise(resolve => {
                window.bridge.storage.set(key, value, storageType)
                    .then(() => {
                        this.isLastSetStorageDataSetSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnSetStorageDataCompleted)
                        resolve()
                    })
            })
        },
        DeleteStorageData(key, storageType) {
            this.isLastDeleteStorageDataDeletedSuccessfully = false

            switch (storageType) {
                case 0:
                    storageType = null
                    break
                case 1:
                    storageType = "local_storage"
                    break
                case 2:
                    storageType = "platform_internal"
                    break
            }

            return new Promise(resolve => {
                window.bridge.storage.delete(key, storageType)
                    .then(() => {
                        if (this.storageData) {
                            delete this.storageData[key]
                        }

                        this.isLastDeleteStorageDataDeletedSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnDeleteStorageDataCompleted)
                        resolve()
                    })
            })
        },


        // advertisement
        SetMinimumDelayBetweenInterstitial(vk, yandex, crazy_games, absolute_games, mock) {
            let delayOptions = { vk, yandex, crazy_games, absolute_games, mock }
            window.bridge.advertisement.setMinimumDelayBetweenInterstitial(delayOptions)
        },
        ShowBanner(vk, crazy_games) {
            let bannerOptions = { vk, crazy_games }
            window.bridge.advertisement.showBanner(bannerOptions)
        },
        HideBanner() {
            window.bridge.advertisement.hideBanner()
        },
        ShowInterstitial(vk, yandex, crazy_games, absolute_games, mock) {
            let interstitialOptions = { vk, yandex, crazy_games, absolute_games, mock }
            window.bridge.advertisement.showInterstitial(interstitialOptions)
        },
        ShowRewarded() {
            window.bridge.advertisement.showRewarded()
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
                window.bridge.social.share(shareOptions)
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
                window.bridge.social.inviteFriends()
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
                window.bridge.social.joinCommunity(joinCommunityOptions)
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
                window.bridge.social.createPost(createPostOptions)
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
                window.bridge.social.addToHomeScreen()
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
                window.bridge.social.addToFavorites()
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
                window.bridge.social.rate()
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
                window.bridge.leaderboard.setScore(options)
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
                window.bridge.leaderboard.getScore(options)
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
                window.bridge.leaderboard.getEntries(options)
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
                window.bridge.leaderboard.showNativePopup(showNativePopupOptions)
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
