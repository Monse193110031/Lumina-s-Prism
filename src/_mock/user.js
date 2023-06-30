import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import { getClients } from '../sections/@dashboard/products/DB/dbFiles';

// ----------------------------------------------------------------------

const users = async () => {
  const clients = await getClients();
  console.log('c', clients);
  const result = clients.map((c, index) => {
    return {
      id: faker.datatype.uuid(),
      avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
      name: c.nombre,
      email: c.email,
    };
  });
  return result;
};
export default users;
