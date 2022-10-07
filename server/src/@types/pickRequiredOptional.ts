export type PickRequiredOptional<
  T,
  R extends keyof T,
  O extends keyof Omit<T, R>
> = Pick<T, R> & Partial<Pick<T, O>>;
