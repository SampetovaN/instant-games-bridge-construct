'use strict'
{
	const PLUGIN_CLASS = SDK.Plugins.InstantGamesBridge

	PLUGIN_CLASS.Instance = class InstantGamesBridgeInstance extends SDK.IInstanceBase {
		constructor(sdkType, inst){
			super(sdkType, inst)
		}

		Release() {}

		OnCreate() {}

		OnPropertyChanged(id, value) {}

		LoadC2Property(name, valueString) {
			return false
		}
	}
}