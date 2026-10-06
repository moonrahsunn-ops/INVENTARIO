import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function ProductList({ searchTerm = '' }) {
  const { products, deleteProduct, loading } = useApp();
  const [showForm, setShowForm] = useState(false);

  const filteredProducts = products.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.code?.includes(searchTerm) ||
    p.barcode?.includes(searchTerm)
  );

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Productos ({filteredProducts.length})</h2>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Producto
        </Button>
      </div>

      {showForm && (
        <Card className="p-6 mb-6">
          <h3 className="text-lg font-bold mb-4">Agregar Producto</h3>
          <p className="text-muted-foreground">Formulario de producto en construcción...</p>
        </Card>
      )}

      <div className="grid gap-4">
        {filteredProducts.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No hay productos. ¡Crea uno nuevo!</p>
          </Card>
        ) : (
          filteredProducts.map(product => (
            <Card key={product.id} className="p-4 flex justify-between items-start hover:shadow-md transition-shadow">
              <div className="flex-1">
                <h3 className="font-bold text-lg">{product.name}</h3>
                {product.code && <p className="text-sm text-muted-foreground">Código: {product.code}</p>}
                {product.barcode && <p className="text-sm text-muted-foreground">Barcode: {product.barcode}</p>}
                {product.price_retail && <p className="text-sm font-semibold text-green-600">Precio: ${product.price_retail}</p>}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => deleteProduct(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
