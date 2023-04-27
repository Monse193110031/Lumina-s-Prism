import { Container, Stack, Typography } from '@mui/material';

export default function Politica() {
    return (
      <>
        
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h5" gutterBottom>
        Política de reembolso y garantía
        </Typography>
            
        </Stack>
  
        <Typography variant="body2" gutterBottom>
        En  el  caso  de  productos  que  sean  mercancías  irrevocables  no-tangibles,  no  realizamos reembolsos  después  de  que  se  envíe  el  producto,usted  tiene  la  responsabilidad  de entender  las  características  antes  de  comprarlo.         </Typography>
          
        <Typography variant="body2" gutterBottom>
        Solo  se  hacen  excepciones  de  esta  regla  cuando  la descripción no se ajusta al producto.        </Typography>

        <Typography variant="body2" gutterBottom>
        Hay algunos productos que pudieran tener garantía y posibilidad de reembolso, pero este será especificado al comprar el producto. En tales casos la garantía solo cubrirá fallas de fábrica y solo se hará efectiva cuando el producto se haya usado correctamente.</Typography>

        <Typography variant="body2" gutterBottom>Todas las compras y transacciones que se lleven a cabo por medio de este sitio web, están sujetas a un proceso de confirmación y verificación, el cual podría incluir la verificación del stock y disponibilidad de producto, validación de la forma de pago, validación de la factura 
        La  garantía  no  cubre  averías o  daños  ocasionados  por  uso  indebido.  Los  términos  de  la garantía están asociados a fallas de fabricación y funcionamiento en condiciones normales de  los  productos  y  sólo  se  harán  efectivos  estos  términos  si  el  equipo  ha  sido  usado correctamente.         </Typography>
          
          
        </Container>
      </>
    );
  }
  