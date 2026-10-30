/**
 * NASLA DIGITAL Storage Service
 * Provides safe, namespaced LocalStorage persistence with error handling & fallback.
 */

import { SITE_CONFIG } from '../config/site.config';

export class StorageService {
  /**
   * Safely gets item from localStorage with JSON parsing and fallback
   */
  static getItem<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const serialized = localStorage.getItem(key);
      if (serialized === null) return fallback;
      return JSON.parse(serialized) as T;
    } catch (err) {
      console.error(`[StorageService] Failed to read or parse key "${key}":`, err);
      return fallback;
    }
  }

  /**
   * Safely sets item into localStorage
   */
  static setItem<T>(key: string, value: T): boolean {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error(`[StorageService] Failed to write key "${key}":`, err);
      return false;
    }
  }

  /**
   * Removes specific key from localStorage
   */
  static removeItem(key: string): boolean {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.removeItem(key);
      return true;
    } catch (err) {
      console.error(`[StorageService] Failed to remove key "${key}":`, err);
      return false;
    }
  }

  /**
   * Resets all template namespaced keys in localStorage
   */
  static resetAllTemplateData(): void {
    if (typeof window === 'undefined') return;
    try {
      Object.values(SITE_CONFIG.STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch (err) {
      console.error('[StorageService] Failed to reset template data:', err);
    }
  }
}
