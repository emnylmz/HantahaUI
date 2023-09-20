import React from 'react'
import './css/style.css'

function ErrorBoundary() {
  return (
    <div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<h1>Oops!</h1>
				<h2>404 - Sayfa Bulunamadı.</h2>
			</div>
			<a href="/">Anasayfa</a>
		</div>
	</div>
  )
}

export default ErrorBoundary;

