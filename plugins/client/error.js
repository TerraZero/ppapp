import Vue from 'vue';

Vue.config.errorHandler = (error, vue, info) => {
  console.log('[ERROR]: ', error, vue, info);
};

window.onunhandledrejection = (event) => {
  console.log("Logged in window.onunhandledrejection", event);
};