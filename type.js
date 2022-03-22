'use strict'
{
    const PLUGIN_CLASS = SDK.Plugins.InstantGamesBridge

    PLUGIN_CLASS.Type = class InstantGamesBridgeType extends SDK.ITypeBase {
        constructor(sdkPlugin, iObjectType) {
            super(sdkPlugin, iObjectType)
        }
    }
}