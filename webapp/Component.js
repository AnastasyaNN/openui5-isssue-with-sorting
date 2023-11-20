sap.ui.loader.config({
	async: true,
	shim: {
		"thirdparties/lodash/lodash.min": {
			amd: true,
			exports: "_"
		}
	}
});

sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/core/ComponentSupport"
], (UIComponent) => {
	"use strict";
	return UIComponent.extend("sap.ui.demo.todo.Component", {
		metadata: {
			manifest: "json"
		}
	});
});
