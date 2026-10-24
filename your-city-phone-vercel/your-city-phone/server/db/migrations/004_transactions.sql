CREATE TABLE IF NOT EXISTS transactions (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id),
  kind TEXT NOT NULL,            -- salary | transfer_in | transfer_out | tax
  amount BIGINT NOT NULL,
  note TEXT,
  seen BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS tx_user_idx ON transactions (user_id, id DESC);
