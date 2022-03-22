'use strict'
{
    C3.Plugins.InstantGamesBridge.Acts = {
        Initialize() {
            return new Promise(resolve => {
                window.instantGamesBridge.initialize()
                    .then(() => {
                        this.platform = window.instantGamesBridge.platform

                        window.instantGamesBridge.advertisement.on('interstitial_state_changed', state => {
                            this.interstitialState = state
                            this.Trigger(this.conditions.OnInterstitialStateChanged)
                        })

                        window.instantGamesBridge.advertisement.on('rewarded_state_changed', state => {
                            this.rewardedState = state
                            this.Trigger(this.conditions.OnRewardedStateChanged)
                        })

                        resolve()
                    })
            })
        },
        GetGameData(key) {
            return new Promise(resolve => {
                window.instantGamesBridge
                    .game
                    .getData(key)
                    .then(data => {
                        if (!this.gameData)
                            this.gameData = {}

                        this.gameData[key] = data
                        resolve()
                    })
                    .catch(error => console.log(error))
            })
        },
        SetGameData(key, value) {
            if (!this.gameData)
                this.gameData = { }

            this.gameData[key] = value
            return new Promise(resolve => {
                window.instantGamesBridge
                    .game
                    .setData(key, value)
                    .catch(error => console.log(error))
                    .finally(() => resolve())
            })
        },
        SetMinimumDelayBetweenInterstitial(value) {
            window.instantGamesBridge.advertisement.setMinimumDelayBetweenInterstitial(value)
        },
        ShowInterstitial(ignoreDelay) {
            let options = { ignoreDelay }
            return new Promise(resolve => {
                window.instantGamesBridge
                    .advertisement
                    .showInterstitial(options)
                    .catch(error => console.log(error))
                    .finally(() => resolve())
            })
        },
        ShowRewarded() {
            return new Promise(resolve => {
                window.instantGamesBridge
                    .advertisement
                    .showRewarded()
                    .catch(error => console.log(error))
                    .finally(() => resolve())
            })
        }
    }
}