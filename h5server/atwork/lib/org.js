"use strict";

const getOrgAllEmployeesByOrgId = function(orgId, pathId, fetch, pageIndex, pageSize) {
    const send = require("./send_request").bind(this);
    const getPathId = pathId
      ? `&org_id=${pathId}`
      : "";
    const getFetch = fetch === undefined
      ? true
      : `&recursion_fetch=${fetch}`;
    const getPageSize = pageSize
      ? `&page_size=${pageSize}`
      : `&page_size=9999`;
    const getPageIndex = pageSize
      ? `&page_index=${pageIndex}`
      : `&page_index=0`;
    const options = {
      url: `${this.adminServer}/organizations/${orgId}/employees-page?${getFetch}${getPathId}${getPageSize}${getPageIndex}`,
      json: true
    };
    return send(options);
  };

const getOrgInfo = function(orgId) {
	const send = require("./send_request").bind(this);
	const options = {
		url: `${this.adminServer}/admin/organizations/${orgId}/view`,
		json: true
	};
	return send(options);
};
const getOrgInfoById = function(rootId,orgId) {
	const send = require("./send_request").bind(this);
	const options = {
		url: `${this.adminServer}/admin/organizations/${rootId}/view?org_id=${orgId}`, //${rootId}/${orgId}
		json: true
	};
	return send(options);
};

const getOrgSettingInfo = function(orgId) {
	const send = require("./send_request").bind(this);
	const options = {
		url: `${this.adminServer}/admin/organizations/${orgId}/settings`,
		json: true
	};
	return send(options);
};
module.exports = function(context) {
	return {
        getOrgAllEmployeesByOrgId: getOrgAllEmployeesByOrgId.bind(context),
		getOrgInfo: getOrgInfo.bind(context),
        getOrgSettingInfo: getOrgSettingInfo.bind(context),
        getOrgInfoById: getOrgInfoById.bind(context)
	};
};