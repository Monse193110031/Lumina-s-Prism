import { Container, Stack, Typography } from '@mui/material';

export default function Aviso() {
    return (
      <>
        
        <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h5" gutterBottom>
              Aviso de privacidad
        </Typography>
            
        </Stack>
  
        <Typography variant="body2" gutterBottom>
        El presente Aviso de Privacidad establece los términos en que consultores usa y protege la información que es proporcionada por sus usuarios al momento de utilizar nuestro sitio web. Nuestra  compañía  está  comprometida  con  la  seguridad  de  los  datos  de  sus  usuarios.         
        </Typography>
          
        <Typography variant="body2" gutterBottom>
        Cuando le pedimos llenar los campos de información personal con la cual usted pueda ser identificado, lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este  documento.         
        </Typography>

        <Typography variant="body2" gutterBottom>
        Nuestro  sitio  web  recolecta  información  personal,  por  ejemplo:  nombre, información  de  contacto como su  dirección  de correo  electrónica,  así  mismo  cuando  seanecesario podrá ser requerida información específica para procesar algún pedido o agendar una entrega.        
        </Typography>

       
          
        </Container>
      </>
    );
  }
  