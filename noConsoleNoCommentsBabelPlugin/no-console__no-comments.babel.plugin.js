module.exports = function({ types: t }) {
  return {
    visitor: {
      Program(path) {
        path.traverse({
          enter(path) {
            t.removeComments(path.node);
          }
        });
      },
      CallExpression(path) {
        const callee = path.get('callee');
        if (callee.isMemberExpression() && callee.node.object.name === 'console') {
            path.remove();
        }
      },
    }
  };
}