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

                        if (this.showInterstitialOnInit) {
                            if (window.bridge.platform.id === window.bridge.PLATFORM_ID.YANDEX || window.bridge.platform.id === window.bridge.PLATFORM_ID.GAME_DISTRIBUTION) {
                                window.bridge.advertisement.showInterstitial()
                            }
                        }
                    })
            })
        },


        // Platfrom
        SendMessage(message) {
            switch (message) {
                case 0:
                    message = window.bridge.PLATFORM_MESSAGE.GAME_READY
                    break
                case 1:
                    message = window.bridge.PLATFORM_MESSAGE.IN_GAME_LOADING_STARTED
                    break
                case 2:
                    message = window.bridge.PLATFORM_MESSAGE.IN_GAME_LOADING_STOPPED
                    break
                case 3:
                    message = window.bridge.PLATFORM_MESSAGE.GAMEPLAY_STARTED
                    break
                case 4:
                    message = window.bridge.PLATFORM_MESSAGE.GAMEPLAY_STOPPED
                    break
                case 5:
                    message = window.bridge.PLATFORM_MESSAGE.PLAYER_GOT_ACHIEVEMENT
                    break
            }

            window.bridge.platform.sendMessage(message)
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
        AppendStorageDataGetRequest(key) {
            this.storageDataGetRequestKeys.push(key)
        },
        SendStorageDataGetRequest(storageType) {
            this.isStorageDataGetRequestSuccess = false

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
                window.bridge.storage.get(this.storageDataGetRequestKeys, storageType)
                    .then(data => {
                        if (!this.storageData) {
                            this.storageData = {}
                        }

                        for (let i = 0; i < data.length; i++) {
                            let key = this.storageDataGetRequestKeys[i]
                            let value = data[i]
                            this.storageData[key] = value
                        }

                        this.isStorageDataGetRequestSuccess = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.storageDataGetRequestKeys = []
                        this.Trigger(this.conditions.OnStorageDataGetRequestCompleted)
                        resolve()
                    })
            })
        },
        AppendStorageDataSetRequest(key, value) {
            this.storageDataSetRequestKeys.push(key)
            this.storageDataSetRequestValues.push(value)
        },
        SendStorageDataSetRequest(storageType) {
            this.isStorageDataSetRequestSuccess = false

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
                window.bridge.storage.set(this.storageDataSetRequestKeys, this.storageDataSetRequestValues, storageType)
                    .then(() => {
                        this.isStorageDataSetRequestSuccess = true

                        for (let i = 0; i < this.storageDataSetRequestKeys.length; i++) {
                            let key = this.storageDataSetRequestKeys[i]
                            let value = this.storageDataSetRequestValues[i]
                            this.storageData[key] = value
                        }
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.storageDataSetRequestKeys = []
                        this.storageDataSetRequestValues = []
                        this.Trigger(this.conditions.OnStorageDataSetRequestCompleted)
                        resolve()
                    })
            })
        },
        AppendStorageDataDeleteRequest(key) {
            this.storageDataDeleteRequestKeys.push(key)
        },
        SendStorageDataDeleteRequest(storageType) {
            this.isStorageDataDeleteRequestSuccess = false

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
                window.bridge.storage.delete(this.storageDataDeleteRequestKeys, storageType)
                    .then(() => {
                        if (this.storageData) {
                            for (let i = 0; i < this.storageDataDeleteRequestKeys.length; i++) {
                                let key = this.storageDataDeleteRequestKeys[i]
                                delete this.storageData[key]
                            }
                        }

                        this.isStorageDataDeleteRequestSuccess = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.storageDataDeleteRequestKeys = []
                        this.Trigger(this.conditions.OnStorageDataDeleteRequestCompleted)
                        resolve()
                    })
            })
        },


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
        SetMinimumDelayBetweenInterstitial(vk, yandex, crazy_games, absolute_games, game_distribution, mock) {
            let delayOptions = { vk, yandex, crazy_games, absolute_games, game_distribution, mock }
            window.bridge.advertisement.setMinimumDelayBetweenInterstitial(delayOptions)
        },
        ShowBanner(vk, crazy_games, game_distribution) {
            let bannerOptions = { vk, crazy_games, game_distribution }
            window.bridge.advertisement.showBanner(bannerOptions)
        },
        HideBanner() {
            window.bridge.advertisement.hideBanner()
        },
        ShowInterstitial(vk, yandex, crazy_games, absolute_games, game_distribution, mock) {
            let interstitialOptions = { vk, yandex, crazy_games, absolute_games, game_distribution, mock }
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
            this.isLastLeaderboardShowNativePopupShownSuccessfully = false

            let showNativePopupOptions = {
                vk: {
                    userResult: vkUserResult,
                    global: vkGlobal
                }
            }

            return new Promise(resolve => {
                window.bridge.leaderboard.showNativePopup(showNativePopupOptions)
                    .then(() => {
                        this.isLastLeaderboardShowNativePopupShownSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnShowNativePopupCompleted)
                        resolve()
                    })
            })
        },


        // payments
        PaymentsPurchase(yandexPurchaseId) {
            this.isLastPaymentsPurchasePurchasedSuccessfully = false

            let options = {
                yandex: yandexPurchaseId
            }

            return new Promise(resolve => {
                window.bridge.payments.purchase(options)
                    .then(() => {
                        this.isLastPaymentsPurchasePurchasedSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnPaymentsPurchaseCompleted)
                        resolve()
                    })
            })
        },

        PaymentsGetPurchases() {
            this.isLastPaymentsGetPurchasesGotSuccessfully = false

            return new Promise(resolve => {
                window.bridge.payments.getPurchases()
                    .then(data => {
                        this.isLastPaymentsGetPurchasesGotSuccessfully = true
                        this.paymentsPurchases = data
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnPaymentsGetPurchasesCompleted)
                        resolve()
                    })
            })
        },

        PaymentsGetCatalog() {
            this.isLastPaymentsGetCatalogGotSuccessfully = false

            return new Promise(resolve => {
                window.bridge.payments.getCatalog()
                    .then(data => {
                        this.isLastPaymentsGetCatalogGotSuccessfully = true
                        this.paymentsCatalog = data
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnPaymentsGetCatalogCompleted)
                        resolve()
                    })
            })
        },

        PaymentsConsumePurchase(yandexPurchaseToken) {
            this.isLastPaymentsConsumePurchaseConsumedSuccessfully = false

            let options = {
                yandex: yandexPurchaseToken
            }

            return new Promise(resolve => {
                window.bridge.payments.consumePurchase(options)
                    .then(() => {
                        this.isLastPaymentsConsumePurchaseConsumedSuccessfully = true
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.Trigger(this.conditions.OnPaymentsConsumePurchaseCompleted)
                        resolve()
                    })
            })
        },

        // remote-config

        AppendRemoteConfigGetRequest(name, value) {
            this.remoteConfigGetRequesValues.push({name, value})
        },

        SendRemoteConfigGetRequest() {
            this.isRemoteConfigGotSuccessfully = false
            const params = {defaultFlags: {}, clientFeatures: this.remoteConfigGetRequesValues}
            return new Promise(resolve => {
                window.bridge.remoteConfig.get(params)
                    .then(data => {
                        this.isRemoteConfigGotSuccessfully = true
                        this.remoteConfig = data
                    })
                    .catch(error => console.log(error))
                    .finally(() => {
                        this.remoteConfigGetRequesValues = [];
                        this.Trigger(this.conditions.OnRemoteConfigGotCompleted)
                        resolve()
                    })
            })
        },
    }
}
