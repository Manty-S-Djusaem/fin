    import React from 'react'
    import module from './Password-recovery.module.scss'
    import Email_icon from '../assets/email_icon.png'
    import key_icon from '../assets/key_icon.png' 
    import tick_icon from '../assets/tick_icon.png' 
    import google from '../assets/google.png'
    import apple from '../assets/apple.png'
    import facebook from '../assets/facebook.png'

    const Password_recovery = (props) => {

        return (
            <div  className={module.container_auth}>
                <form>
                <div className={module.title}>Сброс пароля</div> 
                    <div className={module.input_login}>
                        <label htmlFor="login"></label>
                        <p>E-mail</p> 
                        <div> <img src={Email_icon}/> <input type="text" name="login" placeholder="Введите e-mail"/> </div>
                        <div className={module.line}> </div>
                    </div>
                    {/* <div className={module.input_login}>
                        <label htmlFor="password"></label>
                        <p>Пароль</p>
                        <div> <img src={key_icon}/> <input type="password" name="password" placeholder="введите пароль"/> </div>
                        <div className={module.line}> </div>
                    </div>
                    <div className={module.forget}> 
                  <p> <button className={module.tick}> <img className={module.email_icon} src={tick_icon}></img> </button> Запомнить меня</p>
                  <p> <a href='#'>Забыли пароль?</a></p>
                </div> */}
                    <div className={module.email_button}>
                        <label htmlFor="login"></label>
                        <input className={module.login_button} type="submit" value="Получить код "
                        style={{
                            cursor: 'pointer'
                        }}/>
                    </div>
                    {/* <div className={module.icons_container}> Войти с помощью:
                    <div className={module.icons}>
                        <a href='#'> <img src={google} className={module.icon} alt='gmail'></img> </a>
                        <a href='#'  id={module.one}> <img src={apple} className={module.icon} id={module.a} alt='apple'></img> </a>
                        <a href='#'  id={module.one}> <img src={facebook} className={module.icon} alt='facebook'></img> </a>
                    </div>
                </div>
                <div className={module.signin}><p> Нет аккаунта? <a href='#'>Зарегистрироваться </a> </p> </div> */}

                </form>
                
            </div>
        )
    
    };
    
    export default Password_recovery