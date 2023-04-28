import { useState, useEffect } from 'react';
import { getProviders } from '../products/DB/dbFiles';

const ProveedorSelect = () => {
  const [proveedores, setProveedores] = useState([]);

  const getProvider = async () => {
    const providers = await getProviders();
    setProveedores(providers);
  };

  useEffect(() => {
    getProvider();
  }, []);

  if (!proveedores) return <span>:o </span>;

  return (
    <select>
      {proveedores.map((proveedor) => (
        <option key={proveedor.id} value={proveedor.id}>
          {proveedor.nombreProveedor}
        </option>
      ))}
    </select>
  );
};

export default ProveedorSelect;
