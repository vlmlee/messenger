import * as React from 'react';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { IEnterNameModal } from '../typings';

const EnterNameModal = ({ onSubmit, submitting, error }: IEnterNameModal) => {
    const [name, setName] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const updateName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed || submitting) {
            return;
        }
        await onSubmit(trimmed);
    };

    return (
        <div className={'enter-name-modal'}>
            <div className={'enter-name-modal__backdrop'} />
            <form className={'enter-name-modal__dialog crt'} onSubmit={handleSubmit} role={'dialog'} aria-modal={'true'} aria-labelledby={'enter-name-title'}>
                <label className={'enter-name-modal__title'} htmlFor={'enter-name-input'} id={'enter-name-title'}>
                    Enter name:
                </label>
                <input
                    id={'enter-name-input'}
                    ref={inputRef}
                    className={'enter-name-modal__input'}
                    value={name}
                    onChange={updateName}
                    placeholder={'Your name'}
                    autoComplete={'off'}
                    disabled={submitting}
                />
                {error ? <div className={'enter-name-modal__error'}>{error}</div> : null}
                <button className={'enter-name-modal__ok'} type={'submit'} disabled={!name.trim() || submitting}>
                    {submitting ? '...' : 'OK'}
                </button>
                <div className={'enter-name-modal__background'} />
            </form>
        </div>
    );
};

export default EnterNameModal;
