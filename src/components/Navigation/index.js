import React, { useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { ReponsiveLogoNavBar } from 'gatsby-ui-components'
import CartIcon from '../CartIcon'
import logo from '../../../icons/logo.png'
import { StoreContext } from '~/context/StoreContext'
// import {
// 	Wrapper,
// 	Container,
// 	CartCounter,
// 	MenuLink
// } from './styles'

const countQuantity = lineItems => {
	let quantity = 0

	lineItems.forEach(item => {
		quantity = quantity + item.quantity
	});

	return quantity
}

const Navigation = ({ siteTitle }) => {
	const { store: {checkout} } = useContext(StoreContext)
	const [quantity, setQuantity] = useState(countQuantity(checkout ? checkout.lineItems : []))

	useEffect(() => {
		setQuantity(countQuantity(checkout ? checkout.lineItems : []))
	}, [checkout])

		// <div id="nav-wrapper">
		// 	<div className="container">
		// 		<Link to='/'>
		// 			{siteTitle}
		// 		</Link>
		// 		<Link to='/about'>
		// 			About
		// 		</Link>
		// 		<Link to='/links'>
		// 			Links
		// 		</Link>
		// 		<Link to='/cart'>
		// 			{quantity !== 0 &&
		// 				<div className="cart-counter">
		// 					{quantity}
		// 				</div>
		// 			}
		// 			Cart
		// 		</Link>
		// 	</div>
		// </div>

		let links = [{
		    'title': 'home',
		    'link': '#home'
		  },
		  {
		    'title': 'links',
		    'link': 'links'
		  },
		  {
		    'title': 'store',
		    'link': '#store'
		  },
			{
				'title': 'cart',
				'link': 'cart'
			}
		];

		// <Link to='/cart'>
		// 	{quantity !== 0 &&
		// 		<div className="cart-counter">
		// 			{quantity}
		// 		</div>
		// 	}
		// 	Cart
		// </Link>

	return(
		<div id="nav-wrapper">
			<div className="container">
				<ReponsiveLogoNavBar links={ links } logo={ logo } />
				<CartIcon	/>
			</div>
		</div>
	)
}

Navigation.propTypes = {
	siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
	siteTitle: ``,
}

export default Navigation
