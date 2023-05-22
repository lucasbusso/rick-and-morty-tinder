import React from 'react'
import styles from './login.module.css'
import { connect } from 'react-redux'
import { doGoogleLoginAction } from '../../redux/userDuck'

function LoginPage({doGoogleLoginAction, fetching, loggedIn}) {
    
    function doLogin() {
        doGoogleLoginAction()
    }
    
    if(fetching) return <h2>Cargando</h2>
    return (
        <div className={styles.container}>
            <h1>
                Inicia Sesión con Google
            </h1>
            <h1>
                {loggedIn ? "Cierra tu sesión" : "Aqui puedes iniciar sesion"}
            </h1>
            {!loggedIn && 
                <button onClick={doLogin}>
                    Iniciar
                </button>
            }
            {loggedIn && 
                <button>
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
export default connect(mapStateToProps, { doGoogleLoginAction })(LoginPage)