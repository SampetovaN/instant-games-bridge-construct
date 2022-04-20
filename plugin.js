'use strict'
{
    const PLUGIN_ID = 'InstantGamesBridge'
    const PLUGIN_VERSION = '1.3.0'
    const PLUGIN_CATEGORY = 'platform-specific'

    const PLUGIN_CLASS = (SDK.Plugins.InstantGamesBridge = class InstantGamesBridgePlugin extends SDK.IPluginBase {
        constructor() {
            super(PLUGIN_ID)

            SDK.Lang.PushContext('plugins.' + PLUGIN_ID.toLowerCase())
            this._info.SetName(lang('.name'))
            this._info.SetDescription(lang('.description'))
            this._info.SetVersion(PLUGIN_VERSION)
            this._info.SetCategory(PLUGIN_CATEGORY)
            this._info.SetAuthor(lang('.author'))
            this._info.SetHelpUrl(lang('.help-url'))
            this._info.SetIsSingleGlobal(true)
            this._info.SetSupportedRuntimes(['c3'])

            SDK.Lang.PushContext('.properties')
            this._info.SetProperties([
                new SDK.PluginProperty('check', 'load-sdk-from-cdn', true),
                new SDK.PluginProperty('integer', 'vk-group-id', 0),
                new SDK.PluginProperty('check', 'yandex-authorization-scopes', true),
                new SDK.PluginProperty('check', 'mock-simulate-share', false),
                new SDK.PluginProperty('check', 'mock-simulate-invite-friends', false),
                new SDK.PluginProperty('check', 'mock-simulate-join-community', false),
                new SDK.PluginProperty('check', 'mock-simulate-create-post', false),
                new SDK.PluginProperty('check', 'mock-simulate-add-to-home-screen', false),
                new SDK.PluginProperty('check', 'mock-simulate-add-to-favorites', false),
                new SDK.PluginProperty('check', 'mock-simulate-interstitial', false),
                new SDK.PluginProperty('check', 'mock-simulate-rewarded', false)
            ]);

            SDK.Lang.PopContext()
            SDK.Lang.PopContext()
        }
    })

    PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS)
}