import Job from '@models/Job';

export default {
  render(job: Job) {
    return {
      id: job.id,
      name: job.name,
    };
  },

  renderMany(jobs: Job[]) {
    return jobs.map(job => this.render(job));
  },
};
