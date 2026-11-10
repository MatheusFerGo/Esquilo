/**
 * Conventional Commits rules for Esquilo.
 * Keep `scope-enum` in sync with `.github/workflows/pr-title.yml` (added later in this increment).
 *
 * @type {import('@commitlint/types').UserConfig}
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['api', 'mobile', 'infra', 'docs', 'ci', 'deps', 'repo', 'adr', 'identity', 'imports'],
    ],
    'scope-empty': [1, 'never'],
    'subject-case': [2, 'never', ['upper-case', 'pascal-case', 'start-case']],
    'header-max-length': [2, 'always', 100],
  },
};
