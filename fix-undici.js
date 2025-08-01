// Script para resolver problemas de compatibilidade com undici
// Este arquivo deve ser executado antes do index.js

// Polyfill para File API se não estiver disponível
if (typeof globalThis.File === 'undefined') {
  globalThis.File = class File {
    constructor(fileBits, fileName, options = {}) {
      this.name = fileName;
      this.type = options.type || '';
      this.lastModified = options.lastModified || Date.now();
      this.size = 0;
      if (fileBits) {
        this.size = fileBits.reduce((acc, bit) => acc + bit.length, 0);
      }
    }
  };
}

// Polyfill para FormData se necessário
if (typeof globalThis.FormData === 'undefined') {
  globalThis.FormData = class FormData {
    constructor() {
      this._data = [];
    }
    
    append(name, value) {
      this._data.push([name, value]);
    }
    
    get(name) {
      const entry = this._data.find(([key]) => key === name);
      return entry ? entry[1] : null;
    }
  };
}

console.log('✅ Polyfills para compatibilidade carregados'); 