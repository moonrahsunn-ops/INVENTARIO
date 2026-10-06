import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { dbAPI } from '@/lib/database';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Estado de la app
  const [products, setProducts] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [sales, setSales] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos al iniciar
  useEffect(() => {
    loadAllData();
    initializeUser();
  }, []);

  const initializeUser = async () => {
    let user = await dbAPI.getCurrentUser();
    if (!user) {
      // Crear usuario por defecto (sin login)
      user = {
        id: 1,
        name: 'Usuario Local',
        role: 'admin',
        email: 'local@app.com'
      };
      await dbAPI.addUser(user);
    }
    setCurrentUser(user);
  };

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [prod, acc, cat, loc, sal, works] = await Promise.all([
        dbAPI.getAllProducts(),
        dbAPI.getAllAccessories(),
        dbAPI.getAllCategories(),
        dbAPI.getAllLocations(),
        dbAPI.getAllSales(),
        dbAPI.getAllWorks()
      ]);
      
      setProducts(prod);
      setAccessories(acc);
      setCategories(cat);
      setLocations(loc);
      setSales(sal);
      setWorks(works);
    } catch (error) {
      console.error('Error cargando datos:', error);
    } finally {
      setLoading(false);
    }
  };

  // PRODUCTS
  const addProduct = useCallback(async (product) => {
    try {
      const id = await dbAPI.addProduct(product);
      const newProduct = { ...product, id };
      setProducts(prev => [...prev, newProduct]);
      return id;
    } catch (error) {
      console.error('Error agregando producto:', error);
      throw error;
    }
  }, []);

  const updateProduct = useCallback(async (id, data) => {
    try {
      await dbAPI.updateProduct(id, data);
      setProducts(prev => 
        prev.map(p => p.id === id ? { ...p, ...data } : p)
      );
    } catch (error) {
      console.error('Error actualizando producto:', error);
      throw error;
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    try {
      await dbAPI.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error eliminando producto:', error);
      throw error;
    }
  }, []);

  // ACCESSORIES
  const addAccessory = useCallback(async (accessory) => {
    try {
      const id = await dbAPI.addAccessory(accessory);
      const newAccessory = { ...accessory, id };
      setAccessories(prev => [...prev, newAccessory]);
      return id;
    } catch (error) {
      console.error('Error agregando accesorio:', error);
      throw error;
    }
  }, []);

  const updateAccessory = useCallback(async (id, data) => {
    try {
      await dbAPI.updateAccessory(id, data);
      setAccessories(prev => 
        prev.map(a => a.id === id ? { ...a, ...data } : a)
      );
    } catch (error) {
      console.error('Error actualizando accesorio:', error);
      throw error;
    }
  }, []);

  const deleteAccessory = useCallback(async (id) => {
    try {
      await dbAPI.deleteAccessory(id);
      setAccessories(prev => prev.filter(a => a.id !== id));
    } catch (error) {
      console.error('Error eliminando accesorio:', error);
      throw error;
    }
  }, []);

  // CATEGORIES
  const addCategory = useCallback(async (category) => {
    try {
      const id = await dbAPI.addCategory(category);
      const newCategory = { ...category, id };
      setCategories(prev => [...prev, newCategory]);
      return id;
    } catch (error) {
      console.error('Error agregando categoría:', error);
      throw error;
    }
  }, []);

  const deleteCategory = useCallback(async (id) => {
    try {
      await dbAPI.deleteCategory(id);
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error eliminando categoría:', error);
      throw error;
    }
  }, []);

  // LOCATIONS
  const addLocation = useCallback(async (location) => {
    try {
      const id = await dbAPI.addLocation(location);
      const newLocation = { ...location, id };
      setLocations(prev => [...prev, newLocation]);
      return id;
    } catch (error) {
      console.error('Error agregando ubicación:', error);
      throw error;
    }
  }, []);

  const deleteLocation = useCallback(async (id) => {
    try {
      await dbAPI.deleteLocation(id);
      setLocations(prev => prev.filter(l => l.id !== id));
    } catch (error) {
      console.error('Error eliminando ubicación:', error);
      throw error;
    }
  }, []);

  // SALES
  const addSale = useCallback(async (sale) => {
    try {
      const id = await dbAPI.addSale(sale);
      const newSale = { ...sale, id };
      setSales(prev => [...prev, newSale]);
      return id;
    } catch (error) {
      console.error('Error registrando venta:', error);
      throw error;
    }
  }, []);

  const deleteSale = useCallback(async (id) => {
    try {
      await dbAPI.deleteSale(id);
      setSales(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error eliminando venta:', error);
      throw error;
    }
  }, []);

  // WORKS
  const addWork = useCallback(async (work) => {
    try {
      const id = await dbAPI.addWork(work);
      const newWork = { ...work, id };
      setWorks(prev => [...prev, newWork]);
      return id;
    } catch (error) {
      console.error('Error agregando trabajo:', error);
      throw error;
    }
  }, []);

  const deleteWork = useCallback(async (id) => {
    try {
      await dbAPI.deleteWork(id);
      setWorks(prev => prev.filter(w => w.id !== id));
    } catch (error) {
      console.error('Error eliminando trabajo:', error);
      throw error;
    }
  }, []);

  // EXPORT/IMPORT
  const exportData = useCallback(async () => {
    try {
      const data = await dbAPI.exportToJSON();
      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `inventory-backup-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exportando datos:', error);
      throw error;
    }
  }, []);

  const importData = useCallback(async (jsonData) => {
    try {
      await dbAPI.importFromJSON(jsonData);
      await loadAllData();
    } catch (error) {
      console.error('Error importando datos:', error);
      throw error;
    }
  }, []);

  const value = {
    // Estado
    products,
    accessories,
    categories,
    locations,
    sales,
    works,
    currentUser,
    loading,

    // Productos
    addProduct,
    updateProduct,
    deleteProduct,

    // Accesorios
    addAccessory,
    updateAccessory,
    deleteAccessory,

    // Categorías
    addCategory,
    deleteCategory,

    // Ubicaciones
    addLocation,
    deleteLocation,

    // Ventas
    addSale,
    deleteSale,

    // Trabajos
    addWork,
    deleteWork,

    // Utilidades
    exportData,
    importData,
    reloadData: loadAllData
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe usarse dentro de AppProvider');
  }
  return context;
}

export default AppContext;
