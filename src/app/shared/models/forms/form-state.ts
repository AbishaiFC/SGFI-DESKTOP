export type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export interface FormState<TError = string> {
  status: FormStatus;
  error: TError | null;
}