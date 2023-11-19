export function getStorage(key, defaultValue = null) {
    return localStorage.getItem(key) ?? defaultValue;
}
