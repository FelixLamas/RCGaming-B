# Backend del Proyecto eCommerce RCGames

¡Bienvenido al backend del proyecto eCommerce RCGames!

Este backend es parte del curso de **Full Stack** de **RollingCode** y está desarrollado utilizando Visual Studio Code con las siguientes tecnologías:

- **Backend**: JavaScript con Node.js y Express.js para el servidor.
- **Base de Datos**: MongoDB para almacenar los datos del eCommerce.

## Funcionalidades

El backend del proyecto eCommerce RCGames proporciona las siguientes funcionalidades:

- **Gestión de Usuarios**: Permite a los administradores gestionar usuarios, productos y órdenes de compra.
- **Autenticación**: Permite a los usuarios registrarse, iniciar sesión y cerrar sesión en el sistema.
- **Base de Datos**: Utiliza MongoDB para almacenar y gestionar la información del eCommerce.

## Configuración

Para ejecutar el backend del proyecto eCommerce RCGames en tu máquina local, sigue estos pasos:

1. **Clonar el Repositorio**: Clona este repositorio desde GitHub ejecutando el siguiente comando en tu terminal:

    ```
    git clone <URL del repositorio>
    ```

2. **Instalar Dependencias**: Navega hasta el directorio del backend en tu terminal y ejecuta el siguiente comando para instalar todas las dependencias necesarias:

    ```
    npm install
    ```

3. **Configurar Variables de Entorno**: Crea un archivo `.env` en el directorio raíz del backend y configura las variables de entorno necesarias, como la conexión a la base de datos MongoDB y las claves secretas para la autenticación.

4. **Iniciar el Servidor**: Una vez configurado, puedes iniciar el servidor ejecutando el siguiente comando:

    ```
    npm run dev
    ```

## Estructura del Proyecto

El proyecto backend está estructurado de la siguiente manera:

- **/models**: Contiene los modelos de datos de MongoDB utilizando Mongoose.
- **/routes**: Contiene las rutas de Express para gestionar las solicitudes HTTP.
- **/controllers**: Contiene los controladores de Express para manejar la lógica de negocio.
- **/middlewares**: Contiene los middlewares de Express para funciones comunes como la autenticación.
- **/config**: Contiene la configuración del servidor y las variables de entorno.

El backend utiliza las siguientes dependencias/librerías:
- bcrypt v5.1.1
- cors v2.8.5
- dotenv v16.4.5
- express v4.19.2
- jsonwebtoken v9.0.2
- mongoose v8.2.1
- morgan v1.10.0
- nodemailer v6.9.13

## Colaboradores

Este backend fue creado por:

- Esteban Ignacio Barrionuevo [Github](https://github.com/3steban99)
- Jimena Herrera [Github](https://github.com/jimenaherrera22)
- Rodrigo Cardozo [Github](https://github.com/rodrigocardoso080488)
- Felix Lamas [Github](https://github.com/FelixLamas)
- Martin Ladetto [Github](https://github.com/mladetto)

