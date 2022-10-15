export class StorageService {
  public save(key: string, object: object) {
    localStorage.setItem(key, JSON.stringify(object));
  }

  public get(key: string) {
    if (!localStorage.getItem(key)) return null;
    return JSON.parse(localStorage.getItem(key)!);
  }
}
