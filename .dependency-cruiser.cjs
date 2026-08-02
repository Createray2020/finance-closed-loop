/** 模組化單體邊界防護 — 在 CI 擋死跨模組違規 */
module.exports = {
  forbidden: [
    {
      name: 'no-foreign-internal',
      comment: '禁止跨模組 import 別人的 Internal/（只能走 Contract/）',
      severity: 'error',
      from: { path: '^src/Modules/([^/]+)/' },
      to: {
        path: '^src/Modules/([^/]+)/Internal/',
        pathNot: '^src/Modules/$1/Internal/', // 同模組自己的 Internal 允許
      },
    },
    {
      name: 'shared-no-up',
      comment: 'Shared/Foundation 不可依賴業務模組',
      severity: 'error',
      from: { path: '^src/Shared/' },
      to: { path: '^src/Modules/' },
    },
    {
      name: 'no-circular',
      comment: '禁止循環依賴',
      severity: 'error',
      from: {},
      to: { circular: true },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsConfig: { fileName: 'tsconfig.json' },
    tsPreCompilationDeps: true,
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default', 'types'],
    },
  },
};
