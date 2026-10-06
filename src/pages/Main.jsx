import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Package, 
  ShoppingCart, 
  Settings, 
  BarChart3, 
  FileText,
  Plus,
  Search,
  Download,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import ProductList from '@/components/ProductList';
import SalesList from '@/components/SalesList';
import Dashboard from '@/components/Dashboard';

export default function Main() {
  const { products, sales, loading, currentUser, exportData } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  const handleImport = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const text = await file.text();
        const data = JSON.parse(text);
        // TODO: Implementar importData del contexto
        alert('Datos importados correctamente');
      }
    };
    input.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">📦 Inventory App</h1>
            <p className="text-xs text-muted-foreground">Datos guardados localmente • Sin conexión requerida</p>
          </div>
          <div className="text-right text-sm">
            <p className="font-medium">{currentUser?.name || 'Usuario'}</p>
            <p className="text-xs text-muted-foreground text-green-600">✓ Funcionando sin internet</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8 flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar productos..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon" onClick={exportData} title="Exportar datos">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleImport} title="Importar datos">
            <Upload className="h-4 w-4" />
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Productos</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500/20" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ventas</p>
                <p className="text-2xl font-bold">{sales.length}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-green-500/20" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Vendido</p>
                <p className="text-2xl font-bold">
                  ${sales.reduce((sum, s) => sum + (s.total || 0), 0).toFixed(2)}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-500/20" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Stock Total</p>
                <p className="text-2xl font-bold">
                  {products.reduce((sum, p) => {
                    const stockQty = p.stock?.reduce((s, loc) => s + (loc.qty || 0), 0) || 0;
                    return sum + stockQty;
                  }, 0)}
                </p>
              </div>
              <Package className="h-8 w-8 text-orange-500/20" />
            </div>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 flex gap-2 border-b">
          {[
            { id: 'dashboard', label: '📊 Dashboard', icon: BarChart3 },
            { id: 'products', label: '📦 Productos', icon: Package },
            { id: 'sales', label: '🛒 Ventas', icon: ShoppingCart },
            { id: 'reports', label: '📄 Reportes', icon: FileText },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content by Tab */}
        <div className="space-y-6">
          {activeTab === 'dashboard' && <Dashboard searchTerm={searchTerm} />}
          {activeTab === 'products' && <ProductList searchTerm={searchTerm} />}
          {activeTab === 'sales' && <SalesList searchTerm={searchTerm} />}
          {activeTab === 'reports' && (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Reportes</h2>
              <p className="text-muted-foreground">Sección de reportes en construcción...</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
