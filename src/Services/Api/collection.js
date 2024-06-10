import { deleteApi, getApi, patchApi, postApi } from "./methods";

export const route = {
  login: "creator/creator-login",
  forget: "creator/forget-password",
  get_profile: "creator/view-profile?account_id=",
  send_phone_otp: "user/send-otp-to-number",
  verify_phone_otp: "user/verify-phone-number-otp",
  verify_email_otp: "user/verify-otp",
  reset_password: "user/reset-password",
  update_profile: "user/update-profile",
  upload_content: "user/upload-content",
  analytic_overview: "creator/analytics-overview?type=",
  analytic_overview_top_content: "creator/top-content?",
  analytic_content_overview: "creator/content-overview?",
  analytic_content_engagement: "creator/content-engagements?",
  analytic_content_audience: "creator/content-audience?",
  analytic_content_reach: "creator/content-reach?",
  analytic_content_audience_gender: "creator/content-analytics-by-gender?",
  analytic_content_audience_age: "creator/content-analytics-by-age?",
  analytic_content_audience_subscribe:
    "creator/content-analytics-by-subscribe?",
  analytic_content_audience_country: "creator/content-analytics-by-country?",
  dashboard_published_content: "creator/published-content?",
  dashboard_top_content: "creator/top-v-content?type=",
  dashboard_mostly_download_content: "creator/most-downloaded-content?type=",
  dashboard_subscribe_count: "creator/subscribers-count?type=",
  dashboard_most_active_time: "creator/most-active-time",
  creator_content_list: "creator/uploaded-content-listing?",
  upload_content_file: "user/upload-content",
  content_series_list: "creator/series-listing?",
  delete_content: "user/delete-content?content_id=",
  delete_series_and_episode: "user/delete-series-content?",
  analytic_content: "creator/content-analytics?",
  analytic_audience: "creator/audience-analytics?",
  analytic_content_views_count: "creator/content-views?type=",
  analytic_content_audience_retention:
    "creator/content-audience-retention?type=",
  add_creator_content: "user/add-content",
  view_user_list: "user/view-all-users",
  schedule_event: "user/add-event",
  schedule_podcast: "user/add-podcast",
  edit_series: "user/edit-series",
  edit_series_content: "user/edit-series-content",
  content_details: "creator/content-detail?content_id=",
  edit_content: "creator/edit-content",
};

export const loginAPI = (payload) => postApi(route.login, payload);

export const getProfileAPI = (_id) => getApi(route.get_profile + _id);

export const forgetAPI = (payload) => postApi(route.forget, payload);

export const sendPhoneNoOTP = (payload) =>
  postApi(route.send_phone_otp, payload);

export const verifyPhoneOTP = (payload) =>
  postApi(route.verify_phone_otp, payload);

export const verifyEmailOTP = (payload) =>
  postApi(route.verify_email_otp, payload);

export const resetPasswordAPI = (payload) =>
  postApi(route.reset_password, payload);

export const updateProfileAPI = (payload) =>
  postApi(route.update_profile, payload);

export const updateContentAPI = (payload) =>
  postApi(route.upload_content, payload);

export const getAnalyticOverviewAPI = (params) =>
  getApi(route.analytic_overview + params);

export const getAnalyticsTopContentAPI = (params) =>
  getApi(route.analytic_overview_top_content + params);

export const getAnalyticsContentOverviewAPI = (params) =>
  getApi(route.analytic_content_overview + params);

export const getAnalyticsContentEngagementAPI = (params) =>
  getApi(route.analytic_content_engagement + params);

export const getAnalyticsContentAudienceAPI = (params) =>
  getApi(route.analytic_content_audience + params);

export const getAnalyticsContentReachAPI = (params) =>
  getApi(route.analytic_content_reach + params);

export const getContentGenderAnalyticsAPI = (params) =>
  getApi(route.analytic_content_audience_gender + params);

export const getContentAgeAnalyticsAPI = (params) =>
  getApi(route.analytic_content_audience_age + params);

export const getContentSubscribeAnalyticsAPI = (params) =>
  getApi(route.analytic_content_audience_subscribe + params);

export const getContentCountryAnalyticsAPI = (params) =>
  getApi(route.analytic_content_audience_country + params);

export const getDashboardPublishedContentAPI = (params) =>
  getApi(route.dashboard_published_content + params);

export const getDashboardTopContentAPI = (filterType) =>
  getApi(route.dashboard_top_content + filterType);

export const getDashboardMostDownloadApi = (type) =>
  getApi(route.dashboard_mostly_download_content + type);

export const getDashboardSubscribeCountApi = (type) =>
  getApi(route.dashboard_subscribe_count + type);

export const getCreatorContentListApi = (params) =>
  getApi(route.creator_content_list + params);

export const uploadContentFileAPI = (payload) =>
  postApi(route.upload_content_file, payload);

export const getSeriesContentListApi = (params) =>
  getApi(route.content_series_list + params);

export const deleteContentApi = (contentId) =>
  deleteApi(`${route.delete_content}${contentId}`);

export const deleteSeriesApi = (payload) =>
  deleteApi(route.delete_series_and_episode + payload);

export const getContentAnalyticDataApi = (params) =>
  getApi(route.analytic_content + params);

export const getAudienceAnalyticDataApi = (params) =>
  getApi(route.analytic_audience + params);

export const getAnalyticContentViewCountApi = (params) =>
  getApi(route.analytic_content_views_count + params);

export const getAnalyticContentRetentionApi = (selectDay) =>
  getApi(route.analytic_content_audience_retention + selectDay);

export const getDashboardMostActiveTimeApi = () =>
  getApi(route.dashboard_most_active_time);

export const addCreatorContentAPI = (payload) =>
  postApi(route.add_creator_content, payload);

export const getUserListApi = () => getApi(route.view_user_list);

export const scheduleEventAPI = (payload) =>
  postApi(route.schedule_event, payload);

export const schedulePodcast = (payload) =>
  postApi(route.schedule_podcast, payload);

export const editSeries = (payload) => patchApi(route.edit_series, payload);

export const editSeriesContent = (payload) =>
  patchApi(route.edit_series_content, payload);

export const getContentDetails = (contentId) =>
  getApi(route.content_details + contentId);

export const editContentInfo = (payload) =>
  patchApi(route.edit_content, payload);
