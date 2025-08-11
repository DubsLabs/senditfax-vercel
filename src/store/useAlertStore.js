import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

const useAlertStore = create((set, get) => ({
  alerts: [],

  // Hadlers for Easy Access
  addSuccess: (message) => {
    get().addAlert("success", message);
  },

  addInfo: (message) => {
    get().addAlert("info", message);
  },

  addWarning: (message) => {
    get().addAlert("warning", message);
  },

  addError: (message) => {
    get().addAlert("error", message);
  },

  // Core Functions for Display Alerts
  addAlert: (type, message) => {
    const id = uuidv4();

    set((state) => ({
      alerts: [...state.alerts, { id, type, message, visible: true }],
    }));

    setTimeout(() => {
      get().hideAlert(id);
    }, 9500);
  },

  hideAlert: (id) => {
    set((state) => ({
      alerts: state.alerts.map((alert) => (alert.id === id ? { ...alert, visible: false } : alert)),
    }));

    setTimeout(() => {
      set((state) => ({
        alerts: state.alerts.filter((alert) => alert.id !== id),
      }));
    }, 500);
  },
}));

export default useAlertStore;
