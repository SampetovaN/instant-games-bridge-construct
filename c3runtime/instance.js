'use strict'
{
    C3.Plugins.InstantGamesBridge.Instance = class InstantGamesBridgeInstance extends C3.SDKInstanceBase {
        constructor(inst, properties) {
            super(inst)

            this.conditions = C3.Plugins.InstantGamesBridge.Cnds
            this.actions = C3.Plugins.InstantGamesBridge.Acts

            if (properties[0])
                this._runtime.AddLoadPromise(this.loadSdk())

            this.gameData = null
        }

        loadSdk() {
            return new Promise((resolve, reject) => {
                try {
                    ((d) => {
                        let t = d.getElementsByTagName('script')[0]
                        let s = d.createElement('script')
                        s.src = 'https://cdn.jsdelivr.net/gh/instant-games-bridge/instant-games-bridge@1.4.5/dist/instant-games-bridge.js'
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