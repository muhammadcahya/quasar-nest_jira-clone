interface StorageInterface {
  load: (storageName?: string) => unknown;
  save: (data: unknown, storageName?: string) => void;
}

export default function useLocalStorage(defaultStorageName: string): StorageInterface {
  function load(storageName?: string): unknown {
    try {
      const item = localStorage.getItem(`${defaultStorageName} ${storageName || ''}`);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  }
  function save(data: unknown, storageName?: string) {
    localStorage.setItem(`${defaultStorageName} ${storageName || ''}`, JSON.stringify(data));
  }

  return {
    load,
    save,
  };
}
