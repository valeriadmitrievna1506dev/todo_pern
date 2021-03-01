module.exports = (app) => {
  app.set('strict routing', true);
  app.get('/', (req, res) =>
    res.status(200).send({
      message: 'Welcome to the Todo-APP',
    })
  );

  const klawSync = require('klaw-sync');
  const path = require('path');

  async function useControllers() {
    const paths = klawSync(path.resolve('server/controllers'), {
      nodir: true,
    });
    paths.forEach((file) => {
      if (
        path.basename(file.path)[0] === '_' ||
        path.basename(file.path)[0] === '.'
      )
        return;
      app.use('/', require(file.path));
    });
  }

  useControllers();
};
