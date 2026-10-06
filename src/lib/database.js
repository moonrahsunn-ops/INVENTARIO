import Dexie from 'dexie';

// Crear base de datos local
export const db = new Dexie('inventoryApp');

// Definir la estructura de las tablas (tal como estaban en Base44)
db.version(1).stores({
  products: '++id, code, barcode',
  accessories: '++id, code, barcode',
  categories: '++id, name',
  locations: '++id, name',
  sales: '++id, sold_at, product_id',
  users: '++id, role',
  works: '++id, name'
});


// Funciones auxiliares para trabajar con la BD
export const dbAPI = {
  // PRODUCTS
  async addProduct(product) {
    return await db.products.add(product);
  },
  
  async updateProduct(id, data) {
    return await db.products.update(id, data);
  },
  
  async deleteProduct(id) {
    return await db.products.delete(id);
  },
  
  async getProduct(id) {
    return await db.products.get(id);
  },
  
  async getAllProducts() {
    return await db.products.toArray();
  },
  
  async searchProducts(term) {
    return await db.products
      .filter(p => p.name.toLowerCase().includes(term.toLowerCase()))
      .toArray();
  },

  // ACCESSORIES
  async addAccessory(accessory) {
    return await db.accessories.add(accessory);
  },
  
  async updateAccessory(id, data) {
    return await db.accessories.update(id, data);
  },
  
  async deleteAccessory(id) {
    return await db.accessories.delete(id);
  },
  
  async getAllAccessories() {
    return await db.accessories.toArray();
  },

  // CATEGORIES
  async addCategory(category) {
    return await db.categories.add(category);
  },
  
  async getAllCategories() {
    return await db.categories.toArray();
  },
  
  async deleteCategory(id) {
    return await db.categories.delete(id);
  },

  // LOCATIONS
  async addLocation(location) {
    return await db.locations.add(location);
  },
  
  async getAllLocations() {
    return await db.locations.toArray();
  },
  
  async deleteLocation(id) {
    return await db.locations.delete(id);
  },

  // SALES
  async addSale(sale) {
    return await db.sales.add({
      ...sale,
      sold_at: new Date().toISOString()
    });
  },
  
  async getAllSales() {
    return await db.sales.toArray();
  },
  
  async getSalesByDate(startDate, endDate) {
    return await db.sales
      .where('sold_at')
      .between(startDate, endDate)
      .toArray();
  },
  
  async deleteSale(id) {
    return await db.sales.delete(id);
  },

  // USERS
  async addUser(user) {
    return await db.users.add(user);
  },
  
  async getUser(id) {
    return await db.users.get(id);
  },
  
  async getCurrentUser() {
    const users = await db.users.toArray();
    return users.length > 0 ? users[0] : null;
  },

  // WORKS
  async addWork(work) {
    return await db.works.add(work);
  },
  
  async getAllWorks() {
    return await db.works.toArray();
  },
  
  async deleteWork(id) {
    return await db.works.delete(id);
  },

  // GENERAL
  async clearAllData() {
    await db.products.clear();
    await db.accessories.clear();
    await db.categories.clear();
    await db.locations.clear();
    await db.sales.clear();
    await db.users.clear();
    await db.works.clear();
  },

  async exportToJSON() {
    const data = {
      products: await db.products.toArray(),
      accessories: await db.accessories.toArray(),
      categories: await db.categories.toArray(),
      locations: await db.locations.toArray(),
      sales: await db.sales.toArray(),
      users: await db.users.toArray(),
      works: await db.works.toArray(),
      exportDate: new Date().toISOString()
    };
    return data;
  },

  async importFromJSON(data) {
    await db.products.bulkAdd(data.products || []);
    await db.accessories.bulkAdd(data.accessories || []);
    await db.categories.bulkAdd(data.categories || []);
    await db.locations.bulkAdd(data.locations || []);
    await db.sales.bulkAdd(data.sales || []);
    await db.users.bulkAdd(data.users || []);
    await db.works.bulkAdd(data.works || []);
  }
};

export default db;
