import Button from "../components/ui/Button";
import { useReducer } from 'react'
import Modal from "../components/Modal";
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from '../app/firebase'
import module from './Main.module.scss'
import back from '../assets/mainback.jpg'
import { Link } from "react-router-dom";

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

                <div className={module.main}>
                    <h1 className={module.text1}>Главная</h1>

                    <p className={module.text2}>Ничё ещё нет</p>

                    <p className={module.pp}></p>

                    <div className={module.photo1}>
                        {/* <img src="https://images.pexels.com/photos/460736/pexels-photo-460736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img> */}
                    </div>
                </div>

            )
        else
            return (
                <div className={module.main}>
                    Главная страница
                    <div>Вам нужно подтвердить почту</div>
                    <div onClick={signOut}>
                        <Button text='Выйти с аккаунта' />
                    </div>
                </div>
            )
    } else {
        return (
            <div className={module.dsds}>
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
        )
    }
}; <div className="main_btn">
    {/* <button className={module.btn}><Link to='/catalogue'>Каталог</Link></button> */}
</div>

export default Main;