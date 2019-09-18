"use strict";
const assert = require("assert");
const storeModule = require("./lib/store");
const notifyModule = require("./lib/notify");
const ticketModule = require("./lib/ticket");
const employeeModule = require("./lib/employee");
const orgModule = require("./lib/org");
const appModule = require("./lib/app");
const send = require("./lib/send_request");
const getToken = require("./lib/getToken");
/**
	使用这个模块必须指定：
	1，域id
	2，机构id，
	3，管理后台地址
**/
const getApi = function(context) {
	const ctx = Object.assign({}, context);
	ctx.adminServer = ctx.adminServer.replace(new RegExp("/+$"), "");
	const store = storeModule(ctx);
	const notify = notifyModule(ctx);
	const ticket = ticketModule(ctx);
	const employee = employeeModule(ctx);
	const org = orgModule(ctx);
	const app = appModule(ctx);
	return {
		uploadImage: store.uploadImage,
		getImageLink: store.getImageLink,
		translate: store.translate,
		uploadFile: store.uploadFile,
		notifyWithText: notify.notifyWithText,
		notifyWithImageText: notify.notifyWithImageText,
		validateUserTicket: ticket.validateUserTicket,
		searchForEmployee: employee.searchForEmployee, //雇员信息
        getOrgInfo: org.getOrgInfo, //机构信息
        getOrgInfoById: org.getOrgInfoById,
        getOrgSettingInfo: org.getOrgSettingInfo, //机构设置
        getOrgAllEmployeesByOrgId: org.getOrgAllEmployeesByOrgId,
		getEmployeeById: employee.getEmployeeById,
		isUserOfThisApp: app.isUserOfThisApp,
		isAdminOfThisApp: app.isAdminOfThisApp,
		send: send.bind(ctx), //暴露send方法，以便调用其它没有被封装的接口
		getToken: getToken.bind(ctx)
	};
};
const dealWithSuppliedToken = function(options) {
	assert(options.token, "token can't be null");
	assert(options.adminServer, "adminServer can't be null");
	assert(options.domainId, "domainId can't be null");
	assert(options.orgId, "orgId can't be null");
	assert(options.suiteKey, "suiteKey can't be null");
	assert(options.appId, "appId can't be null");
	assert(options.getAccessToken, "getAccessToken can't be null");
	assert(options.getAccessToken.constructor === Function, "getAccessToken should be a function");
	//options.isIsv = true;
	options.sourceType = "ISV";
	options.clientId = options.appId;
	return getApi(options);
};

const dealWithoutToken = function(options) {
	assert(options.clientId, "clientId can't be null");
	assert(options.clientSecret, "clientSecret can't be null");
	assert(options.adminServer, "adminServer can't be null");
	assert(options.domainId, "domainId can't be null");
	assert(options.orgId, "orgId can't be null");
	options.sourceType = "NATIVE";
	return getApi(options);
};

const Atwork = function(options = {}) {
	if (options.token) {
		return dealWithSuppliedToken(options);
	} else {
		return dealWithoutToken(options);
	}
};

Atwork.isTokenExist = function(type, domainId, orgId, suiteKey) {
	let tokenModule;
	if (type === "isv") {
		tokenModule = require("./lib/isv_token")();
	} else if (type === "simple") {
		tokenModule = require("./lib/standard_token")();
	} else {
		throw new Error("not support type", type);
	}
	return tokenModule.isTokenExist(domainId, orgId, suiteKey);
};
module.exports = Atwork;