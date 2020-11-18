import ExamType from '@models/ExamType';

export default {
  render(examType: ExamType) {
    return {
      id: examType.id,
      name: examType.name,
      expiration: examType.expiration,
    };
  },

  renderMany(examTypes: ExamType[]) {
    return examTypes.map(examType => this.render(examType));
  },
};
