function mockResolvedModule(resolvedPath, exports) {
  require.cache[resolvedPath] = {
    id: resolvedPath,
    filename: resolvedPath,
    loaded: true,
    exports,
  };
}

function clearResolvedModule(resolvedPath) {
  delete require.cache[resolvedPath];
}

function loadFresh(resolvedPath) {
  delete require.cache[resolvedPath];
  return require(resolvedPath);
}

module.exports = {
  clearResolvedModule,
  loadFresh,
  mockResolvedModule,
};