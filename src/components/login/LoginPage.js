import React from 'react'
import styles from './login.module.css'
import { connect } from 'react-redux'
import { doGoogleLoginAction, logOutAction } from '../../redux/userDuck'

function LoginPage({doGoogleLoginAction, logOutAction, fetching, loggedIn}) {
    
    function doLogin() {
        doGoogleLoginAction()
    }

    function doLogOut() {
        logOutAction()
    }
    
    if(fetching) return <h2>Cargando</h2>
    return (
        <div className={styles.container}>
            <h1>
                {loggedIn ? "Cierra tu sesión" : "Inicia sesion con GOOGLE"}
            </h1>
            {!loggedIn && 
                <button onClick={doLogin}>
                    Iniciar
                </button>
            }
            {loggedIn && 
                <button onClick={doLogOut}>
                    Cerrar Sesión
                </button>
            }
        </div>
    )
}

function mapStateToProps({user:{fetching, loggedIn}}) {
    return {
        fetching,
        loggedIn
    }
    
}
export default connect(mapStateToProps, { doGoogleLoginAction, logOutAction })(LoginPage)