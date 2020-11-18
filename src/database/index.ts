import { createConnection } from 'typeorm';

createConnection()
  .then(() => {
    console.log('------ Database connection successful ------');
  })
  .catch(error => console.log('\ndatabase error >>', error, '\n'));
