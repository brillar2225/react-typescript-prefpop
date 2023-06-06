import React from 'react';

export default function Footer() {
	return (
		<footer>
			<div className="footer__wrapper">
				<h3 className="footer__title">
					Copyright &copy; {new Date().getFullYear()} <a href="https://github.com/brillar2225/">Jaehee Chung</a>{' '}
					Reserved.
				</h3>
				<div className="footer__contact">
					<h4 className="footer__contact__title">Contact</h4>
					<h5 className="footer___contact__content">brillar2225&#64;gmail.com</h5>
				</div>
			</div>
		</footer>
	);
}
