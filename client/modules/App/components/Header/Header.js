import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { FormattedMessage } from 'react-intl'

// Import Style
import styles from './Header.css'

import { STORAGE_KEY } from '../../../../util/apiCaller'

export function Header(props, context) {
  const languageNodes = props.intl.enabledLanguages.map(
    lang => <li key={lang} onClick={() => props.switchLanguage(lang)} className={lang === props.intl.locale ? styles.selected : ''}>{lang}</li>
  )
  var token = null
  if (typeof window !== 'undefined') token = localStorage.getItem(STORAGE_KEY)

  let routeTo = '/albums'
  if (context.router.isActive('/', true)) routeTo = '/'

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles['site-title']}>
          <Link to={routeTo} ><FormattedMessage id="siteTitle" /></Link>
        </h1>
        {
          context.router.isActive('/', false) && token
            ? <Link className={styles['account-button']} to="/account" >Account</Link>
            : null
        }
      </div>
    </div>
  )
}

Header.contextTypes = {
  router: React.PropTypes.object,
}

Header.propTypes = {
  switchLanguage: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
}

export default Header
