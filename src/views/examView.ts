import { addDays, isPast } from 'date-fns';

import Exam from '@models/Exam';

import categoryView from './categoryView';
import examTypeView from './examTypeView';
import userView from './userView';

export default {
  render(exam: Exam) {
    const dueDate = addDays(new Date(exam.date), exam.type.expiration);

    return {
      id: exam.id,
      date: exam.date,
      dueDate,
      expired: isPast(dueDate),
      employee: userView.render(exam.employee),
      type: examTypeView.render(exam.type),
      category: categoryView.render(exam.category),
    };
  },

  renderMany(exams: Exam[]) {
    return exams.map(exam => this.render(exam));
  },
};
