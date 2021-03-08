import axios from 'axios'


async function getProducts() {
  try {
    const response = await axios.get('http://localhost:1337/productos')
    console.log(response.data)
    return response.data
  }
  catch (error) {

  }
}

const data = getProducts()
// const data = [
//   {
//     id: '2zd33b8c',
//     name: 'Huawei P9 Lite 2017',
//     price: 430.00,
//     image: 'http://www.todoparati.online/wp-content/uploads/2019/01/compu-min-1-1.jpg',
//     description: 'Es un celular de ultima generacion'
//   },
//   {
//     id: '231d1f1aa',
//     name: 'Huawei P10 Lite',
//     price: 550.00,
//     image: 'http://i.linio.com/p/bbb9f355cede361cf66c917f3a8bfca9-product.webp',
//     description: 'Es un celular de ultima generacion'
//   },
//   {
//     id: '231d1f1ad',
//     name: 'Huawei P20 Lite',
//     price: 520.00,
//     image: 'http://catalogo.entel.pe/arquivos/ids/196007_2/huawei-p9-lite-2017-negro-vista-frontal.jpg?v=636977828627830000',
//     description: 'Es un celular de ultima generacion'
//   },
//   {
//     id: '231d1f1af',
//     name: 'Huawei Mate 10 Lite',
//     price: 420.00,
//     image: 'http://cdn-files.kimovil.com/default/0005/30/thumb_429932_default_big.jpeg',
//     description: 'Es un celular de ultima generacion'
//   },
//   {
//     id: '231d1f1ag',
//     name: 'Huawei Mate 10 Pro',
//     price: 120.00,
//     image: 'http://catalogo.entel.pe/arquivos/ids/191013/huawei-mate-10-pro-gris-vista-frontal.jpg?v=636965687137770000?v=636965687137770000',
//     description: 'Es un celular de ultima generacion'
//   },
//   {
//     id: '231d1f1ah',
//     name: 'Huawei Mate 20',
//     price: 54.00,
//     image: 'http://catalogo.entel.pe/arquivos/ids/190925_2/huawei-mate-10-lite-negro-vista-frontal.jpg?v=636965628539670000',
//     description: 'Es un celular de ultima generacion'
//   },
//   {
//     id: '231d1f1aj',
//     name: 'Huawei Mate 20 Pro',
//     price: 43.00,
//     image: 'http://cdn-files.kimovil.com/default/0005/30/thumb_429932_default_big.jpeg',
//     description: 'Es un celular de ultima generacion'
//   },
//   {
//     id: '231d1f1ak',
//     name: 'Huawei P30 Pro',
//     price: 12.00,
//     image: 'http://cdn-files.kimovil.com/default/0005/30/thumb_429932_default_big.jpeg',
//     description: 'Es un celular de ultima generacion'
//   },
//   {
//     id: '231d1f1al',
//     name: 'Huawei Mate 30 Pro',
//     price: 202.00,
//     image: 'http://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/phones/huawei-mate30-pro-4g/design/images/mate30-pro-4g-design-pic-purple.png',
//     description: 'Es un celular de ultima generacion'
//   }
// ]

export default data