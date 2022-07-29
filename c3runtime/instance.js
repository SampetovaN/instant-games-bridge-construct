'use strict'
{
    C3.Plugins.InstantGamesBridge.Instance = class InstantGamesBridgeInstance extends C3.SDKInstanceBase {
        constructor(inst, properties) {
            super(inst)

            this.conditions = C3.Plugins.InstantGamesBridge.Cnds
            this.actions = C3.Plugins.InstantGamesBridge.Acts

            if (properties[0]) {
                this._runtime.AddLoadPromise(this.loadSdk())
            }

            if (properties[1]) {
                this._runtime.AddLoadPromise(this.initializeSdk())
            }

            this.storageData = null
        }

        loadSdk() {
            return new Promise((resolve, reject) => {
                try {
                    ((d) => {
                        let t = d.getElementsByTagName('script')[0]
                        let s = d.createElement('script')
                        s.src = 'https://cdn.jsdelivr.net/gh/instant-games-bridge/instant-games-bridge@1.5.1/dist/instant-games-bridge.js'
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

        initializeSdk() {
            return new Promise((resolve, reject) => {
                const waitForBridgeLoaded = () => {
                    if (window.bridge !== undefined) {
                        window.bridge.initialize()
                            .then(() => {
                                window.bridge.advertisement.on('interstitial_state_changed', state => {
                                    this.Trigger(this.conditions.OnInterstitialStateChanged)
                                })

                                window.bridge.advertisement.on('rewarded_state_changed', state => {
                                    this.Trigger(this.conditions.OnRewardedStateChanged)
                                })

                                window.bridge.game.on('visibility_state_changed', state => {
                                    this.Trigger(this.conditions.OnVisibilityStateChanged)
                                })

                                resolve()
                            })
                            .catch(error => reject(error))
                    } else {
                        setTimeout(waitForBridgeLoaded, 100)
                    }
                }

                waitForBridgeLoaded()
            })
        }

        Release() {
            super.Release()
        }

        SaveToJson() {
            return {
                storageData: this.storageData
            }
        }

        LoadFromJson(o) {
            this.storageData = o.storageData || { }
        }

        GetDebuggerProperties() {
            return [{
                title: 'InstantGamesBridge',
                properties: []
            }]
        }
    }
}