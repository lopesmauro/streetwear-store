import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  read<T>(key: string, fallback: T): T {
    if (typeof localStorage === 'undefined') return fallback;
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : (JSON.parse(value) as T);
    } catch {
      return fallback;
    }
  }

  write<T>(key: string, value: T): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage may be unavailable or full. The in-memory state remains usable.
    }
  }
}
