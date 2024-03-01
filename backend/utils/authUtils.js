function authUtils(resolver) {
  return (parent, args, context, info) => {
    if (!context.req.session) {
      throw new Error('Unauthorized');
    }

    return resolver(parent, args, context, info);
  };
}

module.exports = {
  authUtils,
};