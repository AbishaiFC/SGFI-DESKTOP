import { signal, WritableSignal } from '@angular/core';
import { FormState } from '../../shared/models/forms/form-state';

export class FormStateManager<TError = string> {
    private readonly _state: WritableSignal<FormState<TError>> = signal({
        status: 'idle',
        error: null,
    })

    readonly state = this._state.asReadonly();

    setLoading(): void {
        this._state.set({status: 'loading', error: null})
    }

    setSuccess(): void {
        this._state.set({ status: 'success', error: null})
    }

    setError(error: TError): void {
        this._state.set({ status: 'error', error})
    }

    reset(): void {
    this._state.set({ status: 'idle', error: null });
  }
}