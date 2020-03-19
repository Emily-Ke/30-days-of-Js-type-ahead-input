const Hapi = require('@hapi/hapi');
const inert = require('@hapi/inert');
const path = require('path');

const states = require('./states');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      files: {
        relativeTo: path.join(__dirname, '../public')
      }
    }
  });

  await server.register(inert);

  server.route([
    {
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: '.'
        }
      }
    },
    {
      method: 'GET',
      path: '/states',
      handler: () => states
    }
  ]);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
  console.error(err);
  process.exit(1);
});

init();
