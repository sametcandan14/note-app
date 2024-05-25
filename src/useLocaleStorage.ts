// custom hook

import { useEffect, useState } from "react";

// react hooklarına benzer görev yapan ama kendi oluşturduğumuz hooklar

// veriyi ve veriyi değiştirecek fonksiyonu dönerler

export function useLocaleStorage<T>(key: string, initialValue: T | (() => T)) {
  // state i tanımlarız ve ilk değerini locale storagedan alırız.
  const [value, setValue] = useState<T>(() => {
    // localden saklanan değerleri al
    const jsonValue = localStorage.getItem(key);

    //localde eleman yoksa başlangıç değerini belirleriz.

    if (jsonValue === null) {
      if (typeof initialValue === "function") {
        // eğer başlangıç değeri fonksiyonsa bu fonksiyonun sonucunu kullanırız.
        return (initialValue as () => T)();
      } else {
        // eğer başlangıç değeri fonksiyon değilse değeri direkt kullanırız.
        return initialValue;
      }
    } else {
      // localde eleman bulunursa bu değeri geri döndürme
      return JSON.parse(jsonValue);
    }
  });

  // use effect kullanarak value her değiştiğinde locale kaydeder.

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // bileşenlere döndürülecek değer ve fonksiyonu belirleme

  return [value, setValue] as [T, typeof setValue];
}
