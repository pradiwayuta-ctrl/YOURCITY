export const err = (status, message) => Object.assign(new Error(message), { status });
export const handle = (fn) => async (req, res) => {
  try { res.json(await fn(req)); }
  catch (e) { res.status(e.status || 500).json({ error: e.status ? e.message : 'Terjadi kesalahan' }); }
};
