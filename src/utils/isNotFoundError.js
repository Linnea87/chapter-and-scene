// ===== Not found error =====
// RTK Query returns failed requests as { status, data }.
// A 404 means the item does not exist, as opposed to a network or server problem.

const isNotFoundError = (error) => error?.status === 404;

export default isNotFoundError;
