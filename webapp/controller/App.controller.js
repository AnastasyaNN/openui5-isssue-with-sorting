sap.ui.define([
	"sap/ui/Device",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
	"sap/m/BusyDialog",
	"thirdparties/lodash/lodash.min"
], (Device, Controller, Filter, FilterOperator, JSONModel, BusyDialog, _) => {
	"use strict";

	return Controller.extend("sap.ui.demo.todo.controller.App", {

		vm: {
			todos: [
				{
					"title": "Start this app",
					"creator": "Main User",
					"completed": true,
					"date": "1065713283000",
					"dummy1": "Dummy1 for Start this app",
					"dummy2": "Dummy2 for Start this app",
					"dummy3": "Dummy3 for Start this app",
					"dummy4": "Dummy4 for Start this app"
				},
				{
					"title": "Learn OpenUI5",
					"creator": "Test User",
					"completed": false,
					"date": "1697563926000",
					"dummy1": "Dummy1 for Learn OpenUI5",
					"dummy2": "Dummy2 for Learn OpenUI5",
					"dummy3": "Dummy3 for Learn OpenUI5",
					"dummy4": "Dummy4 for Learn OpenUI5"
				}
			],
			sorter: {},
			map: {
				"TITLE": "title",
				"CREATOR": "creator",
				"DATE": "date"
			}
		},

		onInit: async function () {
			const jsonModel = new JSONModel();
			jsonModel.setData(this.vm);
			this.getView().setModel(jsonModel, "vm");

			this.vm.sorter = {
				"DATE": "Descending"
			};
			console.log("this.vm.sorter.DATE = ", this.vm.sorter.DATE)
			console.log(`I'm going to call 'this.getView().getModel("vm").refresh();'`)
			this.getView().getModel("vm").refresh();
			console.log("NEW VALUE of this.vm.sorter.DATE = ", this.vm.sorter.DATE)
			await this._emulateRequestToBackend()
			this.getView().getModel("vm").refresh();
		},

		onSortChanged: async function (evt) {
			const columnName = evt.getParameters().column.getName();
			if (columnName) {
				evt.preventDefault();

				const sortOrder = evt.getParameters().sortOrder;
				const columnAdded = evt.getParameters().columnAdded;
				if (!columnAdded) {
					this.vm.sorter = {};
				}
				this.vm.sorter[columnName] = sortOrder;
				await this._emulateRequestToBackend()
			}
		},

		_emulateRequestToBackend: async function () {
			const that = this;
			const busyDialog = new BusyDialog()
			busyDialog.open();
			const sortKeys = [];
			const sortOrder = [];
			_.keys(that.vm.sorter).forEach(sortKey => {
				sortKeys.push(that.vm.map[sortKey] || sortKey)
				sortOrder.push(that.vm.sorter[sortKey] === "Descending" ? "desc" : "asc")
			})
			setTimeout(() => {
				const result = _.orderBy(that.vm.todos, sortKeys, sortOrder);
				that.vm.todos = result;
				this.getView().getModel("vm").refresh();
				busyDialog.close();
			}, 500)
		}
	});

});
