import { Container, Stack, Typography } from '@mui/material';

export default function Terminos() {
    return (
      <>
        
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h5" gutterBottom>
              Términos y condiciones
        </Typography>
            
        </Stack>
  
        <Typography variant="body2" gutterBottom>
          Es requisito necesario para la adquisición de los productos que se ofrecen en este sitio, que lea y acepte los siguientes Términos y Condiciones que a continuación se redactan.
        </Typography>
          
        <Typography variant="body2" gutterBottom>
            El uso de nuestros servicios, así como la compra de nuestros productos implicará que usted ha leído y aceptado los Términos y Condiciones de Uso en el presente documento. Todos los  productos  que  son  ofrecidos  por  nuestro  sitio  web  están sujetos a  ser  creadas,  cobradas, enviadas o presentadas por una página web tercera y en tal caso estarían sujetas a sus propios  Términos  y  Condiciones.&nbsp;  
        </Typography>

        <Typography variant="body2" gutterBottom>
        Para  adquirir  un  producto,  será necesario  el  registro  por  parte  del  usuario,  con  ingreso  de  datos  personales  fidedignos y definición de una contraseña.El usuario puede elegir y cambiar la clave para su acceso de administración de la cuenta en  cualquier  momento,  en  caso  de  que  se  haya  registrado  y  que  sea  necesario  para  la compra de alguno de nuestros productos, no asume la responsabilidad en caso de que se entregue dicha clave a terceros.&nbsp;
        </Typography>

        <Typography variant="body2" gutterBottom>Todas las compras y transacciones que se lleven a cabo por medio de este sitio web, están sujetas a un proceso de confirmación y verificación, el cual podría incluir la verificación del stock y disponibilidad de producto, validación de la forma de pago, validación de la factura 
            (en caso de existir) y el cumplimiento de las condiciones requeridas por el medio de pago seleccionado. En algunos casos puede que se requiera una verificación por medio de correo electrónico.Los precios de los productos ofrecidos en esta Tienda Online son válidos solamente en las compras realizadas en este sitio web.
        </Typography>
          
          
        </Container>
      </>
    );
  }
  