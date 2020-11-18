import User from '@models/User';

import jobView from './jobView';

export default {
  render(user: User) {
    return {
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      email: user.email,
      phone: user.phone,
      registrationNumber: user.registrationNumber,
      isAdmin: user.isAdmin,
      photo: user.photo.url,
      job: jobView.render(user.job),
    };
  },

  renderMany(users: User[]) {
    return users.map(user => this.render(user));
  },
};
