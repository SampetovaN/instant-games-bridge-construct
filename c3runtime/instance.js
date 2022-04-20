'use strict'
{
    C3.Plugins.InstantGamesBridge.Instance = class InstantGamesBridgeInstance extends C3.SDKInstanceBase {
        constructor(inst, properties) {
            super(inst)

            this.conditions = C3.Plugins.InstantGamesBridge.Cnds
            this.actions = C3.Plugins.InstantGamesBridge.Acts

            if (properties[0])
                this._runtime.AddLoadPromise(this.loadSdk())

            this.instantGamesBridgeOptions = {
                platforms: {
                    vk: {
                        groupId: null
                    },
                    yandex: {
                        authorization: {
                            scopes: false
                        }
                    },
                    mock: {
                        social: {
                            simulateShare: false,
                            simulateInviteFriends: false,
                            simulateJoinCommunity: false,
                            simulateCreatePost: false,
                            simulateAddToHomeScreen: false,
                            simulateAddToFavorites: false
                        },
                        advertisement: {
                            simulateInterstitial: false,
                            simulateRewarded: false
                        }
                    }
                }
            }

            if (properties[1])
                this.instantGamesBridgeOptions.platforms.vk.groupId = properties[1]

            if (properties[2])
                this.instantGamesBridgeOptions.platforms.yandex.authorization.scopes = properties[2]

            if (properties[3])
                this.instantGamesBridgeOptions.platforms.mock.social.simulateShare = properties[3]

            if (properties[4])
                this.instantGamesBridgeOptions.platforms.mock.social.simulateInviteFriends = properties[4]

            if (properties[5])
                this.instantGamesBridgeOptions.platforms.mock.social.simulateJoinCommunity = properties[5]

            if (properties[6])
                this.instantGamesBridgeOptions.platforms.mock.social.simulateCreatePost = properties[6]

            if (properties[7])
                this.instantGamesBridgeOptions.platforms.mock.social.simulateAddToHomeScreen = properties[7]

            if (properties[8])
                this.instantGamesBridgeOptions.platforms.mock.social.simulateAddToFavorites = properties[8]

            if (properties[9])
                this.instantGamesBridgeOptions.platforms.mock.advertisement.simulateInterstitial = properties[9]

            if (properties[10])
                this.instantGamesBridgeOptions.platforms.mock.advertisement.simulateRewarded = properties[10]

            this.gameData = null
        }

        loadSdk() {
            return new Promise((resolve, reject) => {
                try {
                    ((d) => {
                        let t = d.getElementsByTagName('script')[0]
                        let s = d.createElement('script')
                        s.src = 'https://cdn.jsdelivr.net/gh/instant-games-bridge/instant-games-bridge@1.3.0/dist/instant-games-bridge.js'
                        s.async = true
                        s.onload = () => {
                            resolve()
                        }
                        t.parentNode.insertBefore(s, t)
                    })(document)
                } catch (error) {
                    console.error(error)
                    reject(error)
                }
            })
        }

        Release() {
            super.Release()
        }

        SaveToJson() {
            return {
                gameData: this.gameData
            }
        }

        LoadFromJson(o) {
            this.gameData = o.gameData || { }
        }

        GetDebuggerProperties() {
            return [ {
                title: 'InstantGamesBridge',
                properties: []
            }]
        }
    }
}