import Button from "../components/ui/Button";
import { useReducer } from 'react'
import Modal from "../components/Modal";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from '../app/firebase'

const Main = (props) => {
    const [modal, dispatch] = useReducer(reducer, {
        active: false,
        content: 'cart'
    });

    const [user, loading, error] = useAuthState(auth);

    function reducer(state, action) {
        switch (action.type) {
            case 'modal':
                return {
                    ...state,
                    active: action.modal
                };
            case 'content':
                return {
                    ...state,
                    content: action.content
                };
            default:
                return state
        }
    }

    const modalState = {
        props: modal,
        dispatch: dispatch,
    }

    async function openModal(content) {
        await dispatch({ type: 'content', content: content })
        await dispatch({ type: 'modal', modal: true })
    }

    const signOut = () => {
        auth.signOut();
    };

    if (user) {
        if (user.emailVerified)
            return (
                <div className="container center-flex">
                  
                </div>
            )
        else
            return (
                <div className="container center-flex">
                    Главная страница
                    <div>Вам нужно подтвердить почту</div>
                    <div onClick={signOut}>
                        <Button text='Выйти с аккаунта' />
                    </div>
                </div>
            )
    } else {
        return (
            <div className="container center-flex">

                <div onClick={() => openModal('cart')}>
                </div>
                <div onClick={() => openModal('registration')}>
                </div>
                <div>
                    <div onClick={() => openModal('Password-recovery')}>
                </div>
                </div>
                <Modal modal={modalState} />
            </div>
        );
    }
};

export default Main;

// import React from 'react';
// import module from './Main.module.scss'

// function MainMian(props) {
//     return (
//         <div className={module.cont}>
            
//         </div>
//     );
// }

// export default MainMian;