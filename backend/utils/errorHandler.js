function withErrorHandler(fn, fnName, context, serviceName) {
  if (fn.__wrapped) return fn;

  const wrappedFn = async (...args) => {
    context.stack.push(fnName);
    try {
      return await fn(...args);
    } catch (err) {
      console.error(`Error in ${serviceName} calling ${context.stack.join(' calling ')}:`, err.message);
      throw err; 
    } finally {
      context.stack.pop();
    }
  };

  wrappedFn.__wrapped = true;
  return wrappedFn;
}

function wrapServiceMethods(service, context, serviceName) {
  for (let key in service) {
    if (service.hasOwnProperty(key) && typeof service[key] === 'function') {
      service[key] = withErrorHandler(service[key], key, context, serviceName);
    }
  }
}
module.exports = { withErrorHandler, wrapServiceMethods };