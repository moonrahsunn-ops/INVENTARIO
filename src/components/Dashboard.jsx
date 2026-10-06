import React from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Dashboard({ searchTerm = '' }) {
  const { products, sales, accessories } = useApp();

  // Datos para gráfico de ventas por producto
  const salesByProduct = products.map(p => {
    const productSales = sales.filter(s => s.product_id === p.id);
    return {
      name: p.name || 'Sin nombre',
      total: productSales.reduce((sum, s) => sum + (s.total || 0), 0),
      cantidad: productSales.length
    };
  }).filter(item => item.total > 0).slice(0, 10);

  // Datos para gráfico de distribución
  const totalByType = {
    productos: products.length,
    accesorios: accessories.length,
    ventas: sales.length
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="space-y-6">
      {/* Resumen Principal */}
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-6">Resumen del Sistema</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border-l-4 border-l-blue-500 pl-4">
            <p className="text-sm text-muted-foreground mb-1">Total de Ventas</p>
            <p className="text-3xl font-bold text-blue-600">
              ${sales.reduce((sum, s) => sum + (s.total || 0), 0).toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">{sales.length} transacciones</p>
          </div>

          <div className="border-l-4 border-l-green-500 pl-4">
            <p className="text-sm text-muted-foreground mb-1">Inventario Total</p>
            <p className="text-3xl font-bold text-green-600">
              {products.reduce((sum, p) => {
                const stockQty = p.stock?.reduce((s, loc) => s + (loc.qty || 0), 0) || 0;
                return sum + stockQty;
              }, 0)}
            </p>
            <p className="text-xs text-muted-foreground mt-2">unidades en stock</p>
          </div>

          <div className="border-l-4 border-l-purple-500 pl-4">
            <p className="text-sm text-muted-foreground mb-1">Ticket Promedio</p>
            <p className="text-3xl font-bold text-purple-600">
              ${(sales.length > 0 
                ? (sales.reduce((sum, s) => sum + (s.total || 0), 0) / sales.length).toFixed(2)
                : 0
              )}
            </p>
            <p className="text-xs text-muted-foreground mt-2">por transacción</p>
          </div>
        </div>
      </Card>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de barras - Ventas por producto */}
        {salesByProduct.length > 0 && (
          <Card className="p-6">
            <h3 className="font-bold text-lg mb-4">Top 10 Productos por Ventas</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesByProduct}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#3b82f6" name="Ingresos ($)" />
                <Bar dataKey="cantidad" fill="#10b981" name="Cantidad" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        )}

        {/* Gráfico de pastel - Distribución */}
        <Card className="p-6">
          <h3 className="font-bold text-lg mb-4">Distribución del Sistema</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Productos', value: totalByType.productos },
                  { name: 'Accesorios', value: totalByType.accesorios },
                  { name: 'Ventas', value: totalByType.ventas }
                ]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {[0, 1, 2].map((index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Información del Sistema */}
      <Card className="p-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
        <h3 className="font-bold text-green-900 dark:text-green-100 mb-2">✓ Sistema Funcionando Correctamente</h3>
        <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
          <li>• Base de datos local activa</li>
          <li>• Sincronización sin conexión a internet</li>
          <li>• Todos los datos se guardan automáticamente</li>
          <li>• Exporta e importa tus datos cuando quieras</li>
        </ul>
      </Card>
    </div>
  );
}
